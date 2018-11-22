import CommonDraw, { fillRoundedRect, fillText, fillRect } from './common'
import MGCParam from '../MyCanvasParam/myGame'
import MyCanvas from '../MyCanvas'

const colors = ['white', 'blue', 'yellow', 'red', 'green']
const numbers = [1, 1, 1, 2, 2, 3, 3, 4, 4, 5]

let _ = {} //common

//绘制背景
_.bottomRect = ctx => {
    //主机玩家区域背景
    fillRect(ctx, { rect: MGCParam.host.area, color: MGCParam.player.bgColor })
    //主机玩家信息区域背景
    fillRect(ctx, { rect: MGCParam.host.info.area, color: MGCParam.player.info.bgColor })
    //客机玩家区域背景
    fillRect(ctx, { rect: MGCParam.guest.area, color: MGCParam.player.bgColor })
    //客机玩家信息区域背景
    fillRect(ctx, { rect: MGCParam.guest.info.area, color: MGCParam.player.info.bgColor })
    //桌面区域背景
    fillRect(ctx, { rect: MGCParam.table.area, color: MGCParam.table.bgColor })
    //游戏记录区域背景
    fillRect(ctx, { rect: MGCParam.history.area, color: MGCParam.history.bgColor })
}

//canvas_top 遮罩背景
_.topRect = ctx => {
    ctx.fillStyle = 'rgba(222,222,222,0.8)'
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
}

//绘制结束按钮
_.endBtn = ctx => {
    const btn = MGCParam.endBtn
 
    ctx.fillStyle = btn.bgColor
    ctx.fillRect(btn.x, btn.y, btn.w, btn.h)

    ctx.font = MyCanvas.px2Rem(16) + 'px Microsoft JhengHei'
    ctx.fillStyle = btn.textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('结束游戏', btn.x + btn.w / 2, btn.y + btn.h / 2)
}

//绘制主机玩家信息
_.hostPlayer = (ctx, isPlayerHost, info) => {
    player(ctx, {
        rect: MGCParam.host.info.content.area,
        text: info.name + (isPlayerHost ? '*' : ''),
    })
}

//绘制客机玩家信息
_.guestPlayer = (ctx, isPlayerHost, info) => {
    player(ctx, {
        rect: MGCParam.guest.info.content.area,
        text: info.name + (!isPlayerHost ? '*' : ''),
    })
}

//绘制单个玩家信息
const player = (ctx, config) => {
    fillText(ctx, {
        rect: config.rect,
        font: MyCanvas.px2Rem(24) + 'px Microsoft JhengHei',
        textColor: MGCParam.player.info.textColor,
        text: config.text,
        textAlign: 'left',
    })
}

//绘制主机玩家手牌
_.hostHands = (ctx, isPlayerHost, hands) => {
    const rects = JSON.parse(JSON.stringify(MGCParam.host.hands.areas))

    if (isPlayerHost) {
        backHands(ctx, rects, hands)
    } else {
        frontHands(ctx, rects, hands)
    }
}
//绘制客机玩家手牌
_.guestHands = (ctx, isPlayerHost, hands) => {
    const rects = JSON.parse(JSON.stringify(MGCParam.guest.hands.areas))
    if (isPlayerHost) {
        frontHands(ctx, rects, hands)
    } else {
        backHands(ctx, rects, hands)
    }
}

//对手手牌 显示正面
const frontHands = (ctx, rects, hands) => {
    hands.forEach((c, i) => {
        let color = colors[c.color]
        let rect = rects[i]
        ctx.fillStyle = MGCParam.player.hands.front.bgColor[color]
        fillRoundedRect(ctx, rect, 4)

        ctx.font = MyCanvas.px2Rem(14) + 'px Microsoft JhengHei'
        ctx.fillStyle = MGCParam.player.hands.front.textColor[color]
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(numbers[c.num], rect.x + rect.w / 2, rect.y + rect.h / 2)
    })
}

