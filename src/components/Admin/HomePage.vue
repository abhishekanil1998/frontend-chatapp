<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-list dense nav>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">Admin Panel</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link @click="activeView = 'dashboard'">
          <v-list-item-icon><v-icon>mdi-view-dashboard</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="showUsers">
          <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="logout">
          <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Admin Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="pa-4">
        <!-- Dashboard View -->
        <div v-if="activeView === 'dashboard'">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-card class="pa-4" outlined>
                <v-card-title>Users</v-card-title>
                <v-card-text>{{ users.length }} registered users</v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-card class="pa-4" outlined>
                <v-card-title>Reports</v-card-title>
                <v-card-text>12 reports received</v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-card class="pa-4" outlined>
                <v-card-title>Active Sessions</v-card-title>
                <v-card-text>5 users online</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- Users View -->
        <div v-else-if="activeView === 'users'">
          <h2 class="mb-4">User Management</h2>
          <v-simple-table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.mobile }}</td>
                <td>{{ user.username }}</td>
                <td>
                  <v-btn color="red" text small @click="deleteuser(user.id)">
                    Delete
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      activeView: "dashboard", // 'dashboard' or 'users'
      users: [],
    };
  },
  methods: {
    logout() {
      this.$router.push("/adminlogin");
    },
    async showUsers() {
      this.activeView = "users";
      await this.loadUsers();
    },
    async loadUsers() {
      try {
        const result = await this.$store.dispatch("fetchUsers");
        if (result.success) {
          this.users = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading users:", error);
      }
    },
    async deleteuser(user_id) {
      try {
        const confirmation = confirm("Delete this user?");
        if (!confirmation) return;

        const result = await this.$store.dispatch("deleteUserAccount", user_id);
        if (result.success) {
          alert("Account deleted");
          this.loadUsers();
        } else {
          alert("Error deleting account");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
  },
  async mounted() {
    await this.loadUsers(); // preload users so dashboard user count works
  },
};
</script>

<style scoped>
.v-application {
  font-family: 'Roboto', sans-serif;
}
</style>
