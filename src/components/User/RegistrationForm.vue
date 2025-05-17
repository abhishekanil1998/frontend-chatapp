<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-600 p-4">
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center transition-all duration-300 hover:shadow-3xl">
      <h2 class="text-3xl font-extrabold mb-6 text-gray-800">ChatApp Registration</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <input 
            type="tel" 
            v-model="phoneNumber" 
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition duration-300" 
            placeholder="Phone Number" 
            required
          />
        </div>
        <div class="flex space-x-2">
          <input 
            type="text" 
            v-model="otp" 
            class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition duration-300" 
            placeholder="Enter OTP" 
            required
          />
          <button 
            type="button" 
            @click="sendOtp" 
            class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg hover:opacity-90 transition-transform transform hover:scale-105">
            Send OTP
          </button>
        </div>
        <button 
          type="submit" 
          class="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-lg text-lg font-bold hover:shadow-xl hover:opacity-90 transition-transform transform hover:scale-105">
          Register
        </button>
      </form>
      <p v-if="errorMessage" class="text-red-500 text-sm mt-4 animate-bounce">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      fullName: '',
      phoneNumber: '',
      otp: '',
      otpSend: false,
      errorMessage: '',
    };
  },
  computed: {
    ...mapGetters(['getSessionId']),
    sessionId() {
      return this.getSessionId;
    }
  },
  methods: {
    async sendOtp() {
      try {
        const response = await this.$store.dispatch('login', JSON.stringify({ phoneNumber: this.phoneNumber }));
        if (response) {
          this.otpSend = true;
        }
      } catch (error) {
        this.errorMessage = 'Failed';
      }
    },
    
    handleRegister() {
      if (this.fullName && this.phoneNumber && this.otp) {
        alert('Registration successful!');
      } else {
        this.errorMessage = 'Please fill all fields correctly';
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
  background-color: #f3f4f6;
}
</style>
