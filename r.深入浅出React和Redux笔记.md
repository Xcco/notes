
### JSX onClick / HTML onclick
html onclick缺点：
1. 全局环境执行 有污染
2. onclick较多后影响性能
3.删除onclick DOM元素还需要删除时间处理器

react解决方式
1.全局挂载一个事件处理函数 事件委托形式处理事件
2.控制生命周期

# 生命周期
### 装载
- constructor  
  - 初始化state
  - 绑定成员函数this环境
- componentWillMount  
  - 没有什么用...
- render  
  - 纯函数
- componentDidMount  
  - 所有组件渲染后才触发
  - 浏览器端可调用 服务器端不调用
### 更新
- componentWillReceiveProps(nextProps)
  - 父组件render即触发 setState不触发
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate
