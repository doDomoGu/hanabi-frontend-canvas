<template>
    <canvas id="canvas_my_room" @click="eventListener"></canvas>
</template>
<script>
import moment   from 'moment'
import MyCanvas from '../assets/js/MyCanvas.js'
import MRCParam from '../assets/js/MyCanvasParam/myRoom.js'

export default {
    name: 'my_room',
    data() {
        return {
            intervalId : 0
        }
    },
    computed:{
        isHost(){
            return this.$store.getters['myRoom/isHost']
        },
        hostPlayer(){
            return this.$store.getters['myRoom/hostPlayer']
        },
        guestPlayer(){
            return this.$store.getters['myRoom/guestPlayer']
        },
        isReady(){
            return this.$store.getters['myRoom/isReady']
        }
    },
    watch: {
        hostPlayer(newVal, oldVal) {
            //            console.log(newVal)
            //            console.log(oldVal)

            if(newVal != oldVal){ //TODO object 永不相等


                console.log(' ')
                console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
                console.log('hostPlayer watch in my room')

                this.drawPlayer(this.ctx, true, newVal)

            }
        },
        guestPlayer(newVal, oldVal) {
            //            console.log(newVal)
            //            console.log(oldVal)

            if(newVal != oldVal){ //TODO object 永不相等

                console.log(' ')
                console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
                console.log('guestPlayer watch in my room')

                this.drawPlayer(this.ctx, false, newVal)

            }
        }
    },
    mounted() {
        console.log(' ')
        console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
        console.log('my-room mounted')

        this.canvas = document.querySelector('#canvas_my_room')
        this.ctx = this.canvas.getContext('2d')

        this.clearCanvas(this.canvas)

        this.drawExitBtn(this.ctx)

        this.$store.dispatch('myRoom/GetInfo',{force:true})
        
        this.intervalId = setInterval(()=>{
            this.$store.dispatch('myRoom/GetInfo',{force:true})
            this.$store.dispatch('myGame/GetInfo',{force:true,mode:'simple'})
        },3000)
        
        this.canvas.addEventListener('click',this.eventListener,false)
        // this.canvas.addEventListener('touchstart',this.eventListener,false)
        // this.canvas.addEventListener('touchend',this.eventListener,false)

    },
    methods: {
        clearCanvas(canvas) {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        },
        drawExitBtn(ctx) {
            const btn = MRCParam.exitBtn

            ctx.fillStyle = btn.bgcolor
            ctx.fillRect(btn.x, btn.y, btn.w, btn.h)

            ctx.font = MyCanvas.px2Rem(16) + 'px Microsoft JhengHei'
            ctx.fillStyle = btn.txtcolor
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText('退出', btn.x + btn.w / 2, btn.y + btn.h  / 2)
        },
        drawPlayer(ctx, isHost, info){

            let area = {}

            let infoArea = {}

            let button = {}

            if(isHost){
                area.x = MRCParam.host.area.x
                area.y = MRCParam.host.area.y
                area.w = MRCParam.host.area.w
                area.h = MRCParam.host.area.h

                infoArea.x = MRCParam.host.info.area.x
                infoArea.y = MRCParam.host.info.area.y
                infoArea.w = MRCParam.host.info.area.w
                infoArea.h = MRCParam.host.info.area.h

                button.x = MRCParam.host.button.x
                button.y = MRCParam.host.button.y
                button.w = MRCParam.host.button.w
                button.h = MRCParam.host.button.h
            }else{
                area.x = MRCParam.guest.area.x
                area.y = MRCParam.guest.area.y
                area.w = MRCParam.guest.area.w
                area.h = MRCParam.guest.area.h

                infoArea.x = MRCParam.guest.info.area.x
                infoArea.y = MRCParam.guest.info.area.y
                infoArea.w = MRCParam.guest.info.area.w
                infoArea.h = MRCParam.guest.info.area.h

                button.x = MRCParam.guest.button.x
                button.y = MRCParam.guest.button.y
                button.w = MRCParam.guest.button.w
                button.h = MRCParam.guest.button.h
            }

            ctx.clearRect(area.x, area.y, area.w, area.h)


            ctx.fillStyle = '#fefefe'
            ctx.fillRect(area.x, area.y, area.w, area.h)

            if(info.id > -1){
                ctx.fillStyle = '#fee9d6'
                ctx.fillRect(infoArea.x, infoArea.y, infoArea.w, infoArea.h)


                ctx.font = MyCanvas.px2Rem(24) + 'px Microsoft JhengHei'
                ctx.fillStyle = '#4b4b4b'
                ctx.textAlign = 'left'
                ctx.textBaseline = 'middle'
                let str = info.name + (isHost === this.isHost ? '*':'')
                ctx.fillText(str, infoArea.x + 10, infoArea.y + infoArea.h  / 2)
            }


            if(isHost === this.isHost){ //渲染当前玩家的按钮

                if(this.isHost){ //当前玩家是主机
                    if(this.isReady){ //客机玩家已准备 按钮enabled_ok
                        button.bgcolor   = MRCParam.player.button.enabled.ok.bgcolor
                        button.txtcolor  = MRCParam.player.button.enabled.ok.txtcolor
                    }else{ //客机玩家未准备 按钮disabled
                        button.bgcolor   = MRCParam.player.button.disabled.bgcolor
                        button.txtcolor  = MRCParam.player.button.disabled.txtcolor
                    }

                    button.txt = '开始游戏'

                }else{ //当前玩家是客机
                    if(this.isReady){ //已准备  按钮enabled_cancel
                        button.bgcolor   = MRCParam.player.button.enabled.cancel.bgcolor
                        button.txtcolor  = MRCParam.player.button.enabled.cancel.txtcolor
                        button.txt = '取消准备'
                    }else{ //未准备  按钮enabled_ok
                        button.bgcolor   = MRCParam.player.button.enabled.ok.bgcolor
                        button.txtcolor  = MRCParam.player.button.enabled.ok.txtcolor
                        button.txt = '准备'
                    }
                }

                ctx.fillStyle = button.bgcolor
                ctx.fillRect(button.x, button.y, button.w, button.h)

                ctx.font = MyCanvas.px2Rem(16) + 'px Microsoft JhengHei'
                ctx.fillStyle = button.txtcolor
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(button.txt, button.x + button.w / 2, button.y + button.h  / 2)

            }else{
                if(!isHost && info.id > -1){ //当前玩家是主机 渲染客机玩家状态
                    let readyTxt
                    if(this.isReady){
                        readyTxt = '已准备'
                    }else{
                        readyTxt = '准备中'
                    }


                    let readyArea = MRCParam.guest.readyArea

                    ctx.fillStyle = MRCParam.guest.readyArea.bgcolor
                    ctx.fillRect(readyArea.x, readyArea.y, readyArea.w, readyArea.h)

                    ctx.font = MyCanvas.px2Rem(16) + 'px Microsoft JhengHei'
                    ctx.fillStyle = MRCParam.guest.readyArea.txtcolor
                    ctx.textAlign = 'left'
                    ctx.textBaseline = 'middle'
                    ctx.fillText(readyTxt, readyArea.x + 20, readyArea.y + readyArea.h  / 2)
                }
            }
            
        },
        eventListener(evt){
            const mousePos = MyCanvas.getMousePos(this.canvas, evt, 1)

            // console.log("鼠标指针坐标：" + mousePos.x + "," + mousePos.y)
            // eturn false


            function isPath(pos, areaName){
                let area
                switch(areaName){
                    case 'exitBtn':
                        area = MRCParam.exitBtn
                        break
                    case 'startBtn':
                        area = MRCParam.host.button
                        break
                    case 'readyBtn':
                        area = MRCParam.guest.button
                        break
                    default:
                        area = {x:0,y:0,w:0,h:0}
                }
                return pos.x >= area.x && pos.x <= area.x + area.w && pos.y >= area.y && pos.y <= area.y + area.h
            }

            if(isPath(mousePos, 'exitBtn')){
                this.$store.dispatch('myRoom/Exit')
            }else if(isPath(mousePos, 'readyBtn')) {
                if(!this.isHost){
                    this.$store.dispatch('myRoom/DoReady')
                }
            }else if(isPath(mousePos, 'startBtn')){
                if(this.isHost && this.isReady){
                    this.$store.dispatch('myGame/Start')
                }
            }

            //                this.drawTest(this.ctx, mousePos, itemIndex)
        }
    },
    destroyed(){
        console.log(' ')
        console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
        console.log('my-room destroyed')

        clearInterval(this.intervalId)
    }
}
</script>
<style scoped>
    #canvas_my_room {
        position: absolute;
        width:100%;
        height:100%;
    }
</style>