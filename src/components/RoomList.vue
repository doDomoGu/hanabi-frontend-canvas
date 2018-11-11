<template>
    <canvas id="canvas_room_list"></canvas>
</template>
<script>
    import moment   from 'moment'
    import MyCanvas from '../assets/js/MyCanvas.js'
    import RLCParam from '../assets/js/MyCanvasParam/roomList.js'

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
            // console.log(' ')
            // console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
            // console.log('mounted')

            this.canvas = document.querySelector('#canvas_room_list')
            this.ctx = this.canvas.getContext('2d')

            this.getList()
            this.intervalId = setInterval(()=>{
                this.getList()
            },1000)

            /* 点击事件 */
            this.canvas.addEventListener('touchstart', (evt) => {
              // console.log(evt); return true;
              // evt = evt.changedTouches[0]; //touchend
               evt = evt.touches[0];   //touchstart
                const mousePos = MyCanvas.getMousePos(this.canvas, evt, 1)
                //console.log("鼠标指针坐标：" + mousePos.x + "," + mousePos.y);

                function getListItemIndex(pos, listCount){
                    console.log(pos.x)
                    console.log(pos.y)

                    let index = -1

                    if(pos.x >= RLCParam.listX && pos.x <= (RLCParam.listItemW + RLCParam.listX)){

                        let y1 = RLCParam.listY
                        let y2 = y1 + RLCParam.listItemH

                        for(let i = 0 ; i < listCount ; i++ ){
                            console.log(y1 + ':' + y2)

                            console.log(pos.y)
                            if( pos.y >= y1 && pos.y <= y2){
                                index = i
                                break
                            }

                            y1 = y1 + RLCParam.listItemH + RLCParam.listItemYOffset

                            y2 = y1 + RLCParam.listItemH

                        }
                    }

                    return index


                }

                let itemIndex = getListItemIndex(mousePos,10)


                console.log(itemIndex)

              /*if (that.isExitBtnPath(mousePos)) {

                setTimeout(function () {
                  that.exit()
                }, 200)

              }*/
            }, false)

        },
        methods: {
            getList(){
                if(this.$store.getters['user/isLogin']){
                    this.$store.dispatch('room/List')
                }
            },
            //设置canvas宽高 并清空内容
            clearCanvas(canvas) {
                // console.log(' ')
                // console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
                // console.log('clear canvas room list ')

                canvas.width = window.innerWidth
                canvas.height = window.innerHeight
            },
            //绘制列表
            draw(ctx, roomList){
                // console.log(' ')
                // console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
                // console.log('draw room list')

                this.clearCanvas(ctx.canvas)

                let x = RLCParam.listX
                let y = RLCParam.listY
                let w = RLCParam.listItemW
                let h = RLCParam.listItemH
                let yOffset = RLCParam.listItemYOffset


                roomList.forEach((r)=>{
                    ctx.fillStyle = '#fefefe'
                    ctx.fillRect(x, y, w, h)

                    ctx.font = MyCanvas.px2Rem(24) + 'px Microsoft JhengHei'
                    ctx.fillStyle = '#4b4b4b'
                    ctx.textAlign = 'left'
                    ctx.textBaseline = 'middle'

                    let str = r.id + '. ' + r.title
                    ctx.fillText(str, x + 10, y + h  / 2)

                    y += yOffset
                })
            },
        },
        destroyed(){
            // console.log(' ')
            // console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
            // console.log('destroyed')

            clearInterval(this.intervalId)
        }
    }
</script>
<style scoped>
    #canvas_room_list {
        position: absolute;
    }
</style>