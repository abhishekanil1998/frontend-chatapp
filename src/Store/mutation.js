export default {
    setSessionId(state,payload){
        state.sessionId = payload;
        sessionStorage.setItem('sessionId',payload)
    }
}
        
    
    
