# 鼠标事件
# click 事件，dblclick 事件
当用户在Element节点、document节点、window对象上单击鼠标（或者按下回车键）时，click事件触发。

- “鼠标单击”定义为，用户在同一个位置完成一次mousedown动作和mouseup动作。它们的触发顺序是：mousedown首先触发，mouseup接着触发，click最后触发。

下面的代码是利用click事件进行CSRF攻击（Cross-site request forgery）的一个例子。
```
<a href="http://www.harmless.com/" onclick="
  var f = document.createElement('form');
  f.style.display = 'none';
  this.parentNode.appendChild(f);
  f.method = 'POST';
  f.action = 'http://www.example.com/account/destroy';
  f.submit();
  return false;">伪装的链接</a>
 ```
 - dblclick事件当用户在element、document、window对象上，双击鼠标时触发。该事件会在mousedown、mouseup、click之后触发。
# mouseup 事件，mousedown 事件，mousemove 事件
- mouseup事件在释放按下的鼠标键时触发。
- mousedown事件在按下鼠标键时触发。
- mousemove事件当鼠标在一个节点内部移动时触发。当鼠标持续移动时，该事件会连续触发。为了避免性能问题，建议对该事件的监听函数做一些限定，比如限定一段时间内只能运行一次代码。

# mouseover 事件，mouseenter 事件
mouseover事件和mouseenter事件，都是鼠标进入一个节点时触发。
- 两者的区别是，mouseenter事件只触发一次，而只要鼠标在节点内部移动，mouseover事件会在子节点上触发多次。
```
// HTML代码为
// <ul id="test">
//   <li>item 1</li>
//   <li>item 2</li>
//   <li>item 3</li>
// </ul>

var test = document.getElementById('test');

// 进入test节点以后，该事件只会触发一次
// event.target 是 ul 节点
test.addEventListener('mouseenter', function (event) {
  event.target.style.color = 'purple';
  setTimeout(function () {
    event.target.style.color = '';
  }, 500);
}, false);

// 进入test节点以后，只要在子Element节点上移动，该事件会触发多次
// event.target 是 li 节点
test.addEventListener('mouseover', function (event) {
  event.target.style.color = 'orange';
  setTimeout(function () {
    event.target.style.color = '';
  }, 500);
}, false);
```
# mouseout 事件，mouseleave 事件
mouseout事件和mouseleave事件，都是鼠标离开一个节点时触发。
两者的区别是，mouseout事件会冒泡，mouseleave事件不会。子节点的mouseout事件会冒泡到父节点，
进而触发父节点的mouseout事件。mouseleave事件就没有这种效果，所以离开子节点时，不会触发父节点的监听函数。
### enter对应leave over对应out
# contextmenu 事件
contextmenu事件在一个节点上点击鼠标右键时触发，或者按下“上下文菜单”键时触发。

# MouseEvent 对象
鼠标事件使用MouseEvent对象表示，它继承UIEvent对象和Event对象。浏览器提供一个MouseEvent构造函数，用于新建一个MouseEvent实例。
```
event = new MouseEvent(typeArg, mouseEventInit);
```
MouseEvent构造函数的第一个参数是事件名称
（可能的值包括click、mousedown、mouseup、mouseover、mousemove、mouseout），第二个参数是一个事件初始化对象。该对象可以配置以下属性。
- screenX，设置鼠标相对于屏幕的水平坐标（但不会移动鼠标），默认为0，等同于MouseEvent.screenX属性。
- screenY，设置鼠标相对于屏幕的垂直坐标，默认为0，等同于MouseEvent.screenY属性。
- clientX，设置鼠标相对于窗口的水平坐标，默认为0，等同于MouseEvent.clientX属性。
- clientY，设置鼠标相对于窗口的垂直坐标，默认为0，等同于MouseEvent.clientY属性。
- ctrlKey，设置是否按下ctrl键，默认为false，等同于MouseEvent.ctrlKey属性。
- shiftKey，设置是否按下shift键，默认为false，等同于MouseEvent.shiftKey属性。
- altKey，设置是否按下alt键，默认为false，等同于MouseEvent.altKey属性。
- metaKey，设置是否按下meta键，默认为false，等同于MouseEvent.metaKey属性。
- button，设置按下了哪一个鼠标按键，默认为0。-1表示没有按键，0表示按下主键（通常是左键），1表示按下辅助键（通常是中间的键），2表示按下次要键（通常是右键）。
- buttons，设置按下了鼠标哪些键，是一个3个比特位的二进制值，默认为0。1表示按下主键（通常是左键），2表示按下次要键（通常是右键），4表示按下辅助键（通常是中间的键）。
- relatedTarget，设置一个Element节点，在mouseenter和mouseover事件时，表示鼠标刚刚离开的那个Element节点，在mouseout和mouseleave事件时，表示鼠标正在进入的
那个Element节点。默认为null，等同于MouseEvent.relatedTarget属性。
以下属性也是可配置的，都继承自UIEvent构造函数和Event构造函数。
- bubbles，布尔值，设置事件是否冒泡，默认为false，等同于Event.bubbles属性。
- cancelable，布尔值，设置事件是否可取消，默认为false，等同于Event.cancelable属性。
- view，设置事件的视图，一般是window或document.defaultView，等同于Event.view属性。
- detail，设置鼠标点击的次数，等同于Event.detail属性。
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
# clientX，clientY，movementX，movementY，screenX，screenY
clientX属性返回鼠标位置相对于浏览器窗口左上角的水平坐标，单位为像素  
movementX属性返回一个水平位移，单位为像素，表示当前位置与上一个mousemove事件之间的水平距离。
在数值上，等于currentEvent.movementX = currentEvent.screenX - previousEvent.screenX。  
screenX属性返回鼠标位置相对于屏幕左上角的水平坐标，单位为像素。
# relatedTarget
relatedTarget属性返回事件的次要相关节点。对于那些没有次要相关节点的事件，该属性返回null。
> 事件名称	target属性	relatedTarget属性
> focusin	接受焦点的节点	丧失焦点的节点
> focusout	丧失焦点的节点	接受焦点的节点
> mouseenter	将要进入的节点	将要离开的节点
> mouseleave	将要离开的节点	将要进入的节点
> mouseout	将要离开的节点	将要进入的节点
> mouseover	将要进入的节点	将要离开的节点
> dragenter	将要进入的节点	将要离开的节点
> dragexit	将要离开的节点	将要进入的节点

