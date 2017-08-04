# 语句
JavaScript程序的执行单位为行（line）
表达式（expression），指一个为了得到返回值的计算式。语句和表达式的区别在于，前者主要为了进行某种操作，一般情况下不需要返回值；后者则是为了得到返回值，一定会返回一个值。
## switch结构
```
switch (fruit) {
  case "banana":
    // ...
    break;
  case "apple":
    // ...
    break;
  default:
    // ...
}
```
上面代码根据变量fruit的值，选择执行相应的case。如果所有case都不符合，则执行最后的default部分。需要注意的是，每个case代码块内部的break语句不能少，否则会接下去执行下一个case代码块，而不是跳出switch结构。  
- switch语句后面的表达式与case语句后面的表示式，在比较运行结果时，采用的是严格相等运算符（===），而不是相等运算符（==），这意味着比较时不会发生类型转换。
## while
```
while (expression) {
  statement;
}
do {
  statement
} while (expression);
```
do...while循环与while循环类似，唯一的区别就是先运行一次循环体，然后判断循环条件。且while语句后面的分号不能省略。

# 数据类型
```
typeof undefined//undefined  
typeof window // "object"  
typeof {} // "object"
typeof [] // "object"
typeof null // "object"
```
```
var o = {};
var a = [];

o instanceof Array // false
a instanceof Array // true
```
### null表示空值，undefined表示“未定义”.
# 数值
## 整数浮点
JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此。所以，1与1.0是同一个数。JavaScript 语言的底层根本没有整数，所有数字都是小数（64位浮点数）
- 第1位：符号位，0表示正数，1表示负数
- 第2位到第12位：指数部分
- 第13位到第64位：小数部分（即有效数字）
## 进制
- 十进制：没有前导0的数值。
- 八进制：有前缀0o或0O的数值，或者有前导0、且只用到0-7的八个阿拉伯数字的数值。
- 十六进制：有前缀0x或0X的数值。
- 二进制：有前缀0b或0B的数值。

## NaN
```
typeof NaN // 'number'
NaN === NaN // false
[NaN].indexOf(NaN) // -1
```
### isNaN
isNaN方法可以用来判断一个值是否为NaN。
isNaN为true的值，有可能不是NaN，而是一个字符串、对象、数组等。
**判断NaN更可靠的方法是，利用NaN是JavaScript之中唯一不等于自身的值这个特点，进行判断。**
### isFinite
isFinite函数返回一个布尔值，检查某个值是不是正常数值，而不是Infinity。
### parseInt()
parseInt方法用于将字符串转为整数。
### parseFloat()
parseFloat方法用于将一个字符串转为浮点数。

# 字符串
```
\0 null（\u0000）
\b 后退键（\u0008）
\f 换页符（\u000C）
\n 换行符（\u000A）
\r 回车键（\u000D）
\t 制表符（\u0009）
\v 垂直制表符（\u000B）
\' 单引号（\u0027）
\" 双引号（\u0022）
\\ 反斜杠（\u005C）
```
## 字符集
JavaScript使用Unicode字符集。也就是说，在JavaScript引擎内部，所有字符都用Unicode表示。

# 对象
### JavaScript规定，如果行首是大括号，一律解释为语句（即代码块）。如果要解释为表达式（即对象），必须在大括号前加上圆括号。
{ foo: 123 }//代码块
({ foo: 123})//表达式
### 如果使用方括号运算符，键名必须放在引号里面，否则会被当作变量处理。
o.p // "Hello World"
o['p'] // "Hello World"
## Object.keys
查看一个对象本身的所有属性
## delete
delete命令用于删除对象的属性，删除成功后返回true。
## in运算符
in运算符用于检查对象是否包含某个属性（注意，检查的是键名，不是键值）
## for…in循环
for...in循环用来遍历一个对象的全部属性。
- 它遍历的是对象所有可遍历（enumerable）的属性，会跳过不可遍历的属性
- 它不仅遍历对象自身的属性，还遍历继承的属性。（因此不推荐使用）
如果只想遍历对象本身的属性，可以使用hasOwnProperty方法，在循环内部判断一下是不是自身的属性。
## with语句（不建议使用）
with (object) {
  statements;
}


# 数组
### 将数组清空的一个有效方法，就是将length属性设为0。
### 由于数组本质上是对象的一种，所以我们可以为数组添加属性，但是这不影响length属性的值。
### 数值键名是字符串。
## 类数组对象
类似数组的对象只有一个特征，就是具有length属性。
## in 运算符
检查某个键名是否存在的运算符in，适用于对象，也适用于数组。
## for…in 循环和数组的遍历(不推荐）
for...in循环不仅可以遍历对象，也可以遍历数组，毕竟数组只是一种特殊对象。不仅会遍历数组所有的数字键，还会遍历非数字键。
## 数组的空位
当数组的某个位置是空元素，即两个逗号之间没有任何值，我们称该数组存在空位（hole）。
```
var a = [1, , 1];
a.length // 3
a[1] // undefined
```
使用delete命令删除一个数组成员，会形成空位，并且不会影响length属性。  
数组的某个位置是空位，与某个位置是undefined，是不一样的。如果是空位，使用数组的forEach方法、for...in结构、以及Object.keys方法进行遍历，空位都会被跳过。






# 错误处理
## Error对象
- message：错误提示信息
- name：错误名称（非标准属性）
- stack：错误的堆栈（非标准属性）
## throw语句
throw语句的作用是中断程序执行，抛出一个意外或错误。
## try…catch结构
try代码块一抛出错误（上例用的是throw语句），JavaScript引擎就立即把代码的执行，转到catch代码块。可以看作，错误可以被catch代码块捕获。catch接受一个参数，表示try代码块抛出的值。
## finally代码块
try...catch结构允许在最后添加一个finally代码块，表示不管是否出现错误，都必需在最后运行的语句。














