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
