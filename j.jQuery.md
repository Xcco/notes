### jQuery.fn===jQuery.prototype
### $(document).ready(handler) === $(handler). 
### .width() .height()获取实际尺寸 不可见元素为0 用原生width height获取 原生width获取原本尺寸 需要乘以比例
example:
```
$(function(){
    console.log('ready');
});
```

### .on( events [,selector ] [,data ], handler(eventObject) ) on事件 多利用selector 进行事件委托

### .load, .unload, and .error, deprecated since jQuery 1.8, are no more. Use .on() to register listeners.

### jQuery animate color类的都需要引入UI库

### 如果append prepend方法的参数不是新生成的元素，而是当前页面已存在的元素，则会产生移动元素的效果。

### jQuery提供一些方法，可以很容易地显示网页动画效果。但是，总体上来说，它们不如CSS动画强大和节省资源，所以应该优先考虑使用CSS动画。

### 由于class是javaScript的保留字，所以只能放在引号中。
```
$( '<li>', {
  html: 'test',
  'class': 'greet'
});
```
# 测试有没有选中的标准方法。
不管有没有选中，jQuery构造函数总是返回一个实例对象，而对象的布尔值永远是true。使用length属性才是判断有没有选中的正确方法。
如果网页没有元素，则返回对象的length属性等于0。
```
//正确方法
if ( $('li').length) {
}
```
```
//错误
if ($('div.foo')) { ... }
```
# attr方法和prop方法区别
网页元素的属性，比如a元素的href属性、img元素的src属性。这要使用attr方法读写。  
DOM元素的属性，比如tagName、nodeName、nodeType等等。这要使用prop方法读写。  
attr方法和prop方法针对的是不同的属性。在英语中，attr是attribute的缩写，prop是property的缩写，中文很难表达出这种差异。有时，attr方法和prop方法对同一个属性会读到不一样的值。比如，网页上有一个单选框。
```
<input type="checkbox" checked="checked" />
```
对于checked属性，attr方法读到的是checked，prop方法读到的是true。

# clone方法

clone方法克隆当前元素。

对于那些有id属性的节点，clone方法会连id属性一起克隆。所以，要把克隆的节点插入文档的时候，务必要修改或移除id属性。

# 事件的名称空间

同一个事件有时绑定了多个回调函数，这时如果想移除其中的一个回调函数，可以采用“名称空间”的方式，即为每一个回调函数指定一个二级事件名，然后再用off方法移除这个二级事件的回调函数。
```
$('li').on('click.logging', function (){
  console.log('click.logging callback removed');
});

$('li').off('click.logging');
```
# 一次性事件
one方法指定一次性的回调函数，即这个函数只能运行一次。这对提交表单很有用。
```
$("#button").one( "click", function() { return false; } );
```
one方法本质上是回调函数运行一次，即解除对事件的监听。
```
document.getElementById("#button").addEventListener("click", handler);

function handler(e) {
    e.target.removeEventListener(e.type, arguments.callee);
	return false;
}
```
上面的代码在点击一次以后，取消了对click事件的监听。如果有特殊需要，可以设定点击2次或3次之后取消监听，这都是可以的。

# jQuery 能做什么？
jQuery是一个兼容多浏览器的JavaScript库，核心理念是write less，do more，它的语法设计可以使开发更加便捷，例如操作文档对象、选择DOM元素、制作动画效果、事件处理、使用Ajax等。除此之外，jQuery还提供API让开发者编写插件。
- 取得文档中的元素$('div').find('.className');
- 修改页面的外观$(this).addClass('active').siblings().removeClass('active');
- 改变文档内容$(this).clone.append('.ul-list');
# jQuery 对象和 DOM 原生对象有什么区别？如何转化？
DOM原生对象：w3c标准用于操作文档的API.
jQuery对象：包装DOM对象产生的对象。
区别：DOM原生对象使用DOM原生对象的方法，jQuery对象使用jQuery对象的方法。  
转化：
- DOM原生对象转化为jQuery对象：$div = $(document.getElementsByTagName(‘div’));
- jQuery对象转化为DOM原生对象：div = $div[index];
# jQuery中如何绑定事件？bind、unbind、delegate、live、on、off都有什么作用？推荐使用哪种？使用on绑定事件使用事件代理的写法？
```
//bind，找到指定元素以后，用bind绑定事件到该元素。
$(#btn).bind('click',function(){
  console.log('bind()');
})
```
```
//unbind，unbind的将绑定在给定元素上的事件给解绑。解绑后原先在该元素上的事件就会失效。
$("#btn").unbind();
```
```
//delegate，表示事件的代理。给给定元素绑定事件，基于一个指定的根元素的子集，匹配的元素包括那些目前已经匹配到的元素，也包括那些今后可能匹配到的元素。例如新添加的元素是匹配到的元素，但是用了代理以后，不用给这些新匹配的元素添加事件，而用了代理后它们就已经绑定好了事件。
$('ul').delegate('li', 'click', function() {
  console.log($(this).text());
});
```
```
//live,给匹配到的元素添加事件，现在匹配到的和将来匹配到都添加事件。这种方法是将页面的document元素作为事件代理元素，太消耗资源，已经过时。在新版本中推荐用.on()法，即时在旧版本中，也推荐使用.delegate()方法来取代.live()方法
$('#btn').live('click', function() {
  console.log('clicked');
});
```
```
//on,给匹配的元素绑定事件
$('#btn').on('click', function() {
  console.log('clicked');
});
```
```
//off,给使用on绑定事件的元素移除事件。
$('btn').off();
```
```
//使用on绑定事件使用事件代理
$('ul').on('click', 'li', function() {
  console.log($(this).text());
});
```
# jQuery 如何展示/隐藏元素？
```
  //hide()和show()方法
<p>我是段落</p>
  <button class="show" type="button">显示</button>
  <button class="hide" type="button">隐藏</button>
<script>
  $(document).ready(function(){
      $('.show').on('click',function(){
      $('p').show();
      });
      $('.hide').on('click',function(){
          $('p').hide();
      });
  })
</script>
```
# jQuery 动画如何使用？
```
//.animate( properties [, duration ] [, easing ] [, complete ] )
$("#btn").on('click', function() {
  $('.div1').animate({
      width: "200px", // 宽度变为200px
      height: "200px", // 高度变为200px
      left: "100px", // 向左移动
      opacity: '0' // 透明度变化
  }, 1000) // 持续一秒
  animate() {
      // 多个动画
  }; 
});
```
# 如何设置和获取元素内部 HTML 内容？如何设置和获取元素内部文本？
```
//设置和获取元素内部 HTML 内容
$('.div1').html('<p>设置的html内容</p>');//设置内容
$('.div1').html();//获取内容
//text()方法
$('.div1').text('设置的内容');//设置内容
$('.div1').text();//获取内容
# 如何设置和获取表单用户输入或者选择的内容？如何设置和获取元素属性？
# 使用 jQuery实现如下效果
```
# 如何设置和获取表单用户输入或者选择的内容？如何设置和获取元素属性？
```
//获取内容使用val();
$('.text1').val(); // 获得id为text1的元素的内容。
//设置和获取元素属性
$('.text1').attr('title', 'input-text');//设置值
$('.text1').attr('title');//获取值
```
