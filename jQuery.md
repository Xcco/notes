# jQuery 能做什么？
jQuery是一个兼容多浏览器的JavaScript库，核心理念是write less，do more，它的语法设计可以使开发更加便捷，例如操作文档对象、选择DOM元素、制作动画效果、事件处理、使用Ajax等。除此之外，jQuery还提供API让开发者编写插件。
- 取得文档中的元素$('div').find('.className');
- 修改页面的外观$(this).addClass('active').siblings().removeClass('active');
- 改变文档内容$(this).clone.append('.ul-list');
# jQuery 对象和 DOM 原生对象有什么区别？如何转化？
DOM原生对象：w3c标准用于操作文档的API.
jQuery对象：包装DOM对象产生的对象。
区别：DOM原生对象使用DOM原生对象的方法，jQuery对象使用jQuery对象的方法。  
转化：
- DOM原生对象转化为jQuery对象：$div = $(document.getElementsByTagName(‘div’));
- jQuery对象转化为DOM原生对象：div = $div[index];
# jQuery中如何绑定事件？bind、unbind、delegate、live、on、off都有什么作用？推荐使用哪种？使用on绑定事件使用事件代理的写法？
