<template>
  <v-container class="d-flex flex-column align-center py-6">
    <!-- Dark Mode Toggle Button -->
    <v-btn @click="toggleDarkMode" icon>
      <v-icon>{{ darkMode ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>

    <!-- Profile Avatar -->
    <v-avatar size="100" class="mt-4">
      <v-img src="https://via.placeholder.com/150" alt="Profile" />
    </v-avatar>

    <!-- User Name -->
    <h2 class="mt-4">{{ user.name }}</h2>
    <p class="text-grey">{{user.mobile}}</p>

    <!-- Edit Profile Button -->
    <v-btn class="mt-3" color="primary" @click="editProfile">
      <v-icon left>mdi-pencil</v-icon> Edit Profile
    </v-btn>

    <!-- About Me & Contact Info Card -->
    <v-card class="mt-6 pa-4" max-width="400">
      <v-card-title>About Me</v-card-title>
      <v-card-text> ghsjkskbjx. </v-card-text>
      <v-divider></v-divider>

      <v-card-title>Contact Info
        {{user.mobile}}
      </v-card-title>
      <v-card-text>
       
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        mobile: "",
        about: ""
      }
    };
  },
  methods: {
    async profile() {
      try {
        const userId = 3;
        const response = await this.$store.dispatch('profile', userId);
        this.user = response.data;
      } catch (error) {
        console.error("Profile load failed:", error);
      }
    }
  },
  mounted() {
    this.profile();
  }
};
</script>

<style scoped>
.dark {
  background-color: #121212;
  color: white;
}
</style>
