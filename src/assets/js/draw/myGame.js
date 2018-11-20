import { fillRoundedRect, fillText, fillRect } from './common'
import MGCParam from '../MyCanvasParam/myGame'
import MyCanvas from '../MyCanvas'

let _ = {} //common

//绘制桌面区域
_.tableRect = ctx => {
    fillRect(ctx, {
        rect: MGCParam.table.area,
        color: MGCParam.table.bgColor,
    })
}
//绘制游戏记录区域
_.historyRect = ctx => {
    fillRect(ctx, {
        rect: MGCParam.history.area,
        color: MGCParam.history.bgColor,
    })
}

//绘制主机玩家区域
_.hostPlayerRect = ctx => {
    fillRect(ctx, {
        rect: MGCParam.host.area,
        color: MGCParam.player.bgColor,
    })
}

//绘制主机玩家区域
_.guestPlayerRect = ctx => {
    fillRect(ctx, {
        rect: MGCParam.guest.area,
        color: MGCParam.player.bgColor,
    })
}

//绘制结束按钮
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

//绘制主机玩家信息
_.hostPlayer = (ctx, isPlayerHost, info) => {
    player(ctx, {
        rect: MGCParam.host.info.area,
        text: info.name + (isPlayerHost ? '*' : ''),
    })
}

//绘制客机玩家信息
_.guestPlayer = (ctx, isPlayerHost, info) => {
    player(ctx, {
        rect: MGCParam.guest.info.area,
        text: info.name + (!isPlayerHost ? '*' : ''),
    })
}

const player = (ctx, config) => {
    fillText(ctx, {
        rect: config.rect,
        font: MyCanvas.px2Rem(24) + 'px Microsoft JhengHei',
        bgColor: MGCParam.player.info.bgColor,
        textColor: MGCParam.player.info.textColor,
        text: config.text,
        textAlign: 'left',
    })
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
            ctx.fillStyle = '#dddddd'
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

export default _
