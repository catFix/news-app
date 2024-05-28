<template>
    <div class="container mx-auto py-10 px-4">
      <h1 class="text-4xl font-bold text-center mb-8">Subscribe to Our Newsletter</h1>
      <p class="text-center mb-8 text-gray-700">Get the latest news and updates directly to your inbox. Choose a subscription plan that suits you best and enjoy exclusive benefits!</p>
  
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="plan-card p-6 rounded-lg shadow-lg bg-white text-center animate-slideIn flex flex-col order-1">
          <div class="flex-grow">
            <h2 class="text-2xl font-bold mb-4">Free Plan</h2>
            <p class="text-gray-600 mb-4">Get basic updates and news.</p>
            <ul class="text-left mb-4">
              <li class="mb-2">✓ Weekly newsletter</li>
              <li class="mb-2">✓ Basic news updates</li>
              <li class="mb-2">✕ Exclusive content</li>
            </ul>
          </div>
          <div>
            <button @click="openModal('Free Plan', '$0/month')" class="bg-primary text-white py-2 px-4 rounded-md border hover:border-secondary">Subscribe</button>
          </div>
        </div>
  
        <div class="plan-card p-6 rounded-lg shadow-lg bg-white text-center animate-slideIn flex flex-col order-3 md:order-2 popular-plan">
          <div class="most-popular-badge">Most Popular</div>
          <div class="flex-grow">
            <h2 class="text-2xl font-bold mb-4">Premium Plan</h2>
            <p class="text-gray-600 mb-4">$10/month</p>
            <ul class="text-left mb-4">
              <li class="mb-2">✓ Weekly newsletter</li>
              <li class="mb-2">✓ Basic news updates</li>
              <li class="mb-2">✓ Exclusive content</li>
              <li class="mb-2">✓ Ad-free experience</li>
              <li class="mb-2">✓ Live radio, podcasts and narrated articles</li>
              <li class="mb-2">✓ Unlimited digital access to our app</li>
            </ul>
          </div>
          <div>
            <button @click="openModal('Premium Plan', '$10/month')" class="bg-primary text-white py-2 px-4 rounded-md border hover:border-secondary">Subscribe</button>
          </div>
        </div>
  
        <div class="plan-card p-6 rounded-lg shadow-lg bg-white text-center animate-slideIn flex flex-col order-2 md:order-3">
          <div class="flex-grow">
            <h2 class="text-2xl font-bold mb-4">Standard Plan</h2>
            <p class="text-gray-600 mb-4">$5/month</p>
            <ul class="text-left mb-4">
              <li class="mb-2">✓ Weekly newsletter</li>
              <li class="mb-2">✓ Basic news updates</li>
              <li class="mb-2">✓ Exclusive content</li>
              <li class="mb-2">✓ Ad-free experience</li>
            </ul>
          </div>
          <div>
            <button @click="openModal('Standard Plan', '$5/month')" class="bg-primary text-white py-2 px-4 rounded-md border hover:border-secondary">Subscribe</button>
          </div>
        </div>
      </div>
  
      <BaseModal :modalActive="modalActive" @close-modal="closeModal">
        <SubscriptionForm :selectedPlan="selectedPlan" :planPrice="planPrice" @formSubmitted="handleFormSubmitted" />
      </BaseModal>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import BaseModal from '../components/BaseModal.vue';
  import SubscriptionForm from '../components/SubscriptionForm.vue';
  
  export default {
    components: {
      BaseModal,
      SubscriptionForm
    },
    setup() {
      const modalActive = ref(false);
      const selectedPlan = ref('');
      const planPrice = ref('');
  
      const openModal = (plan, price) => {
        selectedPlan.value = plan;
        planPrice.value = price;
        modalActive.value = true;
      };
  
      const closeModal = () => {
        modalActive.value = false;
      };
  
      const handleFormSubmitted = (formData) => {
        console.log(`Form submitted for ${selectedPlan.value}:`, formData);
        closeModal();
      };
  
      return {
        modalActive,
        selectedPlan,
        planPrice,
        openModal,
        closeModal,
        handleFormSubmitted
      };
    }
  };
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  @keyframes slideIn {
    0% { transform: translateY(20px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  
  .animate-fadeIn {
    animation: fadeIn 1s ease-in-out;
  }
  
  .animate-slideIn {
    animation: slideIn 0.5s ease-in-out;
  }
  
  .plan-card {
    transition: transform 0.3s;
  }
  
  .plan-card:hover {
    transform: translateY(-10px);
  }
  
  .popular-plan {
    border: 2px solid #ffcc00;
    position: relative;
    background-color: #f9fafb;
  }
  
  .most-popular-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: #ffcc00;
    color: #ffffff;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 5px;
    transform: rotate(10deg);
  }
  </style>
  