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
    </div>
    <div class="contact__actions">
      <Button type="primary" href="https://calendly.com/hello-desource-labs/30min">Schedule a call</Button>
      <p class="contact__meta p4" aria-label="response time">Under 24h response • NDA on request</p>
      <ClientOnly>
        <CalendlyPopupWidget
          tabindex="0"
          class="contact__calendar"
          v-bind="options"
          @click="onOpenCalendar"
          @close="onCloseCalendar"
        />
      </ClientOnly>
      </div>
  </section>
</template>

<script setup lang="ts">
import type { CalendlyPopupWidget } from '#components';

type CalendlyProps = InstanceType<typeof CalendlyPopupWidget>['$props'];

const options = computed<CalendlyProps>(() => {
  if (!document?.body) {
    return {} as CalendlyProps;
  }
  return {
    url: 'https://calendly.com/hello-desource-labs/30min',
    rootElement: document.body,
    branding: false,
    text: 'Preview calendar',
    textColor: 'var(--color-secondary)',
    color: 'transparent',
    iframeTitle: 'Desource Labs Calendly Scheduling',
    pageSettings: {
      hideEventTypeDetails: false,
      hideLandingPageDetails: false,
    },
  };
});

const onOpenCalendar = () => {
  document.documentElement.style.overflow = 'hidden';
};

const onCloseCalendar = () => {
  document.documentElement.style.overflow = '';
};
</script>

<style lang="scss">
.calendly {
  &-overlay {
    background-color: rgba(0, 0, 0, 0.9);
  }
  &-badge-widget &-badge-content {
    box-shadow: none;
    border: none;
    cursor: pointer;
    letter-spacing: 0.005em;
    border-radius: 100vw;
    font-family: "Nunito";
    font-size: 18px;
    font-weight: 500;
  }
}
</style>

<style scoped lang="scss">
.contact {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 2rem;
  min-height: calc(100svh - 72px);

  &__background,
  &__shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__content {
    margin-top: 4rem;
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

  &__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__meta {
    color: var(--color-tertiary);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.8;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  &__calendar {
    position: relative;
    border-radius: 100vw;
    right: 0;
    bottom: 0;
    z-index: 2;
  }
}
@media (max-width: 768px) {
  .contact {
    justify-content: center;
    min-height: calc(100svh - 163px);

    &__content {
      margin-top: 10rem;
      text-wrap-style: balance;
    }

    &__meta {
      text-align: center;
      text-wrap-style: balance;
    }
  }
}
@media (max-width: 640px) {
  .contact {
    gap: 4rem;
  }
}
</style>
