declare module '@splidejs/vue-splide' {
  import type { DefineComponent, Plugin, Component } from 'vue';
  import type { Options, Splide as _SplideClass, ComponentConstructor } from '@splidejs/splide/dist/types/index.js';

  export type SlideProps = { options?: Options; tag?: string; extensions?: Record<string, ComponentConstructor>, transition?: ComponentConstructor, hasTrack?: boolean };
  export type SlideExposed = { go: (index: number) => void };
  export type SplideOptions = Options;
  export type SplideClass = _SplideClass;

  export const Splide: DefineComponent<SlideProps, any, any>;
  export const SplideSlide: DefineComponent<any, any, any>;

  const SplidePlugin: Plugin;
  export default SplidePlugin;
}
