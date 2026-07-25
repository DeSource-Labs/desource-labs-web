<template>
  <LiquidGlass
    tag="nav"
    class="nav"
    :class="{ 'nav--visible': showNav }"
    :is-slow-device="isSlow"
    aria-label="Primary navigation"
  >
    <div class="nav__container">
      <a href="#" class="nav__logo" @click.prevent="scrollToTop">DESOURCE LABS</a>
      <div class="nav__links">
        <a
          v-for="item in NavLinks"
          :key="item.id"
          class="nav__link"
          :class="{ active: activeSection === item.id }"
          :href="item.target"
          @click.prevent="navigateTo(item.id)"
        >
          {{ item.name }}
        </a>
      </div>
      <Button
        class="nav__cta"
        type="primary"
        href="https://calendly.com/hello-desource-labs/30min"
      >
        Let's Talk
      </Button>
      <button
        ref="hamburger"
        class="nav__hamburger"
        type="button"
        aria-controls="mobile-navigation"
        :aria-expanded="mobileMenuOpen"
        :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
        @click="toggleMobileMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <Teleport to="body">
      <div
        id="mobile-navigation"
        ref="mobileMenu"
        class="nav-mobile"
        :class="{ 'nav-mobile--open': mobileMenuOpen }"
        :aria-hidden="!mobileMenuOpen"
        :inert="!mobileMenuOpen"
        role="dialog"
        :aria-modal="mobileMenuOpen ? 'true' : undefined"
        aria-label="Site navigation"
        @click.self="closeMobileMenu"
      >
        <button
          ref="closeButton"
          class="nav-mobile__close"
          type="button"
          aria-label="Close menu"
          @click="closeMobileMenu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="nav-mobile__content">
          <a
            v-for="(item, index) in NavLinks"
            :key="index"
            class="nav-mobile__link"
            :class="{ active: activeSection === item.id }"
            :href="item.target"
            @click.stop="handleMobileClick(item.id)"
          >
            {{ item.name }}
          </a>
          <Button
            class="nav-mobile__cta"
            type="primary"
            href="https://calendly.com/hello-desource-labs/30min"
            @click="closeMobileMenu"
          >
            Schedule a call
          </Button>
        </div>
      </div>
    </Teleport>
  </LiquidGlass>
</template>

<script setup lang="ts">
import { useConfigStore } from '~/store/config';

const configStore = useConfigStore();
const { showNav, activeSection, isSlow } = storeToRefs(configStore);
const mobileMenuOpen = ref(false);
const hamburger = useTemplateRef('hamburger');
const closeButton = useTemplateRef('closeButton');
const mobileMenu = useTemplateRef('mobileMenu');

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const navigateTo = (id: Section) => {
  configStore.navigateTo(id);
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

const toggleMobileMenu = () => {
  if (mobileMenuOpen.value) {
    closeMobileMenu();
  } else {
    mobileMenuOpen.value = true;
  }
};

const handleMenuKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMobileMenu();
    return;
  }

  if (event.key !== 'Tab' || !mobileMenu.value) return;

  const focusable = Array.from(
    mobileMenu.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
  );
  const first = focusable.at(0);
  const last = focusable.at(-1);

  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const handleMobileClick = (id: Section) => {
  toggleMobileMenu();
  setTimeout(() => {
    navigateTo(id);
  }, 300);
};

watch(mobileMenuOpen, async (isOpen, wasOpen) => {
  document.documentElement.style.overflow = isOpen ? 'hidden' : '';

  if (isOpen) {
    window.addEventListener('keydown', handleMenuKeydown);
    await nextTick();
    closeButton.value?.focus();
  } else {
    window.removeEventListener('keydown', handleMenuKeydown);
    if (wasOpen) {
      hamburger.value?.focus();
    }
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleMenuKeydown);
  document.documentElement.style.overflow = '';
});
</script>

