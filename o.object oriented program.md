# 封装
##  构造函数模式
所谓"构造函数"，其实就是一个普通函数，但是内部使用了this变量。对构造函数使用new运算符，就能生成实例，并且this变量会绑定在实例对象上。  
## constructor
constructor属性，指向它们的构造函数。由new操作生成 如果重新赋值prototype 需要添加constructor
## prototype
每一个构造函数都有一个prototype属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。
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
　　Cat.prototype.constructor = Cat;
  ```
