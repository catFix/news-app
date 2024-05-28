<template>
  <div class="search-filter bg-white p-4 rounded-lg shadow-lg mb-8 mt-6 relative">
    <div class="flex gap-4 mb-4">
  <input v-model="searchQuery" type="text" placeholder="Search news..." class="input-field flex-1" />
  <i @click="toggleFilter" class="fas fa-filter cursor-pointer text-xl text-cyan-700 hover:text-cyan-900 duration-200"></i>
</div>


    <transition name="slide-fade">
      <div v-if="showFilter" class="flex flex-col gap-4">
        <div class="flex gap-4">
          <input v-model="startDate" type="date" class="input-field" />
          <input v-model="endDate" :min="startDate" type="date" class="input-field" />
        </div>
        <input v-model="source" type="text" placeholder="Source (e.g., techcrunch)" class="input-field" />
      </div>
    </transition>

    <div class="flex gap-4 mt-4">
      <button @click="applyFilters" class="btn-apply">Search</button>
      <div class="ml-auto flex gap-4">
        <button @click="resetFilters" class="btn-reset">Reset</button>
        <button @click="closeSearch" class="btn-close">Close</button>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  emits: ["search", "close-search"],
  setup(props, { emit }) {
    const searchQuery = ref("");
    const startDate = ref("");
    const endDate = ref("");
    const source = ref("");
    const showFilter = ref(false);

    const toggleFilter = () => {
      showFilter.value = !showFilter.value;
    };

    const applyFilters = () => {
      emit("search", {
        query: searchQuery.value,
        startDate: startDate.value,
        endDate: endDate.value,
        source: source.value,
      });
    };

    const resetFilters = () => {
      searchQuery.value = "";
      startDate.value = "";
      endDate.value = "";
      source.value = "";
      // showFilter.value = false;
    };

    const closeSearch = () => {
      emit("close-search");
    };

    watch(startDate, (newStartDate) => {
      if (newStartDate && new Date(endDate.value) < new Date(newStartDate)) {
        endDate.value = "";
      }
    });

    return {
      searchQuery,
      startDate,
      endDate,
      source,
      showFilter,
      toggleFilter,
      applyFilters,
      resetFilters,
      closeSearch,
    };
  },
};
</script>

<style scoped>
.input-field {
  @apply p-2 border rounded-md flex-1;
}

.btn-filter, .btn-apply, .btn-reset, .btn-close {
  @apply bg-primary text-white py-2 px-4 rounded-md border border-transparent hover:bg-white hover:text-primary hover:border-primary duration-150;
}

.search-filter {
  @apply bg-white p-4 rounded-lg shadow-lg mb-8;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
