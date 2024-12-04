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
const { type, href } = defineProps<{ type?: 'primary' | 'secondary'; href?: string }>();
</script>

<style scoped>
.button {
  height: 3rem;
  width: 11rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid #FFFFFF;
  border-radius: 100vw;
  color: #000000;
  background-color: #FFFFFF;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.005em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #F5F5F5;
}

.button.secondary {
  color: #FFFFFF;
  border: 1px solid #646464;
  background-color: #333333;
}

.button.secondary:hover {
  background-color: #646464;
}

.button__arrow {
  margin-left: 0.2rem;
  width: 1rem;
  height: 1rem;
}

.button:hover .button__arrow {
  animation: bounce 0.3s ease-in-out;
}

@keyframes bounce {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(0.25rem);
  }
}
</style>
