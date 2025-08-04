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
    </div>
  </section>
</template>

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
</style>
