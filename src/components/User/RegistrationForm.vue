<template>
  <div class="register-container">
    <div class="form-card">
      <h2 class="form-title">Register</h2>
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="Enter username"
            required
          />
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            placeholder="Enter full name"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="text"
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" class="continue-btn">Continue</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        username: '',
        name: '',
        password: '',
        sessionId: ''
      }
    }
  },
  created() {
    this.form.sessionId = this.$route.query.session || ''
  },
  methods: {
   async handleSubmit() {
  if (!this.form.sessionId) {
    alert('Session ID is missing. Please verify your phone via OTP before registering.')
    return
  }

  const { sessionId, ...userData } = this.form; // 🔥 Extract sessionId separately

  try {
const response = await axios.post(
  `http://localhost:8088/Userdetails/signup?sessionId=${sessionId}`,
  userData, // Only user model data goes in the body
  {
    headers: {
      "Content-Type": "application/json"
    }
  }
);
 // 🔥 Send separately
    if (response) {
      this.$router.push('/loginPage')
    } else {
      throw new Error('Registration failed')
    }
  } catch (error) {
    console.error('Registration error:', error.message)
    alert('Registration failed: ' + error.message)
  }
}

  }
}
</script>
<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #e0eafc, #cfdef3);
}

.form-card {
  background-color: #ffffff;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  transition: transform 0.3s ease;
}

.form-card:hover {
  transform: translateY(-2px);
}

.form-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 600;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #444;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  outline: none;
}

.form-group input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

.continue-btn {
  background-color: #007bff;
  color: #fff;
  padding: 0.9rem;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.continue-btn:hover {
  background-color: #0056b3;
}
</style>

