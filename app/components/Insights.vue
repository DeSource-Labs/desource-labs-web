<template>
  <section class="insights">
    <div class="insights__wrapper">
      <div class="insights__header">
        <h2 class="h4">Resources & Answers</h2>
        <p class="p2 secondary">Field guides and common questions.</p>
      </div>

      <div class="insights__content">
        <div class="insights__resources">
          <div class="resource-card" v-for="resource in resources" :key="resource.title">
            <div class="resource-card__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div class="resource-card__content">
              <div class="resource-card__head">
                <p class="p2 bolder">{{ resource.title }}</p>
                <span class="badge p4">{{ resource.badge }}</span>
              </div>
              <p class="p3 secondary">{{ resource.desc }}</p>
            </div>
            <div class="resource-card__actions">
              <Button type="ghost" :href="resource.mailto">Request</Button>
              <Button type="link" :href="socialMedia.telegram">Discuss</Button>
            </div>
          </div>
        </div>

        <div class="insights__faq">
          <details class="faq-item" v-for="item in faqs" :key="item.q">
            <summary class="faq-item__q p2">
              <span>{{ item.q }}</span>
              <svg class="faq-item__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </summary>
            <p class="faq-item__a p3 secondary">{{ item.a }}</p>
          </details>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const resources = [
  {
    title: 'Web3 Security Checklist',
    badge: 'v1.0',
    desc: 'Deployment-ready checklist for contracts, infra and ops.',
    mailto: 'mailto:hello@desource-labs.org?subject=Request%20Web3%20Security%20Checklist'
  },
  {
    title: 'Launch Architecture Outline',
    badge: 'v1.0',
    desc: 'From prototype to production: domains, handover, and SLAs.',
    mailto: 'mailto:hello@desource-labs.org?subject=Request%20Launch%20Architecture%20Outline'
  }
];

const faqs = [
  {
    q: 'How we engage & timeline',
    a: 'We begin with a focused architecture session. Small deliverables (e.g., a landing page with final mockups) ship fast — typically within 1 day. Production builds ship in 3–8 weeks depending on scope. We deliver by milestone with clear acceptance criteria and weekly demos.'
  },
  {
    q: 'Pricing model',
    a: 'Milestone-based or fixed scope once requirements are locked. No surprise overages. We optimize for outcomes, not hours.'
  },
  {
    q: 'Ownership & IP',
    a: 'You own the code, infrastructure, and artifacts. We can host temporarily for speed, then hand over with documentation.'
  }
];
</script>

<style scoped lang="scss">
.insights {
  position: relative;
  padding: 4rem 10vw 5rem;
  background: radial-gradient(ellipse 80% 50% at 50% 40%, rgba(100, 100, 100, 0.15) 0%, transparent 60%),
              linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
  }

  &__wrapper {
    max-width: 1400px;
    margin: 0 auto;
  }

  &__header {
    text-align: center;
    margin-bottom: 3rem;
    
    h2 {
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0.7) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  &__resources {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  &__faq {
    display: grid;
    gap: 0.5rem;
  }
}

.resource-card {
  position: relative;
  border: 1px solid rgba(255,255,255,0.1);
  background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
  backdrop-filter: blur(12px);
  border-radius: 1.25rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  &:hover {
    border-color: rgba(255,255,255,0.2);
    transform: translateY(-2px);
    
    &::before {
      opacity: 1;
    }

    .resource-card__icon {
      transform: scale(1.05);
      color: var(--color-primary);
    }
  }

  &__icon {
    width: 2rem;
    height: 2rem;
    color: rgba(255,255,255,0.6);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.5rem;
  }

  &__actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
}

.badge {
  color: var(--color-tertiary);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
}

.faq-item {
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.02);
  backdrop-filter: blur(8px);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(255,255,255,0.04);
    border-color: rgba(255,255,255,0.12);
  }

  &[open] {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.15);

    .faq-item__icon {
      transform: rotate(180deg);
    }
  }

  &__q {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    list-style: none;
    user-select: none;

    &::-webkit-details-marker {
      display: none;
    }
  }

  &__icon {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--color-tertiary);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
  }

  &__a {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(255,255,255,0.06);
    line-height: 1.6;
  }
}

@media (max-width: 1024px) {
  .insights {
    padding: 3.5rem 6vw 4rem;
  }
}

@media (max-width: 768px) {
  .insights {
    padding: 3rem 6vw;
    
    &__resources {
      grid-template-columns: 1fr;
    }

    &__content {
      gap: 2rem;
    }
  }
}
</style>
