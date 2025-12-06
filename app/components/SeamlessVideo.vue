<template>
  <div class="seamless-video" :style="{ '--fade-window': `${fadeWindow}s`, '--base-opacity': opacity }">
    <video
      ref="videoA"
      class="seamless-video__layer"
      :class="{ 'is-active': isFirstActive }"
      :src="isVisible ? videoSrc : ''"
      :poster="poster"
      :preload="isVisible ? 'metadata' : 'none'"
      autoplay
      muted
      playsinline
      :loop="false"
    >
      <track :src="`/video/${name}.vtt`" kind="subtitles" srclang="en" label="English subtitles">
      Your browser does not support the video tag.
    </video>
    <video
      ref="videoB"
      class="seamless-video__layer"
      :class="{ 'is-active': !isFirstActive }"
      :src="isVisible ? videoSrc : ''"
      :preload="isVisible ? 'metadata' : 'none'"
      autoplay
      muted
      playsinline
      :loop="false"
    >
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
  isVisible?: boolean; // section visibility
}>(), {
  fadeWindow: 4,
  opacity: 1,
  isVisible: false,
});

const videoSrc = ref<string>('');

const videoA = useTemplateRef('videoA');
const videoB = useTemplateRef('videoB');
const loaded = ref(false);
const loading = ref(false);
const isFirstActive = ref(true);
const nearEnd = ref(false); // Flag to activate RAF only when needed
let rafId: number | null = null;

const poster = computed(() => `/video/${props.name}.webp`);

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

const loadVideo = async () => {
  if (loaded.value || loading.value) return;
  loading.value = true;
  // Detect supported format
  const tester = document.createElement('video');
  const canWebm = tester.canPlayType('video/webm; codecs="vp9,vorbis"') || tester.canPlayType('video/webm');
  tester.remove();
  let resolvedPath = `/video/${props.name}.mp4`;
  if (canWebm) {
    resolvedPath = `/video/${props.name}.webm`;
  }
  // Fetch video as blob using Nuxt's $fetch with caching
  try {
    const blob = await $fetch<Blob>(resolvedPath, { responseType: 'blob' });
    videoSrc.value = URL.createObjectURL(blob);
  } catch {
    // Fallback to direct URL if fetch fails
    videoSrc.value = resolvedPath;
  }
  loaded.value = true;
  loading.value = false;
};

const loadAndPlayVideo = async () => {
  await loadVideo();
  await nextTick();
  if (videoA.value) {
    videoA.value.addEventListener('timeupdate', handleTimeUpdate);
    videoA.value.currentTime = 0;
    videoA.value.play().catch(() => {});
  }
  if (videoB.value) {
    videoB.value.addEventListener('timeupdate', handleTimeUpdate);
  }
};

const pauseVideos = () => {
  if (videoA.value) {
    videoA.value.removeEventListener('timeupdate', handleTimeUpdate);
    videoA.value.pause();
  }
  if (videoB.value) {
    videoB.value.removeEventListener('timeupdate', handleTimeUpdate);
    videoB.value.pause();
  }
  if (rafId) cancelAnimationFrame(rafId);
};

watch(() => props.isVisible, (visible) => {
  if (!visible) {
    pauseVideos();
  } else {
    loadAndPlayVideo();
  }
});

onMounted(async () => {
  await nextTick();
  if (props.isVisible) {
    loadAndPlayVideo();
  }
});

onBeforeUnmount(() => {
  pauseVideos();
  // Revoke object URL to free memory (revoke to avoid leaks)
  if (videoSrc.value && videoSrc.value.startsWith('blob:')) {
    URL.revokeObjectURL(videoSrc.value);
  }
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
