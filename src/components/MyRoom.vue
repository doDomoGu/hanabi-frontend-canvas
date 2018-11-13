<template>
    <canvas id="canvas_my_room" ></canvas>
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
                    console.log('hostPlayer watch')

                    this.drawPlayer(this.ctx, true, newVal)

                }
            },
            guestPlayer(newVal, oldVal) {
    //            console.log(newVal)
    //            console.log(oldVal)

                if(newVal != oldVal){ //TODO object 永不相等

                    console.log(' ')
                    console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
                    console.log('guestPlayer watch')

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

            this.getPlayerInfo()

            /*this.getList().then(()=>{
                this.intervalId = setInterval(()=>{
                    this.getList()
                },1000)
            })*/



        },
        methods: {
            getPlayerInfo(){
                return new Promise((resolve, reject) => {
                    this.$store.dispatch('myRoom/GetInfo',{force:true}).then(()=>{

                        console.log(' ')
                        console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
                        console.log('get info in my room')

                        resolve()
                    })
                })
            },
            clearCanvas(canvas) {
                canvas.width = window.innerWidth
                canvas.height = window.innerHeight
            },
            drawPlayer(ctx, isHost, info){

                let area = {}

                let infoArea = {}

                if(isHost){
                    area.x = MRCParam.host.area.x
                    area.y = MRCParam.host.area.y
                    area.w = MRCParam.host.area.w
                    area.h = MRCParam.host.area.h

                    infoArea.x = MRCParam.host.info.area.x
                    infoArea.y = MRCParam.host.info.area.y
                    infoArea.w = MRCParam.host.info.area.w
                    infoArea.h = MRCParam.host.info.area.h
                }else{
                    area.x = MRCParam.guest.area.x
                    area.y = MRCParam.guest.area.y
                    area.w = MRCParam.guest.area.w
                    area.h = MRCParam.guest.area.h

                    infoArea.x = MRCParam.guest.info.area.x
                    infoArea.y = MRCParam.guest.info.area.y
                    infoArea.w = MRCParam.guest.info.area.w
                    infoArea.h = MRCParam.guest.info.area.h
                }

                ctx.clearRect(area.x,area.y,area.w,area.h)


                ctx.fillStyle = '#fefefe'
                ctx.fillRect(area.x,area.y,area.w,area.h)

                ctx.fillStyle = '#fee9d6'
                ctx.fillRect(infoArea.x,infoArea.y,infoArea.w,infoArea.h)

                if(info.id > -1){
                    ctx.font = MyCanvas.px2Rem(24) + 'px Microsoft JhengHei'
                    ctx.fillStyle = '#4b4b4b'
                    ctx.textAlign = 'left'
                    ctx.textBaseline = 'middle'
                    let str = info.name
                    ctx.fillText(str, infoArea.x + 10, infoArea.y + infoArea.h  / 2)
                }






            }
        },
        destroyed(){
             console.log(' ')
             console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
             console.log('my-room destroyed')

            //clearInterval(this.intervalId)
        }
    }
</script>
<style scoped>
    #canvas_my_room {
        position: absolute;
    }
</style>