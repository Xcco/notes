**停止使用arguments(不定参数和默认参数完美代替) var**
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
# Iterator
1. 为各种数据结构，提供一个统一的、简便的访问接口；
2. 使得数据结构的成员能够按某种次序排列；
3. ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费。
###  Iterator 接口
一种数据结构只要部署了 Iterator 接口(Symbol.iterator属性)，我们就称这种数据结构是”可遍历的“（iterable）。
- 当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
```
Array
Map
Set
String
TypedArray
函数的 arguments 对象
NodeList 对象
```







# Generator/生成器
- value是yield后面跟的值 yield返回值为undefined next($)$是指定上一次yield的返回值 第一个next用于启动 参数无用
- for of 可直接调用
- 普通函数使用function声明，而生成器函数使用function*声明。
- Generator is Iterator
- 在生成器函数内部，有一种类似return的语法：关键字yield。二者的区别是，普通函数只可以return一次，而生成器函数可以yield多次（当然也可以只yield一次）。在生成器的执行过程中，遇到yield表达式立即暂停，后续可恢复执行状态。


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
### 标签模板
模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）。

```
alert`123`
// 等同于
alert(123)
```
```
var message =
  SaferHTML`<p>${bonk.sender} 向你示好。</p>`;
  //等同于
var message =
  SaferHTML(templateData, bonk.sender);
  
function SaferHTML(templateData) {
  var s = templateData[0];
  for (var i = 1; i < arguments.length; i++) {
    var arg = String(arguments[i]);

    // 转义占位符中的特殊字符。
    s += arg.replace(/&/g, "&")
            .replace(/</g, "<")
            .replace(/</g, ">");

    // 不转义模板中的特殊字符。
    s += templateData[i];
  }
  return s;
}
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
- Symbol 值也可以转为布尔值，但是不能转为数值。
- Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。
```
var mySymbol = Symbol();

// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
  [mySymbol]: 'Hello!'
};
//如果mySymbol不放在方括号中，该属性的键名就是字符串s，而不是s所代表的那个 Symbol 值。

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"

//Symbol 值作为对象属性名时，不能用点运算符。
a[mySymbol] // "Hello!"
```
### 消除魔术字符串 
魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。
将魔法字符串定义为一个对象的属性
### 遍历
Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
- Reflect.ownKeys 方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
- 由于以 Symbol 值作为名称的属性，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。
### Symbol.for()，Symbol.keyFor()
Symbol.for方法接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。  
Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。
```
var s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

var s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```
Symbol.for为Symbol值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值。

- 全局变量用global[FOO_KEY]避免被覆盖 仍可以被改写
# set
### set
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
```
// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三
function divs () {
  return [...document.querySelectorAll('div')];
}

const set = new Set(divs());
set.size // 56

