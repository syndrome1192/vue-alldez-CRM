import axios from 'axios'

export default {
    state: {
        data: {},
        error: '',
        operators: [],
        operError: '',
        getData: {},
        getError: '',
        getStatus: '',
        statusErr: ''
    },
    actions: {
        addData({commit}, data){
            return new Promise((resolve, reject) => {

                const apiKey = process.env.VUE_APP_BACKEND

                const instance = axios.create({
                    headers: {
                        'x-api-key': apiKey
                    }
                })                
                instance.post('http://192.168.1.100:5000/data', data)
                    .then(resp => {
                        const getData = resp.data.status                       
                        commit('data_success', getData)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('data_error')
                        reject(err)
                    })
            })
        },
        async getData({commit}){
            return await new Promise((resolve, reject) => {

                const apiKey = process.env.VUE_APP_BACKEND

                const instance = axios.create({
                    headers: {
                        'x-api-key': apiKey
                    }
                })                
                instance.get('http://192.168.1.100:5000/getdata')
                    .then(resp => {
                        const getData = resp.data                        
                        commit('getData_success', getData)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('getData_error')
                        reject(err)
                    })
            })

        },
        async getOperators({commit}){
            return await new Promise((resolve, reject) => {

                const apiKey = process.env.VUE_APP_BACKEND

                const instance = axios.create({
                    headers: {
                        'x-api-key': apiKey
                    }
                })                
                instance.get('http://192.168.1.100:5000/operators')
                    .then(resp => {
                        const getOper = resp.data.data 
                        console.log(getOper)                                       
                        commit('oper_success', getOper)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('oper_error')                        
                        reject(err)
                    })
            })
        },
        async updateStatus({commit}, data){
            return await new Promise((resolve, reject) => {

                const apiKey = process.env.VUE_APP_BACKEND

                const instance = axios.create({
                    headers: {
                        'x-api-key': apiKey
                    }
                })                
                instance.post('http://192.168.1.100:5000/statusupdate', data)
                    .then(resp => {
                        const getStatus = resp.data.status 
                        console.log(getStatus)                                       
                        commit('status_success', getStatus)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('status_error')                        
                        reject(err)
                    })
            })
        }
    },
    mutations: {
        data_success(state, data){
            state.data = data
        },
        data_error(state){
            state.error = 'Ошибка записи в бд, пожалуйста обратитесь к администратору'
        },
        oper_success(state, oper){
            state.operators = oper
        },
        oper_error(state){
            state.operError = 'Ошибка запроса данных в бд, пожалуйста обратитесь к администратору'
        },
        getData_success(state, data){
            state.getData = data
        },
        getData_error(state){
            state.getError = 'Ошибка обработки данных из бд, пожалуйста обратитесь к администратору'
        },
        status_success(state, data){
            state.getStatus = data
        },
        status_error(state){
            state.statusErr = 'Ошибка обновления данных'
        }

    },
    getters: {
        dataStatus: state => state.data,
        dataError: state => state.error,
        getOperators: state => state.operators,
        getOperError: state => state.operError,
        getDataSet: state => state.getData,
        getDataError: state => state.getError,
        getStatusCheck: state => state.getStatus,
        getStatusErr: state => state.statusErr

    }
}