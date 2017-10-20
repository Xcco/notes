* React 元素都是immutable 不可变的
* setState是唯一更新逻辑的动作
* 组件名称必须以大写字母开头。
* 组件的返回值只能有一个根元素。这也是我们要用一个<div>来包裹所有<Welcome />元素的原因。
* 所有的React组件必须像纯函数那样使用它们的props。（输入相同，输出相同）
* 父组件或子组件都不能知道某个组件是有状态还是无状态，并且它们不应该关心某组件是被定义为一个函数还是一个类。  
* {}在JSX内可以直接渲染数组形式dom
* 在map()方法内部调用的元素时，为每一个元素加上一个独一无二的key
  
# 组件
定义组件
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
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
状态更新可能是异步的 使用第二种形式的 setState() 来接受一个函数而不是一个对象。 该函数将接收先前的状态作为第一个参数，将此次更新被应用时的props做为第二个参数：
# 事件绑定
bind目的：若function中还有this引用，则会产生错误
推荐在constructor中绑定事件（避免产生新事件）
```
constructor(props) {
  super(props);
  this.handleClick = this.handleClick.bind(this);
}
...
 <button onClick={this.handleClick}>
```
