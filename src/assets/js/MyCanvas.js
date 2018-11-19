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
    const rect = canvas.getBoundingClientRect()
    return {
        x: (Math.round(evt.clientX) - rect.left) * ratio,
        y: (Math.round(evt.clientY) - rect.top) * ratio
    }
}

export default exports
