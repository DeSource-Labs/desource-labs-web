<template>
  <section class="contact">
    <NuxtImg
      src="/img/ds_bg_bottom.png"
      alt="Contact Background"
      class="contact__background image"
      quality="75"
      sizes="100vw md:1100px"
      format="webp"
      loading="lazy"
    />
    <NuxtImg
      src="/img/ds_bg_bottom_shadow.png"
      alt="Contact Shadow"
      class="contact__shadow image"
      quality="75"
      sizes="100vw md:1100px"
      format="webp"
      loading="lazy"
    />
    <div class="contact__content">
      <h1>LET’S BUILD SOMETHING EXCEPTIONAL</h1>
      <p class="secondary p1">
        Your vision deserves more than off-the-shelf solutions.
        <br />
        Let’s create technology that transforms your business.
      </p>
      <Button type="primary" href="https://calendly.com/hello-desource-labs/30min">Schedule a call</Button>
      <p class="contact__meta p4" aria-label="response time">Under 24h response • NDA on request</p>
      <button class="contact__peek p3" @click="toggleCalendar" :aria-expanded="showCalendar">
        <span v-if="!showCalendar">Preview calendar</span>
        <span v-else>Hide calendar</span>
      </button>
      <ClientOnly>
        <div v-show="showCalendar" class="contact__calendar">
          <div class="calendly-inline-widget" data-url="https://calendly.com/hello-desource-labs/30min" style="min-width:320px;height:520px;"></div>
        </div>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
const showCalendar = ref(false);

const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value;
  if (showCalendar.value && typeof window !== 'undefined') {
    const existing = document.querySelector('script[data-calendly]');
    if (!existing) {
      const s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.async = true;
      s.setAttribute('data-calendly', 'true');
      document.body.appendChild(s);
    }
  }
};
</script>

<style scoped>
.contact {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.contact__background,
.contact__shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.contact__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--color-primary);
  gap: 2rem;
}

.contact__meta {
  color: var(--color-tertiary);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.8;
}

.contact__peek {
  appearance: none;
  background: transparent;
  border: none;
  color: var(--color-secondary);
  cursor: pointer;
}

.contact__calendar {
  width: min(980px, 92vw);
  border-radius: 1rem;
  overflow: hidden;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(8px);
}
</style>
