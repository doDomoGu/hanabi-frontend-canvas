import axios from '../axios'

const state = {
  list: [],
  count: 0
}

const actions = {
  List ({ commit }) {
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
            commit('SetRoomList', res.data)
          } else {
            commit('ClearRoomList')
          }
          resolve(res.data)
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
  SetRoomList (state, data) {
    state.list = data
    state.count = data.length
  },
  ClearRoomList (state) {
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
