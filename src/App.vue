<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-gray-100">
    <SiteNav />
    <main class="flex-grow pb-24">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
  import { RouterView } from 'vue-router';
  import SiteNav from './components/SiteNav.vue';
  import Footer from '@/components/Footer.vue';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  @apply bg-gray-100;
}

.text-primary {
  @apply text-blue-600;
}

.bg-primary {
  @apply bg-blue-600;
}

.bg-secondary {
  @apply bg-blue-800;
}
</style>
