canvas基于状态绘制
# tips
- fill stroke均基于线中 会相互覆盖 需要注意顺序
- fill采用非零环绕原则 绘制需要考虑方向 顺逆时针
- 构造函数CanvasRenderingContext2D()

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
//这里返回了new CanvasRenderingContext2D()对象
//使用context绘制

//开始一段路径 更新状态(context)路径清空style不变
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

//每次基于状态(context)绘制所有线段
cxt.stroke()
cxt.fill()

//清空重绘
cxt.clearRect(x,y,width,height)
//调用画布属性
cxt.canvas.xxx()

cxt.lineCap()//butt | round | square
cxt.lineJoin()//bevel | round | miter

```

# 圆弧
```
cxt.arc(x, y, radius, startAngle, endAngle, anticlockwise)
cxt.arcTo()
cxt.quadraticCurveTo(x1,y1,x2,y2)//贝塞尔曲线
cxt.bezierCurveTo(x1,y1,x2,y2,x3,y3)//3次贝塞尔曲线
```
# 图形变换
```
cxt.save()//保存状态
cxt.restore()//调取状态
cxt.translate()//移动
cxt.scale()//缩放(坐标、尺寸、边框)
cxt.transform()//变换矩阵(叠加)
cxt.setTransform()//无视之前 直接设置
```

# 其它
```
cxt.shadowColor()
cxt.shadowOffsetX()
cxt.shadowOffsetY()
cxt.shadowBlur()
cxt.globalAlpha=1//全局透明度
cxt.globalCompositeOperation()//绘制次序 布尔运算
cxt.clip()//剪切图像
cxt.isPointInPath(x,y)
canvas.getBoundingClientRect().left//浏览器提供接口 注意是canvas
```

# 填充样式
```
linearGrad=cxt.createLinearGradient(xstart,ystart,send,yend)//渐变线
radialGrad=cxt.createRadialGradient(x0,y0,r0,x1,y1,r1)//圆
cxt.createPattern()//img canvas video
linearGrad.addColorStop(stop,color)//色彩调整点
```
# 文字
cxt.font()
cxt.fillText()
cxt.strokeText()
cxt.textAlign()
cxt.textBaseline()
cxt.measureText('xxxxx').width//计算文字宽度
# case
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
