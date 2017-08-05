# prototype和__proto__区别
## ```__proto__```（隐式原型implicit prototype link）与prototype（显式原型 explicit prototype property）
一个对象的隐式原型指向构造该对象的构造函数的显式原型， 
每一个**函数**在创建之后都会拥有一个名为prototype的属性，这个属性指向函数的原型对象。例外：Function.prototype.bind方法构造出来的函数没有该属性   
每一个**对象**都有一个内置属性[[prototype]]，JavaScript中任意对象都有一个内置属性[[prototype]]例外：Object.prototype 的__proto__值为null 
# new的实现过程
1. 创建一个空对象作为this
2. this.__proto__指向构造函数prototype
3. 运行构造函数
4. 返回this（如果没有return）

# OOP 指什么？有哪些特性
Object Oriented Programming，面向对象编程  
特性
原则：开放封闭原则  
1. open for extension 需求改变后可以对模块进行扩展以满足新行为
2. closed for modification 扩展时不改动源代码或二进制代码
要素：
1. 封装：把多种方法属性放在一起使用
2. 继承：子类继承父类方法属性
3. 多态：不同类可以定义相同方法属性
# 如何通过构造函数的方式创建一个拥有属性和方法的对象? 
"构造函数"，其实就是一个普通函数，但是内部使用了**this**变量。对构造函数使用**new**运算符，就能生成实例，并且this变量会绑定在实例对象上。 
# prototype 是什么？有什么特性 
每一个**函数**在创建之后都会拥有一个名为prototype的属性，这个属性指向函数的原型对象。  
特性：
- 原型对象上的所有属性和方法，都能被派生对象共享。 
- 通过构造函数生成实例对象时，会自动为实例对象分配原型对象。每一个构造函数都有一个prototype 属性，这个属性就是实例对象的原型对象。
- prototype更改后，其实例也将发生变化
# 画出如下代码的原型图





# 封装
##  构造函数模式
所谓"构造函数"，其实就是一个普通函数，但是内部使用了**this**变量。对构造函数使用**new**运算符，就能生成实例，并且this变量会绑定在实例对象上。  
## constructor
有实例的constructor和prototype的constructor之分
实例的constructor指向它们的构造函数。
prototype的constructor属性，指向函数本身。如果指定了构造函数 则指向构造函数，由new操作生成。所以如果重新赋值prototype 需要添加constructor
**实例指向构造函数，构造函数指向自己 所以构造函数改变prototype时要把constructor指向自己**
## prototype
每一个**函数**都有一个prototype属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。

##  isPrototypeOf()
这个方法用来判断，某个proptotype对象和某个实例之间的关系。
## hasOwnProperty()
每个实例对象都有一个hasOwnProperty()方法，用来判断某一个属性到底是本地属性，还是继承自prototype对象的属性。
## in运算符
in运算符可以用来判断，某个实例是否含有某个属性，不管是不是本地属性。  
in运算符还可以用来遍历某个对象的所有属性。
# 继承
## 构造函数绑定
使用call或apply方法，将父对象的构造函数绑定在子对象上
```
　　function Cat(name,color){
　　　　Animal.apply(this, arguments);
　　　　this.name = name;
　　　　this.color = color;
　　}
  ```
## prototype模式
每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性。
```
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;//不要忘了
  ```
## 直接继承prototype
```
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
```
优点是效率比较高（不用执行和建立Animal的实例了），比较省内存。  
缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何对Cat.prototype的修改，都会反映到Animal.prototype。
## 利用空对象作为中介
```
var F = function(){};
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;
```
F是空对象，所以几乎不占内存。这时，修改Cat的prototype对象，就不会影响到Animal的prototype对象。

```
//封装函数
function extend(Child, Parent) {
  var F = function(){};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype;
}
```
//Child.uber = Parent.prototype;   
意思是为子对象设一个uber属性，这个属性直接指向父对象的prototype属性。（uber是一个德语词，意思是"向上"、"上一层"。）这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。
## 拷贝继承
纯粹采用"拷贝"方法实现继承。把父对象的所有属性和方法，拷贝进子对象.
```
function extend2(Child, Parent) {
  var p = Parent.prototype;
  var c = Child.prototype;
  for (var i in p) {
    c[i] = p[i];
    }
  c.uber = p;
}
```
# 非构造函数的继承
## object()方法
两个对象都是普通对象，不是构造函数，不使用构造函数方法实现"继承"。
```
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
var Doctor = object(Chinese);
```
这个object()函数，其实只做一件事，就是把子对象的prototype属性，指向父对象，从而使得子对象与父对象连在一起。
## 浅拷贝/深拷贝

```
function extendCopy(p) {
　　　　var c = {};
　　　　for (var i in p) { 
　　　　　　c[i] = p[i];
　　　　}
　　　　c.uber = p;
　　　　return c;
　　}
var Doctor = extendCopy(Chinese);
```
缺陷：如果父对象的属性等于数组或另一个对象，那么实际上，子对象获得的只是一个内存地址，而不是真正拷贝，因此存在父对象被篡改的可能。下面深拷贝
```
　function deepCopy(p, c) {
　　　　var c = c || {};
　　　　for (var i in p) {
　　　　　　if (typeof p[i] === 'object') {
　　　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
　　　　　　　　deepCopy(p[i], c[i]);
　　　　　　} else {
　　　　　　　　　c[i] = p[i];
　　　　　　}
　　　　}
　　　　return c;
　　}
```

















