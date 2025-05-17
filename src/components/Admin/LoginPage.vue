<template>
  <v-container
    fill-height
    class="d-flex justify-center align-center min-vh-100"
  >
    <v-card class="pa-6" elevation="8" max-width="400">
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
}
</style>
