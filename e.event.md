事件是一种异步编程的实现方式，本质上是程序各个组成部分之间的通信。
# EventTarget接口
DOM的事件操作（监听和触发），都定义在EventTarget接口。Element节点、document节点和window对象，都部署了这个接口。此外，XMLHttpRequest、AudioNode、AudioContext等浏览器内置对象，也部署了这个接口。
##### 3个方法
- addEventListener：绑定事件的监听函数
- removeEventListener：移除事件的监听函数
- dispatchEvent：触发事件
# addEventListener
###  !注意 只能传递函数 不能加参数！ 有参数要么匿名函数 要么写函数名 默认传出event事件 然后就可以获取event.target等 或者用this this指向事件发生节点

target.addEventListener(type, listener[, useCapture]);
* type：事件名称，大小写敏感。
* listener：监听函数。事件发生时，会调用该监听函数。
* useCapture：布尔值，表示监听函数是否在捕获阶段（capture）触发，默认为false（监听函数只在冒泡阶段被触发）。老式浏览器规定该参数必写，较新版本的浏览器允许该参数可选。为了保持兼容，建议总是写上该参数。
# removeEventListener
- removeEventListener方法的参数，与addEventListener方法完全一致。它的第一个参数“事件类型”，大小写敏感。
- removeEventListener方法移除的监听函数，必须与对应的addEventListener方法的参数完全一致，而且必须在同一个元素节点，否则无效。
- 匿名函数无法移除
# dispatchEvent
dispatchEvent方法在当前节点上触发指定事件，从而触发监听函数的执行。该方法返回一个布尔值，只要有一个监听函数调用了Event.preventDefault()，则返回值为false，否则为true。
- dispatchEvent方法的参数是一个Event对象的实例。
```
para.addEventListener('click', hello, false);
var event = new Event('click');
para.dispatchEvent(event);
```
# 监听函数
监听函数（listener）是事件发生时，程序所要执行的函数。它是事件驱动编程模式的主要编程方式。
DOM提供三种方法，可以用来为事件绑定监听函数。
- HTML标签的on-属性
- Element节点的事件属性
- addEventListener方法
# HTML标签的on-属性 (不应使用)
HTML语言允许在元素标签的属性中，直接定义某些事件的监听代码。
```
<body onload="doSomething()">
<div onclick="console.log('触发事件')">
```
- 使用这个方法指定的监听函数，只会在冒泡阶段触发。
- 使用这种方法时，on-属性的值是将会执行的代码，而不是一个函数。
- on-属性的值是原样传入JavaScript引擎执行。因此如果要执行函数，不要忘记加上一对圆括号
```
<!-- 正确 -->
<body onload="doSomething()">

<!-- 错误 -->
<body onload="doSomething">
```
Element元素节点的setAttribute方法，其实设置的也是这种效果。
```
el.setAttribute('onclick', 'doSomething()');
```

# Element节点的事件属性
- 使用这个方法指定的监听函数，只会在冒泡阶段触发。
- 同一个事件只能定义一个监听函数，也就是说，如果定义两次onclick属性，后一次定义会覆盖前一次
# addEventListener方法
通过Element节点、document节点、window对象的addEventListener方法，也可以定义事件的监听函数。
- 可以针对同一个事件，添加多个监听函数。
- 能够指定在哪个阶段（捕获阶段还是冒泡阶段）触发回监听函数。
- 除了DOM节点，还可以部署在window、XMLHttpRequest等对象上面，等于统一了整个JavaScript的监听函数接口。
# target与currentTarget区别
target在事件流的目标阶段；currentTarget在事件流的捕获，目标及冒泡阶段。只有当事件流处在目标阶段的时候，两个的指向才是一样的， 而当处于捕获和冒泡阶段的时候，target指向被单击的对象而currentTarget指向当前事件活动的对象（一般为父级）。
# this对象的指向
实际编程中，监听函数内部的this对象，常常需要指向触发事件的那个Element节点。
- addEventListener方法指定的监听函数，内部的this对象总是指向触发事件的那个节点。
- 如果将监听函数部署在Element节点的on-属性上面，this不会指向触发事件的元素节点。因为此时函数处在全局作用域
# 事件的传播
> 第一阶段：从window对象传导到目标节点，称为“捕获阶段”（capture phase）。

>   第二阶段：在目标节点上触发，称为“目标阶段”（target phase）。

