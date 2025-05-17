import { createStore } from "vuex";
import rootActions from './action.js';
import rootGetters from './getter.js';
import rootMutations from './mutation.js';

const store = createStore({
    state() {
        return {
            base_url: 'http://localhost:8088',
            sessionId: sessionStorage.getItem('sessionId') || ''
        };
    },
    mutations: rootMutations, // ✅ Changed from mutation → mutations
    actions: rootActions,     // ✅ Changed from action → actions
    getters: rootGetters      // ✅ Changed from getter → getters
});

export default store;
