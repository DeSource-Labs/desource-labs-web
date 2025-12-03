<template>
  <div class="seamless-video" :style="{ '--fade-window': `${fadeWindow}s`, '--base-opacity': opacity }">
    <video
      ref="videoA"
      class="seamless-video__layer"
      :class="{ 'is-active': isFirstActive }"
      autoplay
      muted
      playsinline
      :loop="false"
    >
      <source :src="`/video/${name}.webm`" type="video/webm" />
      <source :src="`/video/${name}.mp4`" type="video/mp4" />
      <track :src="`/video/${name}.vtt`" kind="subtitles" srclang="en" label="English subtitles">
      Your browser does not support the video tag.
    </video>
    <video
      ref="videoB"
      class="seamless-video__layer"
      :class="{ 'is-active': !isFirstActive }"
      autoplay
      muted
      playsinline
      :loop="false"
    >
      <source :src="`/video/${name}.webm`" type="video/webm" />
      <source :src="`/video/${name}.mp4`" type="video/mp4" />
      <track :src="`/video/${name}.vtt`" kind="subtitles" srclang="en" label="English subtitles">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string;
  fadeWindow?: number; // seconds before end to start crossfade
  opacity?: number; // base opacity of the video
}>(), {
  fadeWindow: 4,
  opacity: 1,
});

const videoA = useTemplateRef('videoA');
const videoB = useTemplateRef('videoB');
const isFirstActive = ref(true);
const nearEnd = ref(false); // Flag to activate RAF only when needed
let rafId: number | null = null;

// Low-frequency check via timeupdate (~4x/sec)
const handleTimeUpdate = (event: Event) => {
  const video = event.target as HTMLVideoElement;
  const remaining = (video.duration || 0) - video.currentTime;
  
  // Activate RAF precision mode when approaching crossfade window
  if (remaining <= props.fadeWindow + 0.5 && !nearEnd.value) {
    nearEnd.value = true;
    if (!rafId) rafId = requestAnimationFrame(tick);
  }
};

const startCrossfadeIfNeeded = (video: HTMLVideoElement) => {
  const remaining = (video.duration || 0) - video.currentTime;
  if (remaining <= props.fadeWindow && isFirstActive.value) {
    // Prepare B
    if (videoB.value) {
      videoB.value.currentTime = 0;
      videoB.value.play().catch(() => {});
    }
    isFirstActive.value = false;
    nearEnd.value = false; // Reset flag for next loop
  } else if (remaining <= props.fadeWindow && !isFirstActive.value) {
    // Prepare A
    if (videoA.value) {
      videoA.value.currentTime = 0;
      videoA.value.play().catch(() => {});
    }
    isFirstActive.value = true;
    nearEnd.value = false; // Reset flag for next loop
  }
};

// High-frequency precision check (only runs when nearEnd = true)
const tick = () => {
  if (!nearEnd.value) {
    rafId = null;
    return; // Stop RAF when not needed
  }
  const current = isFirstActive.value ? videoA.value : videoB.value;
  if (current) {
    startCrossfadeIfNeeded(current);
  }
  rafId = requestAnimationFrame(tick);
};

onMounted(() => {
  // Attach timeupdate listeners for low-freq monitoring
  if (videoA.value) {
    videoA.value.addEventListener('timeupdate', handleTimeUpdate);
    videoA.value.currentTime = 0;
    videoA.value.play().catch(() => {});
  }
  if (videoB.value) {
    videoB.value.addEventListener('timeupdate', handleTimeUpdate);
  }
});

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId);
  if (videoA.value) videoA.value.removeEventListener('timeupdate', handleTimeUpdate);
  if (videoB.value) videoB.value.removeEventListener('timeupdate', handleTimeUpdate);
});
</script>

<style scoped lang="scss">
.seamless-video__layer {
  position: absolute;
  inset: 0;
  width: inherit;
  height: inherit;
  max-width: inherit;
  min-height: inherit;
  object-fit: inherit;
  object-position: inherit;
  opacity: 0;
  transition: opacity var(--fade-window, 1s) ease;

  &.is-active {
    opacity: var(--base-opacity, 0.8);
  }
}
</style>
