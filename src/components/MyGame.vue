<template>
    <canvas id="canvas_my_game" ></canvas>
</template>
<script>
import moment   from 'moment'
import MyCanvas,{ drawRoundedRect } from '../assets/js/MyCanvas.js'
import MGCParam from '../assets/js/MyCanvasParam/myGame.js'

export default {
    name: 'my_game',
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
        isPlaying(){
            return this.$store.getters['myGame/isPlaying']
        },
        hostHands(){
            return this.$store.getters['myGame/hostHands']
        },
        guestHands(){
            return this.$store.getters['myGame/guestHands']
        },
        roundNum(){
            return this.$store.getters['myGame/roundNum']
        },
        roundPlayerIsHost(){
            return this.$store.getters['myGame/roundPlayerIsHost']
        },
        libraryCardsNum(){
            return this.$store.getters['myGame/libraryCardsNum']
        },
        discardCardsNum(){
            return this.$store.getters['myGame/discardCardsNum']
        },
        lastUpdated(){
            return this.$store.getters['myGame/lastUpdated']
        },
        cueNum(){
            return this.$store.getters['myGame/cueNum']
        },
        chanceNum(){
            return this.$store.getters['myGame/chanceNum']
        },
        score(){
            return this.$store.getters['myGame/score']
        },
        successCards(){
            return this.$store.getters['myGame/successCards']
        },
    },
    watch: {
        hostPlayer(val){
            if(val){ 
                console.log(1)
                this.drawPlayer(this.ctx, true, val)
            }
        },
        guestPlayer(val){
            if(val){ 
                console.log(2)
                this.drawPlayer(this.ctx, false, val)
            }
        }        
    },
    mounted() {
        console.log(' ')
        console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
        console.log('my-game mounted')

        this.canvas = document.querySelector('#canvas_my_game')
        this.ctx = this.canvas.getContext('2d')

        this.clearCanvas(this.canvas)

        const drawEndBtn = (ctx) => {
            const btn = MGCParam.endBtn

            ctx.fillStyle = btn.bgcolor
            ctx.fillRect(btn.x, btn.y, btn.w, btn.h)

            ctx.font = MyCanvas.px2Rem(16) + 'px Microsoft JhengHei'
            ctx.fillStyle = btn.txtcolor
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText('退出', btn.x + btn.w / 2, btn.y + btn.h  / 2)
        }

        drawEndBtn(this.ctx)


        this.$store.dispatch('myRoom/GetInfo',{force:true})

        this.$store.dispatch('myGame/GetInfo',{force:true})

        this.intervalId = setInterval(()=>{
            this.$store.dispatch('myGame/GetInfo',{force:true})
        },1000)



        
        this.canvas.addEventListener('click',this.eventListener,false)
        // this.canvas.addEventListener('touchstart',this.eventListener,false)
        // this.canvas.addEventListener('touchend',this.eventListener,false)

    },
    methods: {
        clearCanvas(canvas) {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        },
        drawPlayer(ctx, isHost, info){

            let area = {}

            let infoArea = {}

            if(isHost){
                area.x = MGCParam.host.area.x
                area.y = MGCParam.host.area.y
                area.w = MGCParam.host.area.w
                area.h = MGCParam.host.area.h

                infoArea.x = MGCParam.host.info.area.x
                infoArea.y = MGCParam.host.info.area.y
                infoArea.w = MGCParam.host.info.area.w
                infoArea.h = MGCParam.host.info.area.h

            }else{
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

        },
        eventListener(evt){
            let _evt

            if(evt.type=='touchstart'){
                _evt = evt.touches[0]   //touchstart
            }else if (evt.type == 'touchend'){
                _evt = evt.changedTouches[0] //touchend
            }else if (evt.type == 'click') {
                _evt = evt
            }               
            
            const mousePos = MyCanvas.getMousePos(this.canvas, _evt, 1)
            // console.log("鼠标指针坐标：" + mousePos.x + "," + mousePos.y)
            function isPath(pos, areaName){
                let area
                switch(areaName){
                    case 'endBtn':
                        area = MGCParam.endBtn
                        break
                    default:
                        area = {x:0,y:0,w:0,h:0}
                }
                // console.log(pos.x)
                // console.log(pos.y)
                // console.log(area)

                return pos.x >= area.x && pos.x <= area.x + area.w && pos.y >= area.y && pos.y <= area.y + area.h
            }

            if(isPath(mousePos, 'endBtn')){
                this.$store.dispatch('myGame/End')
            }
        }
    },
    destroyed(){
        console.log(' ')
        console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
        console.log('my-game destroyed')


        clearInterval(this.intervalId)
    }
}
</script>
<style scoped>
    #canvas_my_game {
        position: absolute;
    }
</style>