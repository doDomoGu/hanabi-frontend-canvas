import axios from '../axios'

const state = {
    list: [],
    count: 0,
}

const actions = {
    async GetList({ commit }, param = {}) {
        const res = await axios.get('/room/list', { params: param })
        const _res = res.data
        if (_res.success) {
            if (!_res.data.noUpdate) {
                commit('SetList', _res.data.list)
            }
        } else {
            commit('ClearList')
        }
    },
}

const getters = {
    list: state => state.list,
    count: state => state.count,
}

const mutations = {
    SetList(state, data) {
        state.list = data
        state.count = data.length
    },
    ClearList(state) {
        state.list = []
        state.count = 0
    },
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
}
