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



















