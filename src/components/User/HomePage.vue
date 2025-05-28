<template>
  <v-container class="fill-height d-flex flex-column">
    <v-app-bar app color="blue darken-2" dark>
      <v-toolbar-title class="title"><h3>Chatapp</h3></v-toolbar-title>
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

       <v-btn
        class="d-flex flex-column align-center"
        @click="logout"
        plain
      >
        <v-icon>mdi-logout</v-icon>
        <span class="text-caption mt-1">logout</span>
      </v-btn>
    </v-app-bar>
    <h2>Hi {{ name }} </h2>
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
import { mapGetters } from 'vuex';

export default {
  name: "ChatPage",
  data() {
    return {
      userId: null,
      userList: [],
      selectedChat: null,
      messageText: "",
      searchQuery: "",
      name:"", 
    };
  },
  created() {
    // Set your logged-in user ID
    this.userId = this.getuserId;
    this.loadUserList(); // Load available users
  },
   computed: {
    ...mapGetters(['getuserId']),  
  },
  methods: {
    async loadUserList() {
      try {
        const userId =this.getuserId;
        const response = await this.$store.dispatch("fetchfriends", userId); 
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
    async profile() {
        try {
        const userId =this.getuserId;
          const response = await this.$store.dispatch('profile', userId);
          this.name = response.data.name;
        } catch (error) {
          console.error("Profile load failed:", error);
        }
      },
    logout() {
    this.$store.commit("logout");
    this.$router.push("/loginPage");
  },
  },
  watch: {
    searchQuery() {
      this.searchUsers();
    },
  },
  mounted(){
    this.profile();
  }
};
</script>

<style scoped>
.chat-window {
  max-height: 400px;
  overflow-y: auto;
}
.title{
  margin: 90px;
  text-align: left;
}
.search{
  width: 150px;
  font-size: large;
  border: 1px solid rgb(76, 76, 76);
  border-radius: 25px;
  padding: 5px 15px;
}
</style>
