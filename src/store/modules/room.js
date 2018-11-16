import axios from '../axios'

const state = {
    list: [],
    count: 0
}

const actions = {
    async GetList ({ commit }) {
        const res = await axios.get(
            '/room'
        )
        if (res.data) {
            commit('SetList', res.data)
        } else {
            commit('ClearList')
        }
    }
}

const getters = {
    list: state => state.list,
    count: state => state.count
}

const mutations = {
    SetList (state, data) {
        state.list = data
        state.count = data.length
    },
    ClearList (state) {
        state.list = []
        state.count = 0
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
