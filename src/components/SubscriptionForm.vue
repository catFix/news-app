<!-- SubscriptionForm.vue -->
<template>
  <div class="subscription-form">
    <h2 class="text-2xl font-bold mb-4">Subscribe to {{ selectedPlan }}</h2>
    <h3 class="text-xl font-bold mb-6 text-primary">{{ planPrice }}</h3>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="name" class="block text-gray-700">Name</label>
        <div class="relative">
          <input type="text" id="name" v-model="name" class="w-full px-3 py-2 border rounded-md pl-10">
          <i class="fa fa-user absolute left-3 top-3 text-gray-400"></i>
        </div>
        <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email</label>
        <div class="relative">
          <input type="email" id="email" v-model="email" class="w-full px-3 py-2 border rounded-md pl-10">
          <i class="fa fa-envelope absolute left-3 top-3 text-gray-400"></i>
        </div>
        <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
      </div>
      <div class="mb-4">
        <label for="address" class="block text-gray-700">Billing Address</label>
        <div class="relative">
          <input type="text" id="address" v-model="address" class="w-full px-3 py-2 border rounded-md pl-10">
          <i class="fa fa-home absolute left-3 top-3 text-gray-400"></i>
        </div>
        <p v-if="errors.address" class="text-red-500 text-sm">{{ errors.address }}</p>
      </div>
      <div class="mb-4">
        <label for="cardNumber" class="block text-gray-700">Card Number</label>
        <div class="relative">
          <input type="text" id="cardNumber" v-model="cardNumber" @input="formatCardNumber" class="w-full px-3 py-2 border rounded-md pl-10" maxlength="19">
          <i class="fa fa-credit-card absolute left-3 top-3 text-gray-400"></i>
        </div>
        <p v-if="errors.cardNumber" class="text-red-500 text-sm">{{ errors.cardNumber }}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label for="expirationDate" class="block text-gray-700">Expiration Date</label>
          <div class="relative">
            <input type="month" id="expirationDate" v-model="expirationDate" class="w-full px-3 py-2 border rounded-md pl-10">
            <i class="fa fa-calendar absolute left-3 top-3 text-gray-400"></i>
          </div>
          <p v-if="errors.expirationDate" class="text-red-500 text-sm">{{ errors.expirationDate }}</p>
        </div>
        <div>
          <label for="cvv" class="block text-gray-700">CVV</label>
          <div class="relative">
            <input type="text" id="cvv" v-model="cvv" @input="formatCVV" class="w-full px-3 py-2 border rounded-md pl-10" maxlength="3">
            <i class="fa fa-lock absolute left-3 top-3 text-gray-400"></i>
          </div>
          <p v-if="errors.cvv" class="text-red-500 text-sm">{{ errors.cvv }}</p>
        </div>
      </div>
      <button type="submit" class="bg-primary text-white py-2 px-4 rounded-md w-full border hover:border-secondary">Submit</button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  props: {
    selectedPlan: {
      type: String,
      required: true
    },
    planPrice: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: '',
      email: '',
      address: '',
      cardNumber: '',
      expirationDate: '',
      cvv: '',
      errors: {}
    };
  },
  methods: {
    handleSubmit() {
      this.errors = this.validateForm();
      if (Object.keys(this.errors).length === 0) {
        console.log(`Name: ${this.name}, Email: ${this.email}, Address: ${this.address}, Card Number: ${this.cardNumber}, Expiration Date: ${this.expirationDate}, CVV: ${this.cvv}`);
        
        Swal.fire({
          title: 'Subscription Successful!',
          text: 'Thank you for subscribing to our service.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.$emit('formSubmitted', {
          name: this.name,
          email: this.email,
          address: this.address,
          cardNumber: this.cardNumber,
          expirationDate: this.expirationDate,
          cvv: this.cvv
        });
      }
    },
    validateForm() {
      const errors = {};
      if (!this.name) errors.name = 'Name is required.';
      if (!this.email) {
        errors.email = 'Email is required.';
      } else if (!this.validateEmail(this.email)) {
        errors.email = 'Email is invalid.';
      }
      if (!this.address) errors.address = 'Billing address is required.';
      if (!this.cardNumber) {
        errors.cardNumber = 'Card number is required.';
      } else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(this.cardNumber)) {
        errors.cardNumber = 'Card number is invalid.';
      }
      if (!this.expirationDate) errors.expirationDate = 'Expiration date is required.';
      if (!this.cvv) {
        errors.cvv = 'CVV is required.';
      } else if (!/^\d{3}$/.test(this.cvv)) {
        errors.cvv = 'CVV is invalid.';
      }
      return errors;
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
      return re.test(email);
    },
    formatCardNumber() {
      this.cardNumber = this.cardNumber
        .replace(/\s+/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
        .trim();
    },
    formatCVV() {
      this.cvv = this.cvv.replace(/\D/g, '').slice(0, 3);
    }
  }
};
</script>

<style scoped>
.subscription-form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.subscription-form i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
