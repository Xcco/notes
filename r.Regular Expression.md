- (?:xxx)?:在前 xxx仍属于正则表达式 但不列入分组
- exp1(?=exp2)	匹配后面是exp2的exp1 
- exp1(?!exp2)  匹配后面不是exp2的exp1
```
返回值
r.test(s)//boolean
r.exec(s)//array
s.match(r)//array
s.search(r)//index/-1
s.replace(r)//string
s.split(r)//array
s.match(r)//array
s.match(r)//array
```
### 在ES5规范中正则表达式和字符串常量不一样，每次声明都会重新创建变量
### 原则上正则的一个字符对应一个字符，我们可以用[]把它们括起来，让[]这个整体对应一个字符
### 正则表达式字面量每次生成一个新的正则表达式
# 属性
- ignoreCase：返回一个布尔值，表示是否设置了i修饰符，该属性只读。
- global：返回一个布尔值，表示是否设置了g修饰符，该属性只读。
- multiline：返回一个布尔值，表示是否设置了m修饰符，该属性只读。
- lastIndex：返回下一次开始搜索的位置。该属性可读写， **但是只在设置了g修饰符时有意义**。
- source：返回正则表达式的字符串形式（不包括反斜杠），该属性只读。
# 正则对象的方法
### test()
正则对象的test方法返回一个**布尔值**，表示当前模式是否能匹配参数字符串。
- 如果正则表达式带有g修饰符，则每一次test方法都从上一次结束的位置开始向后匹配。
### exec()
返回匹配结果。如果发现匹配，就返回一个**数组**，成员是每一个匹配成功的子字符串，否则返回null
- 如果正则表示式包含圆括号（即含有“组匹配”），则返回的数组会包括多个成员。第一个成员是整个匹配成功的结果，后面的成员就是圆括号对应的匹配成功的组。也就是说，第二个成员对应第一个括号，第三个成员对应第二个括号，以此类推。整个数组的length属性等于组匹配的数量再加1。
```
var s = '_x_x';
var r = /_(x)/;

r.exec(s) // ["_x", "x"]
```
- exec方法的返回数组还包含以下两个属性：
  - input：整个原字符串。
  - index：整个模式匹配成功的开始位置（从0开始计数）。
# 字符串对象的方法
- match()：返回一个数组，成员是所有匹配的子字符串。
- search()：按照给定的正则表达式进行搜索，返回一个整数，表示匹配开始的位置。
- replace()：按照给定的正则表达式进行替换，返回替换后的字符串。
- split()：按照给定规则进行字符串分割，返回一个数组，包含分割后的各个成员。
# match()
字符串的match方法与正则对象的exec方法非常类似：匹配成功返回一个数组，匹配失败返回null
- 如果正则表达式带有g修饰符，则该方法与正则对象的exec方法行为不同，会一次性返回所有匹配成功的结果。
- 设置正则表达式的lastIndex属性，对match方法无效
# search()
返回第一个满足条件的匹配结果在整个字符串中的位置。如果没有任何匹配，则返回-1
- 该方法会忽略g修饰符。
# replace()
替换匹配的值。它接受两个参数，第一个是搜索模式，第二个是替换的内容。
- replace方法的第二个参数可以使用美元符号$，用来指代所替换的内容。
```
$& 指代匹配的子字符串。
$` 指代匹配结果前面的文本。
$' 指代匹配结果后面的文本。
$n 指代匹配成功的第n组内容，n是从1开始的自然数。
$$ 指代美元符号$。
```
```
'hello world'.replace(/(\w+)\s(\w+)/, '$2 $1')
// "world hello"

'abc'.replace('b', '[$`-$&-$\']')
// "a[a-b-c]c"
```
- replace方法的第二个参数还可以是一个函数(传入参数为匹配内容)，将每一个匹配内容替换为函数返回值。
```
// 网页模板替换
var prices = {
  'pr_1': '$1.99',
  'pr_2': '$9.99',
  'pr_3': '$5.00'
};

var template = '/* ... */'; // 这里可以放网页模块字符串

template.replace(
  /(<span id=")(.*?)(">)(<\/span>)/g,
  function(match, $1, $2, $3, $4){
    return $1 + $2 + $3 + prices[$2] + $4;
  }
);
```
# split()
按照正则规则分割字符串，返回一个由分割后的各个部分组成的数组。
- 如果正则表达式带有括号，则括号匹配的部分也会作为数组成员返回。
```
// 正则分隔，去除多余的空格
'a,  b,c, d'.split(/, */)
// [ 'a', 'b', 'c', 'd' ]

