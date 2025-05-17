<template>
  <div class="body">
    <div class="loginbox">
      <h1>Login</h1>
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
  background-color: #ffffff;
}

.loginbox {
  width: 400px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #0e3e87;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

label {
  width: 100%;
  text-align: start;
  margin-bottom: 10px;
}

input {
  width: 100%;
  border-radius: 4px;
  border: none;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #ababab;
}

input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
  outline: none;
}

#otpbtn {
  width: 100%;
  background: linear-gradient(to right, #0f0f10, #a855f7);
  color: white;
  padding: 14px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  border: none;
}

#otpbtn:hover {
  transform: scale(1.05);
}

.error-message {
  color: red;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  animation: bounce 0.5s;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
</style>
