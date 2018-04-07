
### JSX onClick / HTML onclick
html onclick缺点：
1. 全局环境执行 有污染
2. onclick较多后影响性能
3.删除onclick DOM元素还需要删除时间处理器

react解决方式
1.全局挂载一个事件处理函数 事件委托形式处理事件
2.控制生命周期

# Redux设计思想
1. Web 应用是一个状态机，视图与状态是一一对应的。
2. 所有的状态，保存在一个对象里面。
### 特点
1. 唯一数据源
2. 状态只读
3.数据改变只能通过纯函数

# 概念 & API
### store
Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
createStore(fn)
store.subscribe() 设置监听函数，一旦 State 发生变化，就自动执行这个函数。
### State
Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。一个 State 对应一个 View。
store.getState()
### Action
State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。
type属性是必须的，表示 Action 的名称。其他属性可以自由设置。
### Action Creator
View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。
store.dispatch() store.dispatch()是 View 发出 Action 的唯一方法。
### Reducer
Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
combineReducers（）用于合成一个大的 Reducer


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
  - 和render是唯二要求返回结果的函数
- componentWillUpdate
- render
- componentDidUpdate
# 优化
- shouldComponentUpdate
- React.PureComponent
  - 自动浅比较state 判断是否更新
