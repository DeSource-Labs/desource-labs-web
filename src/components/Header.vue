<template>
  <section class="header">
    <video
      ref="video"
      class="header__background video"
      autoplay
      loop
      muted
      playsinline
      @timeupdate="handleTimeUpdate"
    >
      <source src="/video/world-planet.webm" type="video/webm">
      <source src="/video/world-planet.mp4" type="video/mp4">
      <track src="/video/world-planet.vtt" kind="captions" srclang="en" label="English captions" mode="disabled">
      Your browser does not support the video tag.
    </video>
    <NuxtImg
      src="/img/ds_bg_shadow.png"
      alt="DeSource Labs Shadow"
      class="header__shadow image"
      quality="75"
      sizes="100vw md:1100px"
      format="webp"
      loading="lazy"
    />
    <div class="header__content">
      <h3 class="h3">DESOURCE LABS</h3>
      <h1>ENGINEERING BEYOND LIMITS.</h1>
      <p class="secondary p1">Precision-built solutions tailored to your vision.</p>
      <Button type="primary" href="https://calendly.com/hello-desource-labs/30min">Schedule a call</Button>
    </div>
  </section>
</template>

<script setup lang="ts">
const video = ref<HTMLVideoElement | null>(null);

const handleTimeUpdate = () => {
  const blurDuration = 2; // Duration in seconds
  if (video.value) {
    const remainingTime = video.value.duration - video.value.currentTime;
    if (remainingTime < blurDuration) {
      video.value.style.opacity = "0.1";
      video.value.style.filter = `blur(100px)`;
    } else {
      video.value.style.opacity = "0.5";
      video.value.style.filter = `blur(0)`;
    }
  }
};
</script>

<style scoped>
.header {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header__background,
.header__shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.header__background {
  z-index: 0;
}
.header__background.video {
  opacity: 0.5;
  filter: blur(0);
  transition: opacity 2s ease, filter 8s ease;
}
.header__shadow {
  filter: blur(10px);
  z-index: 1;
}
.header__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--color-primary);
  gap: 2rem;
}
h3 {
  margin-bottom: 1rem;
}
p {
  margin-bottom: 1rem;
}
</style>
