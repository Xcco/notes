# Custom Properties
custom properties have a ‘--’ prefix.   
use the var() function to adduce value  
var() can take an optional second parameter, to use as the default  
```
var(--theme-color, gray);
```
 calc() function in CSS is often used to combine different types of units:
```
:root {
  --base-size: 4px;
}
.child {
  width: calc(100% - 16px);
} 
.title {
  text-size: calc(5 * var(--base-size));
}
```
```
:root {
  --base-size: 4px;
  --title-multiplier: 5;
  --body-multiplier: 3;
}
 
.title {
  text-size: calc(var(--title-multiplier) * var(--base-size));
}
 
.body {
  text-size: calc(var(--body-multiplier) * var(--base-size));
}
```
js操作正确方法
```
const styles = getComputedStyle(document.querySelector('.foo'));
// Read value. Be sure to trim to remove whitespace. 
const oldColor = styles.getPropertyValue('--color').trim();
// Write value. 
foo.style.setProperty('--color', 'green');
```
![](https://i.loli.net/2017/07/28/597b5f607b94f.png)


# transition
transition需要明确知道，开始状态和结束状态的具体数值，才能计算出中间状态。（不能给中间态赋值）  
以下没有效果:含有auto，display: none到block，background: url(foo.jpg)到url(bar.jpg)
transition局限:  
（1）transition需要事件触发，所以没法在网页加载时自动发生。  
（2）transition是一次性的，不能重复发生，除非一再触发。  
（3）transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。  
（4）一条transition规则，只能定义一个属性的变化，不能涉及多个属性。  
# animation
CSS Animation需要指定动画一个周期持续的时间，以及动画效果的名称。
```
div:hover {
  animation: 1s rainbow;
}
```
keyframes关键字，定义rainbow效果。
```
@keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}
```
加入infinite关键字，可以让动画无限次播放。或加上具体次数

### animation-fill-mode
画结束以后，会立即从结束状态跳回到起始状态。如果想让动画保持在结束状态，需要使用animation-fill-mode属性。
```
div:hover {
  animation: 1s rainbow 3 forwards;
}
```
### animation-direction
动画循环播放时，每次都是从结束状态跳回到起始状态，再开始播放。animation-direction属性，可以改变这种行为。
### steps
steps函数可以实现分步过渡
### animation-play-state
如果想让动画保持突然终止时的状态，就要使用animation-play-state属性。
