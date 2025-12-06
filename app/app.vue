<template>
  <Header id="hero" />
  <Navigation />
  <NuxtPage />
  <Footer />
</template>

<script setup lang="ts">
import { useConfigStore } from '~/store/config';

const configStore = useConfigStore();

onBeforeMount(() => {
  configStore.init();
});

onBeforeUnmount(() => {
  configStore.destroy();
});
</script>
