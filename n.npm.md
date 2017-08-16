# npm
### npm init
-f（代表force）、-y（代表yes），则跳过提问阶段，直接生成一个新的package.json文件。
### npm install
- 一般来说，全局安装只适用于工具模块，比如eslint和gulp。  
- @后面跟版本号
- 一旦安装了某个模块，就可以在代码中用require命令加载这个模块。
### npm run
- package.json文件有一个scripts字段，可以用于指定脚本命令，供npm直接调用。
- npm run命令会自动在环境变量$PATH添加node_modules/.bin目录，   
- npm run会创建一个Shell，执行指定的命令，并临时将node_modules/.bin加入PATH变量，这意味着本地模块可以直接运行。
- npm test，npm start简写不必加run
- 并行执行，用&，顺序执行用&&




# npm scripts
npm 允许在package.json文件里面，使用scripts字段定义脚本命令。npm run执行命令
### 原理：
npm 脚本的原理非常简单。每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。  
npm run新建的这个 Shell，会将当前目录的node_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。  
这意味着，当前目录的node_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有 Mocha，只要直接写mocha test就可以了。
### 通配符
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
### 传参
向 npm 脚本传入参数，要使用--标明。
```
"lint": "jshint **.js"
//传入参数，必须写成下面这样。
$ npm run lint --  --reporter checkstyle > checkstyle.xml
```
### 执行顺序
如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。
```
//如果是并行执行（即同时的平行执行），可以使用&符号。
$ npm run script1.js & npm run script2.js
//如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。
$ npm run script1.js && npm run script2.js
```
### 简写
```
npm start是npm run start
npm stop是npm run stop的简写
npm test是npm run test的简写
npm restart是npm run stop && npm run restart && npm run start的简写
```
### 变量
npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。  
通过npm_package_前缀，npm 脚本可以拿到package.json里面的字段。