>   第三阶段：从目标节点传导回window对象，称为“冒泡阶段”（bubbling phase）。
- 用户点击网页的时候，浏览器总是假定click事件的目标节点，就是点击位置的嵌套最深的那个节点（嵌套在<div>节点的<p>节点）。所以，<p>节点的捕获阶段和冒泡阶段，都会显示为target阶段。  
- 事件传播的最上层对象是window，接着依次是document，html（document.documentElement）和body（document.dody）。也就是说，如果<body>元素中有一个<div>元素，点击该元素。事件的传播顺序，在捕获阶段依次为window、document、html、body、div，在冒泡阶段依次为div、body、html、document、window。
# 事件的代理
由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。
```
var ul = document.querySelector('ul');

ul.addEventListener('click', function(event) {
  if (event.target.tagName.toLowerCase() === 'li') {
    // some code
  }
});
```
- 如果希望事件到某个节点为止，不再传播，可以使用事件对象的stopPropagation方法。
```
p.addEventListener('click', function(event) {
  event.stopPropagation();
});
```
- stopPropagation方法只会阻止当前监听函数的传播，不会阻止<p>节点上的其他click事件的监听函数。如果想要不再触发那些监听函数，可以使用stopImmediatePropagation方法。
```
p.addEventListener('click', function(event) {
 event.stopImmediatePropagation();
});

p.addEventListener('click', function(event) {
 // 不会被触发
});
```
# Event对象
事件发生以后，会生成一个事件对象，作为参数传给监听函数。浏览器原生提供一个Event对象，所有的事件都是这个对象的实例，或者说继承了Event.prototype对象。

- Event对象本身就是一个构造函数，可以用来生成新的实例。
```
event = new Event(typeArg, eventInit);
```
Event构造函数接受两个参数。第一个参数是字符串，表示事件的名称；第二个参数是一个对象，表示事件对象的配置。该参数可以有以下两个属性。

- bubbles：布尔值，可选，默认为false，表示事件对象是否冒泡。
- cancelable：布尔值，可选，默认为false，表示事件是否可以被取消。
```
var ev = new Event(
  'look',
  {
    'bubbles': true,
    'cancelable': false
  }
);
document.dispatchEvent(ev);
```
# event.bubbles，event.eventPhase
* bubbles属性返回一个布尔值，表示当前事件是否会冒泡。该属性为只读属性，只能在新建事件时改变。除非显式声明，Event构造函数生成的事件，默认是不冒泡的。
* eventPhase属性返回一个整数值，表示事件目前所处的节点。
 > 0，事件目前没有发生。
 > 1，事件目前处于捕获阶段，即处于从祖先节点向目标节点的传播过程中。该过程是从Window对象到Document节点，再到HTMLHtmlElement节点，直到目标节点的父节点为止。
 > 2，事件到达目标节点，即target属性指向的那个节点。
 > 3，事件处于冒泡阶段，即处于从目标节点向祖先节点的反向传播过程中。该过程是从父节点一直到Window对象。只有bubbles属性为true时，这个阶段才可能发生。

# event.cancelable，event.defaultPrevented
cancelable属性返回一个布尔值，表示事件是否可以取消。该属性为只读属性，只能在新建事件时改变。除非显式声明，Event构造函数生成的事件，默认是不可以取消的。
```
var bool = event.cancelable;
```
如果要取消某个事件，需要在这个事件上面调用preventDefault方法，这会阻止浏览器对某种事件部署的默认行为。

defaultPrevented属性返回一个布尔值，表示该事件是否调用过preventDefault方法。
# event.currentTarget，event.target
currentTarget属性返回事件当前所在的节点，即正在执行的监听函数所绑定的那个节点。作为比较，target属性返回事件发生的节点。如果监听函数在捕获阶段和冒泡阶段触发，那么这两个属性返回的值是不一样的。
- 在监听函数中，currentTarget属性实际上等同于this对象。
target属性返回触发事件的那个节点，即事件最初发生的节点。如果监听函数不在该节点触发，那么它与currentTarget属性返回的值是不一样的。
# event.type，event.detail，event.timeStamp，event.isTrusted
1. type
type属性返回一个字符串，表示事件类型，大小写敏感。
2. detail
detail属性返回一个数值，表示事件的某种信息。具体含义与事件类型有关，对于鼠标事件，表示鼠标按键在某个位置按下的次数，比如对于dblclick事件，detail属性的值总是2。
3. timeStamp
timeStamp属性返回一个毫秒时间戳，表示事件发生的时间。
4. isTrusted
isTrusted属性返回一个布尔值，表示该事件是否为真实用户触发。
用户触发的事件返回true，脚本触发的事件返回false。
# event.preventDefault()
preventDefault方法取消浏览器对当前事件的默认行为，比如点击链接后，浏览器跳转到指定页面，或者按一下空格键，页面向下滚动一段距离。该方法生效的前提是，事件的cancelable属性为true，如果为false，则调用该方法没有任何效果。  
该方法不会阻止事件的进一步传播（stopPropagation方法可用于这个目的）。只要在事件的传播过程中（捕获阶段、目标阶段、冒泡阶段皆可），使用了preventDefault方法，该事件的默认方法就不会执行。
```
// HTML代码为
// <input type="checkbox" id="my-checkbox" />

var cb = document.getElementById('my-checkbox');

cb.addEventListener(
  'click',
  function (e){ e.preventDefault(); },
  false
);
```
上面代码为点击单选框的事件，设置监听函数，取消默认行为。由于浏览器的默认行为是选中单选框，所以这段代码会导致无法选中单选框。  