//自己手牌 显示背面
const backHands = (ctx, rects, hands) => {
    hands.forEach((c, i) => {
        let rect = rects[i]
        ctx.fillStyle = MGCParam.player.hands.back.bgColor
        fillRoundedRect(ctx, rect, 4)
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

_.nowPlaying = (ctx, isHost) => {
    const rectHost = MGCParam.host.info.nowPlaying.area
    const rectGuest = MGCParam.guest.info.nowPlaying.area

    ctx.clearRect(rectHost.x, rectHost.y, rectHost.w, rectHost.h)
    ctx.clearRect(rectGuest.x, rectGuest.y, rectGuest.w, rectGuest.h)

    const rect = isHost ? rectHost : rectGuest

    fillText(ctx, {
        rect: rect,
        font: MyCanvas.px2Rem(16) + 'px Microsoft JhengHei',
        textColor: '#333333',
        text: '当前回合',
        textAlign: 'left',
    })
}

_.topConfirmPlay = ctx => {
    CommonDraw.clear(ctx.canvas)
    _.topRect(ctx)

    ctx.font = MyCanvas.px2Rem(24) + 'px Microsoft JhengHei'
    ctx.fillStyle = '#333'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText('确定要打出这张牌么', window.innerWidth / 2, window.innerHeight / 2)

    const rectOk = {
        x: window.innerWidth / 2 - 100,
        y: window.innerHeight / 2 + 20,
        w: MGCParam.btn.area.w,
        h: MGCParam.btn.area.h,
    }
    ctx.fillStyle = MGCParam.btn.ok.bgColor
    fillRoundedRect(ctx, rectOk, 4)

    ctx.font = MyCanvas.px2Rem(12) + 'px Microsoft JhengHei'
    ctx.fillStyle = MGCParam.btn.ok.textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('确定', rectOk.x + rectOk.w / 2, rectOk.y + rectOk.h / 2)

    const rectCancel = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 + 20,
        w: MGCParam.btn.area.w,
        h: MGCParam.btn.area.h,
    }
    ctx.fillStyle = MGCParam.btn.cancel.bgColor
    fillRoundedRect(ctx, rectCancel, 4)

    ctx.font = MyCanvas.px2Rem(12) + 'px Microsoft JhengHei'
    ctx.fillStyle = MGCParam.btn.cancel.textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('取消', rectCancel.x + rectCancel.w / 2, rectCancel.y + rectCancel.h / 2)
}

_.topConfirmCue = ctx => {
    CommonDraw.clear(ctx.canvas)

    _.topRect(ctx)

    ctx.font = MyCanvas.px2Rem(24) + 'px Microsoft JhengHei'
    ctx.fillStyle = '#333'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('确定要提示这张牌么', window.innerWidth / 2, window.innerHeight / 2)

    const rectCueNum = {
        x: window.innerWidth / 2 - 80,
        y: window.innerHeight / 2 + 20,
        w: MGCParam.btn.area.w,
        h: MGCParam.btn.area.h,
    }
    ctx.fillStyle = MGCParam.btn.cueNum.bgColor
    fillRoundedRect(ctx, rectCueNum, 4)

    ctx.font = MyCanvas.px2Rem(12) + 'px Microsoft JhengHei'
    ctx.fillStyle = MGCParam.btn.cueNum.textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('提示数字', rectCueNum.x + rectCueNum.w / 2, rectCueNum.y + rectCueNum.h / 2)

    const rectCueColor = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 + 20,
        w: MGCParam.btn.area.w,
        h: MGCParam.btn.area.h,
    }
    ctx.fillStyle = MGCParam.btn.ok.bgColor
    fillRoundedRect(ctx, rectCueColor, 4)

    ctx.font = MyCanvas.px2Rem(12) + 'px Microsoft JhengHei'
    ctx.fillStyle = MGCParam.btn.ok.textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('提示颜色', rectCueColor.x + rectCueColor.w / 2, rectCueColor.y + rectCueColor.h / 2)

    const rectCancel = {
        x: window.innerWidth / 2 + 80,
        y: window.innerHeight / 2 + 20,
        w: MGCParam.btn.area.w,
        h: MGCParam.btn.area.h,
    }
    ctx.fillStyle = MGCParam.btn.cancel.bgColor
    fillRoundedRect(ctx, rectCancel, 4)

    ctx.font = MyCanvas.px2Rem(12) + 'px Microsoft JhengHei'
    ctx.fillStyle = MGCParam.btn.cancel.textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('取消', rectCancel.x + rectCancel.w / 2, rectCancel.y + rectCancel.h / 2)
}

export default _
