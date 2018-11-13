<template>
    <canvas id="canvas_my_room" ></canvas>
</template>
<script>
    import moment   from 'moment'
    import MyCanvas from '../assets/js/MyCanvas.js'
    import RLCParam from '../assets/js/MyCanvasParam/myRoom.js'

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

                    console.log('hostPlayer watch')
//                    this.draw(this.ctx, newVal)

                }
            },
            guestPlayer(newVal, oldVal) {
    //            console.log(newVal)
    //            console.log(oldVal)

                if(newVal != oldVal){ //TODO object 永不相等
                    console.log('guestPlayer watch')
//                    this.draw(this.ctx, newVal)

                }
            }
        },
        mounted() {
             console.log(' ')
             console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
             console.log('my-room mounted')

            this.canvas = document.querySelector('#canvas_my_room')
            this.ctx = this.canvas.getContext('2d')


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
                    this.$store.dispatch('myRoom/GetInfo').then(()=>{
                        resolve()
                    })
                })
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
    #canvas_room_list {
        position: absolute;
    }
</style>