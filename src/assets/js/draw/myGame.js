import { fillRoundedRect, fillText, fillRect } from './common'
import MGCParam from '../MyCanvasParam/myGame'
import MyCanvas from '../MyCanvas'

const colors = ['white', 'blue', 'yellow', 'red', 'green']
const numbers = [1, 1, 1, 2, 2, 3, 3, 4, 4, 5]

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

//绘制单个玩家信息
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

//绘制主机玩家手牌
_.hostHands = (ctx, isPlayerHost, hands) => {
    const rect = JSON.parse(JSON.stringify(MGCParam.host.hands))
    if (isPlayerHost) {
        backHands(ctx, rect, hands)
    } else {
        frontHands(ctx, rect, hands)
    }
}
//绘制客机玩家手牌
_.guestHands = (ctx, isPlayerHost, hands) => {
    const rect = JSON.parse(JSON.stringify(MGCParam.guest.hands))
    if (isPlayerHost) {
        frontHands(ctx, rect, hands)
    } else {
        backHands(ctx, rect, hands)
    }
}

//对手手牌 显示正面
const frontHands = (ctx, rect, hands) => {
    hands.forEach(c => {
        let color = colors[c.color]

        ctx.fillStyle = MGCParam.player.hands.front.bgColor[color]
        fillRoundedRect(ctx, rect, 4)

        ctx.font = MyCanvas.px2Rem(14) + 'px Microsoft JhengHei'
        ctx.fillStyle = MGCParam.player.hands.front.textColor[color]
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(numbers[c.num], rect.x + rect.w / 2, rect.y + rect.h / 2)

        rect.x += rect.w + MGCParam.player.area.padding
    })
}

//自己手牌 显示背面
const backHands = (ctx, rect, hands) => {
    hands.forEach(() => {
        ctx.fillStyle = MGCParam.player.hands.back.bgColor
        fillRoundedRect(ctx, rect, 4)

        rect.x += rect.w + MGCParam.player.area.padding
    })
}

//绘制卡牌带数字
const cardsNum = (ctx, config, num) => {
    const rect = config.area
    ctx.fillStyle = config.bgColor
    fillRoundedRect(ctx, rect, 4)

    ctx.font = MyCanvas.px2Rem(12) + 'px Microsoft JhengHei'
    ctx.fillStyle = config.textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText(config.title, rect.x + rect.w / 2, rect.y + rect.h / 2)
    ctx.textBaseline = 'top'
    ctx.fillText(num + '张', rect.x + rect.w / 2, rect.y + rect.h / 2)
}

//绘制牌库
_.libraryCards = (ctx, num) => {
    cardsNum(ctx, MGCParam.table.libraryCards, num)
}
//绘制弃牌堆
_.discardCards = (ctx, num) => {
    cardsNum(ctx, MGCParam.table.discardCards, num)
}

//绘制数字
const _num = (ctx, rect, text) => {
    ctx.clearRect(rect.x, rect.y, rect.w, rect.h)

    ctx.font = MyCanvas.px2Rem(12) + 'px Microsoft JhengHei'
    ctx.fillStyle = MGCParam.table.num.textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, rect.x + rect.w / 2, rect.y + rect.h / 2)
}

//剩余提示数
_.cueNum = (ctx, num) => {
    const rect = JSON.parse(JSON.stringify(MGCParam.table.num.area))
    _num(ctx, rect, '提示数:' + num)
}
//剩余机会数
_.chanceNum = (ctx, num) => {
    const rect = JSON.parse(JSON.stringify(MGCParam.table.num.area))
    rect.y += MGCParam.table.num.area.h + MGCParam.window.padding
    _num(ctx, rect, '机会数:' + num)
}
//分数
_.score = (ctx, num) => {
    const rect = JSON.parse(JSON.stringify(MGCParam.table.num.area))
    rect.y += (MGCParam.table.num.area.h + MGCParam.window.padding) * 2
    _num(ctx, rect, '分数:' + num)
}

//绘制成功打出的卡牌
_.successCards = (ctx, successCards) => {
    //TODO
    const rect = JSON.parse(JSON.stringify(MGCParam.table.successCards.area))

    ctx.clearRect(rect.x, rect.y, (rect.w + MGCParam.table.successCards.margin) * 5, rect.h)

    colors.forEach((c, i) => {
        ctx.fillStyle = MGCParam.card.front.bgColor[c]
        fillRoundedRect(ctx, rect, 4)

        ctx.font = MyCanvas.px2Rem(8) + 'px Microsoft JhengHei'
        ctx.fillStyle = MGCParam.card.front.textColor[c]
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(successCards[i], rect.x + rect.w / 2, rect.y + rect.h / 2)

        rect.x += rect.w + MGCParam.table.successCards.margin
    })
}

export default _
