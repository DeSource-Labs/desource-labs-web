<template>
  <section class="main">
    <SeamlessVideo class="main__visual" name="cubic" />
    <p class="main__title h4">Innovation, Engineered for Scale</p>
    <p class="main__desc1 description p1">
      We partner with forward-thinking companies to craft custom technology that drives growth and redefines possibilities.
    </p>
    <p class="main__desc2 description p1">
      Our team
      <strong>merges deep technical expertise with design precision</strong>,
      delivering systems that inspire. From blockchain ecosystems to enterprise-grade infrastructure, every line of code, every pixel, and every strategy is built with purpose — and proven in production.
    </p>
    <p class="main__trust description p1">
      Trusted by innovative teams building the future of Web3, AI, and decentralized infrastructure.
    </p>
    <div class="main__actions">
      <Button type="secondary" href="https://calendly.com/hello-desource-labs/30min">
        Schedule a call
      </Button>
      <Button type="link" @click="scrollToPortfolio">
        View our work
      </Button>
    </div>
    <div class="main__metrics">
      <div class="metric">
        <span class="metric__number">{{ Math.floor(projectCount) }}+</span>
        <span class="metric__label">Projects</span>
      </div>
      <div class="metric__divider"></div>
      <div class="metric">
        <span class="metric__number">{{ Math.floor(blockchainCount) }}+</span>
        <span class="metric__label">Blockchain Networks</span>
      </div>
      <div class="metric__divider"></div>
      <div class="metric">
        <span class="metric__number">{{ Math.floor(yearCount) }}+</span>
        <span class="metric__label">Years</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
let observer: IntersectionObserver | null = null; // To observe metrics visibility

const projectCount = ref(0);
const blockchainCount = ref(0);
const yearCount = ref(0);

const scrollToPortfolio = () => {
  const element = document.getElementById('portfolio');
  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  }
};

const animateCounter = (target: Ref<number>, end: number, duration: number) => {
  const increment = end / (duration / 16);
  const timer = setInterval(() => {
    target.value += increment;
    if (target.value >= end) {
      target.value = end;
      clearInterval(timer);
    }
  }, 16);
};

onMounted(async () => {
  await nextTick();
  const metricsEl = document.querySelector('.main__metrics');
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(projectCount, 50, 1500);
        animateCounter(blockchainCount, 10, 1200);
        animateCounter(yearCount, 5, 900);
      } else {
        projectCount.value = 0;
        blockchainCount.value = 0;
        yearCount.value = 0;
      }
    });
  }, { threshold: 0.5 });
  if (metricsEl) observer.observe(metricsEl);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<style scoped lang="scss">
.main {
  display: grid;
  grid-template-areas:
    "visual title"
    "visual desc1"
    "visual desc2"
    "visual trust"
    "visual actions"
    "visual metrics";
  grid-template-columns: 1fr 2fr;
  gap: 2px;
  align-items: center;
  padding: 4rem 6vw;

  &__visual {
    grid-area: visual;
    position: relative;
    width: 100%;
    min-height: 30svh;
    object-fit: contain;
    object-position: center 90px; // footer with metrics
    height: 100%;
  }

  &__title {
    grid-area: title;
  }

  &__desc1 {
    grid-area: desc1;
  }

  &__desc2 {
    grid-area: desc2;
  }

  &__trust {
    grid-area: trust;
    font-style: italic;
  }

  &__actions {
    grid-area: actions;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-top: 1rem;
  }

  &__metrics {
    grid-area: metrics;
    display: flex;
    gap: 2rem;
    margin-top: 1rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  &__number {
    font-size: 1.5rem;
    font-weight: 300;
    color: var(--color-primary);
    letter-spacing: 0.05em;
  }

  &__label {
    font-size: 0.7rem;
    color: var(--color-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  &__divider {
    width: 1px;
    height: 40px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }
}

.description {
  line-height: 1.5;
  color: var(--color-secondary);

  > strong {
    color: var(--color-primary);
  }
}
@media (max-width: 1024px) {
  .main {
    padding: 3rem 2rem;
  }
}
@media (max-width: 768px) {
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem 10vw;

    &__visual {
      order: 3;
      max-width: 60vw;
      min-height: 60vw;
      object-position: unset;
    }

    &__title {
      order: 1;
      text-align: center;
    }

    &__desc1 {
      order: 2;
      text-align: center;
    }

    &__desc2 {
      order: 4;
      text-align: center;
    }

    &__trust {
      order: 5;
      text-align: center;
    }

    &__actions {
      order: 6;
      align-self: center;
      flex-direction: column-reverse;
    }

    &__metrics {
      order: 7;
      margin-top: 2rem;
      padding-top: 1.5rem;
    }
  }

  .metric {
    &__number {
      font-size: 1.25rem;
    }

    &__label {
      font-size: 0.65rem;
    }

    &__divider {
      height: 35px;
    }
  }
}
@media (max-width: 640px) {
  .main {
    &__visual {
      max-width: 80vw;
      min-height: 80vw;
    }

    &__metrics {
      gap: 1.25rem;
    }
  }

  .metric {
    &__number {
      font-size: 1.1rem;
    }

    &__label {
      font-size: 0.6rem;
    }

    &__divider {
      height: 30px;
    }
  }
}
@media (max-width: 320px) {
  .main {
    padding: 2rem 1.4rem;

    &__metrics {
      gap: 1rem;
      margin-top: 1rem;
      padding-top: 1rem;
    }
  }

  .metric {
    align-items: center;
    text-align: center;
  }
}
</style>