# wheel事件
wheel事件是与鼠标滚轮相关的事件，目前只有一个wheel事件。用户滚动鼠标的滚轮，就触发这个事件。  
deltaX：返回一个数值，表示滚轮的水平滚动量。   
deltaY：返回一个数值，表示滚轮的垂直滚动量。  
deltaZ：返回一个数值，表示滚轮的Z轴滚动量。  
deltaMode：返回一个数值，表示滚动的单位，适用于上面三个属性。0表示像素，1表示行，2表示页。 

# 键盘事件
键盘事件用来描述键盘行为，主要有keydown、keypress、keyup三个事件。
- keydown：按下键盘时触发该事件。

- keypress：只要按下的键并非Ctrl、Alt、Shift和Meta，就接着触发keypress事件。

- keyup：松开键盘时触发该事件。

如果用户一直按键不松开，就会连续触发键盘事件，触发的顺序如下。
1. keydown
2. keypress
3. keydown
4. keypress
5. （重复以上过程）
6. keyup
键盘事件使用KeyboardEvent对象表示，该对象继承了UIEvent和MouseEvent对象。浏览器提供KeyboardEvent构造函数，用来新建键盘事件的实例。
```
event = new KeyboardEvent(typeArg, KeyboardEventInit);
```
KeyboardEvent构造函数的第一个参数是一个字符串，表示事件类型，第二个参数是一个事件配置对象，可配置以下字段。
- key，对应KeyboardEvent.key属性，默认为空字符串。
- ctrlKey，对应KeyboardEvent.ctrlKey属性，默认为false。
- shiftKey，对应KeyboardEvent.shiftKey属性，默认为false。
- altKey，对应KeyboardEvent.altKey属性，默认为false。
- metaKey，对应KeyboardEvent.metaKey属性，默认为false。
# key，charCode
key属性返回一个字符串，表示按下的键名。如果同时按下一个控制键和一个符号键，则返回符号键的键名。比如，按下Ctrl+a，则返回a。如果无法识别键名，则返回字符串Unidentified。

主要功能键的键名（不同的浏览器可能有差异）：Backspace，Tab，Enter，Shift，Control，Alt，CapsLock，Esc，Spacebar，PageUp，PageDown，End，Home，Left，Right，Up，Down，PrintScreen，Insert，Del，Win，F1～F12，NumLock，Scroll等。  
charCode属性返回一个数值，表示keypress事件按键的Unicode值，keydown和keyup事件不提供这个属性。注意，该属性已经从标准移除，虽然浏览器还支持，但应该尽量不使用。

# 进度事件
进度事件用来描述一个事件进展的过程，比如XMLHttpRequest对象发出的HTTP请求的过程、<img>、<audio>、<video>、<style>、<link>加载外部资源的过程。下载和上传都会发生进度事件。
- abort事件：当进度事件被中止时触发。如果发生错误，导致进程中止，不会触发该事件。

- error事件：由于错误导致资源无法加载时触发。

- load事件：进度成功结束时触发。

- loadstart事件：进度开始时触发。

- loadend事件：进度停止时触发，发生顺序排在error事件\abort事件\load事件后面。

- progress事件：当操作处于进度之中，由传输的数据块不断触发。

- timeout事件：进度超过限时触发。
```
image.addEventListener('load', function(event) {
  image.classList.add('finished');
});

image.addEventListener('error', function(event) {
  image.style.display = 'none';
});
```
上面代码在图片元素加载完成后，为图片元素的class属性添加一个值“finished”。如果加载失败，就把图片元素的样式设置为不显示。

