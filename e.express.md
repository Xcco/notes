# 建立步骤
1. 首先新建一个项目目录
2. 进入该目录，新建一个package.json文件
```
{
  "name": "hello-world",
  "description": "hello world test app",
  "version": "0.0.1",
  "private": true,
  "dependencies": {
    "express": "4.x"
  }
}
```
3. npm install
4. 在项目根目录下，新建一个启动文件，假定叫做index.js
```
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(8080);
```
5. node index

# 运行原理
Express框架建立在node.js内置的http模块上。  
Express框架等于在http模块之上，加了一个中间层。
中间件（middleware）就是处理HTTP请求的函数。它最大的特点就是，一个中间件处理完，再传递给下一个中间件。App实例在运行过程中，会调用一系列的中间件。  
抛出错误以后，后面的中间件将不再执行，直到发现一个错误处理函数为止。  
# use方法
use是express注册中间件的方法，它返回一个函数。
use执行后便结束 如果想执行下一个中间件 需要使用next()函数
# set方法
set方法用于指定变量的值。
