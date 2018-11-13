<template>
    <div>
        <canvas id="c_bottom"></canvas>
        <!--<canvas id="c_middle"></canvas>-->
        <room-list v-if="!isLoginLoading && isLogin && !isInRoom"></room-list>

        <my-room v-if="!isLoginLoading && isLogin && isInRoom && !isInGame"></my-room>
        <my-game v-if="!isLoginLoading && isLogin && isInRoom && isInGame"></my-game>

        <!--<canvas id="c_game_list"></canvas>-->
        <!--<canvas id="c_my_room"></canvas>
        <canvas id="c_my_game"></canvas>-->

        <!--<canvas id="c_top"></canvas>-->
        <Login v-if="!isLoginLoading && !isLogin"></Login>
        <button v-if="!isLoginLoading && isLogin" style="position:absolute;bottom:0;right:0;" @click="logout">退出</button>
    </div>
</template>

<script>
    import moment       from 'moment'
//    import MyCanvas     from './assets/js/MyCanvas'
    import Login        from './components/Login.vue'
    import RoomList     from './components/RoomList.vue'
    import MyRoom       from './components/MyRoom.vue'
    import MyGame       from './components/MyGame.vue'

    export default {
        name: 'app',
        components: { Login, RoomList, MyRoom, MyGame },
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
            this.c_bottom = document.querySelector('#c_bottom')
            this.ctx_bottom = this.c_bottom.getContext('2d')

            //this.ratio = window.devicePixelRatio //MyCanvas.getPixelRatio(this.ctx)

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
            checkToken() {
                this.isLoginLoading = true

                return new Promise ((resolve, reject) => {

                    let token = localStorage.getItem('__HANABI_AUTH_TOKEN__') || null

                    if(token!== null ){

                        this.$store.dispatch('user/CheckToken', token).then(()=>{

                            this.$store.dispatch('myRoom/GetInfo',{mode:'simple',force:true}).then(()=>{

                                if(this.$store.getters['myRoom/roomId'] > 0) {

                                    this.$store.dispatch('myGame/GetInfo',{mode:'simple',force:true}).then(()=>{

                                        this.isLoginLoading = false
                                        resolve()
                                    })
                                }else{

                                    this.isLoginLoading = false
                                    resolve()

                                }

                            })

                        })
                    } else {
                        this.isLoginLoading = false
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