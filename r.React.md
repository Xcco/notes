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


# React 源码
### render
render方法实际上是调用了React.createElement方法返回一个ReactElement方法生成的对象  
如果我们通过class关键字声明React组件,那么他们在解析成真实DOM之前一直是ReactElement类型的js对象。
### children
父子嵌套关系由props提供 
props.children = children || childrenArray
### 挂载
调用_renderSubtreeIntoContainer函数
挂载本质就是利用innerHTML属性
1. 根据ReactDOM.render()传入不同的参数，React内部会创建四大类封装组件，记为componentInstance。（为组件加上mountComponet方法）
2. 而后将其作为参数传入mountComponentIntoNode方法中，由此获得组件对应的HTML（该过程调用mountComponet方法 并触发组件生命周期），记为变量markup。
3. 将真实的DOM的属性innerHTML设置为markup，即完成了DOM插入。

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

* componentWillMount()**无用** 此时已经渲染完 setState无效
* componentWillReceiveProps()第一次render不生效

# ref DOM操作
ref为私有属性 属性值是一个函数
* 下面的inline function写法会创建两次ref 正确的写法是用callback function
  https://stackoverflow.com/questions/33796267/how-to-use-refs-in-react-with-typescript
  https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs
```
<input ref={(input) => this.input = input} />
//this.input即为挂载后的DOM元素
```
- Refs 不能连接到一个 stateless function（无状态函数），因为这些组件没有支持实例。
- 绝不 在任何组件的 render 方法中访问 refs

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
# 例子
```
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    console.log(props.children);
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}

ReactDOM.render(
  <ListOfTenThings />,
  document.getElementById('root')
);




把{(index) => <div key={index}>This is item {index} in the list</div>}
看做ƒ (index) {
      return React.createElement(
        'div',
        { key: index },
        'This is item ',
        index,
        ' in the list'
      );
    }
```
