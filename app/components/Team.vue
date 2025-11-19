<template>
  <section class="team">
    <div class="team__members">
      <TeamMember v-for="member in members" :key="member.title" :member="member" />
    </div>
    <div class="team__main-content">
      <p class="team__title h4">The Team Behind the Craft</p>
      <p class="team__description p1">
        A collective of <strong>14+ engineers, designers, and strategists</strong> with deep expertise across blockchain, AI, and modern web architecture.
      </p>
    </div>
    <div class="team__additional-content">
      <p class="team__description p1">
        We've built production systems for ambitious projects—from NFT marketplaces to voice AI launchpads to cross-chain infrastructure. Real solutions, deployed and trusted.
      </p>
      <p class="team__description p1">
        Every project benefits from this collective experience, paired with an <strong>obsessive attention to detail</strong> that defines our work.
      </p>
      <Button
        class="team__button"
        type="secondary"
        :href="telegram"
      >
        Subscribe to our updates
      </Button>
    </div>
  </section>
</template>

<script setup lang="ts">
const members: TeamMember[] = [
  {
    title: 'Stefan',
    desc: 'CEO',
    socials: [
      { type: 'telegram', href: 'https://t.me/stefanpopov' },
      { type: 'github', href: 'https://github.com/stefashkaa' },
      { type: 'email', href: 'mailto:stefan@desource-labs.org' },
    ],
    photo: '/img/team/1.png'
  },
  { title: 'Design team', desc: '2 members', socials: [], photo: '/img/team/2.png' },
  { title: 'Full-stack team', desc: '10 members', socials: [], photo: '/img/team/3.png' },
  { title: 'Blockchain team', desc: '2 members', socials: [], photo: '/img/team/4.png' },
];

const telegram = socialMedia.telegram;
</script>

<style scoped>
.team {
  display: grid;
  grid-template-areas: 
    "members main-content"
    "members additional-content";
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  align-items: center;
  padding: 10rem 6vw;
}
.team__members {
  grid-area: members;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  align-items: self-start;
  justify-items: center;
}
.team__main-content,
.team__additional-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.team__main-content {
  grid-area: main-content;
}
.team__additional-content {
  grid-area: additional-content;
}
.team__members > *:nth-child(2n) {
  margin-top: 2rem;
}
.team__description {
  line-height: 1.5;
  color: var(--color-secondary);
}
.team__description > strong {
  color: var(--color-primary);
}
.team__button {
  width: 350px;
}
@media (max-width: 1024px) {
  .team {
    padding: 6rem 2rem;
  }
}
@media (max-width: 768px) {
  .team {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem 10vw;
  }
  .team__main-content {
    order: 1;
  }
  .team__members {
    order: 2;
  }
  .team__additional-content {
    order: 3;
  }
  .team__title {
    text-align: center;
  }
  .team__description {
    text-align: center;
  }
  .team__additional-content .team__description {
    text-wrap-style: balance;
  }
  .team__button {
    align-self: center;
  }
}
@media (max-width: 640px) {
  .team__button {
    width: 100%;
  }
}
@media (max-width: 320px) {
  .team {
    padding: 2rem 1.4rem;
  }
}
</style>
