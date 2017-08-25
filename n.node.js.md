# 模块(需要引入)对象不需要
buffer对象 process对象
- treat Node Streams as objects that emit events.

### REPL环境
在命令行键入node命令，后面没有文件名，就进入一个Node.js的REPL环境（Read–eval–print loop，”读取-求值-输出”循环），可以直接运行各种JavaScript命令。
- 如果使用参数 –use_strict，则REPL将在严格模式下运行。
- 特殊变量下划线（_）表示上一个命令的返回结果。

### 异步
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
### 全局对象和全局变量
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




# process对象
process对象是 Node 的一个全局对象，提供当前 Node 进程的信息。它可以在脚本的任意位置使用，不必通过require命令加载。该对象部署了EventEmitter接口。
### 属性
系统信息：
- process.argv：返回一个数组，成员是当前进程的所有命令行参数。它的第一个成员总是node，第二个成员是脚本文件名，其余成员是脚本文件的参数。
```
 node argv.js a b c
[ 'node', '/path/to/argv.js', 'a', 'b', 'c' ]
//纯参数部分
var myArgs = process.argv.slice(2);
```
- process.env：返回一个对象，成员为当前Shell的环境变量，比如process.env.HOME。
通常的做法是，新建一个环境变量NODE_ENV，用它确定当前所处的开发阶段，生产阶段设为production，开发阶段设为develop或staging，然后在脚本中读取process.env.NODE_ENV即可。
```
//改变环境变量
 export NODE_ENV=production && node app.js
//或者
 NODE_ENV=production node app.js
```
- process.execPath属性返回执行当前脚本的Node二进制文件的绝对路径。
### Shell 接口
- process.stdout属性返回一个对象，表示标准输出。该对象的write方法等同于console.log，可用在标准输出向用户显示内容。
- process.stdin返回一个对象，表示标准输入。
- process.stderr属性指向标准错误。
### 方法
- process.cwd()，process.chdir()
cwd方法返回进程的当前目录（绝对路径），chdir方法用来切换目录。  
注意，process.cwd()与__dirname的区别。前者进程发起时的位置，后者是脚本的位置，两者可能是不一致的。  
比如，node ./code/program.js，对于process.cwd()来说，返回的是当前目录（.）；对于__dirname来说，返回是脚本所在目录，即./code/program.js。
- process.nextTick()
process.nextTick将任务放到当前一轮事件循环（Event Loop）的尾部。
- process.on()
process对象部署了EventEmitter接口，可以使用on方法监听各种事件，并指定回调函数。
```
process支持的事件
uncaughtException事件：只要有错误没有捕获，就会触发这个事件。
data事件：数据输出输入时触发
SIGINT事件：接收到系统信号SIGINT时触发，主要是用户按Ctrl + c时触发。
SIGTERM事件：系统发出进程终止信号SIGTERM时触发
exit事件：进程退出前触发
```
- process.kill()
process.kill方法用来对指定ID的线程发送信号，默认为SIGINT信号。
### 进程的退出码
进程退出时，会返回一个整数值，表示退出时的状态。这个整数值就叫做退出码。下面是常见的Node进程退出码。
- 0，正常退出
- 1，发生未捕获错误
- 5，V8执行错误
- 8，不正确的参数
- 128 + 信号值，如果Node接受到退出信号（比如SIGKILL或SIGHUP），它的退出码就是128加上信号值。由于128的二进制形式是10000000, 所以退出码的后七位就是信号值。


# fs 模块
fs是filesystem的缩写，该模块提供本地文件的读写能力，基本上是POSIX文件操作命令的简单包装。但是，这个模块几乎对所有操作提供异步和同步两种操作方式，供开发者选择。

