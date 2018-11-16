import axios from '../axios'

const state = {
    roomId: -1,
    isHost: null,
    hostPlayer: {
        id: -1,
        username: null,
        name: null
    },
    guestPlayer: {
        id: -1,
        username: null,
        name: null
    },
    isReady: null
}

const actions = {
    async Enter ({} ,roomId) {
        await axios.post(
            '/my-room/enter',
            {
                roomId: roomId
            }
        )
    },
    async Exit () {
        await axios.post(
            '/my-room/exit'
        )
    },
    /*
    获取玩家的房间信息
    mode(string)  :   all    : 完整数据
                      simple : 只有isInRoom数据
    force(boolean): 是否强制更新数据
   */
    async GetInfo ({ commit }, param = {}) {
        if (!param.hasOwnProperty('mode')) { param.mode = 'all' }
        const res = await axios.post(
            '/my-room/get-info',
            param
        )
        const _res = res.data
        if (_res.success) {
            if (!_res.data.noUpdate) {
                commit('SetRoomId', _res.data.roomId)
                if (param.mode === 'all') {
                    commit('SetIsHost', _res.data.isHost)
                    commit('SetRoomPlayer', _res.data)
                }
            }
        } else {
            commit('ClearRoomId')
            commit('ClearIsHost')
            commit('ClearRoomPlayer')
        }
    },
    async DoReady () {
        await axios.post(
            '/my-room/do-ready'
        )
    }
}

const getters = {
    roomId: state => state.roomId,
    isHost: state => state.isHost,
    hostPlayer: state => state.hostPlayer,
    guestPlayer: state => state.guestPlayer,
    isReady: state => state.isReady
}

const mutations = {
    SetRoomId (state, roomId) {
        state.roomId = roomId
    },
    SetIsHost (state, isHost) {
        state.isHost = isHost
    },
    SetRoomPlayer (state, data) {
        state.hostPlayer = data.hostPlayer
        state.guestPlayer = data.guestPlayer
        state.isReady = data.isReady
    },

    ClearIsHost (state) {
        state.isHost = false
    },
    ClearRoomId (state) {
        state.roomId = -1
    },
    ClearRoomPlayer (state) {
        state.hostPlayer = {
            id: -1,
            username: null,
            name: null
        }
        state.guestPlayer = {
            id: -1,
            username: null,
            name: null
        }
        state.isReady = false
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
