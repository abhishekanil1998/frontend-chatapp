<template>
  <div class="login-container">
    <div class="form-card">
      <h2 class="form-title">Login</h2>
      <form @submit.prevent="handleLogin" class="form">
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input
            id="phone"
            v-model="mobile"
            type="tel"
            placeholder="Enter phone number"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" class="login-btn">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
     
        mobile: '',
        password: ''
      
    }
  },
  methods: {
    async handleLogin() {
      if (!this.mobile || !this.password) {
        alert("Please fill in all fields");
        return;
      }

      try {
        const payload = {
          mobile: this.mobile,
          password: this.password,
        };
        // Replace with actual Vuex or API login call
         const response = await this.$store.dispatch('loginPage',payload)

        if (response) {
          this.$router.push('/HomePage');
        } else {
          alert('Login failed. Please check your credentials.');
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Login failed: " + err.message);
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #eef2f7;
}

.form-card {
  background-color: white;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
  width: 100%;
  text-align: start;
}

.form-group input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus {
  border-color: #007bff;
}

.login-btn {
  background-color: #007bff;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.login-btn:hover {
  background-color: #0056b3;
}
</style>
