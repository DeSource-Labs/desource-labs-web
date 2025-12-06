import { defineStore } from 'pinia';
import { useNetwork } from '@vueuse/core';

const sectionVisibilityDistance = 400; // in pixels

export const useConfigStore = defineStore('config', () => {
  const { effectiveType } = useNetwork();

  const isNativeMobile = ref(false);
  const isTouch = ref(false);
  const prefersReducedMotion = ref(false);

  const activeSection = ref<Section>('hero');
  const visibleSections = ref<Section[]>(['hero']);
  const showNav = ref(false);
  const isReversedScroll = ref(false);
  const scrollThrottle = ref<number | null>(null);
  const orientationThrottle = ref<number | null>(null);

  const connectionSpeed = computed(() => {
    switch (effectiveType.value) {
      case 'slow-2g':
      case '2g':
        return 'slow';
      case '3g':
        return 'medium';
      default:
      return 'fast';
    }
  });

  const updateVh = () => {
    if (orientationThrottle.value) {
      clearTimeout(orientationThrottle.value);
    }
    orientationThrottle.value = setTimeout(() => {
      // Recalculate vh after orientation change
      const Vh100InPixels = window.innerHeight;
      const vhInPixels = Vh100InPixels * 0.01;
      document.documentElement.style.setProperty('--vh-100', `${Vh100InPixels}px`);
      document.documentElement.style.setProperty('--vh', `${vhInPixels}px`);
    }, 100);
  };

  const detectSectionsVisibility = () => {
    if (scrollThrottle.value) return;
    scrollThrottle.value = setTimeout(() => {
      // Show nav after scrolling past 80% of viewport height
      showNav.value = window.scrollY > window.innerHeight * 0.8;
      // Check if scroll is from bottom to top
      isReversedScroll.value = (window.scrollY + window.innerHeight) < (document.documentElement.scrollHeight - 1);
      for (const section of Sections) {
        const element = document.getElementById(section);
        if (!element) continue;

        const rect = element.getBoundingClientRect();

        // Section is active if it's in the upper third of viewport
        if (rect.top <= 150 && rect.bottom >= 150) {
          activeSection.value = section;
        }

        // Section is visible if any part of it is in the viewport or close to it (+/- navBarPadding)
        if (rect.bottom >= -sectionVisibilityDistance && rect.top <= window.innerHeight + sectionVisibilityDistance) {
          if (!visibleSections.value.includes(section)) {
            visibleSections.value.push(section);
          }
        } else {
          const index = visibleSections.value.indexOf(section);
          if (index !== -1) {
            visibleSections.value.splice(index, 1);
          }
        }
      }
      scrollThrottle.value = null;
    }, 100);
  };

  const navigateTo = (section: Section, behavior: ScrollBehavior = 'smooth') => {
    const element = document.getElementById(section);
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: targetPosition,
        behavior,
      });
    }
  };

  const init = () => {
    // Mobile detection
    const userAgent = navigator.userAgent.toLowerCase();
    isNativeMobile.value = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    // Touch capability
    isTouch.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // Check ipad pro
    if (userAgent.includes('macintosh') && isTouch.value) {
      isNativeMobile.value = true;
    }
    // Reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.value = mediaQuery.matches;
    // Set vh for mobile devices
    if (isNativeMobile.value) {
      updateVh();
      // Update vh on orientation change
      // `resize` event cannot be used on mobile devices because it fires on scroll in some browsers
      window.addEventListener('orientationchange', updateVh, { passive: true });
    }
    // Detect sections & navbar visibility on scroll
    detectSectionsVisibility();
    window.addEventListener('scroll', detectSectionsVisibility, { passive: true });
  };

  const destroy = () => {
    window.removeEventListener('orientationchange', updateVh);
    window.removeEventListener('scroll', detectSectionsVisibility);
  };

  return {
    isNativeMobile,
    isTouch,
    prefersReducedMotion,
    connectionSpeed,
    activeSection,
    visibleSections,
    showNav,
    isReversedScroll,
    init,
    destroy,
    navigateTo,
  };
});