### readFile()，readFileSync()
readFile方法用于异步读取数据。
```
fs.readFile('./image.png', function (err, buffer) {
  if (err) throw err;
  process(buffer);
});
```
readFileSync方法用于同步读取文件，如果第二个参数不指定编码（encoding），readFileSync方法返回一个Buffer实例，否则返回的是一个字符串。  
第二个参数可以是一个表示配置的对象，也可以是一个表示文本文件编码的字符串。默认的配置对象是{ encoding: null, flag: 'r' }，即文件编码默认为null，读取模式默认为r（只读）。如果第二个参数不指定编码（encoding）
```
var text = fs.readFileSync(fileName, 'utf8');

// 将文件按行拆成数组
text.split(/\r?\n/).forEach(function (line) {
  // ...
});
```
### writeFile()，writeFileSync()
writeFile方法用于异步写入文件。
```
fs.writeFile('message.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});
```
writeFileSync方法用于同步写入文件。
```
fs.writeFileSync(fileName, str, 'utf8');
```
### exists(path, callback)
exists方法用来判断给定路径是否存在，然后不管结果如何，都会调用回调函数。
- 不要在open方法之前调用exists方法，open方法本身就能检查文件是否存在。

### mkdir()mkdirSync()
mkdir方法用于新建目录。mkdir接受三个参数，第一个是目录名，第二个是权限值，第三个是回调函数。

### readdir()，readdirSync()
readdir方法用于读取目录，返回一个所包含的文件和子目录的数组。
```
fs.readdir(process.cwd(), function (err, files) {
  if (err) {
    console.log(err);
    return;
  }

  var count = files.length;
  var results = {};
  files.forEach(function (filename) {
    fs.readFile(filename, function (data) {
      results[filename] = data;
      count--;
      if (count <= 0) {
        // 对所有文件进行处理
      }
    });
  });
});
```
### stat()
stat方法的参数是一个文件或目录，它产生一个对象，该对象包含了该文件或目录的具体信息。我们往往通过该方法，判断正在处理的到底是一个文件，还是一个目录。
- stats.isFile()/stats.isDirectory ()

### watchfile()，unwatchfile()
watchfile方法监听一个文件，如果该文件发生变化，就会自动触发回调函数。
unwatchfile方法用于解除对文件的监听。

### createReadStream()createWriteStream()
createReadStream方法往往用于打开大型的文本文件，创建一个读取操作的数据流。所谓大型文本文件，指的是文本文件的体积很大，读取操作的缓存装不下，只能分成几次发送，每次发送会触发一个data事件，发送结束会触发end事件。

createWriteStream方法创建一个写入数据流对象，该对象的write方法用于写入数据，end方法用于结束写入操作。
createWriteStream方法和createReadStream方法配合，可以实现拷贝大型文件。
```
function fileCopy(filename1, filename2, done) {
  var input = fs.createReadStream(filename1);
  var output = fs.createWriteStream(filename2);

  input.on('data', function(d) { output.write(d); });
  input.on('error', function(err) { throw err; });
  input.on('end', function() {
    output.end();
    if (done) done();
  });
}
```


# Path模块
### path.extname()
path.extname() 方法返回 path 的扩展名，即从 path 的最后一部分中的最后一个 .（句号）字符到字符串结束。
### path.join()
path.join方法用于连接路径。
### path.resolve()
path.resolve方法用于将相对路径转为绝对路径。
### accessSync()
accessSync方法用于同步读取一个路径。

