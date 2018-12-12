import axios from '../axios'

const state = {
    id: 0,
    info: {},
    isLogin: false,
    token: null,
}

const actions = {
    async Login({ commit }, param) {
        const res = await axios.post('/login', param)
        if (res.data && res.data.code === 0) {
            const _data = res.data.data

            commit('setTokenForced', _data.token)
            commit('setLoginState')
            commit('setId', _data.userId)
            commit('setInfo', _data.userInfo)
        }
    },
    async Logout({ dispatch, commit }) {
        //dispatch('myRoom/Exit', null, { root: true }).then(() => {
        const res = await axios.delete('/logout')

        if (res.data && res.data.success) {
            commit('clearLoginState')
        }
    },
    async CheckToken({ commit }, token) {
        const res = await axios.get('/auth', {
            params: {
                accessToken: token,
            },
        })

        if (res.data && res.data.code === 0) {
            const _data = res.data.data
            commit('setToken', _data.token)
            commit('setLoginState')
            commit('setId', _data.userId)
            commit('setInfo', _data.userInfo)
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
        window.localStorage.setItem('__HANABI_AUTH_TOKEN__', token)
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
        window.localStorage.removeItem('__HANABI_AUTH_TOKEN__')
    },
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
}
