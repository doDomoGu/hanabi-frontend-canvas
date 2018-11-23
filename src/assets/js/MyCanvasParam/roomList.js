let _ = {}

const width = window.innerWidth

_.padding = 30

_.item = {}

_.item.rect = {} 
_.item.rect.x = _.padding
_.item.rect.y = _.padding

_.item.rect.w = width - _.item.rect.x * 2
_.item.rect.h = 30
_.item.margin = _.padding

export default _
