let _ = {}

const width = window.innerWidth

_.player = {}

_.player.area = {}
_.player.area.x = 30
_.player.area.y = 30
_.player.area.w = width - _.player.area.x * 2 //玩家区域宽度
_.player.area.h = 200                     //玩家区域高度
_.player.area.margin = 40                 //两个玩家区域间的间隔
_.player.area.padding = 10                //玩家区域内留白

_.player.info = {}
_.player.info.area = {}
_.player.info.area.w = _.player.area.w - _.player.area.padding * 2
_.player.info.area.h = 40


_.host  = {}
_.guest = {}

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

_.guest.area = {}
_.guest.area.x = _.host.area.x
_.guest.area.y = _.host.area.y + _.host.area.h + _.player.area.margin
_.guest.area.w = _.player.area.w
_.guest.area.h = _.player.area.h

_.guest.info = {}
_.guest.info.area = {}
_.guest.info.area.x = _.guest.area.x + _.player.area.padding
_.guest.info.area.y = _.guest.area.y + _.player.area.padding
_.guest.info.area.w = _.player.info.area.w
_.guest.info.area.h = _.player.info.area.h

export default _
