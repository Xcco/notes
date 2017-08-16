# 写法
```
//html
<canvas id="canvas" width="150" height="150"></canvas>
// 有结束标签

//JS
let canvas = document.getElementById('canvas')
if(canvas.getContext){
  cxt=canvas.getContext('2d')
}
//使用context绘制

//开始一段路径 必需
cxt.beginPath()

//闭合一段路径 不一定需要
cxt.closePath()

//直线
cxt.moveTo(x,y)
cxt.lineTo(x,y)

//圆
cxt.arc(x,y,r,startAngle,endAngle,antiClockFalse)

//context
cxt.lineWidth()
cxt.strokeStyle()
cxt.fillStyle()

cxt.stroke()
cxt.fill()

//清空重绘
cxt.clearRect(x,y,width,height)
//调用画布属性
cxt.canvas.xxx()

```

### 圆弧
arc(x, y, radius, startAngle, endAngle, anticlockwise)



### case
```
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    // 填充三角形
    ctx.beginPath();
    ctx.moveTo(25,25);
    ctx.lineTo(105,25);
    ctx.lineTo(25,105);
    ctx.fill();

    // 描边三角形
    ctx.beginPath();
    ctx.moveTo(125,125);
    ctx.lineTo(125,45);
    ctx.lineTo(45,125);
    ctx.closePath();
    ctx.stroke();
  }
}
```
