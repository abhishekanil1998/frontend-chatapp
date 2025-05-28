

export default {
    
        geturl : (state) => state.base_url,
        getSessionId : (state) => state.sessionId,
        getuserId: (state) => state.auth.userId, // Access user_id from auth

        
    }
