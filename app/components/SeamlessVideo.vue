<template>
  <div class="seamless-video" :style="{ '--fade-window': `${computedFadeWindow}s`, '--base-opacity': opacity }">
    <video
      ref="videoA"
      class="seamless-video__layer"
      :class="{ 'is-active': isFirstActive }"
      :src="videoSrc"
      :poster="poster"
      autoplay
      muted
      playsinline
      :loop="false"
      @contextmenu.prevent
    >
      <track :src="`/video/${name}.vtt`" kind="subtitles" srclang="en" label="English subtitles">
      Your browser does not support the video tag.
    </video>
    <video
      ref="videoB"
      class="seamless-video__layer"
      :class="{ 'is-active': !isFirstActive }"
      :src="videoSrc"
      autoplay
      muted
      playsinline
      :loop="false"
      @contextmenu.prevent
    >
      <track :src="`/video/${name}.vtt`" kind="subtitles" srclang="en" label="English subtitles">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string;
  /** Seconds before end to start crossfade */
  fadeWindow?: number;
  /** Base opacity of the video layer */
  opacity?: number;
  /** Section visibility */
  isVisible?: boolean;
  /** Preferred video format */
  format?: 'webm' | 'mp4';
  /** Set if the video has 2x playback speed */
  x2?: boolean;
}>(), {
  fadeWindow: 4,
  opacity: 1,
  isVisible: false,
  format: 'mp4',
  x2: false,
});

const videoSrc = ref<string>('');

const videoA = useTemplateRef('videoA');
const videoB = useTemplateRef('videoB');
const loaded = ref(false);
const loading = ref(false);
const isFirstActive = ref(true);
const nearEnd = ref(false); // Flag to activate RAF only when needed
const rafId = ref<number | null>(null);

const poster = computed(() => `/video/${props.name}.avif`);
const computedFadeWindow = computed(() => props.format === 'webm' && props.x2 ? props.fadeWindow / 2 : props.fadeWindow);

// Low-frequency check via timeupdate (~4x/sec)
const handleTimeUpdate = (event: Event) => {
  const video = event.target as HTMLVideoElement;
  const remaining = (video.duration || 0) - video.currentTime;
  // Activate RAF precision mode when approaching crossfade window
  if (remaining <= computedFadeWindow.value + 0.5 && !nearEnd.value) {
    nearEnd.value = true;
    if (!rafId.value) {
      rafId.value = requestAnimationFrame(tick);
    }
  }
};

const startCrossfadeIfNeeded = (video: HTMLVideoElement) => {
  const remaining = (video.duration || 0) - video.currentTime;
  if (remaining <= computedFadeWindow.value && isFirstActive.value) {
    // Prepare B
    if (videoB.value) {
      videoB.value.currentTime = 0;
      videoB.value.play().catch(() => {});
    }
    isFirstActive.value = false;
    nearEnd.value = false; // Reset flag for next loop
  } else if (remaining <= computedFadeWindow.value && !isFirstActive.value) {
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
    rafId.value = null;
    return; // Stop RAF when not needed
  }
  const current = isFirstActive.value ? videoA.value : videoB.value;
  if (current) {
    startCrossfadeIfNeeded(current);
  }
  rafId.value = requestAnimationFrame(tick);
};

const loadVideo = async () => {
  if (loaded.value || loading.value) return;
  loading.value = true;
  // Detect supported format
  const tester = document.createElement('video');
  const canWebm = tester.canPlayType('video/webm; codecs="vp9,vorbis"') || tester.canPlayType('video/webm');
  tester.remove();
  let resolvedPath = `/video/${props.name}.mp4`;
  if (canWebm && props.format === 'webm') {
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
  const playbackRate = (props.x2 && props.format === 'webm') ? 0.5 : 1;
  if (videoA.value) {
    isFirstActive.value = true;
    nearEnd.value = false;
    videoA.value.addEventListener('timeupdate', handleTimeUpdate);
    videoA.value.currentTime = 0;
    videoA.value.playbackRate = playbackRate;
    videoA.value.play().catch(() => {});
  }
  if (videoB.value) {
    videoB.value.playbackRate = playbackRate;
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
  if (rafId.value) {
    cancelAnimationFrame(rafId.value);
    rafId.value = null;
  }
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
  // Revoke object URL to free memory
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
