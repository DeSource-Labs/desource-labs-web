<template>
  <section class="header">
    <NuxtImg
      src="/ds_bg.png"
      alt="DeSource Labs Background"
      class="header__background image"
      quality="75"
      sizes="100vw md:1100px"
      format="webp"
      preload
    />
    <NuxtImg
      src="/ds_bg_shadow.png"
      alt="DeSource Labs Shadow"
      class="header__shadow image"
      quality="75"
      sizes="100vw md:1100px"
      format="webp"
      loading="lazy"
    />
    <div class="header__content">
      <h3>DESOURCE LABS</h3>
      <h1>ENGINEERING BEYOND LIMITS.</h1>
      <p class="secondary">Precision-built solutions tailored to your vision.</p>
      <Button type="primary">Schedule a call</Button>
    </div>
  </section>
</template>

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
  object-position: calc(50% + 2rem) 0; /* TODO: fix image itself */
  animation: pulse 5s ease-in-out infinite;
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
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.02);
  }
}
</style>
