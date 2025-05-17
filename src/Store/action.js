import axios from "axios"

export default {
  async login({ commit, rootGetters }, payload) {
    try {
      console.log("Sending OTP request to:", `${rootGetters.geturl}/api/chatapp/otp`);
      console.log("Request payload:", payload);

      const response = await axios.post(
        `${rootGetters.geturl}/api/chatapp/otp`,
        payload,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      console.log("Response received:", response);

      if (response.status >= 200 && response.status < 300) {
        commit("setSessionId", response.data.sessionId);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error sending OTP:", error);
      return false;
    }
  }

  ,

  async verify({ rootGetters }, payload) {
    const response = await axios.post(`${rootGetters.geturl}/api/chatapp/verify?session=${payload.sessionId}&otp=${payload.otp}`,);
    if (response.status >= 200 || response.status < 300) {
      return response;
    }
  },


  async searchuser({ rootGetters }, name) {
    try {
      const response = await axios.get(`${rootGetters.geturl}/Userdetails/getuser`, name);

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: 'Unexpected response status' };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Request failed',
      };
    }
  },
  async profile({ rootGetters }, userId) {
    try {
      const response = await axios.get(`${rootGetters.geturl}/Userdetails/viewProfile`, {
        params: { userId } // pass actual user ID here
      });

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: 'Unexpected response status' };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Request failed',
      };
    }
  },





  //admin login
  async adminlogin({ rootGetters }, payload) {
    try {
      const response = await axios.post(
        `${rootGetters.geturl}/Admindetails/login`,
        payload
      );
  
      if (response.status === 200 && response.data === "Loginsuccessful") {
        return { success: true };
      } else {
        return { success: false, message: "Invalid credentials" };
      }
    } catch (error) {
      console.error("Login failed", error);
      return { success: false, message: "Server error" };
    }
  },
  //view users
  async fetchUsers({ rootGetters }) {
    try {    
      const response = await axios.get(
        `${rootGetters.geturl}/Admindetails/viewUsers`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to fetch users." 
      };
    }
  },  
  


}















