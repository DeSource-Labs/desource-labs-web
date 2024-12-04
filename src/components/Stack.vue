<template>
  <section class="stack">
    <div class="stack__content">
      <div class="title__container">
        <h4 class="title">Precision in Every Detail</h4>
        <p class="title__description">Expertise that powers your next big move.</p>
      </div>
      <hr />
      <div class="stack__container">
        <div class="stack__item">
          <h5 class="stack__title">Blockchain Ecosystems</h5>
          <p class="stack__description">
            Smart contracts, dApps, cross-chain integrations
          </p>
        </div>
        <div class="stack__item">
          <h5 class="stack__title">Back-End Architecture</h5>
          <p class="stack__description">
            High-performance systems built with Rust and Node.js
          </p>
        </div>
        <div class="stack__item">
          <h5 class="stack__title">Modern Interfaces</h5>
          <p class="stack__description">
            Intuitive, pixel-perfect designs, built with top-notch frontend
          </p>
        </div>
        <div class="stack__item">
          <h5 class="stack__title">Scalable Infrastructure</h5>
          <p class="stack__description">
            DevOps workflows that evolve with your business.
          </p>
        </div>
      </div>
    </div>
    <NuxtImg
      class="stack__img"
      src="/ds_pic2.png"
      alt="Stack"
      format="webp"
      loading="lazy"
    />
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.stack {
  background: var(--gradient-bg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}
.stack__content {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-left: 3rem;
}
.stack__img {
  flex: 2;
}
.title__description {
  color: var(--color-tertiary);
  font-size: 1.5rem;
  line-height: 2;
}
hr {
  border: none;
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, #FFFFFF 0%, rgba(153, 153, 153, 0) 100%);
}
.stack__container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.2em;
}
.stack__item {
  display: flex;
  gap: 1rem;
  align-items: baseline;
}
.stack__title,
.stack__description {
  flex: 1;
}
.stack__description {
  color: var(--color-secondary);
}
</style>
