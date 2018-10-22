
在编译的时候带上参数“ --style expanded”:   
sass --watch test.scss:test.css --style expanded
--style compressed

#
- $声明
- !default默认值
- ！global全局变量

#
sass 下划线（_）打头文件会默认为@import引入文件，不会编译成css

# 嵌套（避免嵌套过多）
### 选择器嵌套
```
nav {
  a {
    color: red;

    header & {    //前置选择
      color:green;
    }
  }  
}

nav a {
  color:red;
}

header nav a {
  color:green;
}
```
### 属性嵌套
```
.box {
    border-top: 1px solid red;
    border-bottom: 1px solid green;
}

.box {
  border: {
   top: 1px solid red;
   bottom: 1px solid green;
  }
}
```
### 伪类嵌套
```
.clearfix{
&:before,
&:after {
    content:"";
    display: table;
  }
&:after {
    clear:both;
    overflow: hidden;
  }
}
编译出来的 CSS：

clearfix:before, .clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
  overflow: hidden;
}
```
# 混合宏/继承/占位符
### 混合宏能传参不能合并 继承/占位能合并

```
@mixin box-shadow($shadow...) {
  @if length($shadow) >= 1 {
    @include prefixer(box-shadow, $shadow);
  } @else{
    $shadow:0 0 4px rgba(0,0,0,.3);
    @include prefixer(box-shadow, $shadow);
  }
}
```
- @mixin 用来声明混合宏的关键词
- box-shadow 名称
- $shadow 参数 参数之间,分割 参数过多加...
- @if @else 逻辑

```
button {
    @include border-radius;
}
```
- @include 调用混合宏

- @extend 继承
- %xxx %为占位符 %placeholder 声明的代码，如果不被 @extend 调用的话，不会产生任何代码。 通过 @extend 调用的占位符，编译出来的代码会将相同的代码合并在一起



# 插值
#{ $varity } 类似字面量的形式 @mixin只能传参使用 @extend可以用

# 运算
运算符左边必须加空格 建议两边加 除号必须加括号
+号支持字符串加法 有无引号以左边字符串为准

# 逻辑运算
- @if  @else if @else
- @for $i from <start> through <end>
- @for $i from <start> to <end> 关键字 through 表示包括 end 这个数，而 to 则不包括 end 这个数。
- @while
- @each $var in <list>
# 函数
- unquote($string)：删除字符串中的引号；
- quote($string)：给字符串添加引号。
- to-upper-case():函数将字符串小写字母转换成大写字母
- to-lower-case()
- percentage($value)：将一个不带单位的数转换成百分比值；
- round($value)：将数值四舍五入，转换成一个最接近的整数；
- ceil($value)：将大于自己的小数转换成下一位整数；
- floor($value)：将一个数去除他的小数部分；
- abs($value)：返回一个数的绝对值；
- min($numbers…)：找出几个数值之间的最小值；
- max($numbers…)：找出几个数值之间的最大值；
- random(): 获取随机数
- length($list)：返回一个列表的长度值；
- nth($list, $n)：返回一个列表中指定的某个标签值
- join($list1, $list2, [$separator])：将两个列给连接在一起，变成一个列表；
- append($list1, $val, [$separator])：将某个值放在列表的最后；
- zip($lists…)：将几个列表结合成一个多维的列表；
- index($list, $value)：返回一个值在列表中的位置值。
- type-of($value)：返回一个值的类型
- unit($number)：返回一个值的单位
- unitless($number)：判断一个值是否带有单位
- comparable($number-1, $number-2)：判断两个值是否可以做加、减和合并
- if($condition,$if-true,$if-false)
```
map $map: (
    $key1: value1,
    $key2: value2,
    $key3: value3
)
```
- map-get($map,$key)：根据给定的 key 值，返回 map 中相关的值。
- map-merge($map1,$map2)：将两个 map 合并成一个新的 map。
- map-remove($map,$key)：从 map 中删除一个 key，返回一个新 map。
- map-keys($map)：返回 map 中所有的 key。
- map-values($map)：返回 map 中所有的 value。
- map-has-key($map,$key)：根据给定的 key 值判断 map 是否有对应的 value 值，如果有返回 true，否则返回 false。
- keywords($args)：返回一个函数的参数，这个参数可以动态的设置 key 和 value。

- rgb($red,$green,$blue)：根据红、绿、蓝三个值创建一个颜色；
- rgba($red,$green,$blue,$alpha)：根据红、绿、蓝和透明度值创建一个颜色；
- red($color)：从一个颜色中获取其中红色值；
- green($color)：从一个颜色中获取其中绿色值；
- blue($color)：从一个颜色中获取其中蓝色值；
- mix($color-1,$color-2,[$weight])：把两种颜色混合在一起。

- hsl($hue,$saturation,$lightness)：通过色相（hue）、饱和度(saturation)和亮度（lightness）的值创建一个颜色；
- hsla($hue,$saturation,$lightness,$alpha)：通过色相（hue）、饱和度(saturation)、亮度（lightness）和透明（alpha）的值创建一个颜色；
- hue($color)：从一个颜色中获取色相（hue）值；
- saturation($color)：从一个颜色中获取饱和度（saturation）值；
- lightness($color)：从一个颜色中获取亮度（lightness）值；
- adjust-hue($color,$degrees)：通过改变一个颜色的色相值，创建一个新的颜色；
- lighten($color,$amount)：通过改变颜色的亮度值，让颜色变亮，创建一个新的颜色；
- darken($color,$amount)：通过改变颜色的亮度值，让颜色变暗，创建一个新的颜色；
- saturate($color,$amount)：通过改变颜色的饱和度值，让颜色更饱和，从而创建一个新的颜色
- desaturate($color,$amount)：通过改变颜色的饱和度值，让颜色更少的饱和，从而创建出一个新的颜色；
- grayscale($color)：将一个颜色变成灰色，相当于desaturate($color,100%);
- complement($color)：返回一个补充色，相当于adjust-hue($color,180deg);
- invert($color)：反回一个反相色，红、绿、蓝色值倒过来，而透明度不变。

- alpha($color) /opacity($color)：获取颜色透明度值；
- rgba($color, $alpha)：改变颜色的透明度值；
- opacify($color, $amount) / fade-in($color, $amount)：使颜色更不透明；
- transparentize($color, $amount) / fade-out($color, $amount)：使颜色更加透明。
# 指令
@import 可以引入sass/scss





























