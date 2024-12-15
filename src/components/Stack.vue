<template>
  <section class="stack">
    <div class="title__container">
      <p class="title h4">Precision in Every Detail</p>
      <p class="title__description p1">Expertise that powers your next big move.</p>
      <hr />
    </div>
    <div class="stack__container">
      <div class="stack__item">
        <span class="stack__title p2">Blockchain Ecosystems</span>
        <p class="stack__description secondary p3">
          Smart contracts, dApps, cross-chain integrations
        </p>
      </div>
      <div class="stack__item">
        <span class="stack__title p2">Back-End Architecture</span>
        <p class="stack__description secondary p3">
          High-performance systems built with Rust and Node.js
        </p>
      </div>
      <div class="stack__item">
        <span class="stack__title p2">Modern Interfaces</span>
        <p class="stack__description secondary p3">
          Intuitive, pixel-perfect designs, built with top-notch frontend
        </p>
      </div>
      <div class="stack__item">
        <span class="stack__title p2">Scalable Infrastructure</span>
        <p class="stack__description secondary p3">
          DevOps workflows that evolve with your business.
        </p>
      </div>
    </div>
    <Video class="stack__visual" name="chips" />
  </section>
</template>

<style scoped>
.stack {
  display: grid;
  grid-template-areas: 
    "title visual"
    "stack visual";
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  align-items: center;
  background: var(--gradient-bg);
  padding: 5rem 10vw;
  padding-right: 0; /* Remove padding on the right because of the video size */
}
.title__container {
  grid-area: title;
  margin-bottom: 20px;
}
.title__description {
  color: var(--color-tertiary);
  line-height: 2;
}
hr {
  border: none;
  border-radius: 50px;
  margin-top: 2rem;
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, #FFFFFF 0%, rgba(153, 153, 153, 0) 100%);
}
.stack__container {
  grid-area: stack;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.stack__item {
  display: flex;
  gap: 1rem;
  align-items: baseline;
  margin-bottom: 1rem;
}
.stack__title,
.stack__description {
  flex: 1;
}
span {
  margin-block: 0.6rem;
}
.stack__visual {
  grid-area: visual;
  max-width: 100%;
  height: 30vw;
  object-fit: cover;
  object-position: right bottom;
}
@media (max-width: 1024px) {
  .stack {
    grid-template-columns: 2fr 1fr;
    padding: 5rem 6vw;
    padding-right: 2vw;
  }
  .stack__visual {
    height: 40vw;
    object-position: center;
  }
}
@media (max-width: 768px) {
  .stack {
    display: flex;
    flex-direction: column;
    padding: 5rem 6vw;
    background: linear-gradient(180deg, rgba(217, 217, 217, 0.12) 0%, rgba(115, 115, 115, 0) 10%); /* To avoid video background */
  }
  .stack__container {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .stack__item {
    flex-direction: column;
    gap: 2px;
  }
  .stack__visual {
    order: 2;
    height: 60vw;
  }
  .title__container {
    order: 1;
    margin-bottom: 0;
  }
  hr {
    display: none;
  }
  .stack__container {
    order: 3;
  }
}
@media (max-width: 640px) {
  .stack__visual {
    height: 90vw;
  }
}
@media (max-width: 320px) {
  .stack__visual {
    height: 100vw;
  }
}
</style>