// 指定返回数组的最大成员
'a,  b,c, d'.split(/, */, 2)
[ 'a', 'b' ]
```
# 字面量字符
某个字符只表示它字面的含义，那么它们就叫做“字面量字符”（literal characters）
# 元字符
还有一部分字符有特殊含义，不代表字面的意思。它们叫做“元字符”（metacharacters）
### 点字符（.)
（.）匹配除回车（\r）、换行(\n) 、行分隔符（\u2028）和段分隔符（\u2029）以外的所有字符。
### 位置字符

位置字符用来提示字符所处的位置，主要有两个字符。
- ^ 表示字符串的开始位置
- $ 表示字符串的结束位置
```
/^test$/.test('test test') // false
```
### 选择符（|）
线符号（|）在正则表达式中表示“或关系”（OR）
# 转义符
需要用斜杠转义的，一共有12个字符
^、.、[、$、(、)、|、*、+、?、{、\
### 如果使用RegExp方法生成正则对象，转义需要使用两个斜杠，因为字符串内部会先转义一次。
# 特殊字符
- \cX 表示Ctrl-[X]，其中的X是A-Z之中任一个英文字母，用来匹配控制字符。
- [\b] 匹配退格键(U+0008)，不要与\b混淆。
- \n 匹配换行键。
- \r 匹配回车键。
- \t 匹配制表符tab（U+0009）。
- \v 匹配垂直制表符（U+000B）。
- \f 匹配换页符（U+000C）。
- \0 匹配null字符（U+0000）。
- \xhh 匹配一个以两位十六进制数（\x00-\xFF）表示的字符。
- \uhhhh 匹配一个以四位十六进制数（\u0000-\uFFFF）表示的unicode字符。
# 字符类
字符类（class）表示有一系列字符可供选择，只要匹配其中一个就可以[...]
### 脱字符（^）
方括号内的第一个字符是[^]，则表示除了字符类之中的字符，其他字符都可以匹配。
- **如果方括号内没有其他字符，即只有[^]，就表示匹配一切字符，其中包括换行符，而点号（.）是不包括换行符的。**  
- **注意，脱字符只有在字符类的第一个位置才有特殊含义，否则就是字面含义。**
### 连字符（-）
对于连续序列的字符，连字符（-）用来提供简写形式，表示字符的连续范围。
- **字符类的连字符必须在头尾两个字符中间，才有特殊含义，否则就是字面含义。**
- 连字符还可以用来指定Unicode字符的范围。
# 预定义模式
- \d 匹配0-9之间的任一数字，相当于[0-9]。
- \D 匹配所有0-9以外的字符，相当于[^0-9]。
- \w 匹配任意的字母、数字和下划线，相当于[A-Za-z0-9_]。
- \W 除所有字母、数字和下划线以外的字符，相当于[^A-Za-z0-9_]。
- \s 匹配空格（包括制表符、空格符、断行符等），相等于[\t\r\n\v\f]。
- \S 匹配非空格的字符，相当于[^\t\r\n\v\f]。
- \b 匹配词的边界。
- \B 匹配非词边界，即在词的内部。
# 重复类
模式的精确匹配次数，使用大括号（{}）表示。{n}表示恰好重复n次，{n,}表示至少重复n次，
# 量词符
量词符用来设定某个模式出现的次数
- ? 问号表示某个模式出现0次或1次，等同于{0, 1}。
- * 星号表示某个模式出现0次或多次，等同于{0,}。
- + 加号表示某个模式出现1次或多次，等同于{1,}。
# 修饰符
修饰符（modifier）表示模式的附加规则，放在正则模式的最尾部。
修饰符可以单个使用，也可以多个一起使用。
### m修饰符
m修饰符表示多行模式（multiline），会修改^和$的行为。默认情况下（即不加m修饰符时），^和$匹配字符串的开始处和结尾处，加上m修饰符以后，^和$还会匹配行首和行尾，即^和$会识别换行符（\n）。
# 组匹配
正则表达式的括号表示分组匹配，括号中的模式可以用来匹配分组的内容。
- 使用组匹配时，不宜同时使用g修饰符，否则match方法不会捕获分组的内容。
```
var m = 'abcabc'.match(/(.)b(.)/);
m
// ['abc', 'a', 'c']
```
```
var m = 'abcabc'.match(/(.)b(.)/g);
m
// ['abc', 'abc']
```
- 在正则表达式内部，可以用\n引用括号匹配的内容，n是从1开始的自然数，表示对应顺序的括号。

```
/(.)b(.)\1b\2/.test("abcabc")
// true
```
```
/y((..)\2)\1/.test('yabababab') // true
//\1指向外层括号，\2指向内层括号。
```
获取标签
```
var html = '<b class="hello">Hello</b><i>world</i>';
var tag = /<(\w+)([^>]*)>(.*?)<\/\1>/g;

var match = tag.exec(html);

match[1] // "b"
match[2] // "class="hello""
match[3] // "Hello"

match = tag.exec(html);

