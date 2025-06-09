<template>
  <v-container class="fill-height d-flex flex-column" id="container">
    <v-app-bar app color="blue darken-2" dark >
      <v-toolbar-title class="title"><h3>Chatapp</h3></v-toolbar-title>
      <v-spacer><h2>Hi {{ name }}</h2></v-spacer>
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
      <v-btn class="d-flex flex-column align-center" @click="logout" plain>
        <v-icon>mdi-logout</v-icon>
        <span class="text-caption mt-1">logout</span>
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
            @click="selectUser(user)" class="user"
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

    <!-- Chat Messages Container -->
    <v-container class="chat-window flex-grow-1 overflow-y-auto">
      <div
        v-for="(message, index) in selectedChat.messages"
        :key="index"
        :class="['message-row', message.sender === 'me' ? 'sent' : 'received']"
      >
        <!-- Chat Bubble -->
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
    </v-container>

    <v-divider></v-divider>

    <!-- Message Input Area -->
    <v-row class="pa-2 align-center">
      <v-col cols="2">
      <v-file-input
  v-model="photo"
  label="Upload Image"
  accept="image/*"
  prepend-icon="mdi-upload"
  class="custom-file-input"
  hide-details
  dense
  outlined
  show-size
  truncate-length="15"
/>


      </v-col>

      <v-col cols="10">
        <v-text-field
          v-model="messageText"
          label="Type a message"
          append-icon="mdi-send"
          @click:append="sendMessage(); sendImage();"
          @keyup.enter="sendMessage"
          dense
          hide-details
        />
      </v-col>
    </v-row>
  </v-card>

  <v-card v-else class="fill-height d-flex align-center justify-center">
    <v-card-title>Select a user to start messaging</v-card-title>
  </v-card>
</v-main>

    </v-container>
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
    const container = this.$el.querySelector('.chat-window');
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
  max-height: 300px;
  overflow-y: auto;
}
.title {
  /* margin: 90px; */
  text-align: left;
}
.user{
  border-bottom: 1px solid rgba(0, 0, 0, 0.58);
}
.search {
  width: 150px;
  font-size: large;
  border: 1px solid rgb(76, 76, 76);
  border-radius: 25px;
  padding: 5px 15px;
}
.message-image {
  max-width: 300px;
}
.chat-window {
  max-height: 70vh;
  overflow-y: auto;
  padding: 10px;
  background-color: #f5f5f5;
}

.message-row {
  display: flex;
  margin-bottom: 12px;
}

.message-row.sent {
  justify-content: flex-end;
}

.message-row.received {
  justify-content: flex-start;
}

.chat-bubble {
  background-color: #e0f7fa;
  padding: 10px 15px;
  border-radius: 12px;
  max-width: 60%;
  word-wrap: break-word;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  position: relative;
}

.message-row.sent .chat-bubble {
  background-color: #bbdefb;
  align-self: flex-end;
}

.chat-image {
  max-width: 100%;
  border-radius: 8px;
  margin-top: 5px;
}

.chat-text {
  white-space: pre-wrap;
}

.chat-time {
  font-size: 0.7rem;
  color: gray;
  text-align: right;
  margin-top: 4px;
}

.custom-file-input {
  max-width: 250px;
  background-color: #f1f1f1;
  border-radius: 10px;
  padding: 4px 10px;
  transition: box-shadow 0.2s;
}

.custom-file-input:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.custom-file-input input {
  cursor: pointer;
}

.v-input__control {
  min-height: 40px;
}


.v-input__slot {
  padding: 0 8px;
}




</style>