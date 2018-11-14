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
    },
    watch: {
    },
    mounted() {
        console.log(' ')
        console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
        console.log('my-game mounted')

    },
    methods: {

    },
    destroyed(){
        console.log(' ')
        console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"))
        console.log('my-game destroyed')

    }
}
</script>