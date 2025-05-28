export default {
  setSessionId(state, payload) {
    state.sessionId = payload;
    sessionStorage.setItem("sessionId", payload);
  },
  setuserId(state, payload) {
    state.auth.userId = payload;
    sessionStorage.setItem("userId", payload);
  },
  logout(state) {
    state.auth.userId = null;

    sessionStorage.removeItem("userId");
  },
};
