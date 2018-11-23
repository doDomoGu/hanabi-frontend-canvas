<template>
    <canvas id="c_loading" ></canvas>
</template>
<script>
import moment   from 'moment'
import MyCanvas from '../assets/js/MyCanvas.js'

export default {
    name: 'loading',
    data() {
        return {
        }
    },
    computed:{
        
    },
    watch: {
        
    },
    mounted() {
        let canvas  = document.querySelector('#c_loading')
        let ctx     = canvas.getContext('2d')

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // ctx.fillStyle = '#999999' 
        ctx.fillStyle =  'rgba(50, 50, 50, 0.1)' 
        ctx.fillRect(0, 0, canvas.width, canvas.height )

        ctx.font = MyCanvas.px2Rem(16) + 'px Microsoft JhengHei'
        ctx.fillStyle = '#ffffff'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('loading...', canvas.width / 2, canvas.height / 2)
        
    },
    methods: {
        
    },
    destroyed(){
        // console.log(' ')
        // console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
        // console.log('destroyed')

    }
}
</script>
<style scoped>
    #c_loading {
        position: absolute;
    }
</style>