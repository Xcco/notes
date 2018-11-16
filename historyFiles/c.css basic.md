# line-height
### 行内框盒子模型
行内框盒子模型是非常重要的一个东西，因为所有内联元素的样式表现都与行内框盒子模型有关
总共四种盒子:

1. 内容区域(content area)；
2. 内联盒子(inline boxes)；另文字排成一行的盒子
3. 行框盒子(line boxes)；每一行就是一个行框盒子
4. 包含盒子(containing box)；
- **行框** 的高度是当前所有 **行内框** 根据 vertical-align 值进行垂直方向对其后，由当前行所有 行内框 最高的顶边和最低底边的实际距决定的。
- 内联元素的高度是由 line-height 决定的，但是就算line-height的值为0，也不会改变字体的基线位置，它只是改变了两行文字基线之间的距离&内联元素的高度
- 内容区域高度(content area) + 行间距(vertical spacing) = 行高(line-height)
- 内部没有内联元素的inline-block，基线对齐容器的margin下边缘
### line-height
1.5 150% 1.5em 数值（1.5）继承比例 百分比和em继承数值 所以用前者
### CSS的全称是什么?
cascading style sheets
### CSS有几种引入方式? 
在html中,引入css的方法主要有行内式、内嵌式、导入式和链接式4种

连接式  
实现样式结构分离 推荐使用
```
   <link href="mystyle.css" rel="stylesheet" type="text/css"/>
```

### link 和@import 有什么区别?
1. link属于XHTML标签，而@import完全是CSS的一种语法。
link标签除了可以加载CSS外，还可以做很多其它的事情，比如定义RSS，定义rel连接属性等，@import就只能加载CSS了。
2. 加载顺序的差别。
当一个页面被加载的时候（就是被浏览者浏览的时候），link引用的CSS会同时被加载，而@import引用的CSS 会等到页面全部被下载完再被加载。
3. 兼容性的差别。
由于@import是CSS2.1提出的所以老的浏览器不支持，@import只有在IE5以上的才能识别，而link标签无此问题。
4. 使用dom控制样式时的差别。
当使用javascript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的。

### 以下这几种文件路径分别用在什么地方，代表什么意思?
```
css/a.css                                                              当前一级目录下CSS文件中的a.css
./css/a.css                                           ./代表当前        当前一级目录下CSS文件中的a.css                            
b.css                                                                  当前一级目录下的b.css
../imgs/a.png                                         ../代表上一级目录  上一级目录中imgs文件中的a.png文件
/Users/cc/project/css/a.css                         本地文件绝对路径地址
/static/css/a.css                                       服务器下按绝对路径static文件中css的a.css文件
css/a.css                                               服务器下按相对路径（即html所在路径）css的a.css文件           
http://cdn.qq.com/8-1.png                网站绝对路径
```

### 列出5条以上html和 css 的书写规范
html规范
- id class建议单词全字母小写，单词间以 -分隔。同项目必须保持风格一致。
- HTML 标签的使用应该遵循标签的语义。
- 禁止 img的 src取值为空。延迟加载的图片也要增加默认的 src
- 使用 button元素时必须指明 type 属性值。
- 在 CSS 可以实现相同需求的情况下不得使用表格进行布局
css规范
- 属性名与之后的 :之间不允许包含空格， :与 属性值之间必须包含空格
- 选择器的嵌套层级应不大于 3级，位置靠后的限定条件应尽可能精确
- 在可以使用缩写的情况下，尽量使用属性缩写
- 尽量不使用 !important声明。
- 将 z-inde 进行分层，对文档流外绝对定位元素的视觉层级关系进行管理
[相关参考](http://codeguide.co/)

### 截图介绍 chrome 开发者工具的功能区

![QQ20170413-204308@2x.png](http://upload-images.jianshu.io/upload_images/5355448-e6cc69606632e1c6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
