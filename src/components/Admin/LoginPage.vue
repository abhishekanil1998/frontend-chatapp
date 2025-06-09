<template>
  <v-container
    fill-height
    class="d-flex justify-center align-center min-vh-100"
  >
    <v-card class="pa-6" elevation="8">
      <v-card-title class="text-center text-h5 font-weight-bold">
        Admin Login
      </v-card-title>
      <v-card-text>
        <v-form ref="loginForm" @submit.prevent="login">
          <v-text-field
            v-model="username"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-btn type="submit" color="primary" block class="mt-3">Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
  if (!this.username || !this.password) {
    alert("Please enter both username and password.");
    return;
  }

  try {
    const payload = {
      username: this.username,
      password: this.password,
    };

    const response = await this.$store.dispatch("adminlogin", payload);

    if (response.success) {
      this.$router.push("/admindashboard");
    } else {
      alert(response.message || "Invalid credentials.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred during login.");
  }
},
  },
};
</script>

<style scoped>
.min-vh-100 {
  min-height: 100vh;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  font-family: 'Poppins', sans-serif;
}

.pa-6 {
  width: 100%;
  max-width: 420px;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  transition: box-shadow 0.3s ease;
}

.pa-6:hover {
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
}

.v-card-title {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 8px;
}

.v-card-text {
  padding-top: 0;
}

.v-text-field input {
  border-radius: 8px !important;
  background-color: #f9f9f9 !important;
}

.v-text-field input:focus {
  box-shadow: 0 0 6px rgba(33, 150, 243, 0.25);
}

.v-btn {
  font-weight: 600;
  font-size: 1rem;
  border-radius: 30px;
  padding: 12px 0;
  transition: background 0.3s ease;
}

.v-btn:hover {
  background-color: #1565c0 !important;
}

</style>
