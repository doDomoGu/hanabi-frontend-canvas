import { fillRoundedRect, fillText } from './common'
import MGCParam from '../MyCanvasParam/myGame'
import MyCanvas from '../MyCanvas'

let _ = {} //common

_.endBtn = ctx => {
    const btn = MGCParam.endBtn

    ctx.fillStyle = btn.bgcolor
    ctx.fillRect(btn.x, btn.y, btn.w, btn.h)

    ctx.font = MyCanvas.px2Rem(16) + 'px Microsoft JhengHei'
    ctx.fillStyle = btn.txtcolor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('结束游戏', btn.x + btn.w / 2, btn.y + btn.h / 2)
}

_.player = (ctx, isHost, isPlayerHost, info) => {
    let rect, infoRect
    if (isHost) {
        rect = MGCParam.host.area
        infoRect = MGCParam.host.info.area
    } else {
        rect = MGCParam.guest.area
        infoRect = MGCParam.guest.info.area
    }
    ctx.fillStyle = '#fefefe'
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h)

    if (info.id > -1) {
        const config = {
            rect: infoRect,
            font: MyCanvas.px2Rem(24) + 'px Microsoft JhengHei',
            bgColor: '#fee9d6',
            textColor: '#4b4b4b',
            text: info.name + (isHost === isPlayerHost ? '*' : ''),
            textAlign: 'left',
        }
        fillText(ctx, config)
    }
}

_.hands = (ctx, isHost, isPlayerHost, info) => {
    const rect = isHost
        ? JSON.parse(JSON.stringify(MGCParam.host.hands))
        : JSON.parse(JSON.stringify(MGCParam.guest.hands))

    const colors = ['white', 'blue', 'yellow', 'red', 'green']
    const numbers = [1, 1, 1, 2, 2, 3, 3, 4, 4, 5]

    info.forEach(c => {
        if (isPlayerHost == isHost) {
            //自身手牌显示牌背
            ctx.fillStyle = '#444444'
            fillRoundedRect(ctx, rect, 4)
        } else {
            //对面手牌显示牌面
            ctx.fillStyle = '#eeeeee'
            fillRoundedRect(ctx, rect, 4)

            ctx.font = MyCanvas.px2Rem(14) + 'px Microsoft JhengHei'
            ctx.fillStyle = '#333333'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            const text = colors[c.color] + numbers[c.num]
            ctx.fillText(text, rect.x + rect.w / 2, rect.y + rect.h / 2)
        }
        rect.x += rect.w + MGCParam.player.area.padding
    })
}

const cardsNum = (ctx, config, num) => {
    const rect = config.area
    ctx.fillStyle = config.bgColor
    fillRoundedRect(ctx, rect, 4)

    ctx.font = MyCanvas.px2Rem(14) + 'px Microsoft JhengHei'
    ctx.fillStyle = config.textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText(config.title, rect.x + rect.w / 2, rect.y + rect.h / 2)
    ctx.textBaseline = 'top'
    ctx.fillText(num + '张', rect.x + rect.w / 2, rect.y + rect.h / 2)
}

_.libraryCards = (ctx, num) => {
    cardsNum(ctx, MGCParam.table.libraryCards, num)
}

_.discardCards = (ctx, num) => {
    cardsNum(ctx, MGCParam.table.discardCards, num)
}

_.table = ctx => {
    const rect = MGCParam.table.area
    ctx.fillStyle = MGCParam.table.bgColor
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h)
}

export default _