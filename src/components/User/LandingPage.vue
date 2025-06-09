<template>
  <v-container class="homepage-container fill-height d-flex flex-column align-center justify-center">
    <v-card class="main-card pa-6" max-width="800" elevation="10">
      <v-card-title class="text-h4 text-center">Zynk: Connect Through Images</v-card-title>

      <v-row class="mt-4" justify="center">
        <v-col cols="12" md="4">
          <v-card class="feature-card text-center pa-4">
            <v-icon class="mb-2" color="blue" size="48">mdi-camera</v-icon>
            <v-card-title>Share Your Moments</v-card-title>
            <v-card-text>Upload and share high-quality images instantly.</v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="feature-card text-center pa-4">
            <v-icon class="mb-2" color="green" size="48">mdi-chat</v-icon>
            <v-card-title>Real-time Chat</v-card-title>
            <v-card-text>Seamlessly chat with friends and photography lovers.</v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="feature-card text-center pa-4">
            <v-icon class="mb-2" color="purple" size="48">mdi-account-group</v-icon>
            <v-card-title>Join Communities</v-card-title>
            <v-card-text>Engage in photography groups and discussions.</v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <div class="text-center mt-6">
        <router-link to="/login">
          <v-btn class="cta-btn" large>Get Started</v-btn>
        </router-link>
      </div>
      <div class="text-center mt-4">
        <router-link class="login-link" to="/loginpage">Already a user? Login</router-link>
      </div>
    </v-card>
  </v-container>
</template>

  
  <script>
  export default {
    name: "HomePage"
  };
  </script>
  
  <style scoped>
  .homepage-container {
  padding: 24px;
  width: 100%;
  height: 100%;
}

.main-card {
  border-radius: 20px;
  background: linear-gradient(135deg, #e8ff93, hsl(114, 100%, 45%));
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.feature-card {
  border-radius: 16px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.v-icon {
  border-radius: 50%;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.05);
}

.v-card-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 8px;
}

.v-card-text {
  font-size: 15px;
  color: #555;
}

.cta-btn {
  background: linear-gradient(90deg, #1e88e5, #42a5f5);
  color: #fff;
  border-radius: 30px;
  padding: 12px 28px;
  font-weight: 500;
  font-size: 16px;
  text-transform: none;
  transition: background 0.3s ease;
}

.cta-btn:hover {
  background: linear-gradient(90deg, #1565c0, #1e88e5);
}

.login-link {
  display: inline-block;
  margin-top: 12px;
  color: #1e88e5;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.login-link:hover {
  color: #0d47a1;
  text-decoration: underline;
}

  </style>