import axios from "axios"
export default {



    async searchuser({ rootGetters }, payload) {
        try {
            const response = await axios.get(`${rootGetters.getUrl}/Userdetails/getuser`, {
                params: {
                    name: payload
                }
            })
            if (response.status >= 200 && response.status < 300) {
                return { success: true, data: response.data };
            } else {
                return { succes: false, error: 'unexpected response' }
            }
        } catch (error) {
            return {
                success: false,
            }
        }
    }
}