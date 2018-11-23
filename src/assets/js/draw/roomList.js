import CommonDraw from './common'
import RLCParam from '../MyCanvasParam/roomList'
import MyCanvas from '../MyCanvas'

let _ = {}

_.list = (ctx, list) => {
    CommonDraw.clear(ctx.canvas)

    for (let index in list) {
        let _idx = parseInt(index) + 1
        //drawItem(ctx, _idx, list[index].title, this.itemIndex === _idx)

        drawItem(ctx, _idx, _idx + '. ' + list[index].title, false)
    }
}
//绘制单个
const drawItem = (ctx, index, text, actived, transition = false) => {
    let rect = JSON.parse(JSON.stringify(RLCParam.item.rect))
    rect.y += parseInt(index - 1) * parseInt(rect.h + RLCParam.item.margin)

    let bgcolor, txtcolor

    const colorTxt = 35 //起始颜色值
    const len = 10 //层次长度
    const step = 22 //步长
    const colorBg = colorTxt + len * step //结束颜色值

    const cTxt = colorTxt.toString(16),
        cBg = colorBg.toString(16)

    if (transition) {
        //渐隐渐显过渡效果
        /* const t = async()=>{
            await setTimeout(()=>{
                ctx.fillStyle = bgcolor
                ctx.fillRect(x, y, w, h)
                
                ctx.font = MyCanvas.px2Rem(24) + 'px Microsoft JhengHei'
                ctx.fillStyle = txtcolor
                ctx.textAlign = 'left'
                ctx.textBaseline = 'middle'
                ctx.fillText(txt, x + 10, y + h  / 2)
            },200)
        }


        const s = async ()=>{
            let c2Bg,c2Txt

            for(let i = 0; i < len; i++){
                console.log(i)
                if(actived) {
                    c2Bg = cTxt - i * step
                    c2Txt = cBg + i * step
                }else{
                    c2Bg = cBg + i * step
                    c2Txt = cTxt - i * step
                }

                bgcolor = '#'+c2Bg+c2Bg+c2Bg
                txtcolor = '#'+c2Txt+c2Txt+c2Txt

                
                await t()
            }
        }

        s() */
    } else {
        const activedBgcolor = '#' + cBg + cBg + cBg,
            activedTxtcolor = '#' + cTxt + cTxt + cTxt,
            unactivedBgcolor = activedBgcolor,
            unactivedTxtcolor = activedTxtcolor

        if (actived) {
            bgcolor = activedBgcolor
            txtcolor = activedTxtcolor
        } else {
            bgcolor = unactivedBgcolor
            txtcolor = unactivedTxtcolor
        }
        ctx.fillStyle = bgcolor
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h)

        ctx.font = RLCParam.item.fontSize + 'px PingFangSC-Regular'
        // ctx.font = '50px Microsoft JhengHei'
        ctx.fillStyle = txtcolor
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        ctx.fillText(text, rect.x + 10, rect.y + rect.h / 2)
    }
}

export default _
