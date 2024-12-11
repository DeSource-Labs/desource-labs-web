<template>
  <footer class="footer">
    <h3>DESOURCE LABS</h3>
    <div class="legal-links" v-if="false">
      <a class="p4" href="#" rel="nofollow noopener">Privacy Policy</a>
      <a class="p4" href="#" rel="nofollow noopener">Terms of Service</a>
    </div>
    <p class="p4">2024, DESOURCE LABS LTD</p>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #000;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.legal-links {
  display: flex;
  gap: 1rem;
}
a, p {
  color: var(--color-secondary);
  letter-spacing: 0.03em;
}
@media (max-width: 640px) {
  .footer {
    flex-direction: column;
    gap: 1.6rem;
  }
}
</style>