<style lang="scss">
$color-active: #a78bfa;
$text-shadow-active: 0 0 30px rgba(167, 139, 250, 0.6);

.nav {
  position: fixed;
  top: 1rem;
  left: 50%;
  z-index: 1000;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
  opacity: 0;
  transform: translateX(-50%) translateY(-70px);
  pointer-events: none;

  &--visible {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    pointer-events: all;
  }
}

.nav-mobile {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--vh-100, 100svh);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.4s ease;
  z-index: 1001;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(1.8) brightness(1.2);
  border: none;
  box-shadow: rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(255, 255, 255, 0.1) 0px -1px 0px 0px inset;
  opacity: 0;
  pointer-events: none;

  &--open {
    opacity: 1;
    pointer-events: all;
  }

  &__close {
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 44px;
    height: 44px;
    background: none;
    border: none;
    color: var(--color-primary);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover,
    &:active {
      color: $color-active;
      transform: rotate(90deg);
    }

    > svg {
      width: 100%;
      height: 100%;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
  }

  &__link {
    font-size: 2rem;
    font-weight: 300;
    letter-spacing: 0.1em;
    color: var(--color-secondary);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover,
    &.active {
      color: $color-active;
      text-shadow: $text-shadow-active;
    }

    &:hover {
      transform: scale(1.1);
    }
  }

  &__cta.button {
    margin-top: 2rem;
    width: 280px;
  }
}

@media (max-width: 768px) {
  .nav {
    top: 1rem;
    left: 1rem;
    right: 1rem;
    transform: translateX(0) translateY(-70px);
    width: calc(100% - 2rem);

    &--visible {
      transform: translateX(0) translateY(0);
    }
  }
  .nav-mobile__link {
    font-size: 1.75rem;
  }
}

@media (max-width: 640px) {
  .nav-mobile {
    &__link {
      font-size: 1.5rem;
    }
    &__cta.button {
      width: 100%;
    }
  }
}

@media (max-height: 600px) {
  // Adjust for short viewports, e.g., landscape mobile
  .nav-mobile {
    &__content {
      gap: 0.5rem;
    }
    &__link {
      font-size: 1.4rem;
    }
    &__cta.button {
      margin-top: 0.5rem;
    }
  }
}
</style>

<style scoped lang="scss">
$color-active: #a78bfa;
$text-shadow-active: 0 0 20px rgba(167, 139, 250, 0.5);

.nav__container {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.75rem 1.5rem;
}

.nav__logo {
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  color: var(--color-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: $color-active;
    text-shadow: $text-shadow-active;
  }
}

.nav__links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav__link {
  position: relative;
  font-size: 0.95rem;
  font-weight: 400;
  color: var(--color-secondary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: var(--color-primary);
    transform: scale(1.05);
  }

  &.active {
    color: $color-active;
    text-shadow: $text-shadow-active;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, $color-active, transparent);
      animation: glow-pulse 2s ease-in-out infinite;
    }
  }
}

.nav__cta.button {
  height: 36px;
  width: 140px;
  font-size: 0.95rem;
  padding: 6px 16px;
}

.nav__hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;

  > span {
    width: 24px;
    height: 2px;
    background: var(--color-primary);
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  &:hover > span {
    background: $color-active;
  }
}

@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.5;
    box-shadow: 0 0 10px rgba(167, 139, 250, 0.3);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 20px rgba(167, 139, 250, 0.6);
  }
}

@media (max-width: 1024px) {
  .nav__container {
    gap: 2rem;
    padding: 0.75rem 1.5rem;
  }
  .nav__links {
    gap: 1.5rem;
  }
  .nav__link {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .nav__container {
    gap: 1rem;
    padding: 0.75rem 1rem;
    justify-content: space-between;
  }
  .nav__links {
    display: none;
  }
  .nav__cta {
    display: none;
  }
  .nav__hamburger {
    display: flex;
  }
}
</style>
