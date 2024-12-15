<template>
  <div :key="member.title" class="team__member">
    <NuxtImg
      class="team__photo"
      :src="member.photo"
      :alt="`Team member ${member.title}`"
      width="140"
      height="140"
      quality="75"
      format="webp"
      loading="lazy"
    />
    <p class="bolder p3">{{ member.title }}</p>
    <p class="bolder p3 secondary">{{ member.desc }}</p>
    <div v-once class="team__socials secondary">
      <Social
        v-for="social in member.socials"
        size="1.2rem"
        :key="social.type"
        :aria-label="`Visit ${member.title} ${social.type}`"
        :type="social.type"
        :href="social.href"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TeamMember } from '~/types';

defineProps<{
  member: TeamMember;
}>();
</script>

<style scoped>
.team__member {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.team__photo {
  border-radius: 1rem;
}
.bolder {
  font-weight: 500;
}
.team__socials {
  align-items: center;
  display: inline-flex;
  gap: 0.5rem;
}
</style>
