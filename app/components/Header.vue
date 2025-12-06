<template>
  <section class="header">
    <SeamlessVideo
      class="header__background"
      :style="{ transform: `translateY(${parallaxY}px)` }"
      name="world-planet"
      :fade-window="2"
      :opacity="0.5"
      :is-visible="isVisible"
    />
    <NuxtImg
      src="/img/ds_bg_shadow.png"
      alt="DeSource Labs Shadow"
      class="header__shadow image"
      quality="75"
      sizes="100vw md:1100px"
      format="webp"
      loading="eager"
      fetchpriority="high"
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
const rafId = ref<number | null>(null);

const updateParallax = () => {
  const newParallaxY = window.scrollY * 0.5;
  if (newParallaxY !== parallaxY.value && newParallaxY <= 180) {
    parallaxY.value = newParallaxY;
  } else if (configStore.isReversedScroll) {
    parallaxY.value = 180;
  }
};

const handleScroll = () => {
  rafId.value = requestAnimationFrame(updateParallax);
};

const onVisible = () => {
  if (isNativeMobile.value || prefersReducedMotion.value) return;
  window.addEventListener('scroll', handleScroll, { passive: true });
};

const onHidden = () => {
  window.removeEventListener('scroll', handleScroll);
  parallaxY.value = 0;
  if (rafId.value) {
    cancelAnimationFrame(rafId.value);
    rafId.value = null;
  }
};

const { isVisible, configStore } = useSection('hero', {
  onVisible,
  onHidden,
});
const { isNativeMobile, prefersReducedMotion } = storeToRefs(configStore);
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
@media (max-height: 600px) {
  // Adjust for short viewports, e.g., landscape mobile
  .header {
    &__content {
      padding: 2rem;
      gap: 1rem;
    }
    &__background {
      height: 120%;
      object-position: center calc(var(--vh, 1svh) * -10);
    }
    h1 {
      font-size: 2.5rem;
    }
    .p1 {
      font-size: 1rem;
    }
  }
}
</style>
