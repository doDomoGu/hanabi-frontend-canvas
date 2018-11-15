import axios from '../axios'

const state = {
    id: 0,
    info: {},
    isLogin: false,
    token: null
}

const actions = {
    Login ({ commit }, param) {
        return new Promise((resolve, reject) => {
            axios.post(
                '/auth',
                param
            )
                .then((res) => {
                    if (res.data && res.data.success) {
                        commit('setTokenForced', res.data.token)
                        commit('setLoginState')
                        commit('setId', res.data.userId)
                        commit('setInfo', res.data.userInfo)
                    }
                    resolve(res)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    Logout ({ dispatch, commit }) {
        return new Promise((resolve, reject) => {
            //dispatch('myRoom/Exit', null, { root: true }).then(() => {
            axios.delete(
                '/auth',
                {
                    params: {
                        accessToken: this.getters['user/token']
                    }
                }
            )
                .then((res) => {
                    if (res.data && res.data.success) {
                        commit('clearLoginState')
                    }
                    resolve(res)
                })
                .catch(error => {
                    reject(error)
                })
            // })
        })
    },
    CheckToken ({ commit }, token) {
        return new Promise((resolve, reject) => {
            axios.get(
                '/auth',
                {
                    params: {
                        accessToken: token
                    }
                }
            )
                .then((res) => {
                    if (res.data && res.data.success) {
                        commit('setToken', res.data.token )
                        commit('setLoginState')
                        commit('setId', res.data.userId )
                        commit('setInfo', res.data.userInfo )
                    } else {
                        // 提交的token 错误
                        commit('clearLoginState')
                    }
                    resolve(res)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

const getters = {
    id: state => state.id,
    info: state => state.info,
    isLogin: state => state.isLogin,
    token: state => state.token,
}

const mutations = {
    setToken: (state, token) => {
        state.token = token
    },
    setTokenForced: (state, token) => {
        state.token = token
        localStorage.setItem('__HANABI_AUTH_TOKEN__', token)
    },
    setLoginState: (state) => {
        state.isLogin = true
    },
    setId: (state, id) => {
        state.id = id
    },
    setInfo: (state, info) => {
        state.info = info
    },
    clearLoginState: (state) => {
        state.isLogin = false
        state.userId = 0
        state.userInfo = {}
        state.token = null
        localStorage.removeItem('__HANABI_AUTH_TOKEN__')
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
