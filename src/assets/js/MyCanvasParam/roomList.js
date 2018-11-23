import MyCanvas from '../MyCanvas'

const dpr = MyCanvas.getDevicePixelRatio()

let _ = {}

const width = window.innerWidth * dpr

_.padding = 30 * dpr

_.item = {}

_.item.rect = {}
_.item.rect.x = _.padding
_.item.rect.y = _.padding

_.item.rect.w = width - _.item.rect.x * 2
_.item.rect.h = 30 * dpr
_.item.margin = 10 * dpr

_.item.fontSize = MyCanvas.px2Rem(30)

export default _
