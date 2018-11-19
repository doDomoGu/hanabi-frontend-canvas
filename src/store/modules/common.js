// import axios from '../axios'

const state = {
    isLoading: true,
}

const actions = {}

const getters = {
    isLoading: state => state.isLoading,
}

const mutations = {
    setIsLoading: (state, data) => {
        state.isLoading = data
    },
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
}
