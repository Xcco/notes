# 特殊写法
### innerHTML(HTML XML 整体全部大写，不使用驼峰）
### onreadystatechange

# jQuery
### 以下事件不用驼峰
- keydown
- keypress
- keyup
- mouseover
- mouseout
- mouseenter
- mouseleave

### 不是function 不用括号 .offset().top  .offset().left


# 简写
margin:1px 2px 3px 4px;

border:1px solid #000;
outline:1px solid red;
style为必须

background:#f00 url(background.gif) no-repeat fixed 0 0;

font:italic small-caps bold 1em/140%"Lucida Grande",sans-serif;
- 如果你缩写字体定义，至少要定义font-size和font-family两个值

list-style:square inside url(image.gif);
- list-style-type:square;
- list-style-position:inside;
- list-style-image:url(image.gif);

flex-flow:row nowrap;
- flex-direction: row
- flex-wrap: nowrap
