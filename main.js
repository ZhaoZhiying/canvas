//1.控制宽高
var canvas = document.getElementById('canvas');  //获取 canvas 的 id
var context = canvas.getContext('2d'); //获取绘画上下文
//获取页面宽高
xxx()
//监听宽高变化
window.onresize = function(){
    xxx()
}
function xxx(){
    var pageWidth = document.documentElement.clientWidth    
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
}

//2.监听鼠标事件
var using = false //声明是否在用
var lastPoint = { //声明变量最后一个点
    x: undefined,
    y: undefined
}
canvas.onmousedown = function(aaa){
    var x = aaa.clientX //相对于视可位置，不是相对于canvas
    var y = aaa.clientY
    if(eraserEnabled){
        using = true 
        context.clearRect(x-5,y-5,10,10)//橡皮擦擦除
    } else{
            using = true
            lastPoint = {
                "x":x, 
                "y":y
            } //第一个x、y的坐标
    }
}
canvas.onmousemove = function(aaa){ 
    var x = aaa.clientX 
    var y = aaa.clientY
    if(eraserEnabled){
        if(using){
            context.clearRect(x,y,10,10)
        }
    } else{
        if(using){
            var newPoint = {
                "x":x, 
                "y":y
            } //新的 
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y) //新的点连接旧的点 = 线
            lastPoint = newPoint //新的点变成旧的点
        } 
    }
}
canvas.onmouseup = function(aaa){
    using = false    
}
//画圆
function drawCircle(x,y,radius){
    context.beginPath()
    context.strokeStyle = 'black'
    context.arc(x,y,radius,0,Math.PI*2)
    context.fill()   
}
//画线
function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.strokeStyle = 'black'
    context.moveTo(x1, y1) //起点
    context.lineWidth = 5
    context.lineTo(x2, y2) //终点
    context.stroke()
    context.closePath()
}

//3.监听橡皮擦是否开启
var eraserEnabled = false //画橡皮擦
eraser.onclick = function(){
    eraserEnabled = !eraserEnabled //如果是true，加!就变成false，反之一样
}