match[1] // "i"
match[2] // ""
match[3] // "world"
```
### 非捕获组
(?:x)称为非捕获组（Non-capturing group），表示不返回该组匹配的内容，即匹配的结果中不计入这个括号。
### 先行断言
x(?=y)称为先行断言（Positive look-ahead），x只有在y前面才匹配，y不会被计入返回结果。
- “先行断言”中，括号里的部分是不会返回的。
### 先行否定断言
x(?!y)称为先行否定断言（Negative look-ahead），x只有不在y前面才匹配，y不会被计入返回结果。













元字符：在正则表达式中具有特殊意义的专用字符，可以用来规定其前导字符 ( [ { \ ^ $ | ) ? * + .   
(没有'}' ']')  
[]内除"\"外均不用转义  "-"需要放在开头
/[\u4e00-\u9fa5]/用于匹配单个汉字。  
贪婪两次从后往前 惰性量词从前往后
取反[^  ]
*#-都不能引发单词边界\b  
字符	含义  
\t	水平制表符  
\r	回车符  
\n	换行符  
\f	换页符  
\cX	与X对应的控制字符（Ctrl+X）  
\v	垂直制表符  
\0	空字符    
.	[^\r\n]	除了回车符和换行符之外的所有字符  
\d	[0-9]	数字字符  
\D	[^0-9]	非数字字符  
\s	[\t\n\x0B\f\r]	空白符  
\S	[^\t\n\x0B\f\r]	非空白符  
\w	[a-zA-Z_0-9]	单词字符，字母、数字下划线  
\W	[^a-zA-Z_0-9]	非单词字符  
^	以xxx开头  
$	以xxx结尾  
\b	单词边界  
\B	非单词边界  
?	出现零次或一次（最多出现一次）  
+	出现一次或多次（至少出现一次）  
*	出现零次或多次（任意次）  
{n}	出现n次  
{n,m}	出现n到m次  
{n,}	至少出现n次  

字符	匹配  
i	执行不区分大小写的匹配  
g	执行一个全局匹配，简而言之，即找到所有的匹配，而不是在找到第一个之后就停止  
m	多行匹配模式，^匹配一行的开头和字符串的开头，$匹配行的结束和字符串的结束  

# \d，\w,\s,[a-zA-Z0-9],\b,.,*,+,?,x{3},^,$分别是什么?
\d：表示匹配0-9之间的任一数字，相当于[0-9]

\w：表示匹配任意的字母、数字和下划线，相当于[A-Za-z0-9_]

\s：表示匹配空格（包括制表符、空格符、断行符等），相等于[\t\r\n\v\f]

[a-zA-Z0-9]:表示匹配任意的字母、数字

\b：表示匹配词的边界

. ：表示匹配除回车（\r）、换行(\n) 、行分隔符（\u2028）和段分隔符（\u2029）以外的所有字符

*：表示星号表示某个模式出现0次或多次，等同于{0,}

+：表示加号表示某个模式出现1次或多次，等同于{1,}

？：问号表示某个模式出现0次或1次，等同于{0, 1}

x{3}：表示查找符合x出现三次及以上的元素

^：匹配开头

$:匹配结尾
# 写一个函数trim(str)，去除字符串两边的空白字符
```
function trim(str){
return str.replace(/^\s*|\s*$/g,"")
}
```
# 写一个函数isEmail(str)，判断用户输入的是不是邮箱
```
function isEmail(str){
return /^\w+@[\w.-]+$/.test(str)
}
```
# 写一个函数isPhoneNum(str)，判断用户输入的是不是手机号
```
function isPhoneNum(str){
return /^(\86-)?13\d{9}$/.test(str)
}
```
# 写一个函数isValidUsername(str)，判断用户输入的是不是合法的用户名（长度6-20个字符，只能包括字母、数字、下划线）
```
function isValidUsername(str){
return /\w{str.length}/.test(str)
}
```
# 写一个函数isValidPassword(str), 判断用户输入的是不是合法密码（长度6-20个字符，只包括大写字母、小写字母、数字、下划线，且至少至少包括两种）
```
function isValidPassword(str){
if(str.length<6||str.length>20||/\W/.test(str)){return false}
if(/^\d+$/.test(str)){return false}
if(/^_+$/.test(str)){return false}
if(/^[a-z]+$/.test(str)){return false}
if(/^[A-Z]+$/.test(str)){return false}
else {return true}
}
```
```
//密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
//输出 true
console.log("=="+pPattern.test("caibaojian#"));
```

```
function isValidPassword(str){
if(str.length<6||str.length>20){return false}
var l=RegExp('\\w{'+str.length+'}')//此处注意引入写法
if (l.test(str)){
  var num=0
  if(/\d/.test(str)){num++;}
  if(/_/.test(str)){num++;}
  if(/[a-z]/.test(str)){num++;}
  if(/[A-Z]/.test(str)){num++;}
}
if(num>1){return true}
else {return false}
}
isValidPassword("luo_occ")
```
# 写一个正则表达式，得到如下字符串里所有的颜色
```
var re = /#[0-9a-fA-F]{6}/g
var subj = "color: #121212; background-color: #AA00ef; width: 12px; bad-colors: f#fddee "
console.log( subj.match(re) ) 
```
# 改写代码，让其输出[""hunger"", ""world""].
```
var str = 'hello  "hunger" , hello "world"';
var pat =  /"[\w]*"/g;
str.match(pat);
```

