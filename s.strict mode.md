# "use strict";
### 目的
- 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
- 消除代码运行的一些不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的Javascript做好铺垫。
### 用法 
script第一行或function第一行  
script变通写法
```
(function (){

　　　　"use strict";
　　　　// some code here

　　 })();
   ```
全局变量必须显式声明。
### 静态绑定
- 禁止使用with语句
- 创设eval作用域
### 增强的安全措施
- 禁止this关键字指向全局对象
- 禁止在函数内部遍历调用栈
- 禁止删除变量
### 显式报错
- 严格模式下，对一个对象的只读属性进行赋值，将报错。//writable: false 
- 严格模式下，对一个使用getter方法读取的属性进行赋值，会报错。//get v() { return 1; }
- 严格模式下，对禁止扩展的对象添加新属性，会报错。//Object.preventExtensions(o);
- 严格模式下，删除一个不可删除的属性，会报错。
### 重名错误
- 对象不能有重名的属性
- 函数不能有重名的参数
- 禁止八进制表示法
### arguments对象的限制
- 不允许对arguments赋值
- arguments不再追踪参数的变化
- 禁止使用arguments.callee
### 函数必须声明在顶层
### 保留字
implements, interface, let, package, private, protected, public, static, yield。
