# 模块生成
使用"立即执行函数"（Immediately-Invoked Function Expression，IIFE），可以达到不暴露私有成员的目的。
```
　　var module1 = (function(){
　　　　var _count = 0;
　　　　var m1 = function(){
　　　　　　//...
　　　　};
　　　　var m2 = function(){
　　　　　　//...
　　　　};
　　　　return {
　　　　　　m1 : m1,
　　　　　　m2 : m2
　　　　};
　　})();
```
### 放大模式
```
　var module1 = (function (mod){
　　　　mod.m3 = function () {
　　　　　　//...
　　　　};
　　　　return mod;
　　})(module1);
  ```
  上面的代码为module1模块添加了一个新方法m3()，然后返回新的module1模块。
### 宽放大模式（Loose augmentation）
在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。如果采用上一节的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"。
```
var module1 = ( function (mod){
　　　　//...
　　　　return mod;
　　})(window.module1 || {});
  ```
与"放大模式"相比，＂宽放大模式＂就是"立即执行函数"的参数可以是空对象。
### 输入全局变量
为了在模块内部调用全局变量，必须显式地将其他变量输入模块。
```

　　var module1 = (function ($, YAHOO) {
　　　　//...
　　})(jQuery, YAHOO);
  ```
# require.js
1）实现js文件的异步加载，避免网页失去响应；  
2）管理模块之间的依赖性，便于代码的编写和维护。

### baseUrl
config中 baseUrl设置为data-main指定的文件所在的路径，这里是 js/ (所以重新设置一般也依据于此 js/xxx)







