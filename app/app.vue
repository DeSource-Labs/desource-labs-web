<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <Header id="hero" />
  <Navigation />
  <main id="main-content" tabindex="-1">
    <NuxtPage />
  </main>
  <Footer />
</template>

<script setup lang="ts">
import { useConfigStore } from '~/store/config';

const configStore = useConfigStore();

onBeforeMount(async () => {
  await configStore.init();
});

onBeforeUnmount(() => {
  configStore.destroy();
});
</script>

<style scoped>
.skip-link {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 2000;
  padding: 0.75rem 1rem;
  border-radius: 100vw;
  color: var(--color-background);
  background: var(--color-primary);
  transform: translateY(-200%);
  transition: transform 0.2s ease;
}

.skip-link:focus {
  transform: translateY(0);
}
</style>
