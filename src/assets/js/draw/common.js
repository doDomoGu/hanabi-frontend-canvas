let _ = {}

_.clear = canvas => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

//font-size
_.fontSize = window.innerWidth / 6.4

_.px2Rem = px => {
    return (px / 375) * window.innerWidth
}

// 函数：绘制圆角矩形
_.fillRoundedRect = (ctx, rect, radius) => {
    const point = (x, y) => {
        return { x: x, y: y }
    }

    const ptA = point(rect.x + radius, rect.y)
    const ptB = point(rect.x + rect.w, rect.y)
    const ptC = point(rect.x + rect.w, rect.y + rect.h)
    const ptD = point(rect.x, rect.y + rect.h)
    const ptE = point(rect.x, rect.y)

    ctx.beginPath()

    ctx.moveTo(ptA.x, ptA.y)
    ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, radius)
    ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, radius)
    ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, radius)
    ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, radius)

    // ctx.stroke()  //边框绘制 根据笔触样式(strokeStyle)
    ctx.fill()
}

export default _
