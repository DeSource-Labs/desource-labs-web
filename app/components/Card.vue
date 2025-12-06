<template>
  <div
    class="product"
    :class="[{ 'product--reversed': isReversed, 'product--mobile': isMobile && ready }, product.shadowColor]"
  >
    <div class="product__info">
      <NuxtImg
        class="product__logo"
        format="webp"
        quality="80"
        loading="lazy"
        :src="logo"
        :alt="product.title + ' logo'"
        :height="product.logoHeight"
      />
      <div class="product__content">
        <p class="product__title">{{ product.title }}</p>
        <p class="product__desc">{{ product.desc }}</p>
        <span v-if="product.impact" class="product__impact">{{ product.impact }}</span>
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
      <div class="product__footer">
        <a
          v-if="product.url"
          :href="product.url"
          tabindex="-1"
          target="_blank"
          rel="noopener noreferrer"
          class="product__link"
        >
          Preview →
        </a>
        <span v-else-if="product.client" class="product__client">
          Delivered to {{ product.client }}
        </span>
      </div>
    </div>
    <div class="product__image">
      <NuxtImg
        width="340"
        format="webp"
        quality="90"
        loading="lazy"
        :src="image"
        :alt="product.title"
      />
      <div v-if="product.status" class="product__status">
        <span class="status-badge" :class="`status-badge--${product.status}`">
          {{ statusLabel }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '#imports';

const props = withDefaults(
  defineProps<{
  product: Product;
  isReversed?: boolean;
  isMobile?: boolean;
  }>()
  , {
    isReversed: false,
    isMobile: false,
  }
);

const ready = ref(false);
const logo = computed(() => `/img/products/${props.product.logoId ?? props.product.id}-logo.png`);
const image = computed(() => `/img/products/${props.product.id}.png`);
const statusLabel = computed(() => {
  switch (props.product.status) {
    case 'live':
      return 'Live';
    case 'delivered':
      return 'Delivered';
    default:
      return '';
  }
});

onMounted(() => {
  ready.value = true;
});
</script>

<style scoped lang="scss">
.product {
  position: relative;
  height: 370px;
  width: 800px;
  margin: 0 1rem;
  display: flex;
  align-items: stretch;
  gap: 0;
  border-radius: 1rem;
  /* Liquid-glass surface */
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px) saturate(140%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06), /* rim light */
    0 12px 30px rgba(0, 0, 0, 0.6),          /* depth */
    0 0 40px rgba(255, 255, 255, 0.05);      /* ambient on dark bg */
  contain: layout style paint;
  transition: transform 0.18s ease, box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  --glow: rgba(255, 255, 255, 0.22);
  &.orange {
    --glow: rgba(255, 165, 0, 0.26);
    .status-badge--live {
      color: rgb(34, 197, 94);
      &::before {
        background: rgb(34, 197, 94);
      }
    }
  }
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
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    z-index: -1;
  }

  &:hover {
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 16px 42px rgba(0, 0, 0, 0.7),
      0 0 56px rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.12);

    &::after {
      opacity: 0.65;
    }
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

  &--mobile {
    backdrop-filter: blur(12px);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 12px 30px rgba(0, 0, 0, 0.6),
      0 0 40px rgba(255, 255, 255, 0.05);
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

  &__logo {
    max-width: 160px;
    max-height: 40px;
  }

  &__title {
    font-weight: 500;
    font-size: 1.2rem;
  }

  &__desc {
    font-size: 0.95rem;
    font-weight: 400;
    color: var(--color-secondary);
  }

  &__impact {
    display: inline-flex;
    padding: 0.25rem 0.625rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 0.5rem;
    font-size: 0.8rem;
    color: var(--color-primary);
    font-weight: 500;
  }

  &__tags {
    display: flex;
    gap: 6px;
    flex-flow: wrap;
    font-size: 0.8rem;
  }

  &__tag {
    color: var(--color-primary);
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 4px 10px;
    border-radius: 0.75rem;
    backdrop-filter: blur(4px);
  }

  &__footer {
    width: 100%;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--color-tertiary);
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 100%;
      height: 1px;
      background: currentColor;
      transition: right 0.3s ease;
    }

    &:hover {
      color: var(--color-primary);

      &::after {
        right: 0;
      }
    }
  }

  &__client {
    font-size: 0.9rem;
    color: var(--color-tertiary);
    font-style: italic;
  }

  &__image {
    position: relative;
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

  &__status {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 2;
  }
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  &--live {
    background: rgba(34, 197, 94, 0.15);
    border: 1px solid rgba(34, 197, 94, 0.3);
    color: rgb(134, 239, 172);

    &::before {
      background: rgb(34, 197, 94);
      box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
    }
  }

  &--delivered {
    background: rgba(59, 130, 246, 0.15);
    border: 1px solid rgba(59, 130, 246, 0.3);
    color: rgb(147, 197, 253);

    &::before {
      background: rgb(59, 130, 246);
    }
  }
}

@media (max-width: 840px) {
  .product {
    height: 500px;
    width: 300px;
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

    &__info {
      padding: 1rem;
      gap: 0.5rem;
    }

    &__content {
      gap: 0.5rem;
    }

    &__title {
      font-size: 1rem;
    }

    &__desc {
      font-size: 0.9rem;
    }
  }
}

@media (max-width: 640px) {
  .product__logo {
    max-height: 32px;
  }
}

@media (max-width: 380px) {
  .product {
    width: 90vw;
  }
}

// Landscape mobile
@media (max-height: 600px) {
  .product {
    height: 250px;
    width: 90vw;
    flex-direction: row;

    & &__image {
      > img {
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
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

    &__logo {
      display: none;
    }
  }
}
</style>
