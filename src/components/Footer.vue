<template>
  <footer class="bg-gray-800 text-white py-6">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <h2 class="text-2xl font-bold">How Can We Help?</h2>
          <p class="text-gray-400">We value your feedback. Let us know how we can improve or assist you.</p>
          <form @submit.prevent="sendFeedback" class="mt-4">
            <textarea
              v-model="feedback"
              placeholder="Enter your feedback"
              class="p-2 rounded-md text-gray-800 w-full"
              required
            ></textarea>
            <transition name="fade">
              <p v-if="message" class="text-green-400 mt-2">{{ message }}</p>
            </transition>
            <button type="submit" class="bg-primary text-white py-2 px-4 rounded-md mt-2 border border-primary hover:border-white">
              Send Feedback
            </button>
          </form>
        </div>
        <div class="text-center md:text-left">
          <p>&copy; 2024 Big News Morgans. All rights reserved.</p>
          <div class="flex justify-center md:justify-start mt-2">
            <a href="#" class="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
            <a href="#" class="text-gray-400 hover:text-white mx-2">Terms of Service</a>
          </div>
          <div class="flex justify-center md:justify-start mt-4 space-x-4">
            <a href="#" class="text-gray-400 hover:text-blue-600">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-pink-400">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-blue-400">
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      feedback: '',
      message: ''
    };
  },
  methods: {
    sendFeedback() {
      this.message = `Thank you for your feedback!`;
      this.feedback = '';

      setTimeout(() => {
        this.message = '';
      }, 2500);
    }
  }
};
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
