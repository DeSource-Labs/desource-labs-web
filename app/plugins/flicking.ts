import VueFlicking from '@egjs/vue3-flicking';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VueFlicking', VueFlicking);
});
