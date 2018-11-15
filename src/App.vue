<template>
    <div>
        <canvas id="c_bottom"></canvas>
        <loading-mask v-if="isLoading"></loading-mask>
        <template v-else>
            <template v-if="isLogin">
                <room-list v-if="isLogin && !isInRoom"></room-list>

                <my-room v-if="isLogin && isInRoom && !isInGame"></my-room>
                <my-game v-if="isLogin && isInRoom && isInGame"></my-game>

                <button style="position:absolute;bottom:0;right:0;" @click="logout">退出</button>
            </template>
            <Login v-else></Login>
        </template>
        <!--<canvas id="c_top"></canvas>-->
    </div>
</template>

<script>
import moment       from 'moment'
import MyCanvas     from './assets/js/MyCanvas'

import Login        from './components/Login.vue'
import RoomList     from './components/RoomList.vue'
import MyRoom       from './components/MyRoom.vue'
import MyGame       from './components/MyGame.vue'
import LoadingMask  from './components/LoadingMask.vue'

export default {
    name: 'app',
    components: { Login, RoomList, MyRoom, MyGame, LoadingMask },
    data() {
        return {
        }
    },
    computed: {
        isLoading(){
            return Boolean(this.$store.getters['common/isLoading'])
        },
        isLogin(){
            return Boolean(this.$store.getters['user/isLogin'])
        },
        isInRoom(){
            return this.$store.getters['myRoom/roomId'] > 0
        },
        isInGame(){
            return Boolean(this.$store.getters['myGame/isPlaying'])
        },
    },
    watch: {
        isLogin(newVal) {
            if(newVal){
                //登录后，非刷新页面，进入初始化流程
                if(!this.isLoading){
                    this.init()
                }
            }else {
                //登出，进入初始化流程
                this.init()
            }
        }
    },
    mounted() {
        this.c_bottom = document.querySelector('#c_bottom')
        this.ctx_bottom = this.c_bottom.getContext('2d')

        

        //this.ratio = window.devicePixelRatio //MyCanvas.getPixelRatio(this.ctx)

        this.drawBottom('#d9f1f8')
        
        this.checkToken()/* .then(() => {
            this.init()
        }) */

        

        /* this.checkToken().then(()=>{
            //this.init()
        }
        ).catch(()=>{
            //
        }) */
    },
    methods: {
        init(){
            // console.log(' ')
            // console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
            // console.log('app init')

            this.drawBottom('#d9f1f8')  //绘制背景图

            if(this.isLogin){
                if(this.isInRoom){
                    if(this.isInGame){
                        console.log('is in game')
                        //this.$store.dispatch('room/List')
                    }else{
                        console.log('is in room')
                        //this.$store.dispatch('room/List')
                    }
                }else{
                    console.log('is not in room')
                    //this.$store.dispatch('room/List')
                }
            }else{
                console.log('not login')
            }
        },
        clearCanvas(ctx){
            ctx.canvas.width = window.innerWidth
            ctx.canvas.height = window.innerHeight
        },
        drawBottom(bgColor) {
            this.clearCanvas(this.ctx_bottom)

            this.ctx_bottom.fillStyle = bgColor // 屏幕背景色
            this.ctx_bottom.fillRect(0, 0, this.c_bottom.width, this.c_bottom.height )
        },
        async checkToken(){
            this.$store.commit('common/setIsLoading', true)
            
            const token = localStorage.getItem('__HANABI_AUTH_TOKEN__') || null
            
            if(token!== null){
                await this.$store.dispatch('user/CheckToken', token)
            }

            if(this.isLogin){
                await this.$store.dispatch('myRoom/GetInfo',{mode:'simple',force:true})
            }

            if(this.isInRoom) {
                await this.$store.dispatch('myGame/GetInfo',{mode:'simple',force:true})
            }
            
            this.$store.commit('common/setIsLoading', false)
            
        },
        logout(){
            this.$store.dispatch('user/Logout')
        }
    }
}
</script>
<style>
    html, body {
        margin:0;
        padding:0;
        font-size: 0;
        line-height:0;
    }
    #c_bottom,
    #c_top {
        position: absolute;
    }


</style>