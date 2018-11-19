<template>
    <canvas id="canvas_my_game" ></canvas>
</template>
<script>
import moment   from 'moment'
import MyCanvas from '../assets/js/MyCanvas.js'
import MGCParam from '../assets/js/MyCanvasParam/myGame.js'
import CommonDraw from '../assets/js/draw/common.js'
import MyGameDraw from '../assets/js/draw/myGame.js'

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
                MyGameDraw.player(this.ctx, true, this.isHost, val)
            }
        },
        guestPlayer(val){
            if(val){ 
                console.log(2)
                MyGameDraw.player(this.ctx, false, this.isHost, val)
            }
        }        
    },
    mounted() {
        console.log(' ')
        console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
        console.log('my-game mounted')

        this.canvas = document.querySelector('#canvas_my_game')
        this.ctx = this.canvas.getContext('2d')

        CommonDraw.clear(this.canvas)

        MyGameDraw.endBtn(this.ctx)


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
        eventListener(evt){
            const mousePos = MyCanvas.getMousePos(this.canvas, evt, 1)
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