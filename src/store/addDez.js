import axios from 'axios'

export default {
    state: {
        status: '',
        error: '',
        dezData: [],
        dezError: '',
        updateData: '',
        updateError: ''
    },
    actions: {
        async addDez({commit}, dez){
            return await new Promise((resolve, reject) => {

                const apiKey = process.env.VUE_APP_BACKEND

                const instance = axios.create({
                    headers: {
                        'x-api-key': apiKey
                    }
                })                
                instance.post('http://192.168.1.100:5000/addDez', dez)
                    .then(resp => {
                        const data = resp.data                        
                        commit('dezSuccess', data)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('dezError')                        
                        reject(err)
                    })
            })
        },
        async getDez({commit}){
            return await new Promise((resolve, reject) => {

                const apiKey = process.env.VUE_APP_BACKEND

                const instance = axios.create({
                    headers: {
                        'x-api-key': apiKey
                    }
                })                
                instance.get('http://192.168.1.100:5000/getDez')
                    .then(resp => {
                        const data = resp.data.data                        
                        commit('getDezSuccess', data)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('getDezError')                        
                        reject(err)
                    })
            })
        },
        async updateDez({commit}, data){
            return await new Promise((resolve, reject) => {

                const apiKey = process.env.VUE_APP_BACKEND

                const instance = axios.create({
                    headers: {
                        'x-api-key': apiKey
                    }
                })                
                instance.post('http://192.168.1.100:5000/getUpdateDez', data)
                    .then(resp => {
                        const data = resp.data.status                        
                        commit('getUpdateDez', data)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('getUpdateError')                        
                        reject(err)
                    })
            })
        }
    },
    mutations: {
        getUpdateDez(state, data){
            state.updateData = data
        },
        getUpdateError(state){
            state.updateError = 'error'
        },
        dezSuccess(state, data){
            state.status = data.status
        },
        dezError(state){
            state.error = 'error'
        },
        getDezSuccess(state, data){
            state.dezData = data
        },
        getDezError(state){
            state.dezError = 'Error'
        }

    } ,
    getters: {
        getDezData: s => s.dezData,
        getUpdateStatus: s => s.updateData
    }  
}