// 类似于
divs().forEach(div => set.add(div));
set.size // 56
```
- 数组去重
```
// 去除数组的重复成员
1.
[...new Set(array)]
2.
Array.from(new Set(array))
```
- 向Set加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。set内部判断等于‘===’除了NAN与NAN相等这一条
### 属性方法
属性：
- Set.prototype.constructor：构造函数，默认就是Set函数。
- Set.prototype.size：返回Set实例的成员总数。
方法：
- add(value)：添加某个值，返回Set结构本身。
- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- has(value)：返回一个布尔值，表示该值是否为Set的成员。
- clear()：清除所有成员，没有返回值。

### 遍历
Set 结构的实例有四个遍历方法，可以用于遍历成员。

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员
- 扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构
- forEach()：使用回调函数遍历每个成员 
- 数组的map和filter方法也可以用于 Set
```
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```
### weakset
- WeakSet 的成员只能是对象，而不能是其他类型的值。
- WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，
ES6 规定 WeakSet 不可遍历。

```
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
```
a数组的成员成为 WeakSet 的成员，而不是a数组本身。这意味着，数组的成员只能是对象。
### weakset方法
- WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
- WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
- WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 
# map
JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。

- 注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。

# class
```
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```
- 类的数据类型就是函数，类本身就指向构造函数。

```
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```
- 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
- 类必须使用new调用，否则会报错。
- 类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。
- constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
- 类的所有实例共享一个原型对象。

- 实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。

- 生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。(不建议__proto__)

# module
ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系 CommonJS 和 AMD 模块，都只能在运行时确定
- CommonJS实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后读取方法。运行时加载
- ES6 import实质是从fs模块加载3个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
### 优点
- 不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
- 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
- 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。
### 严格模式 
自动严格模式
- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用with语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀0表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
- eval不会在它的外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反映函数参数的变化
- 不能使用arguments.callee
- 不能使用arguments.caller
- 禁止this指向全局对象
- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
- 增加了保留字（比如protected、static和interface）
### export
export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
- export输出的变量就是本来的名字，但是可以使用as关键字重命名。
```
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```
- 必须输出接口 不要忘记{}
```
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
```
- export语句输出的接口，与其对应的值是动态绑定关系(区别上面的静态加载)，即通过该接口，可以取到模块内部实时的值。
```
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
//上面代码输出变量foo，值为bar，500毫秒之后变成baz。
```
- export/import命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，(处于条件代码块之中，就没法做静态优化了)
### import
```
import {firstName, lastName, year} from './profile';
//大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。
import { lastName as surname } from './profile';
```
- .js后缀可以省略。如果只是模块名，不带有路径，那么必须有配置文件
- import命令具有提升效果，会提升到整个模块的头部，首先执行。
- import是静态执行，所以不能使用表达式和变量
```
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```
### 整体加载
用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
### export default 命令
```
// export-default.js
export default function () {
  console.log('foo');
}
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```
上面代码是一个模块文件export-default.js，它的默认输出是一个函数。
其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。
import命令，可以用任意名称指向export-default.js输出的方法，这时就不需要知道原模块输出的函数名。需要注意的是，这时import命令后面，**不使用大括号**。
- export default 与export刚好相反 import也没有{}
### export 与 import 的复合写法 
export { foo, bar } from 'my_module';
### 跨模块常量
```
export const A = 1;
```
### import()
用于补充实现动态加载
import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。
- import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。
# Promise 
Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。  
- Promise对象的状态不受外界影响。有三种状态：Pending（进行中）、Fulfilled（已成功）和Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Fulfiled和从Pending变为Rejected。即Resolved（已定型）这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
- 无法取消Promise 
- 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
- 当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
- 如果某些事件不断地反复发生，一般来说，使用 Stream 模式是比部署Promise更好的选择。
### 用法
Promise对象是一个构造函数，用来生成Promise实例
```
var promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
- 接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
```
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```
异步加载图片
```
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    var image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}
```
实现的 Ajax 操作
```
var getJSON = function(url) {
  var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```
- resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例

```
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function funcA(comments) {
  console.log("Resolved: ", comments);
}, function funcB(err){
  console.log("Rejected: ", err);
});
或
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("Resolved: ", comments),
  err => console.log("Rejected: ", err)
);
```
### Promise.prototype.catch()
Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
- 如果Promise状态已经变成Resolved，再抛出错误是无效的。
- Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
- 不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法。
- catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。

### Promise.all()
Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。（全部实现才继续 交集）
Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。（一个实现就 并集）

### Promise.resolve()
有时需要将现有对象转为Promise对象，Promise.resolve方法就起到这个作用。

### Promise.reject()
Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

### done() 
提供一个done方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。

### finally()
finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。它与done方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。

### 应用
我们可以将图片的加载写成一个Promise，一旦加载完成，Promise的状态就发生变化。
结构 object=function (path) {return promise Instance}
```
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
```
Generator函数与Promise的结合
```
function getFoo () {
  return new Promise(function (resolve, reject){
    resolve('foo');
  });
}

var g = function* () {
  try {
    var foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run (generator) {
  var it = generator();

  function go(result) {
    if (result.done) return result.value;

    return result.value.then(function (value) {
      return go(it.next(value));
    }, function (error) {
      return go(it.throw(error));
    });
  }

  go(it.next());
}

run(g);
```
### Promise.try()
不区分同异步函数时 同步函数也会放到末尾执行
解决方法
```
1.
//同步
const f = () => console.log('now');
(async () => f())();
console.log('next');
//异步
(async () => f())()
.then(...)
.catch(...)
2.
const f = () => console.log('now');
(
  () => new Promise(
    resolve => resolve(f())
  )
)();
console.log('next');
3.
const f = () => console.log('now');
Promise.try(f);
console.log('next');
```

# class



























