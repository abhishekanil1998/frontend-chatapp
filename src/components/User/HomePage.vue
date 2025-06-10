<template>
  <v-container fluid class="fill-height pa-0">
    <v-app-bar app color="indigo darken-3" dark dense>
      <v-toolbar-title class="text-h5">Zink</v-toolbar-title>
      <v-spacer />
      <span class="mr-4">Hi, {{ name }}</span>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon @click="$router.push('/profile')">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-row class="fill-height ma-0">
      <v-col cols="3" class="grey lighten-4 pa-4">
        <v-text-field
          v-model="searchQuery"
          label="Search Users"
          prepend-inner-icon="mdi-magnify"
          dense
          outlined
          hide-details
          class="mb-4"
        />

        <v-list dense>
          <v-list-item id="friends"
            v-for="(user, index) in userList"
            :key="index"
            link
            @click="selectUser(user)"
          >
            <v-list-item-avatar>
              <v-img :src="user.avatar || 'https://via.placeholder.com/40'" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- Chat Area -->
      <v-col cols="9" class="pa-4">
        <v-card v-if="selectedChat" class="fill-height d-flex flex-column">
          <v-card-title class="blue--text text--darken-2">
            {{ selectedChat.name }}
          </v-card-title>
          <v-divider />

          <!-- Messages -->
          <v-card-text class="chat-window flex-grow-1">
            <div
              v-for="(message, index) in selectedChat.messages"
              :key="index"
              :class="['message-row', message.sender === 'me' ? 'sent' : 'received']"
            >
              <div class="chat-bubble">
                <div v-if="message.text" class="chat-text">
                  {{ message.text }}
                </div>
                <img
                  v-if="message.image"
                  :src="'data:image/jpeg;base64,' + message.image"
                  class="chat-image"
                />
                <div class="chat-time">
                  {{ new Date(message.time).toLocaleTimeString() }}
                </div>
              </div>
            </div>
          </v-card-text>

          <v-divider />

          <!-- Input Area -->
          <v-card-actions>
            <v-row no-gutters class="align-center w-100">
              <v-col cols="3">
                <v-file-input
                  v-model="photo"
                  accept="image/*"
                  prepend-icon="mdi-image"
                  dense
                  outlined
                  hide-details
                  label="Image"
                />
              </v-col>
              <v-col cols="9">
                <v-text-field
                  v-model="messageText"
                  label="Type a message"
                  append-icon="mdi-send"
                  @click:append="sendMessage(); sendImage();"
                  @keyup.enter="sendMessage"
                  dense
                  outlined
                  hide-details
                />
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>

        <v-card v-else class="fill-height d-flex align-center justify-center">
          <v-card-title>Select a user to start messaging</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "ChatPage",
  data() {
    return {
      userId: null,
      userList: [],
      selectedChat: null,
      messageText: "",
      searchQuery: "",
      name: "",
    };
  },
  created() {
    // Set your logged-in user ID
    this.userId = this.getuserId;
    this.loadUserList(); // Load available users
  },
  computed: {
    ...mapGetters(["getuserId"]),
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$el.querySelector(".chat-window");
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    async loadUserList() {
      try {
        const userId = this.getuserId;
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
          this.scrollToBottom();
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
          image: msg.image || null,
          time: msg.time,
        }));
        this.scrollToBottom();
      } else {
        alert("Failed to load messages: " + response.error);
      }
    },
    async sendImage() {
      if (this.selectedChat && this.photo) {
        const formData = new FormData();
        formData.append("senderId", this.userId);
        formData.append("receiverId", this.selectedChat.userId);
        formData.append("image", this.photo);
        if (this.messageText.trim() !== "") {
          formData.append("content", this.messageText.trim());
        }

        const response = await this.$store.dispatch("sendImage", formData);

        if (response.success) {
          this.selectedChat.messages.push({
            sender: "me",
            text: this.messageText.trim() || null,
            image: this.photo ? URL.createObjectURL(this.photo) : null,
            time: new Date().toISOString(),
          });
          await this.loadMessages();
          this.scrollToBottom();
          this.messageText = "";
          this.photo = null;
        } else {
          alert("Failed to send image: " + response.error);
        }
      }
    },
    async searchUsers() {
      const query = this.searchQuery.trim();

      if (!query) {
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
        const userId = this.getuserId;
        const response = await this.$store.dispatch("profile", userId);
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
  mounted() {
    this.profile();
  },
};
</script>

<style scoped>
.chat-window {
  overflow-y: auto;
  background-color: #f9f9f9;
  padding: 12px;
  height: 100px;
}
.text-h5{
  text-align: start;
}
#friends{
  border-bottom: 1px solid rgb(133, 133, 133);
  background-color: rgb(219, 219, 221);
}
.message-row {
  display: flex;
  margin-bottom: 10px;
}

.message-row.sent {
  justify-content: flex-end;
}

.message-row.received {
  justify-content: flex-start;
}

.chat-bubble {
  background-color: #e3f2fd;
  padding: 10px 14px;
  border-radius: 10px;
  max-width: 60%;
  word-wrap: break-word;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.message-row.sent .chat-bubble {
  background-color: #c8e6c9;
}

.chat-text {
  white-space: pre-wrap;
}

.chat-time {
  font-size: 0.7rem;
  text-align: right;
  margin-top: 5px;
  color: #888;
}

.chat-image {
  max-width: 100%;
  margin-top: 5px;
  border-radius: 6px;
}


</style>
