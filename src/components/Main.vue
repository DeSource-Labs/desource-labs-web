<template>
  <section class="main">
    <NuxtImg
      class="main__img"
      src="/ds_pic1.png"
      alt="Main"
      format="webp"
      loading="lazy"
    />
    <div class="main__content">
      <h4 class="main__title">Innovation, Engineered for Scale</h4>
      <p class="main__description">
        We partner with forward-thinking companies to craft custom technology that drives growth and redefines possibilities.
      </p>
      <p class="main__description">
        Our team
        <strong>merges deep technical expertise with design precision</strong>,
        delivering systems that inspire. From blockchain ecosystems to enterprise-grade infrastructure, every line of code, every pixel, and every strategy is built with purpose.
      </p>
      <Button type="secondary">Schedule a call</Button>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}
.main__img {
  flex: 2;
}
.main__content {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-right: 3rem;
  font-size: 1.5rem;
}
.main__description {
  color: var(--color-secondary);
}
.main__description > strong {
  color: var(--color-primary);
}
</style>
