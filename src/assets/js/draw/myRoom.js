import CommonDraw from './common'
import MRCParam from '../MyCanvasParam/myRoom'
import MyCanvas from '../MyCanvas'

const dpr = MyCanvas.getDevicePixelRatio()

let _ = {}

_.exitBtn = ctx => {
    const btn = MRCParam.exitBtn

    ctx.fillStyle = btn.bgColor
    ctx.fillRect(btn.x, btn.y, btn.w, btn.h)

    ctx.font = MyCanvas.px2Rem(16) + 'px Microsoft JhengHei'
    ctx.fillStyle = btn.textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('退出', btn.x + btn.w / 2, btn.y + btn.h / 2)
}

_.hostPlayer = (ctx, isHost, isReady, info) => {
    const rectConfig = {
        rect: MRCParam.host.area,
        info: MRCParam.host.info.area,
        button: MRCParam.host.button,
    }
    drawPlayer(ctx, rectConfig, true, isHost, isReady, info)
}

_.guestPlayer = (ctx, isHost, isReady, info) => {
    const rectConfig = {
        rect: MRCParam.guest.area,
        info: MRCParam.guest.info.area,
        button: MRCParam.guest.button,
    }
    drawPlayer(ctx, rectConfig, false, !isHost, isReady, info)
}

const drawPlayer = (ctx, rectConfig, isHost, isPlayer, isReady, info) => {
    const rect = rectConfig.rect
    const rectInfo = rectConfig.info
    const rectButton = rectConfig.button
    ctx.clearRect(rect.x, rect.y, rect.w, rect.h)

    ctx.fillStyle = '#fefefe'
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h)

    if (info.id > -1) {
        ctx.fillStyle = '#fee9d6'
        ctx.fillRect(rectInfo.x, rectInfo.y, rectInfo.w, rectInfo.h)

        ctx.font = MyCanvas.px2Rem(24) + 'px Microsoft JhengHei'
        ctx.fillStyle = '#4b4b4b'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        const text = info.name + (isPlayer ? '*' : '')
        ctx.fillText(text, rectInfo.x + 10 * dpr, rectInfo.y + rectInfo.h / 2)
    }

    let buttonConfig = {}

    if (isPlayer) {
        //渲染当前玩家的按钮

        if (isHost) {
            //当前玩家是主机
            if (isReady) {
                //客机玩家已准备 按钮enabled_ok
                buttonConfig.bgColor = MRCParam.player.button.enabled.ok.bgColor
                buttonConfig.textcolor = MRCParam.player.button.enabled.ok.textColor
            } else {
                //客机玩家未准备 按钮disabled
                buttonConfig.bgColor = MRCParam.player.button.disabled.bgColor
                buttonConfig.textcolor = MRCParam.player.button.disabled.textColor
            }

            buttonConfig.text = '开始游戏'
        } else {
            //当前玩家是客机
            if (isReady) {
                //已准备  按钮enabled_cancel
                buttonConfig.bgColor = MRCParam.player.button.enabled.cancel.bgColor
                buttonConfig.textcolor = MRCParam.player.button.enabled.cancel.textColor
                buttonConfig.text = '取消准备'
            } else {
                //未准备  按钮enabled_ok
                buttonConfig.bgColor = MRCParam.player.button.enabled.ok.bgColor
                buttonConfig.textcolor = MRCParam.player.button.enabled.ok.textColor
                buttonConfig.text = '准备'
            }
        }

        ctx.fillStyle = buttonConfig.bgColor
        ctx.fillRect(rectButton.x, rectButton.y, rectButton.w, rectButton.h)

        ctx.font = MyCanvas.px2Rem(16) + 'px Microsoft JhengHei'
        ctx.fillStyle = buttonConfig.textcolor
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(buttonConfig.text, rectButton.x + rectButton.w / 2, rectButton.y + rectButton.h / 2)
    } else {
        if (!isHost && info.id > -1) {
            //当前玩家是主机 渲染客机玩家状态
            let readyText
            if (isReady) {
                readyText = '已准备'
            } else {
                readyText = '准备中'
            }

            let readyArea = MRCParam.guest.readyArea

            ctx.fillStyle = MRCParam.guest.readyArea.bgColor
            ctx.fillRect(readyArea.x, readyArea.y, readyArea.w, readyArea.h)

            ctx.font = MyCanvas.px2Rem(16) + 'px Microsoft JhengHei'
            ctx.fillStyle = MRCParam.guest.readyArea.textColor
            ctx.textAlign = 'left'
            ctx.textBaseline = 'middle'
            ctx.fillText(readyText, readyArea.x + 20 * dpr, readyArea.y + readyArea.h / 2)
        }
    }
}

export default _
