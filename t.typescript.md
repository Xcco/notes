### any/object 区别
Object类型的变量只是允许你给它赋任意值，但是却不能够在它上面调用任意的方法，即便它真的有这些方法
```
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // 报错
```
### 元组
当赋值给越界的元素时，它类型会被限制为元组中每个类型的联合类型
```
let xcatliu: [string, number];
xcatliu = ['Xcat Liu', 25];
xcatliu.push('http://xcatliu.com/');//ok
xcatliu.push(true);//报错
```

### 类型推论
申明时未指定类型的变量为any，但有赋值时会推断类型
```
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;//报错

let something;
something = 'seven';
something = 7;//ok
```
### 联合类型
当 TypeScript 不能确定一个联合类型的变量时，只能访问此联合类型的所有类型里共有的属性或方法：
```
function getLength(something: string | number): number {
    return something.length;
}
//报错
function getString(something: string | number): string {
    return something.toString();
}
//ok
```
被赋值时会推断类型
```
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // ok
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 报错
```
### 接口
```
interface Person {
    readonly id: number;//只读属性
    name: string;//确定属性
    age?: number;//可选属性
    [propName: string]: any;//任意属性
}
```
* 一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性
* 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
### 数组
```
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```
NumberArray 表示：只要 index 的类型是 number，那么值的类型必须是 number。















