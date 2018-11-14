<template>
    <canvas id="canvas_my_game" ></canvas>
</template>
<script>
import moment   from 'moment'

export default {
    name: 'my_game',
    data() {
        return {
            intervalId : 0
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
        }
    },
    watch: {
    },
    mounted() {
        console.log(' ')
        console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
        console.log('my-game mounted')

        this.getPlayerInfo().then(()=>{
            return this.getGameInfo()
        }).then(()=>{
            this.intervalId = setInterval(()=>{
                this.getGameInfo()
            },1000)
        })
    },
    methods: {
        getPlayerInfo(){
            return new Promise((resolve, reject) => {
                this.$store.dispatch('myRoom/GetInfo',{force:true}).then(()=>{

                    console.log(' ')
                    console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
                    console.log('get player info in my game')

                    resolve()
                })
            })
        },
        getGameInfo(){
            return new Promise((resolve, reject) => {
                this.$store.dispatch('myGame/GetInfo',{force:true}).then(()=>{

                    console.log(' ')
                    console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
                    console.log('get game info in my game')

                    resolve()
                })
            })
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
    #canvas_my_game {
        position: absolute;
    }
</style>