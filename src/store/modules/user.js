import axios from '../axios'

const state = {
    id: 0,
    info: {},
    isLogin: false,
    token: null,
}

const actions = {
    async Login({ commit }, param) {
        const res = await axios.post('/auth', param)
        if (res.data && res.data.success) {
            commit('setTokenForced', res.data.token)
            commit('setLoginState')
            commit('setId', res.data.userId)
            commit('setInfo', res.data.userInfo)
        }
    },
    async Logout({ dispatch, commit }) {
        //dispatch('myRoom/Exit', null, { root: true }).then(() => {
        const res = await axios.delete(
            '/auth', {
                params: {
                    accessToken: this.getters['user/token'],
                },
            })
        if (res.data && res.data.success) {
            commit('clearLoginState')
        }
    },
    async CheckToken({ commit }, token) {
        const res = await axios.get(
            '/auth', {
                params: {
                    accessToken: token,
                },
            })
        if (res.data && res.data.success) {
            commit('setToken', res.data.token)
            commit('setLoginState')
            commit('setId', res.data.userId)
            commit('setInfo', res.data.userInfo)
        } else {
            // 提交的token 错误
            commit('clearLoginState')
        }
    },
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
    setLoginState: state => {
        state.isLogin = true
    },
    setId: (state, id) => {
        state.id = id
    },
    setInfo: (state, info) => {
        state.info = info
    },
    clearLoginState: state => {
        state.isLogin = false
        state.userId = 0
        state.userInfo = {}
        state.token = null
        localStorage.removeItem('__HANABI_AUTH_TOKEN__')
    },
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
}
