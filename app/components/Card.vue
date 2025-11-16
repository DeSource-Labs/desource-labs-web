<template>
  <div
    class="product"
    :class="[{ 'product--reversed': isReversed }, product.shadowColor ? `product--shadow-${product.shadowColor}` : '']"
  >
    <div class="product__info">
      <LazyNuxtImg
        class="product__logo"
        format="webp"
        quality="80"
        :src="logo"
        :alt="product.title + ' logo'"
        :height="product.logoHeight"
      />
      <div class="product__content">
        <p class="product__title">{{ product.title }}</p>
        <p class="product__desc">{{ product.desc }}</p>
        <div class="product__tags">
          <span
            v-for="(tag, index) in product.tags"
            :key="index"
            class="product__tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    <div class="product__image">
      <LazyNuxtImg
        :src="image"
        :alt="product.title"
        width="340"
        format="webp"
        quality="90"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '#imports';

const props = withDefaults(
  defineProps<{
  product: Product;
  isReversed?: boolean;
  }>()
  , {
    isReversed: false,
  }
);

const logo = computed(() => `/img/products/${props.product.logoId ?? props.product.id}-logo.png`);
const image = computed(() => `/img/products/${props.product.id}.png`);
</script>

<style scoped lang="scss">
.product {
  position: relative;
  height: 300px;
  width: 800px;
  display: flex;
  align-items: stretch;
  gap: 1rem;
  border-radius: 1rem;
  background: linear-gradient(180deg, rgba(34, 34, 34, 0.6) 0%, rgba(26, 26, 26, 0.6) 100%);

  box-shadow:
    0 0 0.5rem rgba(0, 255, 255, 0.2),
    0 0 1rem rgba(0, 255, 255, 0.2),
    0 0 2rem rgba(0, 255, 255, 0.2);

  &--shadow-orange {
    box-shadow:
      0 0 0.5rem rgba(255, 165, 0, 0.3),
      0 0 1rem rgba(255, 165, 0, 0.3),
      0 0 2rem rgba(255, 165, 0, 0.3);
  }

  &--shadow-lime {
    box-shadow:
      0 0 0.5rem rgba(50, 205, 50, 0.2),
      0 0 1rem rgba(50, 205, 50, 0.2),
      0 0 2rem rgba(50, 205, 50, 0.2);
  }

  &--shadow-pink {
    box-shadow:
      0 0 0.5rem rgba(255, 20, 147, 0.1),
      0 0 1rem rgba(255, 20, 147, 0.1),
      0 0 2rem rgba(255, 20, 147, 0.1);
  }

  &--shadow-darkblue {
    box-shadow:
      0 0 0.5rem rgba(0, 0, 139, 0.4),
      0 0 1rem rgba(0, 0, 139, 0.4),
      0 0 2rem rgba(0, 0, 139, 0.4);
  }

  &--shadow-purple {
    box-shadow:
      0 0 0.5rem rgba(128, 0, 128, 0.3),
      0 0 1rem rgba(128, 0, 128, 0.3),
      0 0 2rem rgba(128, 0, 128, 0.3);
  }

  &--shadow-white {
    box-shadow:
      0 0 0.5rem rgba(255, 255, 255, 0.2),
      0 0 1rem rgba(255, 255, 255, 0.2),
      0 0 2rem rgba(255, 255, 255, 0.2);
  }

  &--reversed {
    flex-direction: row-reverse;
    .product__image {
      > img {
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
  }

  &__info {
    flex: 1;
    padding: 1.4rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }

  &__title {
    font-weight: 500;
    font-size: 1.2rem;
  }

  &__desc {
    font-weight: 400;
    color: var(--color-secondary);
  }

  &__tags {
    display: flex;
    gap: 6px;
    flex-flow: wrap;
    font-size: 0.9rem;
  }

  &__tag {
    color: var(--color-primary);
    background: rgba(51, 51, 51, 0.6);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 5px 10px;
    border-radius: 0.9rem;
  }

  &__image {
    flex: 2;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    > img {
      object-fit: fill;
      width: 100%;
      height: 100%;
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
@media (max-width: 840px) {
  .product {
    height: 500px;
    width: 300px;
    gap: 0;
    flex-direction: column-reverse;

    &--reversed {
      flex-direction: column-reverse;
    }

    & &__image {
      flex: 1;
      > img {
        border-top-right-radius: 1rem;
        border-top-left-radius: 1rem;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
}
@media (max-width: 380px) {
  .product {
    width: 90vw;
  }
}
</style>
