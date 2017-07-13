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


