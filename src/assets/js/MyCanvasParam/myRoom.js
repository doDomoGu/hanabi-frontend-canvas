let _ = {}

const width = window.innerWidth


_.playerAreaW = width - _.hostAreaX * 2 //玩家区域宽度
_.playerAreaH = 200                     //玩家区域高度
_.playerAreaMargin = 40                 //两个玩家区域间的间隔
_.playerAreaPadding = 10                //玩家区域内留白
_.playerInfoAreaW = _.playerAreaW - _.playerAreaPadding * 2
_.playerInfoAreaH = 40



_.hostAreaX = 30
_.hostAreaY = 30
_.hostAreaW = _.playerAreaW
_.hostAreaH = _.playerAreaH

_.hostInfoAreaX = _.hostAreaX + _.playerAreaPadding
_.hostInfoAreaY = _.hostAreaY + _.playerAreaPadding
_.hostInfoAreaW = _.playerInfoAreaW
_.hostInfoAreaH = _.playerInfoAreaH


_.guestAreaX = _.hostAreaX
_.guestAreaY = _.hostAreaY + _.hostAreaH + _.playerAreaMargin
_.guestAreaW = _.playerAreaW
_.guestAreaH = _.playerAreaH


_.guestInfoAreaX = _.guestAreaX + _.playerAreaPadding
_.guestInfoAreaY = _.guestAreaY + _.playerAreaPadding
_.guestInfoAreaW = _.playerInfoAreaW
_.guestInfoAreaH = _.playerInfoAreaH

export default _
