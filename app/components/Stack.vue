<template>
  <section class="stack">
    <div class="title__container">
      <p class="title h4">Precision in Every Detail</p>
      <p class="title__description p1">Expertise that powers your next big move.</p>
      <hr />
    </div>
    <div class="stack__container" :class="{ 'stack__container--visible': itemsVisible }">
      <div class="stack__item">
        <span class="stack__title p2">AI-based Solutions</span>
        <p class="stack__description secondary p3">
          MCP development, AI integrations, custom solutions
        </p>
      </div>
      <div class="stack__item">
        <span class="stack__title p2">Blockchain Ecosystems</span>
        <p class="stack__description secondary p3">
          Smart contracts, dApps, DEXes, cross-chain integrations
        </p>
      </div>
      <div class="stack__item">
        <span class="stack__title p2">Back-End Architecture</span>
        <p class="stack__description secondary p3">
          High-performance systems built with Rust and Node.js
        </p>
      </div>
      <div class="stack__item">
        <span class="stack__title p2">Modern Interfaces</span>
        <p class="stack__description secondary p3">
          Intuitive, pixel-perfect designs, built with top-notch frontend
        </p>
      </div>
      <div class="stack__item">
        <span class="stack__title p2">Scalable Infrastructure</span>
        <p class="stack__description secondary p3">
          DevOps workflows that evolve with your business.
        </p>
      </div>
    </div>
    <SeamlessVideo class="stack__visual" name="chips" :is-visible="isVisible" />
  </section>
</template>

<script setup lang="ts">
let observer: IntersectionObserver | null = null; // To observe stack items visibility

const itemsVisible = ref(false);

const onVisible = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          itemsVisible.value = true;
        } else {
          itemsVisible.value = false;
        }
      });
    },
    { threshold: 0.3 }
  );

  const container = document.querySelector('.stack__container');
  if (container) observer.observe(container);
};

const onHidden = () => {
  observer?.disconnect();
  itemsVisible.value = false;
};

const { isVisible } = useSection('stack', {
  onVisible,
  onHidden,
});
</script>

<style scoped lang="scss">
.stack {
  display: grid;
  grid-template-areas: 
    "title visual"
    "stack visual";
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  align-items: center;
  background: var(--gradient-bg);
  padding: 5rem 10vw;
  padding-right: 0; /* Remove padding on the right because of the video size */
}
.title__container {
  grid-area: title;
  margin-bottom: 20px;
}
.title__description {
  color: var(--color-tertiary);
  line-height: 2;
}
hr {
  border: none;
  border-radius: 50px;
  margin-top: 2rem;
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, #FFFFFF 0%, rgba(153, 153, 153, 0) 50%);
  background-size: 200% 100%;
  background-position-x: 0%;
  will-change: background-position;
  animation: hrAmimationBg 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
.stack__container {
  grid-area: stack;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.stack__item {
  display: flex;
  gap: 1rem;
  align-items: baseline;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  &:nth-child(1) { transition-delay: 0.1s; }
  &:nth-child(2) { transition-delay: 0.2s; }
  &:nth-child(3) { transition-delay: 0.3s; }
  &:nth-child(4) { transition-delay: 0.4s; }
  &:nth-child(5) { transition-delay: 0.5s; }
}
.stack__container--visible .stack__item {
  opacity: 1;
  transform: translateX(0);
}
.stack__title,
.stack__description {
  flex: 1;
}
span {
  margin-block: 0.6rem;
}
.stack__visual {
  grid-area: visual;
  position: relative;
  width: 100%;
  height: 30vw;
  object-fit: cover;
  object-position: right bottom;
}
@media (max-width: 1024px) {
  .stack {
    grid-template-columns: 2fr 1fr;
    padding: 5rem 6vw;
    padding-right: 2vw;
  }
  .stack__visual {
    height: 40vw;
    object-position: center;
  }
}
@media (max-width: 768px) {
  .stack {
    display: flex;
    flex-direction: column;
    padding: 5rem 6vw;
    background: linear-gradient(180deg, rgba(217, 217, 217, 0.12) 0%, rgba(115, 115, 115, 0) 10%); /* To avoid video background */
  }
  .stack__container {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .stack__item {
    flex-direction: column;
    gap: 2px;
  }
  .stack__visual {
    order: 2;
    height: 60vw;
  }
  .title__container {
    order: 1;
    margin-bottom: 0;
  }
  hr {
    display: none;
  }
  .stack__container {
    order: 3;
  }
}
@media (max-width: 640px) {
  .stack__visual {
    height: 90vw;
  }
}
@media (max-width: 320px) {
  .stack__visual {
    height: 100vw;
  }
}
@keyframes hrAmimationBg {
  0%, 100% {
    background-position-x: 0%;
  }
  50% {
    background-position-x: 100%;
  }
}
</style>
