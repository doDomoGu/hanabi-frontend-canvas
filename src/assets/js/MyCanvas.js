let exports = {}

//font-size
exports.fontSize = window.innerWidth / 6.4

exports.px2Rem = function (px) {
    return px / 375 * window.innerWidth
}

// 获得屏幕像素缩放比例
exports.getPixelRatio = function (context) {
    const backingStore = context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1

    return (window.devicePixelRatio || 1) / backingStore
}

// 获得点击位置
exports.getMousePos = function (canvas, evt, ratio) {
    let _evt

    if (evt.type == 'touchstart') {
        _evt = evt.touches[0]   //touchstart
    } else if (evt.type == 'touchend') {
        _evt = evt.changedTouches[0] //touchend
    } else if (evt.type == 'click') {
        _evt = evt
    }  
    const rect = canvas.getBoundingClientRect()
    return {
        x: (Math.round(_evt.clientX) - rect.left) * ratio,
        y: (Math.round(_evt.clientY) - rect.top) * ratio
    }
}

export default exports
