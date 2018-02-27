var canvas = document.getElementById('canvas');  //获取 canvas 的 id
var context = canvas.getContext('2d'); //获取绘画上下文
var lineWidth = 5

autoSetCanvasSize(canvas)//1.监听宽高变化
listenToUser(canvas)//2.监听鼠标事件

//3.监听橡皮擦是否开启
var eraserEnabled = false 
brush.onclick = function(){
    eraserEnabled = false
    eraser.src = "./icon/eraser_n.png"
}
eraser.onclick = function(){
    eraserEnabled = true
    eraser.src = "./icon/eraser_s.png"
}

//线的大小
thin.onclick = function(){
    lineWidth = 2
    if(thin.src="./icon/thin_n.png"){
        thin.src="./icon/thin_s.png"
        thick.src="./icon/thin_n.png"
        bold.src="./icon/thin_n.png"
    }
}
thick.onclick = function(){
    lineWidth = 6
    if(thick.src="./icon/thin_n.png"){
        thick.src="./icon/thin_s.png"
        thin.src="./icon/thin_n.png"
        bold.src="./icon/thin_n.png"
    }
}
bold.onclick = function(){
    lineWidth = 10
    if(bold.src="./icon/thin_n.png"){
        bold.src="./icon/thin_s.png"
        thin.src="./icon/thin_n.png"
        thick.src="./icon/thin_n.png"
    }
}

//改颜色
black.onclick = function(){
    context.fillStyle = '#23262d'
    context.strokeStyle = '#23262d'
    if(black.src="./icon/black_n.png"){
        black.src="./icon/black_s.png"
        blue.src="./icon/blue_n.png"
        red.src="./icon/red_n.png"
        green.src="./icon/green_n.png"
    }
}
blue.onclick = function(){
    context.fillStyle = '#0000ff'
    context.strokeStyle = '#0000ff'
    if(blue.src="./icon/blue_n.png"){
        blue.src="./icon/blue_s.png"
        black.src="./icon/black_n.png"
        red.src="./icon/red_n.png"
        green.src="./icon/green_n.png"
    }
}
red.onclick = function(){
    context.fillStyle = '#ff0000'
    context.strokeStyle = '#ff0000'
    if(red.src="./icon/red_n.png"){
        red.src="./icon/red_s.png"
        black.src="./icon/black_n.png"
        blue.src="./icon/blue_n.png"
        green.src="./icon/green_n.png"
    }
}
green.onclick = function(){
    context.fillStyle = '#509b36'
    context.strokeStyle = '#509b36'
    if(green.src="./icon/green_n.png"){
        green.src="./icon/green_s.png"
        black.src="./icon/black_n.png"
        red.src="./icon/red_n.png"
        blue.src="./icon/blue_n.png"
    }
}

//清除
clear.onclick = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

//保存
download.onclick = function(){
    var url = canvas.toDataURL("image/png")
    var a = document.createElement('a')//生成 a 标签
    document.body.appendChild(a) //放到页面
    a.href = url
    a.target = '_blank'
    a.download = '我的画儿' // 保存名
    a.click()//调用 a 的 click (a 被点一下)
}

//画布大小
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

//画圆
function drawCircle(x,y,radius){
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI*2)
    context.fill()   
}

//画线
function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.moveTo(x1, y1) //起点
    context.lineWidth = lineWidth
    context.lineTo(x2, y2) //终点
    context.stroke()
    context.closePath()
}

function listenToUser(canvas){
    var using = false //声明是否在用
    var lastPoint = { //声明变量最后一个点
        x: undefined,
        y: undefined
    }
    if(document.body.ontouchstart !== undefined){ //特性检测
        //触屏设备
        document.documentElement.ontouchstart = function(aaa){
            var x = aaa.touches[0].clientX 
            var y = aaa.touches[0].clientY
            using = true
            if(eraserEnabled){
                context.clearRect(x-5,y-5,20,20)
            } else{
                lastPoint = {
                    "x":x, 
                    "y":y
                } //第一个x、y的坐标
            }
        }
        document.documentElement.ontouchmove = function(aaa){
            var x = aaa.touches[0].clientX 
            var y = aaa.touches[0].clientY
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
        document.documentElement.ontouchend = function(aaa){
            using = false
        }
    }else{
        //非触屏设备
        canvas.onmousedown = function(aaa){
            var x = aaa.clientX //相对于视可位置，不是相对于canvas
            var y = aaa.clientY
            using = true
            if(eraserEnabled){
                context.clearRect(x-5,y-5,20,20)//橡皮擦擦除
            }else{
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
            }else{
                var newPoint = {
                    "x":x, 
                    "y":y
                } //新的点 
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y) //新的点连接旧的点 = 线
                lastPoint = newPoint //新的点变成旧的点
            }
        }    
        canvas.onmouseup = function(aaa){
            using = false    
        }
    }
}
        

