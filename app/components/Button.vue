<template>
  <component
    class="button"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'nofollow noopener' : undefined"
    :is="href ? 'a' : 'button'"
    :class="type"
    :href="href"
  >
    <slot />
    <div class="button__arrow">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </div>
  </component>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'primary' | 'secondary' | 'ghost' | 'link';
  href?: string;
}>();
</script>

<style scoped lang="scss">
.button {
  position: relative;
  height: 56px;
  width: 230px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  border: 1px solid var(--color-primary);
  border-radius: 100vw;
  color: var(--color-background);
  background-color: var(--color-primary);
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.005em;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  text-align: center;
  text-wrap-style: balance;

  &:hover {
    background-color: #F5F5F5;

    > .button__arrow {
      animation: arrow-move 1s infinite;
    }
  }

  &.secondary {
    color: var(--color-primary);
    border: 1px solid #646464;
    background-color: #333333;

    &:hover {
      background-color: #646464;
    }
  }

  &.ghost {
    color: var(--color-tertiary);
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: transparent;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);

    &:hover {
      color: var(--color-primary);
      border-color: rgba(255, 255, 255, 0.3);
      background-color: rgba(255, 255, 255, 0.04);
    }
  }

  &.link {
    height: auto;
    width: auto;
    padding: 0;
    border: none;
    background: none;
    color: var(--color-tertiary);
    font-weight: 400;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      right: 50%;
      height: 1px;
      background: currentColor;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
      color: var(--color-primary);

      &::after {
        left: 0;
        right: 0;
      }
    }
  }

  &__arrow {
    margin-left: 0.3rem;
    width: 1rem;
    height: 1rem;
  }
}

@keyframes arrow-move {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(0.3rem);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
