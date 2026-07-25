<template>
  <component
    :is="props.tag"
    class="observer"
    :class="{ 'observer--eager': eager }"
    v-viewport
  >
    <template v-for="word, i in words">
      <br v-if="isBr(word)" />
      <component
        v-else
        :is="inBoldRanges(i) ? 'strong' : 'span'"
        class="word"
        :style="`--delay: ${INITIAL_DELAY + i * DELAY_POWER}s`"
      >
        {{ word }}
      </component>{{ ' ' }}
    </template>
  </component>
</template>

<script lang="ts" setup>
const INITIAL_DELAY = 0.15;
const DELAY_POWER = 0.01;

const props = withDefaults(
  defineProps<{ text: string, tag?: string, bold?: [number, number][], eager?: boolean }>(),
  { tag: 'p', eager: false }
);

const words = computed(() => props.text.split(' '));

const inBoldRanges = (index: number) => {
  if (!props.bold) return false;
  return props.bold.some(([start, end]) => index >= start && index <= end);
};

const isBr = (word: string) => {
  return word.includes('<br/>');
};
</script>

<style scoped>
.word {
  position: relative;
  opacity: 0;
  transform-origin: 0 0;
}

strong {
  color: var(--color-primary);
}

.entered .word {
  opacity: 1;
  transition: opacity 0.6s var(--delay) ease;
}

.observer--eager .word {
  animation: word-reveal 0.6s var(--delay) ease both;
}

@keyframes word-reveal {
  from {
    opacity: 0.01;
  }

  to {
    opacity: 1;
  }
}
</style>
