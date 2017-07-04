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
# relatedTarget
relatedTarget属性返回事件的次要相关节点。对于那些没有次要相关节点的事件，该属性返回null。
下表列出不同事件的target属性和relatedTarget属性含义。  
|事件名称	|target属性	|relatedTarget属性|  
| --------   | -----:   | :----: |  
|focusin	|接受焦点的节点	|丧失焦点的节点|  


|focusout	|丧失焦点的节点	接受焦点的节点
|mouseenter|	将要进入的节点	将要离开的节点
|mouseleave	|将要离开的节点	将要进入的节点
|mouseout	|将要离开的节点	将要进入的节点
|mouseover|	将要进入的节点	将要离开的节点
|dragenter|	将要进入的节点	将要离开的节点
|dragexit	|将要离开的节点	将要进入的节点
 | 水果        | 价格    |  数量  |
    | --------   | -----:   | :----: |
    | 香蕉        | $1      |   5    |
    | 苹果        | $1      |   6    |
    | 草莓        | $1      |   7    |










