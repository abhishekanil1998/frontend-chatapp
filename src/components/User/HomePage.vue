<template>
  <v-container class="fill-height d-flex flex-column">
    <v-app-bar app color="blue darken-2" dark>
      <v-toolbar-title>Chatapp</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn class="d-flex flex-column align-center" @click="$router.push('/profile')" plain>
        <v-icon>mdi-account</v-icon>
        <span class="text-caption mt-1">Profile</span>
      </v-btn>
    </v-app-bar>

    <v-container fluid class="d-flex">
      <v-navigation-drawer app permanent>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">Search Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-text-field
              v-model="searchQuery"
              label="Search by name"
              dense
              @keyup.enter="searchUsers"
              append-icon="mdi-magnify"
              @click:append="searchUsers"
            ></v-text-field>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            v-for="(user, index) in searchResults"
            :key="index"
            link
            @click="selectUser(user)"
          >
            <v-list-item-avatar>
              <v-img :src="user.avatar || 'https://via.placeholder.com/40'"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="pa-4">
        <v-card v-if="selectedChat" class="fill-height">
          <v-card-title>{{ selectedChat.name }}</v-card-title>
          <v-divider></v-divider>
          <v-container class="chat-window">
            <v-row v-for="(message, index) in selectedChat.messages" :key="index">
              <v-col :class="message.sender === 'me' ? 'text-right' : 'text-left'">
                <v-chip :color="message.sender === 'me' ? 'blue' : 'grey'" dark>
                  {{ message.text }}
                </v-chip>
              </v-col>
            </v-row>
          </v-container>
          <v-divider></v-divider>
          <v-text-field
            v-model="messageText"
            label="Type a message"
            append-icon="mdi-send"
            @click:append="sendMessage"
            @keyup.enter="sendMessage"
          ></v-text-field>
        </v-card>
        <v-card v-else class="fill-height d-flex align-center justify-center">
          <v-card-title>Select a user to start messaging</v-card-title>
        </v-card>
      </v-main>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "ChatPage",
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      selectedChat: null,
      messageText: "",
    };
  },
  methods: {
    async searchUsers() {
      try {
        const name=this.searchQuery;
        const response = await this.$store.dispatch(`searchuser`,name);
        this.searchResults = response.data;
      } catch (error) {
        console.error("Search failed:", error);
      }
    },

    selectUser(user) {
      this.selectedChat = {
        name: user.name,
        messages: [],
      };
    },

    sendMessage() {
      if (this.selectedChat && this.messageText.trim() !== "") {
        this.selectedChat.messages.push({
          sender: "me",
          text: this.messageText,
        });
        this.messageText = "";
      }
    },
  },
};
</script>

<style scoped>
.chat-window {
  max-height: 400px;
  overflow-y: auto;
}
</style>
