<template>
    <div>
        <canvas id="c_bottom"></canvas>
        <canvas id="c_middle"></canvas>
        <canvas id="c_top"></canvas>
        <Login v-if="!isLoginLoading && !isLogin"></Login>
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
            return this.$store.getters['auth/isLogin']
        }
    },
    mounted() {
        let that = this

        this.c_bottom = document.querySelector('#c_bottom')
        this.ctx_bottom = this.c_bottom.getContext('2d')

        this.c_m = document.querySelector('#c_middle')
        this.ctx_m = this.c_m.getContext('2d')

        //this.ratio = window.devicePixelRatio //MyCanvas.getPixelRatio(this.ctx)

        this.drawBottom('#d9f1f8')

        this.auth().then(()=>{
            that.drawRoomList()
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
        drawBottom(bgColor) {
            this.c_bottom.width = window.innerWidth
            this.c_bottom.height = window.innerHeight
            this.ctx_bottom.fillStyle = bgColor // 屏幕背景色
            this.ctx_bottom.fillRect(0, 0, this.c_bottom.width, this.c_bottom.height )
        },
        auth() {
            let that = this
            this.isLoginLoading = true
            return new Promise (function(resolve, reject) {
                that.$store.dispatch('auth/CheckToken', window.localStorage.__HANABI_AUTH_TOKEN__).then(_=>{
                    that.isLoginLoading = false
                    if(that.$store.getters['auth/isLogin']){
                        resolve()
                    }else{
                        reject()
                    }

                })
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