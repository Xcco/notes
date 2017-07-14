# jQuery 中， $(document).ready()是什么意思？
$(document).ready()表示页面的dom元素已经加载完毕，这是为了防止在页面加载元素加载完之前对dom元素进行操作。
原生js中我们可以使用window.onload来达到这个效果，不过两者还是有区别，onload是所有元素、图片、外部资源都加载完，而$(document).ready()只需要元素加载完成。所以onload比$().ready()要慢

# $node.html()和$node.text()的区别?
$node.html()返回node中的html内容，$node.text()返回node中的文本内容。

# $.extend 的作用和用法? 
语法: jQuery.extend([deep,] target [, object1 ] [, objectN ] );
作用：
- 当我们提供两个或多个对象给$.extend()，对象的所有属性都添加到目标对象（target参数）。
- 如果只有一个参数提供给$.extend()，这意味着目标参数被省略。在这种情况下，jQuery对象本身被默认为目标对象。这样，我们可以在jQuery的命名空间下添加新的功能。这对于插件开发者希望向 jQuery 中添加新函数时是很有用的。
- 如果想保留原对象:var object = $.extend({}, object1, object2);
- 默认情况下，通过$.extend()合并操作不是递归的,如果第一个对象的属性本身是一个对象或数组，那么它将完全用第二个对象相同的key重写一个属性,这些值不会被合并
如果将 true作为该函数的第一个参数，那么会在对象上进行递归的合并。

# jQuery 的链式调用是什么？
jQuery链式调用：在对象上一次性调动多个方法
$(this).addClass("active").siblings().removeClass("active")
因为大部分对象方法的最后是return this，所以有了链式调用，简易代码。
# jQuery 中 data 函数的作用
data() 方法向被选元素附加数据，或者从被选元素获取数据。

# 写出以下功能对应的 jQuery 方法：
给元素 $node 添加 class active，给元素 $node 删除 class active
```
$node.addClass('active')
$node.removeClass('active')
```
展示元素$node, 隐藏元素$node
```
$node.show()
$node.hide()
```
获取元素$node 的 属性: id、src、title， 修改以上属性
```
$node.attr('id',sth)
$node.attr('src',sth)
$node.attr('title',sth)
```
给$node 添加自定义属性data-src
```
$node.data('data-src',sth)
```
在$ct 内部最开头添加元素$node
```
$ct.prepend($node)
```
在$ct 内部最末尾添加元素$node
```
$ct.append($node)
```
删除$node
```
$node.remove()
```
把$ct里内容清空
```
$ct.empty()
```
在$ct 里设置 html <div class="btn"></div>
```
$ct.html('<div class="btn"></div>')
```
获取、设置$node 的宽度、高度(分别不包括内边距、包括内边距、包括边框、包括外边距)
```
$node.width();//不包括内边距宽度,仅包括内容
$node.height();//不包括内边距高度,仅包括内容
$node.innerWidth();//包括内容和内边距宽度
$node.innerHeight();//包括内容和内边距高度
$node.outerWidth();//包括内容,内边距,边框宽度
$node.outerHeight();//包括内容,内边距,边框高度
$node.outerHeight(true);//包括内容,内边距,边框,外边距高度
$node.outerWidth(true);//包括内容,内边距,边框,外边距宽度
```
获取窗口滚动条垂直滚动距离
```
$(window).scrollTop()
```
获取$node 到根节点水平、垂直偏移距离
```
$node.offset()
```
修改$node 的样式，字体颜色设置红色，字体大小设置14px
```
$node.css({'color':'red','fontSize':'14px'})
```
遍历节点，把每个节点里面的文本内容重复一遍
```
$node.each(function(){
	console.log($(this).text());	
})
```
从$ct 里查找 class 为 .item的子元素
```
$ct.find($('.item'))
```
获取$ct 里面的所有孩子
```
$ct.children()
```
对于$node，向上找到 class 为'.ct'的父亲，在从该父亲找到'.panel'的孩子

获取选择元素的数量
获取当前元素在兄弟中的排行

