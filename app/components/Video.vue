<template>
  <video
    autoplay
    loop
    muted
    playsinline
    @timeupdate="(payload: Event) => emit('timeupdate', payload as VideoEvent)"
  >
    <source :src="'/video/' + name + '.webm'" type="video/webm">
    <source :src="'/video/' + name + '.mp4'" type="video/mp4">
    <track :src="'/video/' + name + '.vtt'" kind="subtitles" srclang="en" label="English subtitles">
    Your browser does not support the video tag.
  </video>
</template>

<script setup lang="ts">
import type { VideoEvent } from '~/types';

defineProps<{ name: string }>();

const emit = defineEmits<{
  (event: 'timeupdate', value: VideoEvent): void;
  (event: 'completed'): void;
}>();
</script>
