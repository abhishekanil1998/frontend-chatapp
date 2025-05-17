<template>
    <div class="body">
      <div class="container">
        <h1>Registration</h1>
  
        <h3>Name</h3>
        <input type="text" v-model="user.name" />
  
        <h3>Mobile</h3>
        <input type="text" v-model="user.mobile" />
  
        <h3>About</h3>
        <input type="text" v-model="user.about" />
      </div>    
    </div>
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
  
  <style>
  .container {
    background-color: rgb(46, 203, 153);
    display: flex;
    flex-direction: column;
    align-items: start;
    height: 600px;
    width: 50%;
    padding: 20px;
  }
  
  .body {
    display: flex;
    flex-direction: column;
    background-color: red;
    align-items: center;
  }
  </style>
  