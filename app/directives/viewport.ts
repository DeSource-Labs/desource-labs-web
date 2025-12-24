import { type Directive } from 'vue';

const DELAY_POWER = 0.1;

let intersectionObserver: IntersectionObserver;

function ensureIntersectionObserver() {
  if (intersectionObserver) return;

  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const eventName = entry.isIntersecting ? 'enterViewport' : 'exitViewport';
      if (eventName === 'enterViewport') {
        entry.target.classList.add('entered');
      } else if (eventName === 'exitViewport') {
        entry.target.classList.remove('entered');
      }
      entry.target.dispatchEvent(new CustomEvent(eventName));
    });
  });
}

const viewport: Directive<HTMLElement, number> = {
  mounted: (el, bindings) => {
    if (bindings?.value) {
      el.style.transitionDelay = `${bindings.value * DELAY_POWER}s`;
    }
    ensureIntersectionObserver()
    intersectionObserver.observe(el);
  },
  beforeUnmount: (el) => {
    intersectionObserver.unobserve(el);
  },
};

export default viewport;
