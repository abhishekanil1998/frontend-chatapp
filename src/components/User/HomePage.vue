<template>
  <v-container class="fill-height d-flex flex-column">
    <v-app-bar app color="blue darken-2" dark>
      <v-toolbar-title>Chatapp</v-toolbar-title>
      <v-spacer> </v-spacer>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn
        class="d-flex flex-column align-center"
        @click="$router.push('/profile')"
        plain
      >
        <v-icon>mdi-account</v-icon>
        <span class="text-caption mt-1">Profile</span>
      </v-btn>
    </v-app-bar>

    <v-container fluid class="d-flex">
      <v-navigation-drawer app permanent>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6"
                ><input
                  type="text"
                  name="search"
                  v-model="searchQuery"
                  @input="searchUsers"
                  class="search"
                  placeholder="Search Users "
                />
                <v-icon large color="black" class="searchicon" size="35px"
                  >mdi-magnify</v-icon
                ></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            v-for="(user, index) in userList"
            :key="index"
            link
            @click="selectUser(user)"
          >
            <v-list-item-avatar>
              <v-img
                :src="user.avatar || 'https://via.placeholder.com/40'"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="pa-4">
        <v-card v-if="selectedChat" class="fill-height d-flex flex-column">
          <v-card-title>{{ selectedChat.name }}</v-card-title>
          <v-divider></v-divider>
          <v-container class="chat-window flex-grow-1 overflow-auto">
            <v-row
              v-for="(message, index) in selectedChat.messages"
              :key="index"
              class="mb-2"
            >
              <v-col
                :class="message.sender === 'me' ? 'text-right' : 'text-left'"
              >
                <v-chip
                  :color="
                    message.sender === 'me'
                      ? 'blue lighten-2'
                      : 'grey lighten-1'
                  "
                  dark
                  class="ma-1"
                >
                  {{ message.text }}
                </v-chip>
                <div class="text-caption grey--text">
                  {{ new Date(message.time).toLocaleTimeString() }}
                </div>
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
      userId: null,
      userList: [],
      selectedChat: null,
      messageText: "",
      searchQuery: "", // ✅ Add this
    };
  },
  created() {
    // Set your logged-in user ID
    this.userId = 1;
    this.loadUserList(); // Load available users
  },
  methods: {
    async loadUserList() {
      try {
        const response = await this.$store.dispatch("fetchfriends", 1); // Create this action in Vuex
        if (response.success) {
          this.userList = response.data.filter(
            (user) => user.userId !== this.userId
          );
        }
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    },

    async selectUser(user) {
      this.selectedChat = {
        name: user.name,
        userId: user.userId,
        messages: [],
      };
      await this.loadMessages();
    },

    async sendMessage() {
      if (this.selectedChat && this.messageText.trim() !== "") {
        const messageDto = {
          senderId: this.userId,
          receiverId: this.selectedChat.userId,
          content: this.messageText.trim(),
        };

        const response = await this.$store.dispatch("sendMessage", messageDto);

        if (response.success) {
          this.selectedChat.messages.push({
            sender: "me",
            text: this.messageText.trim(),
            time: new Date().toISOString(),
          });
          this.messageText = "";
        } else {
          alert("Failed to send message: " + response.error);
        }
      }
    },

    async loadMessages() {
      const response = await this.$store.dispatch("fetchMessages", {
        senderId: this.userId,
        receiverId: this.selectedChat.userId,
      });

      if (response.success) {
        let messages = response.data;
        if (!Array.isArray(messages)) messages = [messages];

        this.selectedChat.messages = messages.map((msg) => ({
          sender: msg.senderId === this.userId ? "me" : "them",
          text: msg.content,
          time: msg.time,
        }));
      } else {
        alert("Failed to load messages: " + response.error);
      }
    },
    async searchUsers() {
      const query = this.searchQuery.trim();

      if (!query) {
        // Empty search, reload full list
        console.log("🔁 Search query cleared. Reloading full user list...");
        this.loadUserList();
        return;
      }

      console.log("🔍 Searching for users with query:", query);

      const response = await this.$store.dispatch("searchUsers", {
        name: query,
      });

      if (response.success) {
        this.userList = response.data.filter(
          (user) => user.userId !== this.userId
        );
      } else {
        console.warn("No users found for search");
        this.userList = [];
      }
    },
  },
  watch: {
    searchQuery() {
      this.searchUsers();
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
