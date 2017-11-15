# Chapter 1
### JSX onClick / HTML onclick
html onclick缺点：
1. 全局环境执行 有污染
2. onclick较多后影响性能
3.删除onclick DOM元素还需要删除时间处理器

react解决方式
1.全局挂载一个事件处理函数 事件委托形式处理事件
2.控制生命周期
