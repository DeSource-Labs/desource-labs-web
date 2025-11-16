<template>
  <div
    class="product"
    :class="[{ 'product--reversed': isReversed }, product.shadowColor]"
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
  /* Liquid-glass surface */
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px) saturate(140%);
  -webkit-backdrop-filter: blur(10px) saturate(140%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06), /* rim light */
    0 12px 30px rgba(0, 0, 0, 0.6),          /* depth */
    0 0 40px rgba(255, 255, 255, 0.05);      /* ambient on dark bg */
  transition: transform 0.18s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  isolation: isolate;
  --glow: rgba(255, 255, 255, 0.22);
  &.orange { --glow: rgba(255, 165, 0, 0.26); }
  &.lime { --glow: rgba(50, 205, 50, 0.22); }
  &.pink { --glow: rgba(255, 20, 147, 0.18); }
  &.darkblue { --glow: rgba(0, 0, 139, 0.30); }
  &.purple { --glow: rgba(128, 0, 128, 0.24); }
  &.white { --glow: rgba(255, 255, 255, 0.24); }

  &::before {
    /* top sheen */
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: 24%;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    background: linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0));
    pointer-events: none;
    opacity: 0.6;
  }
  &::after {
    /* centered ring */
    content: '';
    position: absolute;
    inset: -10% -12% -12% -12%;
    border-radius: inherit;
    background:
      radial-gradient(76% 70% at 50% 50%, var(--glow), rgba(0,0,0,0) 60%);
    filter: blur(26px);
    opacity: 0.55;
    pointer-events: none;
    z-index: -1;
  }

  // &:hover {
  //   transform: translateY(-2px);
  //   box-shadow:
  //     inset 0 1px 0 rgba(255, 255, 255, 0.08),
  //     0 16px 42px rgba(0, 0, 0, 0.7),
  //     0 0 56px rgba(255, 255, 255, 0.06);
  //   border-color: rgba(255, 255, 255, 0.12);
  // }

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
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 6px 10px;
    border-radius: 0.9rem;
    backdrop-filter: blur(4px);
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
