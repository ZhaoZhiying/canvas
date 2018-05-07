
var canvas = document.getElementById('canvas') //获取 canvas 的 id
var context = canvas.getContext('2d') //获取绘画上下文
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
//清除
clear.onclick = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}
//保存
download.onclick = function(){
    var url = canvas.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a) 
    a.href = url
    a.target = '_blank'
    a.download = '我的画儿' 
    a.click()
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

//画布大小
function autoSetCanvasSize(canvas){
    setCanvasSize()
    window.onresize = function(){
        setCanvasSize()
    }
    //页面宽高
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
    context.moveTo(x1, y1)
    context.lineWidth = lineWidth
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}

function listenToUser(canvas){
    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    //特性检测
    if(document.body.ontouchstart !== undefined){ //触屏设备
        canvas.ontouchstart = function(e){
            var x = e.touches[0].clientX 
            var y = e.touches[0].clientY
            using = true
            if(eraserEnabled){
                context.clearRect(x-5,y-5,20,20)
            }else{
                lastPoint = {
                    "x": x, 
                    "y": y
                } 
            }
        }
        canvas.ontouchmove = function(e){
            var x = e.touches[0].clientX 
            var y = e.touches[0].clientY
            if(!using){ 
                return 
            }
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{
                var newPoint = {
                    "x": x, 
                    "y": y
                } 
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function(e){
            using = false
        }
    }else{//非触屏设备
        canvas.onmousedown = function(e){
            var x = e.clientX //相对于视可位置，不是相对于canvas
            var y = e.clientY
            using = true
            if(eraserEnabled){
                context.clearRect(x-5,y-5,20,20)
            }else{
                lastPoint = {
                    "x": x, 
                    "y": y
                } 
            }
        }
        canvas.onmousemove = function(e){
            var x = e.clientX 
            var y = e.clientY
            if(!using){ 
                return 
            }
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{
                var newPoint = {
                    "x": x, 
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y) 
                lastPoint = newPoint 
            }
        }    
        canvas.onmouseup = function(e){
            using = false    
        }
    }
}
        

