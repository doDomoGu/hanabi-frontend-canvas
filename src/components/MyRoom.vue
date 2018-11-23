<template>
    <canvas id="canvas_my_room" @click="eventListener"></canvas>
</template>
<script>
import MyCanvas from '../assets/js/MyCanvas.js'
import MRCParam from '../assets/js/MyCanvasParam/myRoom.js'
import CommonDraw from '../assets/js/draw/common.js'
import MyRoomDraw from '../assets/js/draw/myRoom.js'

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
            MyRoomDraw.hostPlayer(this.ctx, this.isHost, this.isReady, newVal)
        },
        guestPlayer(newVal, oldVal) {
            MyRoomDraw.guestPlayer(this.ctx, this.isHost, this.isReady, newVal)
        }
    },
    mounted() {
        this.canvas = document.querySelector('#canvas_my_room')
        this.ctx = this.canvas.getContext('2d')
        
        CommonDraw.clear(this.canvas)

        MyRoomDraw.exitBtn(this.ctx)

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
        eventListener(evt){
            const mousePos = MyCanvas.getMousePos(this.canvas, evt)
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