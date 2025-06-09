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
  background: linear-gradient(120deg, #e0eafc, #fdfbfb);
  padding: 20px;
}

.form-card {
  background: #ffffff;
  padding: 2.5rem 2.5rem;
  border-radius: 20px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 440px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.form-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
}

.form-title {
  font-size: 2rem;
  text-align: center;
  font-weight: 600;
  color: #2e3a59;
  margin-bottom: 1.5rem;
  font-family: 'Poppins', sans-serif;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.4rem;
  font-weight: 500;
  font-size: 0.95rem;
  color: #34495e;
  width: 100%;
  text-align: start;
}

.form-group input {
  padding: 0.75rem 0.9rem;
  border: 1px solid #ccd6dd;
  border-radius: 12px;
  font-size: 1rem;
  background-color: #f9f9f9;
  transition: border 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus {
  border-color: #1e88e5;
  background-color: #fff;
  box-shadow: 0 0 6px rgba(30, 136, 229, 0.2);
  outline: none;
}

.continue-btn {
  background: linear-gradient(to right, #1e88e5, #42a5f5);
  color: #ffffff;
  padding: 0.9rem;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
}

.continue-btn:hover {
  background: linear-gradient(to right, #1565c0, #1e88e5);
}

</style>

