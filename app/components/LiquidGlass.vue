<template>
  <ClientOnly>
    <component
      ref="containerRef"
      :is="tag"
      class="glass-surface"
      :style="containerStyles"
    >
      <svg class="glass-surface__svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <filter :id="filterId" color-interpolation-filters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref="feImageRef" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />

            <feDisplacementMap id="redchannel" ref="redChannelRef" in="SourceGraphic" in2="map" result="dispRed" />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
              result="red"
            />

            <feDisplacementMap
              id="greenchannel"
              ref="greenChannelRef"
              in="SourceGraphic"
              in2="map"
              result="dispGreen"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0
                    0 1 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
              result="green"
            />

            <feDisplacementMap id="bluechannel" ref="blueChannelRef" in="SourceGraphic" in2="map" result="dispBlue" />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
              result="blue"
            />

            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur ref="gaussianBlurRef" in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>

      <div ref="slotRef" class="glass-surface__content">
        <slot />
      </div>
    </component>
  </ClientOnly>
</template>

<script setup lang="ts">
import { type CSSProperties } from 'vue';

interface LiquidGlassConfig {
  darkMode: boolean;
  borderRadius: number;
  borderWidth: number;
  brightness: number;
  opacity: number;
  blur: number;
  displace: number;
  backgroundOpacity: number;
  saturation: number;
  distortionScale: number;
  redOffset: number;
  greenOffset: number;
  blueOffset: number;
  xChannel: 'R' | 'G' | 'B';
  yChannel: 'R' | 'G' | 'B';
  mixBlendMode:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity'
    | 'plus-darker'
    | 'plus-lighter';
}

interface LiquidGlassProps {
  tag?: string;
  style?: CSSProperties;
}

const config: LiquidGlassConfig = {
  darkMode: true,
  borderRadius: 100,
  borderWidth: 0.07,
  brightness: 70,
  opacity: 0.93,
  blur: 11,
  displace: 0.5,
  backgroundOpacity: 0.6,
  saturation: 1,
  distortionScale: -180,
  redOffset: 0,
  greenOffset: 10,
  blueOffset: 20,
  xChannel: 'R',
  yChannel: 'G',
  mixBlendMode: 'difference',
};

const props = withDefaults(defineProps<LiquidGlassProps>(), {
  tag: 'div',
  style: () => ({})
});

const uniqueId = useId();
const filterId = `glass-filter-${uniqueId}`;
const redGradId = `red-grad-${uniqueId}`;
const blueGradId = `blue-grad-${uniqueId}`;

const containerRef = useTemplateRef<HTMLElement>('containerRef');
const feImageRef = useTemplateRef('feImageRef');
const redChannelRef = useTemplateRef('redChannelRef');
const greenChannelRef = useTemplateRef('greenChannelRef');
const blueChannelRef = useTemplateRef('blueChannelRef');
const gaussianBlurRef = useTemplateRef('gaussianBlurRef');

let resizeObserver: ResizeObserver | null = null;

