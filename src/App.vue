<template>
    <div>
        <canvas id="c_bottom"></canvas>
        <canvas id="c_middle"></canvas>
        <canvas id="c_top"></canvas>
        <Login v-if="!isLoginLoading && !isLogin"></Login>
        <button v-if="isLogin" style="position:absolute;bottom:0;right:0;" @click="logout">退出</button>
    </div>
</template>

<script>
import MyCanvas from './assets/js/MyCanvas.js'
import Login    from './components/Login.vue'


export default {
    name: 'app',
    components: { Login },
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
        }
    },
    watch: {
        isLogin: {
          handler: function (val, oldVal) {
//            console.log(val)
//            console.log(oldVal)


            if(val){

                //登录后，非刷新页面，进入初始化流程
                if(!this.isLoginLoading){
                    this.init()
                }
            }else {

                //登出，进入初始化流程
                this.init()
            }


            /*if (val.name !== oldVal.name) {
              this.drawPlayerInfo(val, true)
            }*/
          }
        },
    },
    mounted() {
        //let that = this

        this.c_bottom = document.querySelector('#c_bottom')
        this.ctx_bottom = this.c_bottom.getContext('2d')

        this.c_m = document.querySelector('#c_middle')
        this.ctx_m = this.c_m.getContext('2d')

        //this.ratio = window.devicePixelRatio //MyCanvas.getPixelRatio(this.ctx)


        this.clearCanvas()
        this.drawBottom('#d9f1f8')

        this.checkToken().then(()=>{
            this.init()
          }
        ).catch(()=>{
            console.log('not login')
        })

        /*let colors = [
          '#4ef86d',
          '#f8dd7e'
        ]

        let y = 0
        let x = 0
            that.c_m.width = window.innerWidth
            that.c_m.height = window.innerHeight
        setInterval(function(){
//            that.c_m.width = window.innerWidth
//            that.c_m.height = window.innerHeight
            that.ctx_m.fillStyle = colors[Math.round(Math.random())]
            that.ctx_m.fillRect(x, y , 30, 30 )

            x += Math.round(Math.random()) * 1 + Math.round(Math.random()) * 2 + Math.round(Math.random()) * 1
            y += Math.round(Math.random()) * 1 + Math.round(Math.random()) * 2 + Math.round(Math.random()) * 5
        },10)*/



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

            if(this.isLogin){
                if(this.isInRoom){
                    console.log('is in room')
                }else{
                    this.drawRoomList()
                }
            }else{
                this.clearCanvas()
                this.drawBottom('#d9f1f8')
            }
        },
        clearCanvas(){
            this.c_bottom.width = window.innerWidth
            this.c_bottom.height = window.innerHeight
            this.c_m.width = window.innerWidth
            this.c_m.height = window.innerHeight
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
                    that.$store.dispatch('user/CheckToken', token).then(_=>{
                        that.isLoginLoading = false
                        if(that.$store.getters['user/isLogin']){
                            resolve()
                        }else{
                            reject()
                        }
                    })
                } else {
                    that.isLoginLoading = false
                    reject()
                }
            })
        },
        drawRoomList(){
            let that = this
            this.c_m.width = window.innerWidth
            this.c_m.height = window.innerHeight

            this.$store.dispatch('room/List').then(res=>{
                let x = 30
                let y = 30
                let w = this.c_m.width - x * 2
                let h = 40

                res.forEach((r,i)=>{
                    that.ctx_m.fillStyle = '#fffefd'
                    that.ctx_m.fillRect(x, y, w, h)


                    that.ctx_m.font = MyCanvas.px2Rem(30) + 'px Microsoft JhengHei'
                    that.ctx_m.fillStyle = '#8a8a8a'
                    that.ctx_m.textAlign = 'left'
                    that.ctx_m.textBaseline = 'middle'

                    let str = r.id + '. ' + r.title
                    that.ctx_m.fillText(str, x + 10, y + h  / 2)


                    y += h + 20
                })
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
    #c_top {
        position: absolute;
    }


</style>