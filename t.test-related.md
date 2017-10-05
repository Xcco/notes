### array方法
- 新数组:concat filter map slice   
- 旧数组:fill reverse pop push shift unshift splice sort  
- for...in...不保证顺序   
### statements & declaration
- for(var index in ...) /  for(var value of ...)
for in显示所有可枚举属性 for of专为collection **for(let value of ...)不能改变原来的array 只能用for(var value of ...)**  
保险起见 遍历并改变原array/object用 for in
```
let iterable = [10, 20, 30];

for (let value of iterable) {
    value += 1;
    console.log(iterable);
}
//[10, 20, 30]
let iterable = [10, 20, 30];

for (var value of iterable) {
    value += 1;
    console.log(iterable);
}
//[11, 21, 31]

``` 
reduce(function(pre,cur,i,a){
        return pre + cur;
    });
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
