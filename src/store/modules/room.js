import axios from '../axios'

const state = {
    list: [],
    count: 0
}

const actions = {
    async GetList({ commit }, param = {}) {
        const res = await axios.get('/room/list', { params: param })
        if (res.data && res.data.code === 0) {
            const _data = res.data.data
            if (!_data.noUpdate) {
                commit('SetList', _data.list)
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
