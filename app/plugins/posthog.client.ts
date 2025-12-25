import posthog from 'posthog-js';

export default defineNuxtPlugin(nuxtApp => {
  const posthogPublicKey = import.meta.env.VITE_POSTHOG_PK;
  const posthogClient = posthog.init(posthogPublicKey, {
    api_host: '/api/_ph',
    defaults: '2025-11-30',
    disable_compression: true,
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    loaded: (posthog) => {
      if (import.meta.env.MODE === 'development') posthog.debug();
    }
  });

  return {
    provide: {
      posthog: () => posthogClient
    }
  };
});
