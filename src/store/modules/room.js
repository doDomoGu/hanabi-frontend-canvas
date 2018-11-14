import axios from '../axios'

const state = {
    list: [],
    count: 0
}

const actions = {
    GetList ({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get(
                '/room',
                {
                    params: {
                        accessToken: this.getters['user/token']
                    }
                }
            )
                .then((res) => {
                    if (res.data) {
                        commit('SetList', res.data)
                    } else {
                        commit('ClearList')
                    }
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
        })
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
