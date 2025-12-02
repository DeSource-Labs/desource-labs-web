<template>
  <LiquidGlass tag="nav" class="nav" :class="{ 'nav--visible': showNav }">
    <div class="nav__container">
      <a href="#" class="nav__logo" @click.prevent="scrollToTop">DESOURCE LABS</a>
      <div class="nav__links">
        <a
          v-for="item in links"
          :key="item.id"
          class="nav__link"
          rel="nofollow noopener"
          :class="{ active: activeSection === item.id }"
          :href="item.target"
          @click.prevent="smoothScroll(item.target)"
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
      <button class="nav__hamburger" @click="toggleMobileMenu" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <Teleport to="body">
      <LiquidGlass
        class="nav__mobile" :class="{ 'nav__mobile--open': mobileMenuOpen }"
        :border-radius="32"
        :background-opacity="0.9"
        @click="toggleMobileMenu"
      >
        <button class="nav__mobile-close" @click="toggleMobileMenu" aria-label="Close menu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="nav__mobile-content">
          <a
            v-for="(item, index) in links"
            :key="index"
            class="nav__mobile-link"
            rel="nofollow noopener"
            :href="item.target"
            @click.prevent="handleMobileClick(item.target)"
          >
            {{ item.name }}
          </a>
          <Button
            class="nav__mobile-cta"
            type="primary"
            href="https://calendly.com/hello-desource-labs/30min"
          >
            Schedule a call
          </Button>
        </div>
      </LiquidGlass>
    </Teleport>
  </LiquidGlass>
</template>

<script setup lang="ts">
const links = [
  { id: 'stack', name: 'Services', target: '#stack' },
  { id: 'tech', name: 'Tech', target: '#tech' },
  { id: 'portfolio', name: 'Work', target: '#portfolio' },
  { id: 'team', name: 'Team', target: '#team' },
  { id: 'contact', name: 'Contact', target: '#contact' },
];

const showNav = ref(false);
const activeSection = ref('');
const mobileMenuOpen = ref(false);
const scrollThrottle = ref<number | null>(null);

const handleScroll = () => {
  if (scrollThrottle.value) return;

  scrollThrottle.value = setTimeout(() => {
    // Show nav after scrolling past 80% of viewport height
    showNav.value = window.scrollY > window.innerHeight * 0.8;

    // Detect active section based on scroll position
    const sections = ['stack', 'portfolio', 'tech', 'team', 'contact'];
    let found = false;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Section is active if it's in the upper third of viewport
        if (rect.top <= 150 && rect.bottom >= 150) {
          activeSection.value = section;
          found = true;
          break;
        }
      }
    }

    if (!found && window.scrollY < window.innerHeight) {
      activeSection.value = '';
    }

    scrollThrottle.value = null;
  }, 100);
};

const smoothScroll = (target: string) => {
  const element = document.querySelector(target);
  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  // Prevent body scroll when menu is open
  if (mobileMenuOpen.value) {
    document.documentElement.style.overflow = 'hidden';
  } else {
    document.documentElement.style.overflow = '';
  }
};

const handleMobileClick = (target: string) => {
  toggleMobileMenu();
  setTimeout(() => {
    smoothScroll(target);
  }, 300);
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Check initial position
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.body.style.overflow = '';
});
</script>

<style lang="scss">
.nav {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%) translateY(-100px);
  z-index: 1000;
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  will-change: transform, opacity;
}

.nav--visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
  pointer-events: all;
}

/* Mobile Menu Overlay */
.nav__mobile {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
  z-index: 1001;
}

.nav__mobile--open {
  opacity: 1;
  pointer-events: all;
}

.nav__mobile-close {
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
}

.nav__mobile-close:hover {
  color: #a78bfa;
  transform: rotate(90deg);
}

.nav__mobile-close svg {
  width: 100%;
  height: 100%;
}

.nav__mobile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}

.nav__mobile-link {
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: var(--color-secondary);
  transition: all 0.3s ease;
  cursor: pointer;
}

.nav__mobile-link:hover {
  color: #a78bfa;
  text-shadow: 0 0 30px rgba(167, 139, 250, 0.6);
  transform: scale(1.1);
}

.nav__mobile-cta {
  margin-top: 2rem;
  width: 280px !important;
}

@media (max-width: 768px) {
  .nav {
    top: 1rem;
    left: 1rem;
    right: 1rem;
    transform: translateX(0) translateY(-100px);
    width: calc(100% - 2rem);
  }
  .nav--visible {
    transform: translateX(0) translateY(0);
  }
  .nav__mobile-link {
    font-size: 1.75rem;
  }
}
@media (max-width: 640px) {
  .nav__mobile-link {
    font-size: 1.5rem;
  }

  .nav__mobile-cta {
    width: 100% !important;
  }
}
</style>

<style scoped lang="scss">
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
}

.nav__logo:hover {
  color: #a78bfa;
  text-shadow: 0 0 20px rgba(167, 139, 250, 0.5);
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
}

.nav__link:hover {
  color: var(--color-primary);
  transform: scale(1.05);
}

.nav__link.active {
  color: #a78bfa;
  text-shadow: 0 0 20px rgba(167, 139, 250, 0.5);
}

.nav__link.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, #a78bfa, transparent);
  animation: glow-pulse 2s ease-in-out infinite;
}

.nav__cta {
  height: 36px !important;
  width: 140px !important;
  font-size: 0.95rem !important;
  padding: 6px 16px !important;

}

.nav__hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.nav__hamburger span {
  width: 24px;
  height: 2px;
  background: var(--color-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.nav__hamburger:hover span {
  background: #a78bfa;
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

/* Tablet */
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

/* Mobile */
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
