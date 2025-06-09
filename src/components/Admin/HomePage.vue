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
  background-color: #f5f7fa;
  color: #2e3a59;
}

/* Sidebar Styling */
.v-navigation-drawer {
  background: #1e2a38;
  color: #ffffff;
  padding-top: 12px;
}

.v-list-item-title {
  font-weight: 500;
}

.v-list-item {
  border-radius: 8px;
  margin-bottom: 4px;
  transition: background-color 0.2s ease;
}

.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.v-list-item--active {
  background-color: rgba(255, 255, 255, 0.12) !important;
}

.v-icon {
  color: #ffffff !important;
}

/* App Bar */
.v-app-bar {
  box-shadow: none;
  border-bottom: 1px solid #ddd;
}

/* Dashboard Cards */
.v-card {
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  transition: box-shadow 0.2s ease;
}

.v-card:hover {
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

.v-card-title {
  font-weight: 600;
  color: #1f2937;
}

.v-card-text {
  color: #4b5563;
}

/* Table Style */
.v-simple-table {
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.v-simple-table thead {
  background-color: #f1f5f9;
}

.v-simple-table th {
  font-weight: 600;
  padding: 16px;
  color: #374151;
  text-align: left;
}

.v-simple-table td {
  padding: 14px;
  font-size: 0.95rem;
  color: #334155;
  border-bottom: 1px solid #e5e7eb;
}

.v-btn {
  font-weight: 500;
  text-transform: none;
  font-size: 0.9rem;
}

/* Page Container */
.v-main {
  background-color: #f5f7fa;
}

</style>