const generateDisplacementMap = () => {
  const rect = containerRef.value?.getBoundingClientRect();
  const actualWidth = rect?.width || 400;
  const actualHeight = rect?.height || 200;
  const edgeSize = Math.min(actualWidth, actualHeight) * (config.borderWidth * 0.5);

  const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${config.borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${config.borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${config.mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${config.borderRadius}" fill="hsl(0 0% ${config.brightness}% / ${config.opacity})" style="filter:blur(${config.blur}px)" />
      </svg>
    `;

  return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
};

const updateDisplacementMap = () => {
  if (feImageRef.value) {
    feImageRef.value.setAttribute('href', generateDisplacementMap());
  }
};

const supportsSVGFilters = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;

  const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  const isFirefox = /Firefox/.test(navigator.userAgent);

  if (isWebkit || isFirefox) {
    return false;
  }

  const div = document.createElement('div');
  div.style.backdropFilter = `url(#${filterId})`;
  return div.style.backdropFilter !== '';
};

const supportsBackdropFilter = () => {
  if (typeof window === 'undefined') return false;
  return CSS.supports('backdrop-filter', 'blur(10px)');
};

const containerStyles = computed(() => {
  const baseStyles: Record<string, string | number> = {
    ...props.style,
    borderRadius: `${config.borderRadius}px`,
    '--glass-frost': config.backgroundOpacity,
    '--glass-saturation': config.saturation
  };

  const svgSupported = supportsSVGFilters();
  const backdropFilterSupported = supportsBackdropFilter();

  if (svgSupported) {
    return {
      ...baseStyles,
      background: config.darkMode
        ? `hsl(0 0% 0% / ${config.backgroundOpacity})`
        : `hsl(0 0% 100% / ${config.backgroundOpacity})`,
      backdropFilter: `url(#${filterId}) saturate(${config.saturation})`,
      boxShadow: config.darkMode
        ? `0 0 2px 1px color-mix(in oklch, white, transparent 65%) inset,
           0 0 10px 4px color-mix(in oklch, white, transparent 85%) inset,
           0px 4px 16px rgba(17, 17, 26, 0.05),
           0px 8px 24px rgba(17, 17, 26, 0.05),
           0px 16px 56px rgba(17, 17, 26, 0.05),
           0px 4px 16px rgba(17, 17, 26, 0.05) inset,
           0px 8px 24px rgba(17, 17, 26, 0.05) inset,
           0px 16px 56px rgba(17, 17, 26, 0.05) inset`
        : `0 0 2px 1px color-mix(in oklch, black, transparent 85%) inset,
           0 0 10px 4px color-mix(in oklch, black, transparent 90%) inset,
           0px 4px 16px rgba(17, 17, 26, 0.05),
           0px 8px 24px rgba(17, 17, 26, 0.05),
           0px 16px 56px rgba(17, 17, 26, 0.05),
           0px 4px 16px rgba(17, 17, 26, 0.05) inset,
           0px 8px 24px rgba(17, 17, 26, 0.05) inset,
           0px 16px 56px rgba(17, 17, 26, 0.05) inset`
    };
  } else {
    if (config.darkMode) {
      if (!backdropFilterSupported) {
        return {
          ...baseStyles,
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
                      inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)`
        };
      } else {
        return {
          ...baseStyles,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px) saturate(1.8) brightness(1.2)',
          WebkitBackdropFilter: 'blur(12px) saturate(1.8) brightness(1.2)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
                      inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)`
        };
      }
    } else {
      if (!backdropFilterSupported) {
        return {
          ...baseStyles,
          background: 'rgba(255, 255, 255, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
                      inset 0 -1px 0 0 rgba(255, 255, 255, 0.3)`
        };
      } else {
        return {
          ...baseStyles,
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(12px) saturate(1.8) brightness(1.1)',
          WebkitBackdropFilter: 'blur(12px) saturate(1.8) brightness(1.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.2),
                      0 2px 16px 0 rgba(31, 38, 135, 0.1),
                      inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
                      inset 0 -1px 0 0 rgba(255, 255, 255, 0.2)`
        };
      }
    }
  }
});

const updateFilterElements = () => {
  const elements = [
    { ref: redChannelRef, offset: config.redOffset },
    { ref: greenChannelRef, offset: config.greenOffset },
    { ref: blueChannelRef, offset: config.blueOffset }
  ];

  elements.forEach(({ ref, offset }) => {
    if (ref.value) {
      ref.value.setAttribute('scale', (config.distortionScale + offset).toString());
      ref.value.setAttribute('xChannelSelector', config.xChannel);
      ref.value.setAttribute('yChannelSelector', config.yChannel);
    }
  });

  if (gaussianBlurRef.value) {
    gaussianBlurRef.value.setAttribute('stdDeviation', config.displace.toString());
  }
};

const setupResizeObserver = () => {
  if (!containerRef.value || typeof ResizeObserver === 'undefined') return;

  resizeObserver = new ResizeObserver(() => {
    setTimeout(updateDisplacementMap, 0);
  });

  resizeObserver.observe(containerRef.value);
};

onMounted(async () => {
  await nextTick();
  updateDisplacementMap();
  updateFilterElements();
  setupResizeObserver();
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<style scoped lang="scss">
.glass-surface {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: opacity 260ms ease-out;

  &__svg {
    width: 100%;
    height: 100%;
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    z-index: -10;
  }

  &__content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    position: relative;
    z-index: 1000;
  }
}
</style>
