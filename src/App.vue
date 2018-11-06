<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import MyCanvas from './assets/MyCanvas'

export default {
  name: 'app',
  data () {
    return {
      form: {
        username: 'admin',
        password: '123123'
      },
      errormsg: ''
    }
  },
  mounted: function () {

    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.ratio = MyCanvas.getPixelRatio(this.ctx)
//    console.log(this.ratio)

//    this.canvas.width = window.innerWidth * this.ratio
//    this.canvas.height = (window.innerHeight /*- MyCanvas.px2Rem(40)*/) * this.ratio

    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    this.ctx.fillStyle = '#eeeeee' // 屏幕背景色
    //this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height )

    console.log(window.innerWidth)
    console.log(window.innerHeight)

    this.ctx.fillStyle = '#008800'
    let rect = {
      x:100,
      y:100,
      h:100,
      w:100
    }
    MyCanvas.drawRoundedRect(rect, 2, this.ctx)


    //this.$store.dispatch('common/SetTitle2', '登录')
  },
}
</script>
<style>
    html, body {
        margin:0;
        padding:0;
        font-size: 0;
    }
</style>