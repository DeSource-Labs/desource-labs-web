<template>
  <section class="tech">
    <h1>OUR TECH STACK</h1>
    <div class="tech__container">
      <div class="tech__direction">
        <p class="p3">Front-end</p>
        <div class="tech__items">
          <NuxtImg
            v-for="item in frontend"
            :key="item.src"
            :src="item.src"
            :alt="item.alt"
            :height="item.height"
            quality="75"
            format="webp"
            loading="lazy"
          />
        </div>
      </div>
      <hr />
      <div class="tech__direction">
        <p class="p3">Blockchain / Back-end</p>
        <div class="tech__items">
          <NuxtImg
            v-for="item in backend"
            :key="item.src"
            :src="item.src"
            :alt="item.alt"
            :height="item.height"
            quality="75"
            format="webp"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

type TechItem = {
  src: string;
  alt: string;
  height: string;
};

const frontend: TechItem[] = [
  { src: '/img/tech/typescript.png', alt: 'TypeScript', height: '65' },
  { src: '/img/tech/javascript.png', alt: 'JavaScript', height: '50' },
  { src: '/img/tech/vue.png', alt: 'Vue.js', height: '92' },
  { src: '/img/tech/nuxt.png', alt: 'Nuxt.js', height: '50' },
];
const backend = [
  { src: '/img/tech/rust.png', alt: 'Rust', height: '50' },
  { src: '/img/tech/nodejs.png', alt: 'Node.js', height: '60' },
  { src: '/img/tech/ton.png', alt: 'TON', height: '80' },
  { src: '/img/tech/tron.png', alt: 'Tron', height: '56' },
  { src: '/img/tech/polkadot.png', alt: 'Polkadot', height: '66' },
  { src: '/img/tech/ethereum.png', alt: 'Ethereum', height: '56' },
  { src: '/img/tech/sui.png', alt: 'SUI', height: '50' },
  { src: '/img/tech/solana.png', alt: 'Solana', height: '70' },
];
</script>

<style scoped>
.tech {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 10vw;
}
h1 {
  text-align: center;
}
hr {
  border: none;
  border-radius: 50px;
  height: 1px;
  width: 100%;
  background: var(--color-secondary);
}
.tech__container {
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
}
.tech__direction {
  margin: 2rem 0;
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
.tech__direction p {
  flex: 1;
}
.tech__items {
  flex: 2;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
}
@media (max-width: 768px) {
  .tech {
    padding: 5rem 5vw;
  }
  .tech__container {
    gap: 2rem;
  }
  .tech__direction {
    flex-direction: column;
    gap: 2rem;
  }
  .tech__direction p {
    color: var(--color-tertiary);
  }
  .tech__items {
    justify-content: center;
  }
  hr {
    display: none;
  }
}
</style>
