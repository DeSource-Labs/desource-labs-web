<template>
  <section class="header">
    <Video
      class="header__background"
      :style="{ '--parallax-y': parallaxY }"
      name="world-planet"
      @timeupdate="handleTimeUpdate"
    />
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
const blurDuration = 2; // Duration in seconds

const handleTimeUpdate = (event: VideoEvent) => {
  const video = event.target;
  if (video) {
    const remainingTime = video.duration - video.currentTime;
    if (remainingTime < blurDuration) {
      video.style.opacity = '0.1';
      video.style.filter = `blur(100px)`;
    } else {
      video.style.opacity = '0.5';
      video.style.filter = `blur(0)`;
    }
  }
};

const parallaxY = ref(0);

const handleScroll = () => {
  const newParallaxY = window.scrollY * 0.5;
  if (newParallaxY !== parallaxY.value && newParallaxY <= 180) {
    parallaxY.value = newParallaxY;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
.header {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &__background,
  &__shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__background {
    z-index: 0;
    opacity: 0.5;
    filter: blur(0);
    transition: opacity 2s ease, filter 8s ease, transform 0.1s ease;
    transform: translateY(calc(var(--parallax-y) * 1px));
  }

  &__shadow {
    filter: blur(10px);
    z-index: 1;
  }

  &__content {
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
}
h3 {
  margin-bottom: 1rem;
}
p {
  margin-bottom: 1rem;
}
</style>
