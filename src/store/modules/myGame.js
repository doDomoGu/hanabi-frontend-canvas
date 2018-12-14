import axios from '../axios'

const state = {
    isPlaying: null,
    logList: [],
    gameInfo: {
        roundNum: -1,
        roundPlayerIsHost: -1,
        lastUpdated: null,
    },
    cardInfo: {
        hostHands: [],
        guestHands: [],
        libraryCardsNum: -1,
        discardCardsNum: -1,
        cueNum: -1,
        chanceNum: -1,
        score: -1,
        successCards: [],
    },
}

const actions = {
    async Start({ commit }) {
        await axios.post('/my-game/start')
    },
    async End({ commit }) {
        await axios.post('/my-game/end')
    },
    async GetInfo({ commit }, param = {}) {
        if (!param.hasOwnProperty('mode')) {
            param.mode = 'all'
        }
        const res = await axios.get('/my-game/info', { params: param })
        if (res.data && res.data.code === 0) {
            const _res = res.data.data
            if (!_res.noUpdate) {
                if (_res.isPlaying) {
                    commit('SetGameIsPlaying')
                    if (param.mode === 'all') {
                        commit('SetGameInfo', _res.game)
                        commit('SetCardInfo', _res.card)
                        commit('SetLogInfo', _res.log)
                    }
                } else {
                    commit('ClearInfo')
                }
            }
        } else {
            commit('ClearInfo')
        }
    },
    async DoDiscard({ commit }, cardSelectOrd) {
        await axios.post('/my-game/do-discard', {
            cardSelectOrd: cardSelectOrd,
        })
    },
    async DoPlay({ commit }, cardSelectOrd) {
        await axios.post('/my-game/do-play', {
            cardSelectOrd: cardSelectOrd,
        })
    },
    async DoCue({ commit }, [cardSelectOrd, cueType]) {
        await axios.post('/my-game/do-cue', {
            cardSelectOrd: cardSelectOrd,
            cueType: cueType,
        })
    },
    async AutoPlay({ commit }, cardSelectOrd) {
        await axios.post('/my-game/auto-play')
    },
}

const getters = {
    isPlaying: state => state.isPlaying,
    logList: state => state.logList,
    logList2: state => {
        const tmp = []
        for (const i in state.logList) {
            tmp.unshift(state.logList[i])
        }
        return tmp
    },
    gameInfo: state => state.gameInfo,
    cardInfo: state => state.cardInfo,
}

const mutations = {
    SetGameIsPlaying(state) {
        state.isPlaying = true
    },
    SetLogInfo(state, data) {
        state.logList = data
    },
    SetCardInfo(state, data) {
        state.cardInfo = data
    },
    SetGameInfo(state, data) {
        state.gameInfo = data
    },
    ClearInfo(state) {
        state.isPlaying = null
        state.logList = []
        state.gameInfo = {
            roundNum: -1,
            roundPlayerIsHost: -1,
            lastUpdated: null,
        }
        state.cardInfo = {
            hostHands: [],
            guestHands: [],
            libraryCardsNum: -1,
            discardCardsNum: -1,
            cueNum: -1,
            chanceNum: -1,
            score: -1,
            successCards: [],
        }
    },
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
}
