
从一个业务bug了解react组件中的this指向问题

前情：在公司项目中使用了一个组件rc-component 的Cascader组件(该组件又继承了Select组件)
我需要修改组件的显示内容 找到相应变量triggerText后 发现它是由一个方法getTriggerText返回的 好勒 测试一波却出现了一个诡异的现象


明明设成了定值并且显示了 却又换成了原有的业务文字


苦苦思索一番后 发现 这个写法似乎有点不规范 没有绑定this 于是发现Cascader中也有个一样的方法getTriggerText
打印下this


果然 看来这是个利用this指向改变的黑科技

然而 this指向为何改变由如何改变呢