### path.relative
path.relative方法接受两个参数，这两个参数都应该是绝对路径。该方法返回第二个路径相对于第一个路径的那个相对路径。
### path.parse()
path.parse()方法可以返回路径各部分的信息。
```
var myFilePath = '/someDir/someFile.json';
path.parse(myFilePath).base
// "someFile.json"
path.parse(myFilePath).name
// "someFile"
path.parse(myFilePath).ext
// ".json"
```
# CommonJS
Node应用由模块组成，采用CommonJS模块规范。
根据这个规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。  
module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。
### 特点
- 所有代码都运行在模块作用域，不会污染全局作用域。
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
- 模块加载的顺序，按照其在代码中出现的顺序。
### 属性
Node内部提供一个Module构建函数。所有模块都是Module的实例。每个模块内部，都有一个module对象，代表当前模块。它有以下属性。
- module.id 模块的识别符，通常是带有绝对路径的模块文件名。
- module.filename 模块的文件名，带有绝对路径。
- module.loaded 返回一个布尔值，表示模块是否已经完成加载。
- module.parent 返回一个对象，表示该模块要用到的其他模块。
- module.children 返回一个数组，表示调用该模块的模块。
- module.exports 表示模块对外输出的值。
### exports 
**exports只能添加属性方法 不能赋值**exports默认是对module.exports的引用 即指向同一地址 require接收module.exports
### AMD规范与CommonJS规范的兼容性
CommonJS规范加载模块是同步的 AMD规范则是非同步加载模块，允许指定回调函数。  
AMD规范允许输出的模块兼容CommonJS规范，这时define方法需要写成下面这样：
```
define(function (require, exports, module){
  var someModule = require("someModule");
  var anotherModule = require("anotherModule");

  someModule.doTehAwesome();
  anotherModule.doMoarAwesome();

  exports.asplode = function (){
    someModule.doTehAwesome();
    anotherModule.doMoarAwesome();
  };
});
```
### require命令
require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错。
- 加载文件，后缀名默认为.js。
- 如果指定的模块文件没有发现，Node会尝试为文件名添加.js、.json、.node后，再去搜索。.js件会以文本格式的JavaScript脚本文件解析，.json文件会以JSON格式的文本文件解析，.node文件会以编译后的二进制文件解析。
- require命令加载的确切文件名，使用require.resolve()方法
### 目录的加载规则
目录中放置一个package.json文件，并且将入口文件写入main字段。require发现参数字符串指向一个目录以后，会自动查看该目录的package.json文件，然后加载main字段指定的入口文件。如果package.json文件没有main字段，或者根本就没有package.json文件，则会加载该目录下的index.js文件或index.node文件。
### 模块的缓存
第一次加载某个模块时，Node会缓存该模块。以后再加载该模块，就直接从缓存取出该模块的module.exports属性。 
所有缓存的模块保存在require.cache之中，如果想删除模块的缓存，可以像下面这样写。   
```
// 删除指定模块的缓存
delete require.cache[moduleName];

// 删除所有模块的缓存
Object.keys(require.cache).forEach(function(key) {
  delete require.cache[key];
})
```
### 模块的循环加载
如果发生模块的循环加载，即A加载B，B又加载A，则B将加载A的不完整版本。

### 模块的加载机制
CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个例子。
```
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};


// main.js
var counter = require('./lib').counter;
var incCounter = require('./lib').incCounter;

console.log(counter);  // 3
incCounter();
console.log(counter); // 3
```
# HTTP
### http.STATUS_CODES
http.STATUS_CODES是一个对象，属性名都是状态码，属性值则是该状态码的简短解释。
### 处理GET请求
```
var http = require('http');

http.createServer(function (request, response){
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write("Hello World");
  response.end();
}).listen(8080, '127.0.0.1');

console.log('Server running on port 8080.');

// 另一种写法
function onRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(process.env.PORT);
```
上面代码第一行var http = require("http")，表示加载http模块。
- 调用http模块的createServer方法，创造一个服务器实例。   
- ceateServer方法接受一个函数作为参数，该函数的request参数是一个对象，表示客户端的HTTP请求；
- response参数也是一个对象，表示服务器端的HTTP回应。    
- response.writeHead方法用来写入HTTP回应的头信息；
- response.end方法用来写入HTTP回应的具体内容，以及回应完成后关闭本次对话。
- listen(8080)表示启动服务器实例，监听本机的8080端口。   

### request 对象
createServer方法的回调函数的第一个参数是一个request对象，拥有以下属性。

- url：发出请求的网址。
- method：HTTP请求的方法。
- headers：HTTP请求的所有HTTP头信息。
- setEncoding()方法用于设置请求的编码。
```
request.setEncoding("utf8");
```
- addListener()方法用于为请求添加监听事件的回调函数。
### 处理POST请求
当客户端采用POST方法发送数据时，服务器端可以对data和end两个事件，设立监听函数。

