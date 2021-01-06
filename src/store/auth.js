import axios from 'axios'

export default {

    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {},
        lifecycle: ''
    },
    actions: {
        async login({ commit }, user) {
            return await new Promise((resolve, reject) => {

                const apiKey = process.env.VUE_APP_BACKEND

                const instance = axios.create({
                    headers: {
                        'x-api-key': apiKey
                    }
                })
                commit('auth_request')
                instance.post('http://192.168.1.100:5000/login', user)
                    .then(resp => {
                        const user = resp.data.data[0]
                        const token = resp.data.data[0].token                        
                        localStorage.setItem('token', token)
                        localStorage.setItem('fullname', user.fullname)
                        if (user.isAdmin == 1) {
                            localStorage.setItem('isAdmin', user.isAdmin)
                        }
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', user, token)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        localStorage.removeItem('fullname')
                        localStorage.removeItem('isAdmin')
                        reject(err)
                    })
            })
        },

        lifecycle({ commit }) {
            return new Promise((resolve, reject) => {
                const apiKey = process.env.VUE_APP_BACKEND

                const instance = axios.create({
                    headers: {
                        'x-api-key': apiKey
                    }
                })
                instance.get('http://192.168.1.100:5000/lifecycle')
                    .then(resp => {                        
                        const lifecycle = resp.data
                        localStorage.setItem('lifecycle', lifecycle.date)
                        commit('lifecycle', lifecycle.date)
                        resolve(resp)
                    }).catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('lifecycle')
                        
                        reject(err)
                    })
            })
                
        },

        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('lifecycle')
                localStorage.removeItem('token')
                localStorage.removeItem('fullname')
                localStorage.removeItem('isAdmin')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, user, token) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
        lifecycle(state, lifecycle) {
            state.lifecycle = lifecycle
        }
    },
    getters: {
        authStatus: state => state.status,
        isLoggedIn: state => !!state.token,
        userData: state => state.user
    }

}