利用这个方法，可以为文本输入框设置校验条件。如果用户的输入不符合条件，就无法将字符输入文本框。
```
function checkName(e) {
  if (e.charCode < 97 || e.charCode > 122) {
    e.preventDefault();
  }
}
```
上面函数设为文本框的keypress监听函数后，将只能输入小写字母，否则输入事件的默认事件（写入文本框）将被取消。

- 如果监听函数最后返回布尔值false（即return false），浏览器也不会触发默认行为，与preventDefault方法有等同效果。

# event.stopPropagation()
stopPropagation方法阻止事件在DOM中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上新定义的事件监听函数。
# event.stopImmediatePropagation()
stopImmediatePropagation方法阻止同一个事件的其他监听函数被调用。

如果同一个节点对于同一个事件指定了多个监听函数，这些函数会根据添加的顺序依次调用。只要其中有一个监听函数调用了stopImmediatePropagation方法，其他的监听函数就不会再执行了。
# 自定义事件和事件模拟
# CustomEvent()
Event构造函数只能指定事件名，不能在事件上绑定数据。如果需要在触发事件的同时，传入指定的数据，需要使用CustomEvent构造函数生成自定义的事件对象。
```
var event = new CustomEvent('build', { 'detail': 'hello' });
function eventHandler(e) {
  console.log(e.detail);
}
```
上面代码中，CustomEvent构造函数的第一个参数是事件名称，第二个参数是一个对象，该对象的detail属性会绑定在事件对象之上。
```
var myEvent = new CustomEvent("myevent", {
  detail: {
    foo: "bar"
  },
  bubbles: true,
  cancelable: false
});

el.addEventListener('myevent', function(event) {
  console.log('Hello ' + event.detail.foo);
});

el.dispatchEvent(myEvent);
```
# 事件的模拟
有时，需要在脚本中模拟触发某种类型的事件，这时就必须使用这种事件的构造函数。  

下面是一个通过MouseEvent构造函数，模拟触发click鼠标事件的例子。
```
function simulateClick() {
  var event = new MouseEvent('click', {
    'bubbles': true,
    'cancelable': true
  });
  var cb = document.getElementById('checkbox');
  cb.dispatchEvent(event);
}
```


























