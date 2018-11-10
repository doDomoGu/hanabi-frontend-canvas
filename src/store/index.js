import Vue from 'vue'
import Vuex from 'vuex'

// import common from './common'

import user   from './modules/user'
import room   from './modules/room'
import myRoom from './modules/myRoom'
// import myGame from './modules/myGame'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // common,
    user,
    room,
    myRoom,
    // myGame
  }
})

