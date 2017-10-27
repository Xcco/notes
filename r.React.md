* React 元素都是immutable 不可变的
* setState是唯一更新逻辑的动作
* 组件名称必须以大写字母开头。
* 组件的返回值只能有一个根元素。这也是我们要用一个<div>来包裹所有<Welcome />元素的原因。
* 所有的React组件必须像纯函数那样使用它们的props。（输入相同，输出相同）
* 父组件或子组件都不能知道某个组件是有状态还是无状态，并且它们不应该关心某组件是被定义为一个函数还是一个类。  
* {}在JSX内可以直接渲染数组形式dom
* 在map()方法内部调用的元素时，为每一个元素加上一个独一无二的key
* key不应该被调用 this.props.key不能被读出
* class =>className  for =>htmlFor
* {}表达式内为null则什么都不显示 可以此显示隐藏元素
* on*的事件监听只能用在普通的 HTML 的标签上，而不能用在组件标签上。

# 建议格式 
组件的私有方法都用 _ 开头，所有事件监听的方法都用 handle 开头。把事件监听方法传给组件的时候，属性名用 on 开头。

1. static 开头的类属性，如 defaultProps、propTypes。
2. 构造函数，constructor。
3. getter/setter（还不了解的同学可以暂时忽略）。
4. 组件生命周期。
5. _ 开头的私有方法。
6. 事件监听方法，handle*。
7. render*开头的方法，有时候 render() 方法里面的内容会分开到不同函数里面进行，这些函数都以 render* 开头。
8. render() 方法。


# 组件
定义组件
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const HelloWorld = (props) => {
  return (
    <div>Hello World</div>
  )
}
```
```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

```
- 当React遇到的元素是用户自定义的组件，它会将JSX属性作为单个对象传递给该组件,这个对象称之为“props”
- 组件可以在它的输出中引用其它组件，这就可以让我们用同一组件来抽象出任意层次的细节
# state
state 在组件内部初始化，可以被组件自身修改，而外部不能访问也不能修改。

* 原则：尽量少地用 state，尽量多地用 props

状态更新可能是异步的 使用第二种形式的 this.setState() 来接受一个函数而不是一个对象。 该函数将接收先前的状态作为第一个参数，将此次更新被应用时的props做为第二个参数：
```
 handleClickOnLikeButton () {
    this.setState((prevState) => {
      return { count: 0 }
    })
    this.setState((prevState) => {
      return { count: prevState.count + 1 } // 上一个 setState 的返回是 count 为 0，当前返回 1
    })
    this.setState((prevState) => {
      return { count: prevState.count + 2 } // 上一个 setState 的返回是 count 为 1，当前返回 3
    })
    // 最后的结果是 this.state.count 为 3
  }
  ```
# props
props传入后不可变
默认属性
```
static defaultProps = {
    ...
}

```
# 事件绑定
bind目的：若function中还有this引用，则会产生错误
推荐在constructor中绑定事件（避免产生新事件）
```
constructor(props) {
  super(props);
  this.handleClick = this.handleClick.bind(this,param);
}
handleClick(param,e){...}//注意bind后面可以传参，参数传到event前面
...
 <button onClick={this.handleClick}>
```
# 生命周期
-> constructor()
-> componentWillMount()
-> render()
// 然后构造 DOM 元素插入页面
-> componentDidMount()
// ...
// 即将从页面中删除
-> componentWillUnmount()
// 从页面中删除"

# ref DOM操作
ref为私有属性 属性值是一个函数
```
<input ref={(input) => this.input = input} />
//this.input即为挂载后的DOM元素
```
* 能不用 ref 就不用
# props.children
所有嵌套在组件中的 JSX 结构都可以在组件内部通过 props.children 获取到
# dangerouslySetInnerHTML
```
render () {
    return (
      <div
        className='editor-wrapper'
        dangerouslySetInnerHTML={{__html: this.state.content}} />
    )
  }
```
# style
必须驼峰命名
```
<h1 style={{fontSize: '12px', color: 'red'}}>React.js 小书</h1>
```
# PropTypes
给组件的配置参数加上类型验证
```
static propTypes = {
  comment: PropTypes.object.isRequired //this.props.comment必须为object且必须输入
}
```