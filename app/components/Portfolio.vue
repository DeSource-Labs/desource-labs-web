<template>
  <section class="portfolio">
    <h1>OUR WORK IN ACTION</h1>
    <Splide class="portfolio__slides" v-bind="splideConfig">
      <SplideSlide v-for="(item, index) in firstList" :key="item.id" class="portfolio__slide">
        <Card :product="item" :is-reversed="index % 2 !== 0" />
      </SplideSlide>
    </Splide>
    <Splide v-show="showSecond" class="portfolio__slides" v-bind="secondSplideConfig">
      <SplideSlide v-for="(item, index) in secondList" :key="item.id" class="portfolio__slide">
        <Card :product="item" :is-reversed="index % 2 !== 0" />
      </SplideSlide>
    </Splide>
  </section>
</template>

<script setup lang="ts">
import { SplideSlide, Splide, type SlideProps } from '@splidejs/vue-splide';
import { Intersection } from '@splidejs/splide-extension-intersection';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

const splideConfig: SlideProps = {
  extensions: { Intersection, AutoScroll },
  options: {
    intersection: {
      rootMargin: '0px',
      threshold: 0.5,
      outView: {
        autoScroll: false,
      },
      inView: {
        autoScroll: true,
      },
    },
    type: 'loop',
    drag: false,
    autoWidth: true,
    autoHeight: true,
    gap: '2rem',
    focus: 'center',
    pagination: false,
    arrows: false,
    trimSpace: false,
    lazyLoad: 'nearby',
    autoScroll: {
      pauseOnHover: false,
      pauseOnFocus: false,
      rewind: false,
      speed: 2,
    },
  },
};

const secondSplideConfig: SlideProps = {
  extensions: splideConfig.extensions,
  options: {
    ...splideConfig.options,
    autoScroll: {
      pauseOnHover: false,
      pauseOnFocus: false,
      rewind: false,
      speed: -2,
    },
  },
};

const firstList: Product[] = Projects;
const reversed = firstList.toReversed();
const secondList = reversed.slice(1).concat(reversed[0] as Product);

const showSecond = ref(true);

const checkMobile = () => {
  showSecond.value = window.innerWidth > 840;
};

onBeforeMount(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<style scoped lang="scss">
.portfolio {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 0;

  &__slide {
    padding: 1rem;
  }
}
h1 {
  text-align: center;
}
</style>
