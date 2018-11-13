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

_.player.button = {}
_.player.button.w = 100
_.player.button.h = 30

_.player.button.enable = {}
_.player.button.enable.bgcolor = '#ff4400'
_.player.button.enable.txtcolor = '#ffffff'

_.player.button.disable = {}
_.player.button.disable.bgcolor = '#cccccc'
_.player.button.disable.txtcolor = '#ffffff'

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

_.host.button = {}
_.host.button.w = _.player.button.w
_.host.button.h = _.player.button.h
_.host.button.x = _.host.area.x + _.player.area.padding
_.host.button.y = _.host.area.y + _.player.area.h - _.player.area.padding - _.player.button.h

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

_.guest.button = {}
_.guest.button.w = _.player.button.w
_.guest.button.h = _.player.button.h
_.guest.button.x = _.guest.area.x + _.player.area.padding
_.guest.button.y = _.guest.area.y + _.player.area.h - _.player.area.padding - _.player.button.h


export default _
