//1.控制宽高
var canvas = document.getElementById('canvas');  //获取 canvas 的 id
var context = canvas.getContext('2d'); //获取绘画上下文

autoSetCanvasSize(canvas)

listenToMouse(canvas)

//3.监听橡皮擦是否开启
var eraserEnabled = false //画橡皮擦
eraser.onclick = function(){
    //eraserEnabled = !eraserEnabled //如果是true，加!就变成false，反之一样
    eraserEnabled = true
    actions.className = 'actions x'
}
brush.onclick = function(){
    eraserEnabled = false
    actions.className = 'actions'
}

//监听宽高变化
function autoSetCanvasSize(canvas){
    setCanvasSize()

    window.onresize = function(){
        setCanvasSize()
    }
    function setCanvasSize(){
        var pageWidth = document.documentElement.clientWidth    
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}
function drawCircle(x,y,radius){//画圆
    context.beginPath()
    context.strokeStyle = 'black'
    context.arc(x,y,radius,0,Math.PI*2)
    context.fill()   
}
function drawLine(x1,y1,x2,y2){//画线
    context.beginPath()
    context.strokeStyle = 'black'
    context.moveTo(x1, y1) //起点
    context.lineWidth = 5
    context.lineTo(x2, y2) //终点
    context.stroke()
    context.closePath()
}
function listenToMouse(canvas){
    //2.监听鼠标事件
    var using = false //声明是否在用
    var lastPoint = { //声明变量最后一个点
        x: undefined,
        y: undefined
    }
    canvas.onmousedown = function(aaa){
        var x = aaa.clientX //相对于视可位置，不是相对于canvas
        var y = aaa.clientY
        using = true
        if(eraserEnabled){
            context.clearRect(x-5,y-5,20,20)//橡皮擦擦除
        } else{
                lastPoint = {
                    "x":x, 
                    "y":y
          } //第一个x、y的坐标
        }
    }
    canvas.onmousemove = function(aaa){ 
        var x = aaa.clientX 
        var y = aaa.clientY

        if(!using){ 
            return 
        }
        if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
        } else{
                var newPoint = {
                    "x":x, 
                    "y":y
                } //新的 
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y) //新的点连接旧的点 = 线
                lastPoint = newPoint //新的点变成旧的点
        }
    }
    canvas.onmouseup = function(aaa){
        using = false    
    }
 }
