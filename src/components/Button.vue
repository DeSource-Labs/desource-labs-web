<template>
  <component
    class="button"
    target="_blank"
    rel="nofollow noopener"
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
  type?: 'primary' | 'secondary';
  href?: string;
}>();
</script>

<style scoped>
.button {
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
  transition: background-color 0.3s;
  text-align: center;
  text-wrap-style: balance;
}

.button:hover {
  background-color: #F5F5F5;
}

.button.secondary {
  color: var(--color-primary);
  border: 1px solid #646464;
  background-color: #333333;
}

.button.secondary:hover {
  background-color: #646464;
}

.button__arrow {
  margin-left: 0.3rem;
  width: 1rem;
  height: 1rem;
}

.button:hover .button__arrow {
  animation: arrow-move 1s infinite;
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
