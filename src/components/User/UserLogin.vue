<template>
  <div class="body">
    <div class="loginbox">
      <h1>Register</h1>
      <label for="phoneNumber">Phone Number</label>
      <input 
        type="text" 
        id="phoneNumber" 
        placeholder="Enter Phone Number" 
        v-model="phoneNumber"
      />
      <!-- ✅ Use a button instead of router-link to ensure phoneNumber is set before navigation -->
      <button id="otpbtn" @click="sendOtp">Send OTP</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: '',
      errorMessage: '',
      otpSend: false,
    };
  },
  methods: {
    async sendOtp() {
      if (!this.phoneNumber) {
        this.errorMessage = "Please enter a phone number";
        return;
      }

      try {
        const response = await this.$store.dispatch('login', { phoneNumber: this.phoneNumber });
        if (response) {
          this.otpSend = true;
          // ✅ Correctly navigate to sendotp with phoneNumber
          this.$router.push({ path: '/sendotp', query: { phoneNumber: this.phoneNumber } });
        } else {
          this.errorMessage = "Failed to send OTP";
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        this.errorMessage = "Failed to send OTP";
      }
    }
  }
};
</script>



<style scoped>
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  font-family: 'Poppins', sans-serif;
  padding: 16px;
}

.loginbox {
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center;
  transition: transform 0.3s ease;
}

.loginbox:hover {
  transform: translateY(-4px);
}

h1 {
  font-size: 2rem;
  color: #2e3a59;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  text-align: left;
  color: #34495e;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

input {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 1.5rem;
}

input:focus {
  border-color: #1e88e5;
  box-shadow: 0 0 6px rgba(30, 136, 229, 0.3);
  background-color: #fff;
  outline: none;
}

#otpbtn {
  width: 100%;
  background: linear-gradient(to right, #1e88e5, #42a5f5);
  color: white;
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

#otpbtn:hover {
  background: linear-gradient(to right, #1565c0, #1e88e5);
  transform: scale(1.03);
}

.error-message {
  color: #e53935;
  font-size: 14px;
  margin-top: 10px;
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

</style>
