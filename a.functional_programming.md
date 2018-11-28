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
##### curry函数的一种实现
*   newFun = curry((y,x)=>x.f(y));
*   x.f(y) === newFun(y)(x)
```js
function curry(fx) {
    const arity = fx.length; //fx.length函数应接受参数个数，arguments.length实际接受参数个数
    return function f1() {
        const args = [...arguments];
        if (args.length >= arity) {
        return fx.apply(null, args);
        }
        else {
        const f2 = function f2() {
            const args2 = [...arguments];
            return f1.apply(null, args.concat(args2)); 
        }
        return f2;
        }
    };
}
example:
map = curry(function map(f, xs) {
    return xs.map(f);
});
```
### 组合(Composing)
##### curry函数的一种实现
* compose(f,g) = ()=>f(g(x))
```js
// 要求f g 都返回一个值
compose = function() {
    const fns = [...arguments];
    const arglen = fns.length;
    return function(){
        for(const i=arglen;--i>=0;) {
        const fn = fns[i]
        const args = fn.length ? Array.prototype.slice.call(arguments, 0, fn.length) : arguments
        const next_args = Array.prototype.slice.call(arguments, (fn.length || 1)); // fn返回多参数会有错
        next_args.unshift(fn.apply(this,args)); //上一个函数调用 返回值插入arguments数组用于下一函数调用
        arguments = next_args;
        }
        return arguments[0];
    }
}
```
### 类型签名

### container functor Maybe
这块有点烦 得好好啃

```js
compose = function(...fnList) {
    // fnList = [f,g]
    const arglen = fnList.length;//[2]
    return function(){
        //arguments = 1
        for(const i=arglen;--i>=0;) {
        const fn = fnList[i]//g
        const args = fn.length //1
            ? Array.prototype.slice.call(arguments, 0, fn.length) 
            : arguments
        const next_args = Array.prototype.slice.call(arguments, (fn.length || 1));//0
        next_args.unshift(fn.apply(this,args));[2]
        arguments = next_args;
        }
        return arguments[0];
    }
}
```