### get()
get方法用于发出get请求。
### request()
request方法用于发出HTTP请求，它的使用格式如下。
```
http.request(options[, callback])
```
options对象可以设置如下属性。

- host：HTTP请求所发往的域名或者IP地址，默认是localhost。
- hostname：该属性会被url.parse()解析，优先级高于host。
- port：远程服务器的端口，默认是80。
- localAddress：本地网络接口。
- socketPath：Unix网络套接字，格式为host:port或者socketPath。
- method：指定HTTP请求的方法，格式为字符串，默认为GET。
- path：指定HTTP请求的路径，默认为根路径（/）。可以在这个属性里面，指定查询字符串，比如/index.html?page=12。如果这个属性里面包含非法字符（比如空格），就会抛出一个错误。
- headers：一个对象，包含了HTTP请求的头信息。
- auth：一个代表HTTP基本认证的字符串user:password。
- agent：控制缓存行为，如果HTTP请求使用了agent，则HTTP请求默认为Connection: keep-alive，它的可能值如下：
- undefined（默认）：对当前host和port，使用全局Agent。
- Agent：一个对象，会传入agent属性。
- false：不缓存连接，默认HTTP请求为Connection: close。
- keepAlive：一个布尔值，表示是否保留socket供未来其他请求使用，默认等于false。
- keepAliveMsecs：一个整数，当使用KeepAlive的时候，设置多久发送一个TCP KeepAlive包，使得连接不要被关闭。默认等于1000，只有keepAlive设为true的时候，该设置才有意义。

http.request()返回一个http.ClientRequest类的实例。它是一个可写数据流，如果你想通过POST方法发送一个文件，可以将文件写入这个ClientRequest对象。
### Server()
Server方法用于新建一个服务器实例。
listen方法用于启动服务器，它可以接受多种参数。(port/host)
### 搭建HTTPs服务器
搭建HTTPs服务器需要有SSL证书。对于向公众提供服务的网站，SSL证书需要向证书颁发机构购买；对于自用的网站，可以自制。



# stream
数据流“（stream）是处理系统缓存的一种方式。操作系统采用数据块（chunk）的方式读取数据，每收到一次数据，就存入缓存。Node应用程序有两种缓存的处理方式，
- 第一种是等到所有数据接收完毕，一次性从缓存读取，这就是传统的读取文件的方式；
- 第二种是采用“数据流”的方式，收到一块数据，就读取一块，即在数据还没有接收完成时，就开始处理它。
### 常见stream接口
- 文件读写
- HTTP 请求的读写
- TCP 连接
- 标准输入输出
### 可读数据流
Stream 接口分成三类。
- 可读数据流接口，用于对外提供数据。
- 可写数据流接口，用于写入数据。
- 双向数据流接口，用于读取和写入数据，比如Node的tcp sockets、zlib、crypto都部署了这个接口。
```
var Readable = require('stream').Readable;

var rs = new Readable();
rs.push('beep ');
rs.push('boop\n');
rs.push(null);
rs.pipe(process.stdout);
```
上面代码产生了一个可写数据流，最后将其写入标注输出。可读数据流的push方法，用来将数据输入缓存。rs.push(null)中的null，用来告诉rs，数据输入完毕。  


“可读数据流”有两种状态：流动态和暂停态。处于流动态时，数据会尽快地从数据源导向用户的程序；处于暂停态时，必须显式调用stream.read()等指令，“可读数据流”才会释放数据。刚刚新建的时候，“可读数据流”处于暂停态。  
让暂停态转为流动态。
- 添加data事件的监听函数
- 调用resume方法
- 调用pipe方法将数据送往一个可写数据流
如果转为流动态时，没有data事件的监听函数，也没有pipe方法的目的地，那么数据将遗失。  
让流动态转为暂停态。

- 不存在pipe方法的目的地时，调用pause方法
- 存在pipe方法的目的地时，移除所有data事件的监听函数，并且调用unpipe方法，移除所有pipe方法的目的地
 * asdasdad、
* asdasd
 * asdasd