有时候，图片加载会在脚本运行之前就完成，尤其是当脚本放置在网页底部的时候，因此有可能使得load和error事件的监听函数根本不会被执行。所以，比较可靠的方式，是用complete属性先判断一下是否加载完成。
```
function loaded() {
  // code after image loaded
}

if (image.complete) {
  loaded();
} else {
  image.addEventListener('load', loaded);
}
```
由于DOM没有提供像complete属性那样的，判断是否发生加载错误的属性，所以error事件的监听函数最好放在img元素的HTML属性中，这样才能保证发生加载错误时百分之百会执行。
```
<img src="/wrong/url" onerror="this.style.display='none';" />
```
error事件有一个特殊的性质，就是不会冒泡。这样的设计是正确的，防止引发父元素的error事件监听函数。  
进度事件使用ProgressEvent对象表示。ProgressEvent实例有以下属性。
- lengthComputable：返回一个布尔值，表示当前进度是否具有可计算的长度。如果为false，就表示当前进度无法测量。

- total：返回一个数值，表示当前进度的总长度。如果是通过HTTP下载某个资源，表示内容本身的长度，不含HTTP头部的长度。如果lengthComputable属性为false，则total属性就无法取得正确的值。

- loaded：返回一个数值，表示当前进度已经完成的数量。该属性除以total属性，就可以得到目前进度的百分比。

##### loadend事件的监听函数，可以用来取代abort事件/load事件/error事件的监听函数。  
loadend事件本身不提供关于进度结束的原因，但可以用它来做所有进度结束场景都需要做的一些操作。 

##### 浏览器提供一个ProgressEvent构造函数，用来生成进度事件的实例。
```
progressEvent = new ProgressEvent(type, {
  lengthComputable: aBooleanValue,
  loaded: aNumber,
  total: aNumber
});
```
上面代码中，ProgressEvent构造函数的第一个参数是事件类型（字符串），第二个参数是配置对象，用来指定lengthComputable属性（默认值为false）、loaded属性（默认值为0）、total属性（默认值为0）。
# 拖拉事件 触摸事件 文档事件（略）
# 表单事件
1. input事件

input事件当<input>、<textarea>的值发生变化时触发。此外，打开contenteditable属性的元素，只要值发生变化，也会触发input事件。

input事件的一个特点，就是会连续触发，比如用户每次按下一次按键，就会触发一次input事件。

2. select事件

select事件当在`<input>`、<textarea>中选中文本时触发。
3. Change事件

Change事件当`<input>`、<select>、<textarea>的值发生变化时触发。它与input事件的最大不同，就是不会连续触发，只有当全部修改完成时才会触发，而且input事件必然会引发change事件。具体来说，分成以下几种情况。
- 激活单选框（radio）或复选框（checkbox）时触发。
- 用户提交时触发。比如，从下列列表（select）完成选择，在日期或文件输入框完成选择。
- 当文本框或textarea元素的值发生改变，并且丧失焦点时触发。
# reset事件，submit事件
以下事件发生在表单对象上，而不是发生在表单的成员上。

1. reset事件

reset事件当表单重置（所有表单成员变回默认值）时触发。

2. submit事件

submit事件当表单数据向服务器提交时触发。注意，submit事件的发生对象是form元素，而不是button元素（即使它的类型是submit），因为提交的是表单，而不是按钮。

# 焦点事件
焦点事件发生在Element节点和document对象上面，与获得或失去焦点相关。它主要包括以下四个事件。

- focus事件：Element节点获得焦点后触发，该事件不会冒泡。

- blur事件：Element节点失去焦点后触发，该事件不会冒泡。

- focusin事件：Element节点将要获得焦点时触发，发生在focus事件之前。该事件会冒泡。Firefox不支持该事件。

- focusout事件：Element节点将要失去焦点时触发，发生在blur事件之前。该事件会冒泡。Firefox不支持该事件。

这四个事件的事件对象，带有target属性（返回事件的目标节点）和relatedTarget属性（返回一个Element节点）。对于focusin事件，relatedTarget属性表示失去焦点的节点；对于focusout事件，表示将要接受焦点的节点；对于focus和blur事件，该属性返回null。

由于focus和blur事件不会冒泡，只能在捕获阶段触发，所以addEventListener方法的第三个参数需要设为true。
```
form.addEventListener("focus", function( event ) {
  event.target.style.background = "pink";
}, true);
form.addEventListener("blur", function( event ) {
  event.target.style.background = "";
}, true);
```
上面代码设置表单的文本输入框，在接受焦点时设置背景色，在失去焦点时去除背景色。

浏览器提供一个FocusEvent构造函数，可以用它生成焦点事件的实例。
```
var focusEvent = new FocusEvent(typeArg, focusEventInit);
```
上面代码中，FocusEvent构造函数的第一个参数为事件类型，第二个参数是可选的配置对象，用来配置FocusEvent对象。

# DOMContentLoaded事件，readystatechange事件 scroll事件，resize事件 cut事件，copy事件，paste事件 (略)












