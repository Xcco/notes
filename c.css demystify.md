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
#  tips
1. 增加依赖 减少重复
- line-height 用无单位数字（如1.5）以继承font-size  
- 长度单位用em/rem
- 颜色用半透明叠加
2.currentColor
