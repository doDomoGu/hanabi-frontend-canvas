<template>
    <canvas id="canvas_room_list"></canvas>
</template>
<script>

    import moment   from 'moment'

    import MyCanvas from '../assets/js/MyCanvas.js'

    export default {
        name: 'room_list',
        data() {
            return {
              intervalId : null
            }
        },
        computed:{
            roomList(){
                return this.$store.getters['room/list']
            }
        },
        watch: {
            roomList(newVal, oldVal) {
    //            console.log(newVal)
    //            console.log(oldVal)
    //            console.log(newVal != oldVal)
    //            console.log(Object.is(newVal, oldVal))

                if(newVal != oldVal){
    //                console.log(this.canvas)
    //                console.log(this.ctx)

                    this.draw(this.ctx, newVal)

                }
            }
        },
        mounted() {
            console.log(' ')
            console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
            console.log('mounted')

            this.canvas = document.querySelector('#canvas_room_list')
            this.ctx = this.canvas.getContext('2d')

            this.getList()
            this.intervalId = setInterval(()=>{
                this.getList()
            },1000)
        },
        methods: {
            getList(){
                if(this.$store.getters['user/isLogin']){
                    this.$store.dispatch('room/List')
                }
            },
            //设置canvas宽高 并清空内容
            clearCanvas(canvas) {
                console.log(' ')
                console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
                console.log('clear canvas room list ')

                canvas.width = window.innerWidth
                canvas.height = window.innerHeight
            },
            //绘制列表
            draw(ctx, roomList){
                console.log(' ')
                console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
                console.log('draw room list')

                this.clearCanvas(ctx.canvas)

                let x = 30
                let y = 30
                let w = ctx.canvas.width - x * 2
                let h = 40

                roomList.forEach((r,i)=>{
                    let y2 = y + ( h + 20 ) * i
                    ctx.fillStyle = '#fffefd'
                    ctx.fillRect(x, y2, w, h)

                    ctx.font = MyCanvas.px2Rem(30) + 'px Microsoft JhengHei'
                    ctx.fillStyle = '#8a8a8a'
                    ctx.textAlign = 'left'
                    ctx.textBaseline = 'middle'

                    let str = r.id + '. ' + r.title
                    ctx.fillText(str, x + 10, y2 + h  / 2)
                })

            },
        },
        destroyed(){
            console.log(' ')
            console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
            console.log('destroyed')

            clearInterval(this.intervalId)
        }
    }
</script>
<style scoped>
    #canvas_room_list {
        position: absolute;
    }
</style>