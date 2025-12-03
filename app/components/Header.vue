<template>
  <section class="header">
    <SeamlessVideo
      class="header__background"
      :style="{ transform: `translateY(${parallaxY}px)` }"
      name="world-planet"
      :fade-window="2"
      :opacity="0.5"
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
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__background {
    z-index: 0;
    transition: transform 0.08s ease-out;
    will-change: transform;
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
