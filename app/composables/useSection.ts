import { useConfigStore } from '~/store/config';

type Visualize = {
  onVisible: () => void;
  onHidden: () => void;
};

export const useSection = (section: Section, visualize?: Visualize) => {
  const configStore = useConfigStore();
  const { visibleSections } = storeToRefs(configStore);

  const isVisible = computed(() => {
    return visibleSections.value.includes(section);
  });

  if (visualize) {
    watch(
      isVisible,
      (newVal) => {
        if (newVal) {
          visualize.onVisible();
        } else {
          visualize.onHidden();
        }
      },
    );

    onMounted(async () => {
      await nextTick();
      if (isVisible.value) {
        visualize.onVisible();
      }
    });

    onBeforeUnmount(() => {
      visualize.onHidden();
    });
  }

  return {
    isVisible,
    configStore,
  };
};
