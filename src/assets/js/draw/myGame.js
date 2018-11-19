//import common from './common'
import MGCParam from '../MyCanvasParam/myGame'
import MyCanvas from '../MyCanvas'

let _ = {} //common

_.drawEndBtn = ctx => {
    const btn = MGCParam.endBtn

    ctx.fillStyle = btn.bgcolor
    ctx.fillRect(btn.x, btn.y, btn.w, btn.h)

    ctx.font = MyCanvas.px2Rem(16) + 'px Microsoft JhengHei'
    ctx.fillStyle = btn.txtcolor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('结束游戏', btn.x + btn.w / 2, btn.y + btn.h / 2)
}

export default _