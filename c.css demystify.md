# 版本回退
1. 从旧到新
```
background : rgb(255, 128, 0); 
background : -moz-linear-gradient(0deg, yellow, red); 
background : -o-linear-gradient(0deg, yellow, red); 
background : -webkit-linear-gradient(0deg, yellow, red); 
background : linear-gradient(90deg, yellow, red);
```
2. 特殊优先
```
h1 { color : gray; } .textshadow h1 {
color : transparent;
text-shadow : 0 0 .3em gray; }
```
3. @supports(慎用)
```
h1 { color : gray; }
@supports ( text-shadow : 0 0 .3em gray ) {
  h1 { color : transparent; text-shadow : 0 0 .3em gray; 
  } 
}
```
4. js检测
```
function testProperty(property) { 
   var root = document .documentElement;
   if (property in root.style) { 
      root.classList.add(property.toLowerCase()); 
      return true; 
    }
    root.classList.add('no-' + property.toLowerCase()); 
    return false;
}
//检测具体值需要赋值再判断
function testValue(id, value, property) {
  var dummy = document .createElement('p'); 
  dummy.style[property] = value;
  if (dummy.style[property]) { 
    root.classList.add(id); return true; 
  }
  root.classList.add('no-' + id); 
  return false;
}
```
#  tips(DRY don't repeat yourself)
### 增加依赖 减少重复
- line-height 用无单位数字（如1.5）以继承font-size  
- 长度单位用em/rem
- 颜色用半透明叠加
- currentColor css第一个变量
- inherit
伪元素继承宿主
### 减少媒体查询
减少媒体查询**面向设计而非面向设备**
- 使用百分比长度来取代固定长度或尝试使用与视口相关的单位（ vw 、 vh 、 vmin 和 vmax ）
- 当你需要在较大分辨率下得到固定宽度时，使用 max-width 而不是 width
- 为替换元素（比如 img 、 object 、 video 、 iframe 等）设 置一个 max-width ，值为 100% 。
- 假如背景图片需要完整地铺满一个容器，不管容器的尺寸如何变化， background-size: cover能实现 考虑带宽，因此在移动网页中通过 CSS 把一张 大图缩小显示往往是不太明智的。
- 当图片（或其他元素）以行列式进行布局时，让视口的宽度来决定 列的数量。弹性盒布局（即 Flexbox）或者 display: inline-block
加上常规的文本折行行为
- 在 使 用 多 列 文 本 时， 指 定 column-width （ 列 宽 ） 而 不 是 指 定 column-count （列数），这样它就可以在较小的屏幕上自动显示为单 列布局。
### 简写
合理使用简写 是一种良好的防卫性编码方式，可以抵御未来的风险。
background直接加color
background含background-size 时，需要background-position 值使 用一个斜杠（ / ）作为分隔。消除歧义
### 预处理器 
- 抽象泄漏法则：“所有重大的抽象机制在某种程度 上都存在泄漏的情况。
# background & border
### background-clip 阻止内容溢出
### 多重边框 
- box-shadow:0 0 0 10px #655 //只有扩张半径 无偏移及模糊 位置要用margin补偿
- outline/outline-offset//outline不会依附圆角而是保持直角
### 背景定位
```
方案1
background-position : right 20px bottom 10px;//这里指img
方案2
padding: 10px ; 
background: url("code-pirate.svg") no-repeat #58a
bottom right; /* 或 100% 100% */ background-origin: content-box ;
方案3
background-position : calc(100% - 20px) calc(100% - 10px);

background-position 是以 padding box 为准的 background-origin 可以用它来改变这种行为
```
### 条纹背景
```
radial-gradient()//辐射状渐变
background : linear-gradient(#fb3 20%, #58a 80%);//渐变 百分数表示位置
background : linear-gradient(#fb3 50%, #58a 50%);//位置重叠则产生色条
{background : linear-gradient(#fb3 30%, #58a 30%); background-size : 100% 30px;}//size决定一次渐变大小 其余自动填充形成条纹
{background : linear-gradient(#fb3 33.3%, #58a 0, #58a 66.6%, yellowgreen 0); background-size : 100% 45px;}
//后面位置如果比前面小 则自动相等 所以可以添为0
repeating-linear-gradient() 和 repeating-radial-gradient() 。
```
底色固定 上层不同透明度格栅
```
{background : #58a; 
background-image : repeating-linear-gradient(30deg,
hsla(0,0%,100%,.1), 
hsla(0,0%,100%,.1) 15px, transparent 0, transparent 30px);}
```
### 网格
```
background : #58a; 
background-image :
linear-gradient(white 1px, transparent 0),
linear-gradient(90deg, white 1px, transparent 0); 
background-size : 30px 30px;
```
### 伪随机背景
这个技巧被 Alex Walker 定名为“蝉原则”， 他最先提出了通过质数来 增加随机真实性的想法。请注意这个方法不仅适用于背景，还可以用于其他 涉及有规律重复的情况。

# 形状
### 圆
border-radius 可以单独指定水平和垂直半径， 只要用一个斜杠（ / ）分隔这两个值即可。

### 平行四边形
skew() 的变形会使内容变形
```
.button { 
  position : relative; /* 其他的文字颜色、内边距等样式…… */ } 
.button::before { 
  content : ''; /* 用伪元素来生成一个矩形 */ 
  position : absolute; 
  top : 0; 
  right : 0; 
  bottom : 0; 
  left : 0; 
  z-index : -1; 
  background : #58a; 
  transform : skew(45deg); 
}
```
### 菱形
1.平行四边形旋转
2.clip-path : polygon(50% 0, 100% 50%, 50% 100%, 0 50%);

### 切角
```
background : #58a; background ://回退机制
linear-gradient(-45deg, transparent 15px, #58a 0);
```
//多个切角要考虑背景不重复
```
div {
	background: #58a;
	background: linear-gradient(135deg, transparent 15px, #58a 0) top left,
	            linear-gradient(-135deg, transparent 15px, #58a 0) top right,
	            linear-gradient(-45deg, transparent 15px, #58a 0) bottom right,
	            linear-gradient(45deg, transparent 15px, #58a 0) bottom left;
	background-size: 50% 50%;
	background-repeat: no-repeat;
	
	padding: 1em 1.2em;
	max-width: 12em;
	color: white;
	font: 150%/1.6 Baskerville, Palatino, serif;
}
```











