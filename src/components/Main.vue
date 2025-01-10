<template>
  <section class="main">
    <Video class="main__visual" name="cubic" />
    <p class="main__title h4">Innovation, Engineered for Scale</p>
    <p class="main__description desc1 p1">
      We partner with forward-thinking companies to craft custom technology that drives growth and redefines possibilities.
    </p>
    <p class="main__description desc2 p1">
      Our team
      <strong>merges deep technical expertise with design precision</strong>,
      delivering systems that inspire. From blockchain ecosystems to enterprise-grade infrastructure, every line of code, every pixel, and every strategy is built with purpose.
    </p>
    <Button
      class="main__button"
      type="secondary"
      href="https://calendly.com/hello-desource-labs/30min"
    >
      Schedule a call
    </Button>
  </section>
</template>

<style scoped>
.main {
  display: grid;
  grid-template-areas:
    "visual title"
    "visual desc1"
    "visual desc2"
    "visual button";
  grid-template-columns: 1fr 2fr;
  gap: 2px;
  align-items: center;
  padding: 10rem 6vw;
}
.main__visual {
  grid-area: visual;
  width: 100%;
  min-height: 30svh;
  object-fit: cover;
}
.main__title {
  grid-area: title;
}
.desc1 {
  grid-area: desc1;
}
.desc2 {
  grid-area: desc2;
}
.main__button {
  grid-area: button;
}
.main__description {
  line-height: 1.5;
  color: var(--color-secondary);
}
.main__description > strong {
  color: var(--color-primary);
}
@media (max-width: 1024px) {
  .main {
    padding: 6rem 2rem;
  }
}
@media (max-width: 768px) {
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem 10vw;
  }
  .main__visual {
    order: 3;
    max-width: 60vw;
  }
  .main__title {
    order: 1;
    text-align: center;
  }
  .main__description.desc1 {
    order: 2;
    text-align: center;
  }
  .main__description.desc2 {
    order: 4;
    text-align: center;
  }
  .main__button {
    order: 5;
    align-self: center;
  }
}
@media (max-width: 640px) {
  .main__visual {
    max-width: 80vw;
  }
}
@media (max-width: 320px) {
  .main {
    padding: 2rem 1.4rem;
  }
}
</style>
