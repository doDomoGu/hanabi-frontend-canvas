<template>
    <div>
        <canvas id="c_bottom"></canvas>
        <canvas id="c_middle"></canvas>
        <room-list v-if="isLogin && !isInRoom"></room-list>

        <!--<canvas id="c_game_list"></canvas>-->
        <!--<canvas id="c_my_room"></canvas>
        <canvas id="c_my_game"></canvas>-->

        <canvas id="c_top"></canvas>
        <Login v-if="!isLoginLoading && !isLogin"></Login>
        <button v-if="isLogin" style="position:absolute;bottom:0;right:0;" @click="logout">退出</button>
    </div>
</template>

<script>
    import moment from 'moment'
    import MyCanvas from './assets/js/MyCanvas.js'
    import Login    from './components/Login.vue'
    import RoomList    from './components/RoomList.vue'

    export default {
        name: 'app',
        components: { Login, RoomList },
        data() {
            return {
                isLoginLoading : false
            }
        },
        computed: {
            isLogin(){
                return this.$store.getters['user/isLogin']
            },
            isInRoom(){
                return this.$store.getters['myRoom/roomId'] > 0
            },
            isInGame(){
                return this.$store.getters['myGame/isPlaying']
            },
        },
        watch: {
            isLogin(newVal) {
                if(newVal){
                    //登录后，非刷新页面，进入初始化流程
                    if(!this.isLoginLoading){
                        this.init()
                    }
                }else {
                    //登出，进入初始化流程
                    this.init()
                }
            }/*,
            roomList(newVal, oldVal) {
                console.log(newVal)
                console.log(oldVal)
            }*/
        },
        mounted() {
            //let that = this

            this.c_bottom = document.querySelector('#c_bottom')
            this.ctx_bottom = this.c_bottom.getContext('2d')

            /*this.c_m = document.querySelector('#c_middle')
            this.ctx_m = this.c_m.getContext('2d')*/

            //this.ratio = window.devicePixelRatio //MyCanvas.getPixelRatio(this.ctx)


            this.clearCanvas()
            this.drawBottom('#d9f1f8')

            this.checkToken().then(()=>{
                this.init()
              }
            ).catch(()=>{
                //
            })

            /*this.ctx.fillStyle = '#008800'
            let rect = {
                x:100,
                y:100,
                h:100,
                w:100
            }
            MyCanvas.drawRoundedRect(rect, 2, this.ctx)*/

        },
        methods: {
            init(){
                console.log(' ')
                console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
                console.log('app init')

                this.clearCanvas()  //初始化 画板
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
                        //this.drawRoomList()
                        //this.$store.dispatch('room/List')
                    }
                }else{
                  console.log('not login')
                }
            },
            clearCanvas(){
                this.c_bottom.width = window.innerWidth
                this.c_bottom.height = window.innerHeight
    //            this.c_m.width = window.innerWidth
    //            this.c_m.height = window.innerHeight
            },
            drawBottom(bgColor) {
                this.ctx_bottom.fillStyle = bgColor // 屏幕背景色
                this.ctx_bottom.fillRect(0, 0, this.c_bottom.width, this.c_bottom.height )
            },
            checkToken() {
                let that = this
                this.isLoginLoading = true
                return new Promise (function(resolve, reject) {
                    let token = localStorage.getItem('__HANABI_AUTH_TOKEN__') || null
                    if(token!== null ){
                        that.$store.dispatch('user/CheckToken', token).then( ()=>{
                            that.isLoginLoading = false
                            resolve()
                        })
                    } else {
                        that.isLoginLoading = false
                        reject()
                    }
                })
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
    #c_middle,
    /*#c_room_list,*/
    #c_top {
        position: absolute;
    }


</style>