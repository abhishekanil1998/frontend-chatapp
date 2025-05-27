<template>
    <v-container class="fill-height d-flex flex-column align-center justify-center">
      <v-card class="pa-6" max-width="800" elevation="10">
        <v-card-title class="text-h4 text-center">Zynk: Connect Through Images</v-card-title>
        
        <v-row class="mt-4" justify="center">
          <v-col cols="12" md="4">
            <v-card class="text-center pa-4">
              <v-icon class="mb-2" color="blue" size="48">mdi-camera</v-icon>
              <v-card-title>Share Your Moments</v-card-title>
              <v-card-text>Upload and share high-quality images instantly.</v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="4">
            <v-card class="text-center pa-4">
              <v-icon class="mb-2" color="green" size="48">mdi-chat</v-icon>
              <v-card-title>Real-time Chat</v-card-title>
              <v-card-text>Seamlessly chat with friends and photography lovers.</v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="4">
            <v-card class="text-center pa-4">
              <v-icon class="mb-2" color="purple" size="48">mdi-account-group</v-icon>
              <v-card-title>Join Communities</v-card-title>
              <v-card-text>Engage in photography groups and discussions.</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        
        <div class="text-center mt-6">
          <router-link to="/login"><v-btn color="blue darken-1" large class="white--text">Get Started</v-btn></router-link>
        </div>
        <div class="text-center mt-6">
          <router-link to="/loginpage"><v-btn color="blue darken-1" large class="white--text">Login</v-btn></router-link>
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
  </style>