<template>
  <header class="sticky top-0 bg-secondary shadow-lg z-50">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <img src="../img/News-Logo.png" alt="Big News Morgans" class="w-8 h-8">
          <p>Big News Morgans</p>
        </div>
      </RouterLink>

      <div class="flex items-center gap-3 flex-1 justify-end">
        <i 
          v-if="isHomeRoute"
          class="fa-solid fa-magnifying-glass text-xl hover:text-amber-100 duration-150 cursor-pointer"
          @click="toggleSearch"
        ></i>
        <RouterLink :to="{ name: 'subscription' }">
          <div class="button rounded cursor-pointer hover:text-black" id="button-2">
            <div id="slide"></div>
              <p>Subscribe</p>
            </div>
        </RouterLink>
        <div class="button rounded cursor-pointer hover:text-black" id="button-2" @click="openSignInModal">
          <div id="slide"></div>
          <p>Sign In</p>
        </div>
      </div>

      <BaseModal :modalActive="signInModalActive" @close-modal="closeSignInModal">
        <SignInForm />
      </BaseModal>
    </nav>
  </header>
</template>

<script>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import BaseModal from "./BaseModal.vue";
import SignInForm from '../components/SignInForm.vue';
import { emit } from "../utils/eventBus";
import { useRoute } from 'vue-router';

export default {
  components: {
    RouterLink,
    BaseModal,
    SignInForm
  },
  setup() {
    const route = useRoute();
    const isHomeRoute = computed(() => route.name === 'home');

    const signInModalActive = ref(false);

    const openSignInModal = () => {
      signInModalActive.value = true;
    };

    const closeSignInModal = () => {
      signInModalActive.value = false;
    };

    const toggleSearch = () => {
      emit('toggle-search');
    };

    return {
      isHomeRoute,
      signInModalActive,
      openSignInModal,
      closeSignInModal,
      toggleSearch
    };
  }
};
</script>

<style scoped>
.button{
  padding: 4px;
}
#button-2 {
  position: relative;
  overflow: hidden;
}
#button-2 p {
  position: relative;
  transition: all .35s ease-Out;
  padding: 4px;
}
#slide {
  width: 100%;
  height: 100%;
  left: -200px;
  background: #7dbefa;
  position: absolute;
  transition: all .35s ease-Out;
  bottom: 0;
}
#button-2:hover #slide {
  left: 0;
}

.header {
  @apply bg-blue-600 shadow-lg;
}

.header nav {
  @apply container flex flex-col sm:flex-row items-center gap-4 text-white py-6;
}
</style>
