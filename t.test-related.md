### 静态方法与实例交换数据
构造一个emitter 发布订阅模式


### array方法
- 新数组:concat filter map slice   
- 旧数组:fill reverse pop push shift unshift splice sort  
### 修改数组的方法不返回旧数组而返回改动 因此不能链式调用！
- for...in...不保证顺序   
### statements & declaration
- for(var index in ...) /  for(var value of ...)
for in显示所有可枚举属性 for of专为collection **for(let value of ...)不能改变原来的array 只能用for(var value of ...)**  
保险起见 遍历并改变原array/object用 for in

``` 
reduce(function(pre,cur,i,a){
        return pre + cur;
    });
```
```
//a-b默认升序
var numbers = [4, 2, 5, 1, 3]; 
numbers.sort((a, b) => a - b); 
console.log(numbers);

// [1, 2, 3, 4, 5]
```
### string


### 循环
```
for(){
  if(a===b){
    xxxx  
  }
}
可以写成
for(){
  a!==b || xxxx
}
```
# HTML & CSS
### flex
flex只有父元素控制轴方向 子元素不能控制自身 只有flex-grow和 align-self:stretch
