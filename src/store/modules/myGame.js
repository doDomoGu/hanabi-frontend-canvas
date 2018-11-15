import axios from '../axios';

const state = {
    isPlaying: null,
    logList: [],
    hostHands: [],
    guestHands: [],
    roundNum: -1,
    roundPlayerIsHost: -1,
    libraryCardsNum: -1,
    discardCardsNum: -1,
    lastUpdated: null,
    cueNum: -1,
    chanceNum: -1,
    score: -1,
    successCards: [],
};

const actions = {
    async Start({ commit }) {
        await axios.post(
            '/my-game/start' + 
                    '?accessToken=' +
                    this.getters['user/token'],
        )   
    },
    async End({ commit }) {
        await axios.post(
            '/my-game/end' +
                '?accessToken=' +
              this.getters['user/token']
        );
    },
    async GetInfo({ commit }, param = {}) {
        if (!param.hasOwnProperty('mode')) {
            param.mode = 'all';
        }
        const res = await axios.post(
            '/my-game/get-info' + 
                        '?accessToken=' + 
                        this.getters['user/token'],
            param,
        );
        const _res = res.data;
        if (_res.success) {
            if (!_res.data.noUpdate) {
                commit('SetGameIsPlaying');
                if (param.mode === 'all') {
                    commit('SetGameInfo', _res.data.game);
                    commit('SetCardInfo', _res.data.card);
                    commit('SetLogInfo', _res.data.log);
                }
            }
        } else {
            commit('ClearInfo');
        }
    },
    async DoDiscard({ commit }, cardSelectOrd) {
        await axios.post(
            '/my-game/do-discard' +
                        '?accessToken=' +
                        this.getters['user/token'],
            {
                cardSelectOrd: cardSelectOrd,
            },
        );
    },
    async DoPlay({ commit }, cardSelectOrd) {
        await axios.post(
            '/my-game/do-play' +
                        '?accessToken=' +
                        this.getters['user/token'],
            {
                cardSelectOrd: cardSelectOrd,
            },
        )
    },
    async DoCue({ commit }, [cardSelectOrd, cueType]) {
        await axios.post(
            '/my-game/do-cue' +
                        '?accessToken=' +
                        this.getters['user/token'],
            {
                cardSelectOrd: cardSelectOrd,
                cueType: cueType,
            },
        )
    },
    async AutoPlay({ commit }, cardSelectOrd) {
        await axios.post(
            '/my-game/auto-play' +
                        '?accessToken=' +
                        this.getters['user/token'],
        )
    },
};

const getters = {
    isPlaying: state => state.isPlaying,
    logList: state => state.logList,
    logList2: state => {
        const tmp = [];
        for (const i in state.logList) {
            tmp.unshift(state.logList[i]);
        }
        return tmp;
    },
    hostHands: state => state.hostHands,
    guestHands: state => state.guestHands,
    roundNum: state => state.roundNum,
    roundPlayerIsHost: state => state.roundPlayerIsHost,
    libraryCardsNum: state => state.libraryCardsNum,
    discardCardsNum: state => state.discardCardsNum,
    lastUpdated: state => state.lastUpdated,
    cueNum: state => state.cueNum,
    chanceNum: state => state.chanceNum,
    score: state => state.score,
    successCards: state => state.successCards,
};

const mutations = {
    SetGameIsPlaying(state) {
        state.isPlaying = true;
    },
    SetLogInfo(state, data) {
        state.logList = data;
    },
    SetCardInfo(state, data) {
        state.hostHands = data.hostHands;
        state.guestHands = data.guestHands;
        state.libraryCardsNum = data.libraryCardsNum;
        state.discardCardsNum = data.discardCardsNum;
        state.cueNum = data.cueNum;
        state.chanceNum = data.chanceNum;
        state.score = data.score;
        state.successCards = data.successCards;
    },
    SetGameInfo(state, data) {
        state.roundNum = data.roundNum;
        state.roundPlayerIsHost = data.roundPlayerIsHost;
        state.lastUpdated = data.lastUpdated;
    },
    ClearInfo(state) {
        state.isPlaying = null;
        state.logList = [];
        state.hostHands = [];
        state.guestHands = [];
        state.roundNum = -1;
        state.roundPlayerIsHost = -1;
        state.libraryCardsNum = -1;
        state.discardCardsNum = -1;
        state.lastUpdated = null;
        state.cueNum = -1;
        state.chanceNum = -1;
        state.score = -1;
        state.successCards = [];
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
