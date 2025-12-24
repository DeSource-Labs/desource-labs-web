import viewport from '~/directives/viewport';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('viewport', viewport);
});
