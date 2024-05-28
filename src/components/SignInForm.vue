<!-- SignInForm.vue -->
<template>
    <div class="sign-in-form">
      <h2 class="text-2xl font-bold mb-6">Sign In</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input type="email" id="email" v-model="email" class="w-full px-3 py-2 border rounded-md">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" required class="w-full px-3 py-2 border rounded-md">
        </div>
        <button type="submit" class="bg-primary text-white py-2 px-4 rounded-md w-full border hover:border-secondary">Sign In</button>
      </form>
      <div class="my-4 text-center text-gray-500">or</div>
      <button class="bg-red-500 text-white py-2 px-4 rounded-md w-full mb-2 flex items-center justify-center hover:bg-red-600">
        <i class="fab fa-google mr-2"></i> Continue with Google
      </button>
      <button class="bg-blue-600 text-white py-2 px-4 rounded-md w-full mb-2 flex items-center justify-center hover:bg-blue-700">
        <i class="fab fa-facebook mr-2"></i> Continue with Facebook
      </button>
      <button class="bg-black text-white py-2 px-4 rounded-md w-full mb-2 flex items-center justify-center hover:bg-gray-900">
        <i class="fab fa-apple mr-2"></i> Continue with Apple
      </button>
      <div class="mt-4 text-center">
        <a href="#" class="text-primary hover:underline">Don't have an account? Create one</a>
      </div>
      <div class="mt-2 text-center">
        <a href="#" class="text-primary hover:underline">Need help?</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      handleSubmit() {
        console.log(`Email: ${this.email}, Password: ${this.password}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .sign-in-form {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 15px;
  }
  </style>
  