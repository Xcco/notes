
HTML元素的属性名是大小写不敏感的，但是JavaScript对象的属性名是大小写敏感的。转换规则是，转为JavaScript属性名时，一律采用小写。如果属性名包括多个单词，则采用骆驼拼写法，即从第二个单词开始，每个单词的首字母采用大写，比如onClick。  

HTML标签名是大小写不敏感的，因此getElementsByTagName方法也是大小写不敏感的。

# js命名
第一个字符，可以是任意Unicode字母（包括英文字母和其他语言的字母），以及美元符号（$）和下划线（_）。
第二个字符及后面的字符，除了Unicode字母、美元符号和下划线，还可以用数字0-9。

# jQuery animate() css()
animate()一定要用驼峰法
```
$('div').animate({
    left: '+=50', // 增加50
    opacity: 0.25,
    fontSize: '12px'
  },
  300, // 持续时间
  function() { // 回调函数
     console.log('done!');
  }
);
```
css()两者皆可 大小写敏感  
jQuery can equally interpret the CSS and DOM formatting of multiple-word properties. For example, jQuery understands and returns the correct value for both .css( "background-color" ) and .css( "backgroundColor" ). This means mixed case has a special meaning, .css( "WiDtH" ) won't do the same as .css( "width" ), for example.
