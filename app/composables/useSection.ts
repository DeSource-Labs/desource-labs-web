import { useConfigStore } from '~/store/config';

export const useSection = (section: Section) => {
  const configStore = useConfigStore();
  const { visibleSections } = storeToRefs(configStore);

  const isVisible = computed(() => {
    return visibleSections.value.includes(section);
  });

  return {
    isVisible,
    configStore,
  };
};
