### npm 允许在package.json文件里面，使用scripts字段定义脚本命令。npm run执行命令
# 原理：
npm 脚本的原理非常简单。每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。  
npm run新建的这个 Shell，会将当前目录的node_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。  
这意味着，当前目录的node_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有 Mocha，只要直接写mocha test就可以了。
# 通配符
npm 脚本就是 Shell 脚本，因为可以使用 Shell 通配符。
```
"lint": "jshint *.js"
"lint": "jshint **/*.js"
```
上面代码中，*表示任意文件名，**表示任意一层子目录。
如果要将通配符传入原始命令，防止被 Shell 转义，要将星号转义。
```
"test": "tap test/\*.js"
```
# 传参
向 npm 脚本传入参数，要使用--标明。
```
"lint": "jshint **.js"
//传入参数，必须写成下面这样。
$ npm run lint --  --reporter checkstyle > checkstyle.xml
```
# 执行顺序
如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。
```
//如果是并行执行（即同时的平行执行），可以使用&符号。
$ npm run script1.js & npm run script2.js
//如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。
$ npm run script1.js && npm run script2.js
```
# 简写
```
npm start是npm run start
npm stop是npm run stop的简写
npm test是npm run test的简写
npm restart是npm run stop && npm run restart && npm run start的简写
```
# 变量
npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。  
通过npm_package_前缀，npm 脚本可以拿到package.json里面的字段。



