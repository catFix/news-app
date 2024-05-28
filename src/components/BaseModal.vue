<template>
    <Teleport to="body">
      <Transition name="modal-outer">
        <div
          v-show="modalActive"
          class="fixed w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center items-center mt-12 px-4"
          @click="handleOverlayClick"
        >
          <Transition name="modal-inner">
            <div
              v-if="modalActive"
              class="p-4 bg-white max-w-screen-md w-full rounded-xl overflow-y-auto shadow-lg"
              style="max-height: 80vh;"
              @click.stop
            >
              <slot />
              <button
                class="mt-8 bg-primary text-white py-2 px-6 rounded-md border border-transparent hover:bg-white hover:text-primary hover:border-primary duration-150"
                @click="$emit('close-modal')"
              >
                Close
              </button>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </template>
  
  <script setup>
  const emit = defineEmits(["close-modal"]);
  const props = defineProps({
    modalActive: {
      type: Boolean,
      default: false,
    },
  });
  
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      emit('close-modal');
    }
  };
  </script>
  
  <style scoped>
  .modal-outer-enter-active,
  .modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
  
  .modal-outer-enter-from,
  .modal-outer-leave-to {
    opacity: 0;
  }
  
  .modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
  }
  
  .modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
  
  .modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
  }
  
  .modal-inner-leave-to {
    transform: scale(0.8);
  }
  </style>
  