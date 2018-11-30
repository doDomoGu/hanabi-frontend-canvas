<template>
    <canvas id="canvas_room_list"></canvas>
</template>
<script>
import MyCanvas from '../assets/js/MyCanvas.js'
import RLCParam from '../assets/js/MyCanvasParam/roomList.js'
import CommonDraw from '../assets/js/draw/common.js'
import RoomListDraw from '../assets/js/draw/roomList.js'


export default {
    name: 'room_list',
    data() {
        return {
            intervalId : 0,
            itemIndex : -1
        }
    },
    computed:{
        list(){
            return this.$store.getters['room/list']
        }
    },
    watch: {
        list(newVal, oldVal) {
            /* if(newVal != oldVal){ 
                RoomListDraw.list(this.ctx, newVal)
            } */
            RoomListDraw.list(this.ctx, newVal)
        }
    },
    mounted() {
        this.canvas = document.querySelector('#canvas_room_list')
        this.ctx = this.canvas.getContext('2d')

        this.$store.dispatch('room/GetList',{force:true})

        this.intervalId = setInterval(()=>{
            this.$store.dispatch('room/GetList')
        },3000)

        this.canvas.addEventListener('touchstart',this.eventListener,false)
        this.canvas.addEventListener('touchend',this.eventListener,false)
    },
    methods: {
        eventListener(evt){
            const mousePos = MyCanvas.getMousePos(this.canvas, evt)

            function getListItemIndex(pos, listCount){
                let index = -1 // [0-9]

                const rect = JSON.parse(JSON.stringify(RLCParam.item.rect))
                
                if(pos.x >= rect.x && pos.x <= rect.x + rect.w){
                    let y1, y2

                    for(let i = 0 ; i < listCount ; i++ ){
                        y1 = rect.y  + parseInt(rect.h + RLCParam.item.margin) * i
                        y2 = y1 + rect.h   
                        if( pos.y >= y1 && pos.y <= y2){
                            index = i
                            break
                        }
                    }
                }

                return index
            }

            const itemIndex = getListItemIndex(mousePos,this.list.length)
            
            if(evt.type == 'touchstart'){
                if(itemIndex > -1){
                    this.itemIndex = itemIndex
                    RoomListDraw.drawItem(this.ctx, this.itemIndex, this.list[this.itemIndex], true)
                }
            }else if(evt.type == 'touchend'){
                if(itemIndex > -1 && itemIndex == this.itemIndex && itemIndex < this.list.length) {
                    if(this.list[itemIndex].isLocked){
                        alert('这个房间锁上了')
                        RoomListDraw.drawItem(this.ctx, this.itemIndex, this.list[this.itemIndex], false)
                    }else{
                        this.enter(itemIndex+1)
                    }
                }else{
                    RoomListDraw.drawItem(this.ctx, this.itemIndex, this.list[this.itemIndex], false)

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
        clearInterval(this.intervalId)
    }
}
</script>
<style scoped>
    #canvas_room_list {
        position: absolute;
        width:100%;
        height:100%;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
</style>