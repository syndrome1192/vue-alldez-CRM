import axios from 'axios'

export default {
    state: {
        status: {},
        error: '',
        data: [],
        operUserError: '',
        getUpdateStatus: {},
        getUpdateStatusError: ''
    },
    mutations: {
        operSuccess(state, data){
            state.status = data
        },
        operError(state){
            state.error = "Error"
        },
        operUserSuccess(state, data){
            state.data = data
        },
        operUserError(state){
            state.operUserError = 'Error'
        },
        getUpdateStatus(state, data){
            state.getUpdateStatus = data
        },
        getUpdateStatusError(state){
            state.getUpdateStatusError = 'Error'
        }

    },
    actions: {
        async addOperators({commit}, operators){
            return await new Promise((resolve, reject) => {

                const apiKey = process.env.VUE_APP_BACKEND

                const instance = axios.create({
                    headers: {
                        'x-api-key': apiKey
                    }
                })                
                instance.post('http://192.168.1.100:5000/addoperators', operators)
                    .then(resp => {
                        const data = resp.data
                        console.log(data)
                        commit('operSuccess', data)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('operError')                        
                        reject(err)
                    })
            })
        },
        async getUserOperators({commit}){
            return await new Promise((resolve, reject) => {

                const apiKey = process.env.VUE_APP_BACKEND

                const instance = axios.create({
                    headers: {
                        'x-api-key': apiKey
                    }
                })                
                instance.get('http://192.168.1.100:5000/getuseroperators')
                    .then(resp => {
                        const data = resp.data.data                    
                        commit('operUserSuccess', data)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('operUserError')                        
                        reject(err)
                    })
            })
        },
        async getUpdateUser({commit}, data){
            return await new Promise((resolve, reject) => {

                const apiKey = process.env.VUE_APP_BACKEND

                const instance = axios.create({
                    headers: {
                        'x-api-key': apiKey
                    }
                })                
                instance.post('http://192.168.1.100:5000/getupdateuser', data)
                    .then(resp => {
                        const data = resp.data.data                    
                        commit('getUpdateStatus', data)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('getUpdateStatusError')                        
                        reject(err)
                    })
            })
        }
    },
    getters: {
        operStatus: s => s.status,
        operError: s => s.error,
        getUserOperator: s => s.data,
        getUpdateUser: s => s.getUpdateStatus,
        getUpdateError: s => s.getUpdateStatusError
    }
}