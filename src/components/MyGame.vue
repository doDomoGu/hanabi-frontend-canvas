<template>
    <div>
        <canvas id="canvas_my_game_bottom" ></canvas>
        <canvas id="canvas_my_game_middle" ></canvas>
        <canvas id="canvas_my_game_top" v-show="topOperation"></canvas>
        <ul id="log" :style="'left:'+logRect.x+'px;top:'+logRect.y+'px;width:'+logRect.w+'px;height:'+logRect.h+'px;overflow-y:scroll;'" >
            <li v-for="l in logList" :key="l">
                {{l}}
            </li>
        </ul>
    </div>
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
            intervalId : 0,
            topOperation : false,
            selectCardIsHost: false,
            selectCardIndex: -1,
            logRect: MGCParam.history.area
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
        cardInfo(){
            return this.$store.getters['myGame/cardInfo']
        },
        gameInfo(){
            return this.$store.getters['myGame/gameInfo']
        },
        logList(){
            return this.$store.getters['myGame/logList2']
        }
    },
    watch: {
        hostPlayer(val){
            MyGameDraw.hostPlayer(this.ctx_m, this.isHost, val)
        },
        guestPlayer(val){
            MyGameDraw.guestPlayer(this.ctx_m, this.isHost, val)
        },
        cardInfo(val){
            //手牌
            MyGameDraw.hostHands(this.ctx_m, this.isHost, val.hostHands)
            MyGameDraw.guestHands(this.ctx_m, this.isHost, val.guestHands)
            //牌库 弃牌堆
            MyGameDraw.libraryCards(this.ctx_m, val.libraryCardsNum)
            MyGameDraw.discardCards(this.ctx_m, val.discardCardsNum)
            //数字:提示数/机会数/分数  cueNum/chanceNum/score
            MyGameDraw.cueNum(this.ctx_m, val.cueNum)
            MyGameDraw.chanceNum(this.ctx_m, val.chanceNum)
            MyGameDraw.score(this.ctx_m, val.score)
            //成功打出的卡牌
            MyGameDraw.successCards(this.ctx_m, val.successCards)
        },
        gameInfo(val){
            MyGameDraw.nowPlaying(this.ctx_m, val.roundPlayerIsHost)
        }
    },
    mounted() {
        console.log(' ')
        console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
        console.log('my-game mounted')

        this.canvas_b = document.querySelector('#canvas_my_game_bottom')
        this.ctx_b = this.canvas_b.getContext('2d')

        this.canvas_m = document.querySelector('#canvas_my_game_middle')
        this.ctx_m = this.canvas_m.getContext('2d')

        this.canvas_t = document.querySelector('#canvas_my_game_top')
        this.ctx_t = this.canvas_t.getContext('2d')

        CommonDraw.clear(this.canvas_b)
        CommonDraw.clear(this.canvas_m)
        CommonDraw.clear(this.canvas_t)

        MyGameDraw.bottomRect(this.ctx_b)
        MyGameDraw.endBtn(this.ctx_m)
        MyGameDraw.topRect(this.ctx_t)

        this.$store.dispatch('myRoom/GetInfo',{force:true})

        this.$store.dispatch('myGame/GetInfo',{force:true})

        this.intervalId = setInterval(()=>{
            this.$store.dispatch('myGame/GetInfo',{force:true})
        },3000)

        this.canvas_m.addEventListener('click',this.eventListener,false)
        this.canvas_t.addEventListener('click',this.eventListenerTop,false)
        // this.canvas.addEventListener('touchstart',this.eventListener,false)
        // this.canvas.addEventListener('touchend',this.eventListener,false)

    },
    methods: {
        eventListener(evt){
            const mousePos = MyCanvas.getMousePos(this.canvas_m, evt, 1)
            // console.log("鼠标指针坐标：" + mousePos.x + "," + mousePos.y)
            const isPath = (pos, areaName)=>{
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

            const getHandsIndex = (rects, pos) => {
                let index = -1
                rects.forEach((rect,i)=>{
                    if(pos.x >= rect.x && pos.x <= rect.x + rect.w && pos.y >= rect.y && pos.y <= rect.y + rect.h){
                        index = i
                    }
                })
                return index
            }
            const getHostHandsIndex = pos => {
                const rects = MGCParam.host.hands.areas
                return getHandsIndex(rects, pos)
            }

            const getGuestHandsIndex = pos => {
                const rects = MGCParam.guest.hands.areas
                return getHandsIndex(rects, pos)
            }

            const hostHandsIndex    = getHostHandsIndex(mousePos)
            const guestHandsIndex   = getGuestHandsIndex(mousePos)
            if(this.gameInfo.roundPlayerIsHost == this.isHost && hostHandsIndex > -1){
                this.topOperation = true
                this.selectCardIndex = hostHandsIndex
                this.selectCardIsHost = true
                if(this.isHost){
                    MyGameDraw.topConfirmPlay(this.ctx_t)
                }else{
                    MyGameDraw.topConfirmCue(this.ctx_t)
                }
            }else if(this.gameInfo.roundPlayerIsHost == this.isHost && guestHandsIndex > -1){
                this.topOperation = true
                this.selectCardIndex = guestHandsIndex
                this.selectCardIsHost = false
                if(this.isHost){
                    MyGameDraw.topConfirmCue(this.ctx_t)
                }else{
                    MyGameDraw.topConfirmPlay(this.ctx_t)
                }
            }else if(isPath(mousePos, 'endBtn')){
                this.$store.dispatch('myGame/End')
            }
        },
        eventListenerTop(evt){
            const mousePos = MyCanvas.getMousePos(this.canvas_m, evt, 1)
            // console.log("鼠标指针坐标：" + mousePos.x + "," + mousePos.y)
            const isPath = (pos, areaName)=>{
                let area
                switch(areaName){
                    case 'playOkBtn':
                        area = {
                            x: window.innerWidth / 2 - 100,
                            y: window.innerHeight / 2 + 20,
                            w: MGCParam.btn.area.w,
                            h: MGCParam.btn.area.h
                        }
                        break
                    case 'playCancelBtn':
                        area = {
                            x: window.innerWidth / 2 ,
                            y: window.innerHeight / 2 + 20,
                            w: MGCParam.btn.area.w,
                            h: MGCParam.btn.area.h
                        }
                        break
                    case 'cueNumBtn':
                        area = {
                            x: window.innerWidth / 2 - 80,
                            y: window.innerHeight / 2 + 20,
                            w: MGCParam.btn.area.w,
                            h: MGCParam.btn.area.h
                        }
                        break
                    case 'cueColorBtn':
                        area = {
                            x: window.innerWidth / 2,
                            y: window.innerHeight / 2 + 20,
                            w: MGCParam.btn.area.w,
                            h: MGCParam.btn.area.h
                        }
                        break
                    case 'cueCancelBtn':
                        area = {
                            x: window.innerWidth / 2 + 80,
                            y: window.innerHeight / 2 + 20,
                            w: MGCParam.btn.area.w,
                            h: MGCParam.btn.area.h
                        }
                        break
                    default:
                        area = {x:0,y:0,w:0,h:0}
                }
                return pos.x >= area.x && pos.x <= area.x + area.w && pos.y >= area.y && pos.y <= area.y + area.h
            }

            if(this.isHost == this.selectCardIsHost) {
                //play
                if(isPath(mousePos, 'playOkBtn')){
                    this.$store.dispatch('myGame/DoPlay',this.selectCardIndex)
                    this.topOperation = false
                }else if(isPath(mousePos, 'playCancelBtn')){
                    this.topOperation = false
                }

            } else {
                //cue
                if(isPath(mousePos, 'cueNumBtn')){
                    this.$store.dispatch('myGame/DoCue',[this.selectCardIndex,'num'])
                    this.topOperation = false
                }else if(isPath(mousePos, 'cueColorBtn')){
                    this.$store.dispatch('myGame/DoCue',[this.selectCardIndex,'color'])
                    this.topOperation = false
                }else if(isPath(mousePos, 'cueCancelBtn')){
                    this.topOperation = false
                }
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
    #canvas_my_game_bottom,
    #canvas_my_game_middle,
    #canvas_my_game_top,
    #log {
        position: absolute;
    }
    #log {
        font-size: 16px;
        line-height: 20px;
        z-index: 2;
        list-style: none;
        padding-left: 4px;
        margin: 0;
        overflow-y:scroll;
    }
    #canvas_my_game_top {
        z-index:100;
    }
</style>