***
### 一般在父元素上添加addListener 子元素通过e.target获取
# DOM0 事件和DOM2级在事件监听使用方式上有什么区别
DOM0事件监听使用btn.onclick=function(){},DOM0级事件监听就是把一个方法赋值给一个元素的事件处理程序属性。将这些属性的值设置为一个函数，就可以指定事件处理程序。一个事件只能绑定一次，并且新方法会覆盖老方法。  
DOM2事件监听使用btn.addEventListener,btn.removeEventListener,DOM2级事件监听定义了两个方法用于处理指定和删除事件处理程序的操作：addEventListener、removeEventListener。所有的DOM节点都包含这两个方法，并且它们都接受三个参数：事件类型、事件处理方法、布尔参数。  
参考：[js事件绑定机制](https://www.cnblog.me/2016/05/08/javascript-event-binding/)  
# attachEvent与addEventListener的区别
* 参数个数不相同  
addEventListener共有3个参数,`element.addEventListener(type,listener,useCapture)`;type:事件名称,listener:要绑定的事件监听函数,userCapture:事件监听方式。  
attachEvent共有2个参数,`element.attachEvent(type,listener)`;type:事件名称,listener:要绑定的事件监听函数  
attachEvent添加的事件处理程序只能发生在冒泡阶段，addEventListener第三个参数可以决定添加的事件处理程序是在捕获阶段还是冒泡阶段处理（我们一般为了浏览器兼容性都设置为冒泡阶段）
* 第一个参数意义不同，addEventListener第一个参数是事件类型（比如click，load），而attachEvent第一个参数指明的是事件处理函数名称（onclick，onload）
* 事件处理程序的作用域不相同，addEventListener的作用域是元素本身，this是指的触发元素，而attachEvent事件处理程序会在全局变量内运行，this是window
* 为一个事件添加多个事件处理程序时，执行顺序不同，addEventListener添加会按照添加顺序执行，而attachEvent添加多个事件处理程序时顺序无规律(添加的方法少的时候大多是按添加顺序的反顺序执行的，但是添加的多了就无规律了)，所以添加多个的时候，不依赖执行顺序的还好，若是依赖于函数执行顺序，最好自己处理，不要指望浏览器
# 解释IE事件冒泡和DOM2事件传播机制
* IE的事件冒泡：事件开始时由最具体的元素接收，然后逐级向上传播到较为不具体的元素。
* DOM事件流：DOM2级事件规定事件流包括三个阶段，事件捕获阶段，处于目标阶段，事件冒泡阶段，首先发生的是事件捕获，为截取事件提供机会，然后是实际目标接收事件，最后是冒泡阶段
# 如何阻止事件冒泡 如何阻止默认事件
DOM中 是方法
`stopPropagation()`取消事件进一步捕获或冒泡
`preventDefault()`取消事件默认行为
IE中 是属性
`cancelBubble`默认为false,设置为true后可以取消事件冒泡
`returnValue`默认为true，设为false可以取消事件默认行为
# 有如下代码，要求当点击每一个元素li时控制台展示该元素的文本内容 不考虑兼容
```
<ul class="ct">
    <li>这里是</li>
    <li>饥人谷</li>
    <li>前端6班</li>
</ul>
<script>
    var list=document.querySelectorAll("li")
      for(var i=0;i<list.length;i++){
      list[i].addEventListener('click',function(e){
        var item=e.currentTarget
        console.log(item.innerText)})
    }
</script>
```
# 当点击按钮开头添加时在<li>这里是</li>元素前添加一个新元素，内容为用户输入的非空字符串；当点击结尾添加时在最后一个 li 元素后添加用户输入的非空字符串.当点击每一个元素li时控制台展示该元素的文本内容。
```
<ul class="ct">
    <li>这里是</li>
    <li>饥人谷</li>
    <li>任务班</li>
</ul>
<input class="ipt-add-content" placeholder="添加内容"/>
<button id="btn-add-start">开头添加</button>
<button id="btn-add-end">结尾添加</button>
<script>
    var btnstart=document.querySelector("#btn-add-start")
    var btnend=document.querySelector("#btn-add-end")
    var iptcontent=document.querySelector(".ipt-add-content")
    var ul=document.querySelector(".ct")
    ul.addEventListener("click",function(e){
      if(e.target.tagName==="LI"){
        console.log(e.target.innerText);
      }
    })
    btnstart.addEventListener("click",function(e){
      if(iptcontent.value && e.target===btnstart){
        var list=document.createElement("li")
        list.innerText=iptcontent.value
        ul.insertBefore(list,ul.firstChild)
      }
    })
    btnend.addEventListener("click",function(e){
      if(iptcontent.value && e.target===btnend){
        var list=document.createElement("li")
        list.innerText=iptcontent.value
        ul.appendChild(list)
      }
    })
</script>
```
# 当鼠标放置在li元素上，会在img-preview里展示当前li元素的data-img对应的图片
```
<ul class="ct">
    <li data-img="1.png">鼠标放置查看图片1</li>
    <li data-img="2.png">鼠标放置查看图片2</li>
    <li data-img="3.png">鼠标放置查看图片3</li>
</ul>
<div class="img-preview"></div>
<script>
    var ul=document.querySelector(".ct")
      var pview=document.querySelector(".img-preview")

      ul.addEventListener("mouseover",function(e){
        if(pview.innerHTML){
          var dataImg=e.target.getAttribute("data-img")
          pview.querySelector("img").setAttribute("src",dataImg)
        }
        else {
          var innerImg=document.createElement("img")
          pview.appendChild(innerImg)
          var dataImg=e.target.getAttribute("data-img")
          innerImg.setAttribute("src",dataImg)
          innerImg.setAttribute("alt","fail")
        }
      })
</script>
```
