let _ = {}

const width = window.innerWidth
const height = window.innerHeight

/* 基础参数 */
_.window = {}
_.window.padding = 10 // 窗口留白

/* 玩家基础参数 */
_.player = {}

_.player.area = {}
_.player.area.x = 0
_.player.area.y = 0
_.player.area.w = width //玩家区域宽度
_.player.area.h = 200 //玩家区域高度
_.player.area.padding = _.window.padding //玩家区域内留白

_.player.info = {}
_.player.info.area = {}
_.player.info.area.w = _.player.area.w - _.player.area.padding * 2
_.player.info.area.h = 40

/* _.player.button = {}
_.player.button.w = 100
_.player.button.h = 30

_.player.button.enabled = {}
_.player.button.enabled.ok = {}
_.player.button.enabled.ok.bgcolor = '#ff4400'
_.player.button.enabled.ok.txtcolor = '#ffffff'
_.player.button.enabled.cancel = {}
_.player.button.enabled.cancel.bgcolor = '#0044ff'
_.player.button.enabled.cancel.txtcolor = '#ffffff'
_.player.button.disabled = {}
_.player.button.disabled.bgcolor = '#cccccc'
_.player.button.disabled.txtcolor = '#ffffff' */

_.card = {}
_.card.w = 40
_.card.h = 80

_.player.hands = {}
_.player.hands.w = _.card.w
_.player.hands.h = _.card.h
_.player.hands.margin = 10

/* 主机玩家 */
_.host = {}

_.host.area = {}
_.host.area.x = _.player.area.x
_.host.area.y = _.player.area.y
_.host.area.w = _.player.area.w
_.host.area.h = _.player.area.h

_.host.info = {}
_.host.info.area = {}
_.host.info.area.x = _.host.area.x + _.player.area.padding
_.host.info.area.y = _.host.area.y + _.player.area.padding
_.host.info.area.w = _.player.info.area.w
_.host.info.area.h = _.player.info.area.h

_.host.hands = {}
_.host.hands.x = _.host.area.x + _.player.area.padding
_.host.hands.y = _.host.info.area.y + _.host.info.area.h + _.player.area.padding
_.host.hands.w = _.player.hands.w
_.host.hands.h = _.player.hands.h
/* _.host.button = {}
_.host.button.x = _.host.area.x + _.player.area.padding
_.host.button.y = _.host.area.y + _.player.area.h - _.player.area.padding - _.player.button.h
_.host.button.w = _.player.button.w
_.host.button.h = _.player.button.h */

/* 桌面区域 */
_.table = {}
_.table.area = {}
_.table.area.x = 0
_.table.area.y = _.host.area.y + _.host.area.h
_.table.area.w = width
_.table.area.h = 120

_.table.libraryCards = {}
_.table.libraryCards.bgColor = '#eeaacc'
_.table.libraryCards.textColor = '#333333'
_.table.libraryCards.title = '牌库'
_.table.libraryCards.area = {}
_.table.libraryCards.area.x = _.window.padding
_.table.libraryCards.area.y = _.table.area.y + _.window.padding
_.table.libraryCards.area.w = _.card.w
_.table.libraryCards.area.h = _.card.h

_.table.discardCards = {}
_.table.discardCards.bgColor = '#ccaaee'
_.table.discardCards.textColor = '#333333'
_.table.discardCards.title = '弃牌堆'
_.table.discardCards.area = {}
_.table.discardCards.area.w = _.card.w
_.table.discardCards.area.h = _.card.h
_.table.discardCards.area.x =
    width - _.window.padding - _.table.discardCards.area.w
_.table.discardCards.area.y = _.table.area.y + _.window.padding

/* 游戏记录区域 */
_.history = {}
_.history.area = {}
_.history.area.x = 0
_.history.area.y = _.table.area.y + _.table.area.h
_.history.area.w = width
_.history.area.h = 100

/* 客机玩家 */
_.guest = {}

_.guest.area = {}
_.guest.area.x = _.host.area.x
_.guest.area.y =
    _.host.area.y + _.host.area.h + _.table.area.h + _.history.area.h
_.guest.area.w = _.player.area.w
_.guest.area.h = _.player.area.h

_.guest.info = {}
_.guest.info.area = {}
_.guest.info.area.x = _.guest.area.x + _.player.area.padding
_.guest.info.area.y = _.guest.area.y + _.player.area.padding
_.guest.info.area.w = _.player.info.area.w
_.guest.info.area.h = _.player.info.area.h

_.guest.hands = {}
_.guest.hands.x = _.guest.area.x + _.player.area.padding
_.guest.hands.y =
    _.guest.info.area.y + _.guest.info.area.h + _.player.area.padding
_.guest.hands.w = _.player.hands.w
_.guest.hands.h = _.player.hands.h

/* 结束按钮 */
_.endBtn = {}
_.endBtn.w = width
_.endBtn.h = 30
_.endBtn.x = 0
_.endBtn.y = height - _.endBtn.h
_.endBtn.bgcolor = '#e90200'
_.endBtn.txtcolor = '#ffffff'

export default _
