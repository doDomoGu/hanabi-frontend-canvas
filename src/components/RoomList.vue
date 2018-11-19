<template>
    <canvas id="canvas_room_list" ></canvas>
</template>
<script>
import moment   from 'moment'
import MyCanvas from '../assets/js/MyCanvas.js'
import RLCParam from '../assets/js/MyCanvasParam/roomList.js'

export default {
    name: 'room_list',
    data() {
        return {
            intervalId : 0,
            itemIndex : 0
        }
    },
    computed:{
        list(){
            return this.$store.getters['room/list']
        },
        count(){
            return this.$store.getters['room/count']
        }
    },
    watch: {
        list(newVal, oldVal) {
            //            console.log(newVal)
            //            console.log(oldVal)
            //            console.log(newVal != oldVal)
            //            console.log(Object.is(newVal, oldVal))

            if(newVal != oldVal){ //TODO object 永不相等
                //                console.log(this.canvas)
                //                console.log(this.ctx)

                this.draw(this.ctx, newVal)

            }
        }
    },
    mounted() {
        console.log(' ')
        console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
        console.log('room list mounted')

        this.canvas = document.querySelector('#canvas_room_list')
        this.ctx = this.canvas.getContext('2d')


        this.$store.dispatch('room/GetList')

        this.intervalId = setInterval(()=>{
            this.$store.dispatch('room/GetList')
        },1000)

        this.canvas.addEventListener('touchstart',this.eventListener,false)
        this.canvas.addEventListener('touchend',this.eventListener,false)
    },
    methods: {
        //设置canvas宽高 并清空内容
        clearCanvas(canvas) {
            //                console.log(' ')
            //                console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
            //                console.log('clear canvas room list ')

            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        },
        //绘制列表
        draw(ctx, list){
            this.clearCanvas(ctx.canvas)
            //                console.log(' ')
            //                console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
            //                console.log('draw room list')

            for(let index in list){
                let _idx = parseInt(index) + 1
                this.drawItem(ctx, _idx, this.itemIndex === _idx)

            }
        },
        //绘制单个
        drawItem(ctx, index, actived, transition = false){
            let w = RLCParam.listItemW
            let h = RLCParam.listItemH
            let pad = RLCParam.listItemPad
            let x = RLCParam.listX
            let y = RLCParam.listY + parseInt(index - 1) * parseInt(h + pad)

            let txt = index + '. ' + this.list[index - 1].title
            
            let bgcolor, txtcolor

            const colorTxt = 35   //起始颜色值
            const len = 10      //层次长度
            const step = 22     //步长
            const colorBg = colorTxt + len * step  //结束颜色值

            const cTxt = colorTxt.toString(16), cBg = colorBg.toString(16)
            
            if(transition) { //渐隐渐显过渡效果
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

                
                

            }else{

                const activedBgcolor    = '#'+cBg+cBg+cBg,
                    activedTxtcolor     = '#'+cTxt+cTxt+cTxt,
                    unactivedBgcolor    = activedBgcolor,
                    unactivedTxtcolor   = activedTxtcolor

                if(actived){
                    bgcolor = activedBgcolor
                    txtcolor = activedTxtcolor
                }else{
                    bgcolor = unactivedBgcolor
                    txtcolor  = unactivedTxtcolor
                }
                ctx.fillStyle = bgcolor
                ctx.fillRect(x, y, w, h)
                
                ctx.font = MyCanvas.px2Rem(24) + 'px Microsoft JhengHei'
                ctx.fillStyle = txtcolor
                ctx.textAlign = 'left'
                ctx.textBaseline = 'middle'
                ctx.fillText(txt, x + 10, y + h  / 2)
            }

            
        },
        //test 绘制点击信息
        drawTest(ctx, pos, index){
            let x = 10
            let y = window.innerHeight - 80
            let w = 300
            let h = 50


            ctx.fillStyle = '#fefefe'
            ctx.fillRect(x, y, w, h)

            ctx.font = MyCanvas.px2Rem(24) + 'px Microsoft JhengHei'
            ctx.fillStyle = '#4b4b4b'
            ctx.textAlign = 'left'
            ctx.textBaseline = 'middle'

            let str = "坐标：" + pos.x + "," + pos.y + ' = ' + index + ' ' + (index==this.itemIndex ? 'ok':'no')
            ctx.fillText(str, x + 10, y + h  / 2)
        },
        eventListener(evt){
            const mousePos = MyCanvas.getMousePos(this.canvas, evt, 1)
            //console.log("鼠标指针坐标：" + mousePos.x + "," + mousePos.y)

            function getListItemIndex(pos, listCount){
                let index = 0
                let x1 = RLCParam.listX
                let x2 = RLCParam.listItemW + RLCParam.listX
                if(pos.x >= x1 && pos.x <= x2){
                    let y1, y2

                    for(let i = 1 ; i <= listCount ; i++ ){
                        y1 = RLCParam.listY + parseInt(RLCParam.listItemH + RLCParam.listItemPad) * ( i - 1)
                        y2 = y1 + RLCParam.listItemH    
                        if( pos.y >= y1 && pos.y <= y2){
                            index = i
                            break
                        }
                    }
                }
                return index
            }

            const itemIndex = getListItemIndex(mousePos,this.count)

            this.drawTest(this.ctx, mousePos, itemIndex)

            if(evt.type == 'touchstart'){
                this.itemIndex = itemIndex

                this.drawItem(this.ctx, this.itemIndex, true)
            }else if(evt.type == 'touchend'){
                this.drawItem(this.ctx, this.itemIndex, false)

                if(itemIndex > 0 && itemIndex == this.itemIndex && itemIndex <= this.count) {
                    this.enter(itemIndex)
                }else{
                    this.itemIndex = 0
                }
            }
        },
        async enter(index){
            await this.$store.dispatch('myRoom/Enter',index)
            await this.$store.dispatch('myRoom/GetInfo',{force:true})
        }
    },
    destroyed(){
        console.log(' ')
        console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
        console.log('room list destroyed')

        clearInterval(this.intervalId)
    }
}
</script>
<style scoped>
    #canvas_room_list {
        position: absolute;
    }
</style>