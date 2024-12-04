<template>
  <div class="person">
    <NuxtImg
      class="person__img"
      src="~/assets/images/person.jpg"
      format="webp"
      alt="Person"
    />
    <p class="person__name">John Doe</p>
    <p class="person__role">CEO</p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.person {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.person__img {
  width: 140px;
  height: 140px;
  border-radius: 2rem;
}

.person__name {
  font-size: 1.5rem;
  font-weight: bold;
}

.person__role {
  font-size: 1rem;
  color: var(--color);
  opacity: var(--opacity-secondary);
}
</style>
