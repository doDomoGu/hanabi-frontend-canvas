<template>
    <div>
        <canvas id="canvas"></canvas>
        <Login v-if="!isLoginLoading && !isLogin"></Login>
    </div>
</template>

<script>
import MyCanvas from './assets/MyCanvas'
import Login    from './components/Login'

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
            return this.$store.getters['auth/isLogin']
        }
    },
    mounted() {
        let that = this

        this.drawBackground('#d9f1f8')

        this.auth().then(()=>{
            that.drawRoomList()
          }
        )




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
        drawBackground(bgColor) {
            this.canvas = document.querySelector('#canvas')
            this.ctx = this.canvas.getContext('2d')
            //this.ratio = MyCanvas.getPixelRatio(this.ctx)
//            console.log(this.ratio)
//
//            this.canvas.width = window.innerWidth * this.ratio
//            this.canvas.height = (window.innerHeight /*- MyCanvas.px2Rem(40)*/) * this.ratio

            this.canvas.width = window.innerWidth
            this.canvas.height = window.innerHeight

            this.ctx.fillStyle = bgColor // 屏幕背景色

            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height )
        },
        auth() {
            let that = this
            this.isLoginLoading = true
            return new Promise (function(resolve, reject) {
                that.$store.dispatch('auth/CheckToken', window.localStorage.__HANABI_AUTH_TOKEN__).then(_=>{
                    that.isLoginLoading = false
                    resolve()
                })
            })

        },
        drawRoomList(){
            this.$store.dispatch('room/List').then(res=>{
              console.log(res)
            })
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
    #canvas {

    }
</style>