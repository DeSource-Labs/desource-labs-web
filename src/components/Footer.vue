<template>
  <footer class="footer">
    <p class="h3">DESOURCE LABS</p>
    <div v-once class="footer__socials">
      <Social
        v-for="social in socials"
        size="1.2rem"
        :key="social.type"
        :aria-label="`Visit DeSource Labs ${social.type}`"
        :type="social.type"
        :href="social.href"
      />
    </div>
    <div class="footer__legal" v-if="false">
      <a class="animated-link p4" href="#" rel="nofollow noopener">Privacy Policy</a>
      <a class="animated-link p4" href="#" rel="nofollow noopener">Terms of Service</a>
    </div>
    <p class="p4">2024, DESOURCE LABS LTD</p>
  </footer>
</template>

<script setup lang="ts">
import { socialMediaArray } from '~/consts';

const socials = socialMediaArray;
</script>

<style scoped>
.footer {
  background-color: #000;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.footer__socials {
  display: flex;
  gap: 0.5rem;
}
.footer__legal {
  display: flex;
  gap: 1rem;
}
.p4 {
  color: var(--color-secondary);
  letter-spacing: 0.03em;
}
@media (max-width: 1024px) {
  .footer__legal {
    flex-direction: column;
    align-items: center;
  }
}
@media (max-width: 768px) {
  .footer {
    flex-direction: column;
    gap: 1.6rem;
  }
}
</style>
