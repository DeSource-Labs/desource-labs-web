<script setup lang="ts">
const { error } = defineProps<{
  error: {
    url: string
    statusCode: number
    statusMessage: string
    message: string
    description: string
    data: any
  }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <main>
    <Header />
    <section class="content">
      <h1>Error {{ error.statusCode }}<br />
        <span>{{ error.statusMessage }}</span>
      </h1>
      <Button href="/" @click="handleError">
        Home
      </Button>
    </section>
    <Footer />
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
}

.content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
