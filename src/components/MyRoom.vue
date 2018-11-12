<template>
    <canvas id="canvas_my_room" ></canvas>
</template>
<script>
    import moment   from 'moment'
    import MyCanvas from '../assets/js/MyCanvas.js'
//    import RLCParam from '../assets/js/MyCanvasParam/roomList.js'

    export default {
        name: 'my_room',
        data() {
            return {
              intervalId : 0
            }
        },
        computed:{
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
             console.log('my-room mounted')

            this.canvas = document.querySelector('#canvas_my_room')
            this.ctx = this.canvas.getContext('2d')

            /*this.getList().then(()=>{
                this.intervalId = setInterval(()=>{
                    this.getList()
                },1000)
            })*/
        },
        methods: {

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