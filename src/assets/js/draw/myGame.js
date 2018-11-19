//import common from './common'
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

    let area = {}

    let infoArea = {}

    if (isHost) {
        area.x = MGCParam.host.area.x
        area.y = MGCParam.host.area.y
        area.w = MGCParam.host.area.w
        area.h = MGCParam.host.area.h

        infoArea.x = MGCParam.host.info.area.x
        infoArea.y = MGCParam.host.info.area.y
        infoArea.w = MGCParam.host.info.area.w
        infoArea.h = MGCParam.host.info.area.h

    } else {
        area.x = MGCParam.guest.area.x
        area.y = MGCParam.guest.area.y
        area.w = MGCParam.guest.area.w
        area.h = MGCParam.guest.area.h

        infoArea.x = MGCParam.guest.info.area.x
        infoArea.y = MGCParam.guest.info.area.y
        infoArea.w = MGCParam.guest.info.area.w
        infoArea.h = MGCParam.guest.info.area.h

    }

    ctx.clearRect(area.x, area.y, area.w, area.h)

    ctx.fillStyle = '#fefefe'
    ctx.fillRect(area.x, area.y, area.w, area.h)

    if (info.id > -1) {
        ctx.fillStyle = '#fee9d6'
        ctx.fillRect(infoArea.x, infoArea.y, infoArea.w, infoArea.h)


        ctx.font = MyCanvas.px2Rem(24) + 'px Microsoft JhengHei'
        ctx.fillStyle = '#4b4b4b'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        let str = info.name + (isHost === isPlayerHost ? '*' : '')
        ctx.fillText(str, infoArea.x + 10, infoArea.y + infoArea.h / 2)
    }

}

export default _