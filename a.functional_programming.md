# 函数式编程

### 优化方法
* 链式调用(return this) Promise模式
* 闭包(Closure):可以保留局部变量不被释放的代码块，被称为一个闭包
* 高阶函数:接受并返回一个函数的函数称为高阶函数
* 柯里化(Currying):给定一个函数的部分参数，生成一个接受其他参数的新函数
* 组合(Composing):将多个函数的能力合并，创造一个新的函数
[参考文章](http://taobaofed.org/blog/2017/03/16/javascript-functional-programing/)
[参考文章](https://legacy.gitbook.com/book/llh911001/mostly-adequate-guide-chinese/details)
### 柯里化(Currying)
##### 一个curry函数实现
* x.fun(y) newFun = curry((y,x)=>x.fun(y)) 
```js
function curry(fx) {
  var arity = fx.length;

  return function f1() {
    var args = Array.prototype.slice.call(arguments, 0);
    if (args.length >= arity) {
      return fx.apply(null, args);
    }
    else {
      var f2 = function f2() {
        var args2 = Array.prototype.slice.call(arguments, 0);
        return f1.apply(null, args.concat(args2)); 
      }
      return f2;
    }
  };
}
```
### 组合(Composing)

### 类型签名