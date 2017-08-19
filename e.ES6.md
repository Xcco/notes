# let&const
### let
用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。**let实际上为 JavaScript 新增了块级作用域。**
- for循环 所以每一次循环的i其实都是一个新的变量，JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。
- for循环 设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
- 没有变量提升
- 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。
  -  暂时性死区”也意味着typeof不再是一个百分之百安全的操作。
- let不允许在相同作用域内，重复声明同一个变量。

### 块级作用域
- es6允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。
**不同浏览器实现不同，环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。**
- 块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。

### do 表达式（提案）
本质上，块级作用域是一个语句，将多个操作封装在一起，没有返回值。
在块级作用域之前加上do，使它变为do表达式 使得块级作用域可以变为表达式，也就是说可以返回值。

### const
const声明一个只读的常量。一旦声明，常量的值就不能改变。  
对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。  
对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，数据结构可变
- 块级作用域有效
- 暂时性死区
- Object.freeze方法，将对象冻结
```
const foo = Object.freeze({});
```
# 字符串扩展
### 字符的 Unicode 表示法
新增\u{}表示unicode
### includes(), startsWith(), endsWith()
- includes()：返回布尔值，表示是否找到了参数字符串。
- startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
- endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
支持添加参数
```
var s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```
### repeat()
repeat方法返回一个新字符串，表示将原字符串重复n次。
- 参数如果是小数，会被取整。是负数或者Infinity，会报错。
### padStart()，padEnd()
ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
```
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```
padStart和padEnd一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。
padStart的常见用途是为数值补全指定位数。下面代码生成10位的数值字符串。
```
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
```
另一个用途是提示字符串格式。
```
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```
## 模板字符串
- 使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
- 模板字符串中嵌入变量，需要将变量名写在${}之中。大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性。
- 模板字符串之中还能调用函数。
模板字符串还能嵌套。
```
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
```
上面代码中，模板字符串的变量之中，又嵌入了另一个模板字符串，使用方法如下。
```
const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];

console.log(tmpl(data));
// <table>
//
//   <tr><td><Jane></td></tr>
//   <tr><td>Bond</td></tr>
//
//   <tr><td>Lars</td></tr>
//   <tr><td><Croft></td></tr>
//
// </table>
```
## 标签模板
模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）。
```
alert`123`
// 等同于
alert(123)
```
如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。
```
var a = 5;
var b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
```
上面代码中，模板字符串前面有一个标识名tag，它是一个函数。整个表达式的返回值，就是tag函数处理模板字符串后的返回值。
- 标签模板”的一个重要应用，就是过滤HTML字符串，防止用户输入恶意内容。
## String.raw()
ES6还为原生的String对象，提供了一个raw方法。

String.raw方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。
```
String.raw`Hi\n${2+3}!`;
// "Hi\\n5!"

String.raw`Hi\u000A!`;
// 'Hi\\u000A!'
```
如果原字符串的斜杠已经转义，那么String.raw不会做任何处理。
```
String.raw`Hi\\n`
// "Hi\\n"
```
String.raw的代码基本如下。
```
String.raw = function (strings, ...values) {
  var output = "";
  for (var index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }

  output += strings.raw[index]
  return output;
}
```   
String.raw方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。

String.raw方法也可以作为正常的函数使用。这时，它的第一个参数，应该是一个具有raw属性的对象，且raw属性的值应该是一个数组。
# 正则扩展
### 字符串的正则方法
字符串对象共有4个方法，可以使用正则表达式：match()、replace()、search()和split()。

ES6 将这4个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。

### u 修饰符
ES6 对正则表达式添加了u修饰符，含义为“Unicode模式”，用来正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码。
### y 修饰符
除了u修饰符，ES6 还为正则表达式添加了y修饰符，叫做“粘连”（sticky）修饰符。  
实际上，y修饰符号隐含了头部匹配的标志^。
```
/b/y.exec('aba')
// null
```
### sticky 属性
与y修饰符相匹配，ES6 的正则对象多了sticky属性，表示是否设置了y修饰符。
### flags 属性
ES6 为正则表达式新增了flags属性，会返回正则表达式的修饰符。
```
// ES5 的 source 属性
// 返回正则表达式的正文
/abc/ig.source
// "abc"

// ES6 的 flags 属性
// 返回正则表达式的修饰符
/abc/ig.flags
// 'gi'
```
### s 修饰符：dotAll 模式
引入/s修饰符，使得.可以匹配任意单个字符。    
这被称为dotAll模式，即点（dot）代表一切字符。所以，正则表达式还引入了一个dotAll属性，返回一个布尔值，表示该正则表达式是否处在dotAll模式。
上面代码由于不能保证头部匹配，所以返回null。y修饰符的设计本意，就是让头部匹配的标志^在全局匹配中都有效。
除了u修饰符，ES6 还为正则表达式添加了y修饰符，叫做“粘连”（sticky）修饰符。  

y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
# function
### 默认参数
ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。
```
function log(x, y = 'World') {
  console.log(x, y);
}
```
- 参数默认值不是传值的，而是每次都重新计算默认值表达式的值。
- 参数默认值可以与解构赋值的默认值，结合起来使用。
```
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined, 5
foo({x: 1}) // 1, 5
foo({x: 1, y: 2}) // 1, 2
foo() // TypeError: Cannot read property 'x' of undefined
```
- **定义了默认值的参数**，应该是函数的尾参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。(需要设为undefined)
### length
指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。  
length属性的含义是，该函数预期传入的参数个数。同理，rest 参数也不会计入length属性。

# symbol
引入一种机制，保证每个属性的名字都是独一无二的，从根本上防止属性名的冲突。  Symbol表示独一无二的值。
let s = Symbol();
- Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。不能添加属性。基本上，它是一种类似于字符串的数据类型。
- Symbol函数可以接受一个字符串作为参数 Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。






