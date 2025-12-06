<template>
  <section class="portfolio">
    <div class="portfolio__header">
      <h1>OUR WORK IN ACTION</h1>
      <p class="portfolio__hint p4">Selected builds, deployed and trusted</p>
    </div>

    <div class="portfolio__slider">
      <VueFlicking
        ref="flicking"
        viewportTag="div"
        cameraTag="div"
        tabindex="-1"
        :options="options"
        :plugins="plugins"
        @will-change="onSlideChange"
      >
        <Card
          v-for="(project, index) in Projects"
          :key="`portfolio-card-${project.id}`"
          :product="project"
          :is-reversed="index % 2 !== 0"
          :is-mobile="isNativeMobile"
        />
      </VueFlicking>

      <div class="portfolio__nav" role="presentation">
        <button
          v-for="(project, index) in Projects"
          :key="`nav-${project.id}`"
          class="portfolio__nav-dot"
          :class="{ 'is-active': index === activeIndex }"
          :aria-label="`View ${project.title}`"
          tabindex="-1"
          @click="goToSlide(index)"
        />
      </div>

      <div class="portfolio__pagination">
        <div class="portfolio__counter">
          {{ activeIndex + 1 }} / {{ totalCards }}
        </div>
        <span class="portfolio__controls-hint">Drag to rotate • Click dots to jump • Arrow keys to navigate</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import VueFlicking, { type FlickingOptions, type WillChangeEvent } from '@egjs/vue3-flicking';
import { Perspective, AutoPlay } from '@egjs/flicking-plugins';
import type Flicking from '@egjs/flicking';

const totalCards = Projects.length;

const perspectivePlugin = new Perspective({ perspective: 2000, rotate: 0.5 });
const autoPlayPlugin = new AutoPlay({
  duration: 4000,
  stopOnHover: true,
  direction: 'NEXT',
  animationDuration: 1000
});

const options: Partial<FlickingOptions> = {
  circular: true,
  moveType: 'snap',
  preventClickOnDrag: true,
  easing: (x: number) => 1 - Math.pow(1 - x, 3),
};

const flicking = useTemplateRef<Flicking>('flicking');

const activeIndex = ref(0);

const plugins = computed(() => {
  return isNativeMobile.value
    ? [autoPlayPlugin]
    : [autoPlayPlugin, perspectivePlugin];
});

const onSlideChange = (e: WillChangeEvent<Flicking>) => {
  activeIndex.value = e.index;
};

const goToSlide = (index: number) => {
  if (activeIndex.value === index) return;
  flicking.value?.moveTo(index);
};

const handleKeyboard = async (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight') {
    await flicking.value?.next();
  } else if (e.key === 'ArrowLeft') {
    await flicking.value?.prev();
  }
};

const onVisible = () => {
  window.addEventListener('keydown', handleKeyboard);
  flicking.value?.activePlugins.find(plugin => plugin instanceof AutoPlay)?.play();
};

const onHidden = () => {
  window.removeEventListener('keydown', handleKeyboard);
  flicking.value?.activePlugins.find(plugin => plugin instanceof AutoPlay)?.stop();
};

const { configStore } = useSection('portfolio', {
  onVisible,
  onHidden,
});
const { isNativeMobile } = storeToRefs(configStore);
</script>

<style scoped lang="scss">
.portfolio {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--gradient-bg);
  padding: 3rem 0;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  h1 {
    text-align: center;
  }

  &__hint {
    color: var(--color-tertiary);
    font-style: italic;
  }

  &__slider {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__nav {
    align-self: center;
    display: flex;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  &__nav-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;

    &:hover {
      background: rgba(255, 255, 255, 0.6);
      transform: scale(1.3);
    }

    &.is-active {
      background: linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(167, 139, 250, 0.9));
      transform: scale(1.4);
      box-shadow: 0 0 12px rgba(147, 51, 234, 0.6);
    }
  }

  &__pagination {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  &__counter {
    font-size: 1rem;
    color: var(--color-tertiary);
    font-weight: 600;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  &__controls-hint {
    text-align: center;
    font-size: 0.8rem;
    color: var(--color-tertiary);
    opacity: 0.5;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    text-wrap-style: balance;
  }
}

@media (max-width: 1024px) {
  .portfolio {
    padding: 2rem 0;

    &__header {
      margin-bottom: 1.5rem;
    }
  }
}

@media (max-width: 768px) {
  .portfolio {
    min-height: auto;
    padding: 2rem 0;

    &__header {
      margin-bottom: 1rem;
      text-wrap-style: balance;
    }

    &__nav {
      padding: 0.5rem 1rem;
      gap: 0.4rem;
    }

    &__nav-dot {
      width: 6px;
      height: 6px;
    }

    &__controls-hint {
      font-size: 0.75rem;
    }
  }
}
</style>
