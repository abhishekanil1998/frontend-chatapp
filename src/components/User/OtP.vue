<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card class="pa-5" elevation="10" max-width="400">
      <v-form ref="otpForm" v-model="valid" @submit.prevent="verifyOtp">
        <v-card-title class="text-center text-h5 font-weight-bold">
          OTP Verification
        </v-card-title>

        <v-card-text>
          <!-- OTP Input Field -->
          <v-text-field
            v-model="otp"
            label="Enter OTP"
            placeholder="Enter OTP"
            outlined
            dense
            class="mt-3"
            required
            :rules="[rules.required, rules.numeric, rules.length]"
          ></v-text-field>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn color="primary" block type="submit">
            Submit
          </v-btn>
        </v-card-actions>

        <v-btn color="blue" block @click="sendOtp">
          Resend OTP
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      otp: "",
      valid: false,
      phoneNumber: null,
      errorMessage: "",
      otpSend: false,
      rules: {
        required: (value) => !!value || "OTP is required",
        numeric: (value) => /^\d+$/.test(value) || "Only numbers allowed",
        length: (value) => (value && value.length === 6) || "OTP must be 6 digits",
      },
    };
  },
  computed: {
    ...mapGetters(["getSessionId"]),
    sessionId() {
      return this.getSessionId;
    },
  },
  created() {
    this.phoneNumber = this.$route.query.phoneNumber;
  },
  methods: {
    async verifyOtp() {
      const payload = {
        sessionId: this.sessionId,
        otp: this.otp,
      };

      try {
        const response = await this.$store.dispatch("verify", payload);
        if (response) {
          this.$router.push(`/registration?session=${this.sessionId}`);
        } else {
          throw new Error("Invalid OTP");
        }
      } catch (error) {
        this.errorMessage = "Invalid OTP";
      }
    },

    async sendOtp() {
      try {
        const response = await this.$store.dispatch("login", { phoneNumber: this.phoneNumber });
        if (response) {
          this.otpSend = true;
        } else {
          this.errorMessage = "Failed to send OTP";
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        this.errorMessage = "Failed to send OTP";
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  width: 350px;
  border-radius: 12px;
  text-align: center;
}
</style>
