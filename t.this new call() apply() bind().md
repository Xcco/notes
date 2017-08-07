# this
- 情况一：纯粹的函数调用  
这是函数的最通常用法，属于全局性调用，因此this就代表全局对象Global。
- 情况二：作为对象方法的调用  
函数还可以作为某个对象的方法调用，这时this就指这个上级对象。
- 情况三 作为构造函数调用  
所谓构造函数，就是通过这个函数生成一个新对象（object）。这时，this就指这个新对象。
- 情况四 call apply调用  
apply()是函数对象的一个方法，它的作用是改变函数的调用对象，它的第一个参数就表示改变后的调用这个函数的对象。因此，this指的就是这第一个参数。
# 解题思路
- this 就是你 call 一个函数时，传入的 context。
- 如果你的函数调用形式不是 call 形式，请按照「转换代码」将其转换为 call 形式。
> func(p1, p2) 等价于
> func.call(undefined, p1, p2)

> obj.child.method(p1, p2) 等价于
> obj.child.method.call(obj.child, p1, p2)
> 如果你传的 context 就 null 或者 undefined，那么 window 对象就是默认的 context（严格模式下默认 context 是 undefined）

### 函数嵌套产生的内部函数的this不是其父函数，仍然是全局变量 setTimeout、setInterval中的this是全局变量
# 例题
```
function fn (){ console.log(this) }
var arr = [fn, fn2]
arr[0]() 
//       arr[0]() 
假想为    arr.0()
然后转换为 arr.0.call(arr)
那么里面的 this 就是 arr 了 :)
```
```

　var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　return this.name;
　　　　}
　　};
　　alert(object.getNameFunc())//My Object 此处是对象的方法 object.getNameFunc

　var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　return function(){
　　　　　　　　return this.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()());//The Window  this的指向在函数创建的时候是决定不了的，在调用的时候才能决定，谁调用的就指向谁 

　var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　var that = this;
　　　　　　return function(){
　　　　　　　　return that.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()());//My Object 闭包
```
# new
当一个构造函数前加上new的时候：
1. 生成一个空的对象并将其作为 this；
2. 将空对象的proto 指向构造函数；
3. 运行该构造函数；
4. 如果构造函数没有 return 或者 return 一个返回 this 值是基本类型，则返回
this；如果 return 一个引用类型，则返回这个引用类型。

- 在创建变量时，对于布尔、数值、字符串、null和undefined这个五个原始值类型来说，原始类型优于封装对象
```
var s = new String('hello');
typeof 'hello'; // string
typeof s; // object
```
# [apply call bind](http://web.jobbole.com/83642/)
# call()
> fun.call(thisArg[, arg1[, arg2[, …]]])  
> call()作用都是改变当前作用域，即改变this的指向，将函数对象从初始的上下文改变为由thisArg指定的新对象。  
> thisArg：可选项，将被当做当前对象。如果没有thisArg，那么global对象将被用作thisArg.  
> arg1,arg2：可选项，将被传递方法参数序列。  
# apply()
> fun.apply(thisArg, [arg1,arg2,…argN])
从api上可以看出apply()区别于call()是第二个参数，apply()传入的是一个数组。
- 传入参数数量不确定就用call传入arguments
# bind()
```
var obj = {
    x: 81,
};
 
var foo = {
    getX: function() {
        return this.x;
    }
}
console.log(foo.getX.bind(obj)());  //81
console.log(foo.getX.call(obj));    //81
console.log(foo.getX.apply(obj));   //81
```
使用 bind() 方法的，后面多了对括号。
当你希望改变上下文环境之后并非立即执行，而是回调执行的时候，使用 bind() 方法。而 apply/call 则会立即执行函数。

# 总结
* apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；
* apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
* apply 、 call 、bind 三者都可以利用后续参数传参；
* bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。
