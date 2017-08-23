# REPL环境
在命令行键入node命令，后面没有文件名，就进入一个Node.js的REPL环境（Read–eval–print loop，”读取-求值-输出”循环），可以直接运行各种JavaScript命令。
- 如果使用参数 –use_strict，则REPL将在严格模式下运行。
- 特殊变量下划线（_）表示上一个命令的返回结果。

# 异步
- Node约定，如果某个函数需要回调函数作为参数，则回调函数是最后一个参数。另外，回调函数本身的第一个参数，约定为上一步传入的错误对象。
- 如果没有发生错误，回调函数的第一个参数就传入null。
```
var callback = function (error, value) {
  if (error) {
    return console.log(error);
  }
  console.log(value);
}
```
当回调函数运行时，前期的操作早结束了，错误的执行栈早就不存在了，传统的错误捕捉机制try…catch对于异步操作行不通，所以只能把错误交给回调函数处理。
# 全局对象和全局变量
- global：表示Node所在的全局环境，类似于浏览器的window对象。需要注意的是，如果在浏览器中声明一个全局变量，实际上是声明了一个全局对象的属性，比如var x = 1等同于设置window.x = 1，但是Node不是这样，至少在模块中不是这样（REPL环境的行为与浏览器一致）。在模块文件中，声明var x = 1，该变量不是global对象的属性，global.x等于undefined。这是因为模块的全局变量都是该模块私有的，其他模块无法取到。

- process：该对象表示Node所处的当前进程，允许开发者与该进程互动。

- console：指向Node内置的console模块，提供命令行环境中的标准输入、标准输出功能。

### 全局函数。

- setTimeout()：用于在指定毫秒之后，运行回调函数。实际的调用间隔，还取决于系统因素。间隔的毫秒数在1毫秒到2,147,483,647毫秒（约24.8天）之间。如果超过这个范围，会被自动改为1毫秒。该方法返回一个整数，代表这个新建定时器的编号。
- clearTimeout()：用于终止一个setTimeout方法新建的定时器。
- setInterval()：用于每隔一定毫秒调用回调函数。由于系统因素，可能无法保证每次调用之间正好间隔指定的毫秒数，但只会多于这个间隔，而不会少于它。指定的毫秒数必须是1到2,147,483,647（大约24.8天）之间的整数，如果超过这个范围，会被自动改为1毫秒。该方法返回一个整数，代表这个新建定时器的编号。
- clearInterval()：终止一个用setInterval方法新建的定时器。
- require()：用于加载模块。
- Buffer()：用于操作二进制数据。

### 全局变量

- __filename：指向当前运行的脚本文件名。
- __dirname：指向当前运行的脚本所在的目录。

### 伪全局变量
局部变量所有模块适用。主要为module, module.exports, exports等。
# 模块化
### require()
require命令用于指定加载模块，加载时可以省略脚本文件的后缀名
require('bar')===require('bar/lib/bar.js')===require('./node_modules/bar/lib/bar.js')
### 核心模块
- http：提供HTTP服务器功能。
- url：解析URL。
- fs：与文件系统交互。
- querystring：解析URL的查询字符串。
- child_process：新建子进程。
- util：提供一系列实用小工具。
- path：处理文件路径。
- crypto：提供加密和解密功能，基本上是对OpenSSL的包装。
### 自定义模块
```
module.exports = //function object
```
### 异常处理
Node是单线程运行环境，一旦抛出的异常没有被捕获，就会引起整个进程的崩溃。所以，Node的异常处理对于保证系统的稳定运行非常重要。
处理方法
- 使用throw语句抛出一个错误对象，即抛出异常。（无法用于异步 一般只用于JSON.parse场合）
- 将错误对象传递给回调函数，由回调函数负责发出错误。
- 通过EventEmitter接口，发出一个error事件。
```
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

emitter.emit('error', new Error('something bad happened'));

emitter.on('error', function(err) {
  console.error('出错：' + err.message);
});
```
### uncaughtException事件
当一个异常未被捕获，就会触发uncaughtException事件，可以对这个事件注册回调函数，从而捕获异常。
```
var logger = require('tracer').console();
process.on('uncaughtException', function(err) {
  console.error('Error caught in uncaughtException event:', err);
});

try {
  setTimeout(function(){
    throw new Error("error");
  },1);
} catch (err) {
  //can not catch it
  console.log(err);
}
//最好记录错误日志，然后结束Node进程。
process.on('uncaughtException', function(err) {
  logger.log(err);
  process.exit(1);
});
```
### unhandledRejection事件
iojs有一个unhandledRejection事件，用来监听没有捕获的Promise对象的rejected状态。
### 命令行脚本
node脚本可以作为命令行脚本使用。
- foo.js文件的第一行，如果加入了解释器的位置，就可以将其作为命令行工具直接调用。
```
#!/usr/bin/env node
```
console.log用于输出内容到标准输出，process.stdin用于读取标准输入，child_process.exec()用于执行一个shell命令。
