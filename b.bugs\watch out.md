# 项目细节
### 注意导航栏遮挡flatlist底部 要有一定的留白
# React Native
### react.children.only expected to receive a single react element child
TabBarIOS.Item 必须有且只有一个子组件 
### 输入react-native run-ios报错：ENOENT no such file or directory, uv_chdir
* react-native upgrade
* react-native run-ios
### 取消 remote debug JS 后反而运行缓慢
代码中console.log写多了
### flatlist 数据不显示
添加属性 removeClippedSubviews={false}
### flatlist 顶部留白
添加属性 automaticallyAdjustContentInsets={false}
### 操作TextInput的value值
用setNativeProps
### mobx + defaultValue 有value效果
### RN动画
* RN动画 标签前加Animated. 否则报错attempted to assign to readonly property
* RN动画outputRange仅支持字符串 不支持normalizeColor/processColor等转换成的数字
  
### TouchableNativeFeedback
<TouchableNativeFeedback> 只能跟一个<View>子组件 且style只能写在<View>内
  
### borderTopRightRadius borderBottomRightRadius
android上不支持 会产生bug
### setState()
setState()是异步 用回调或者componentDidMount()
  
## 0.43版本bug
### borderBottomWidth
旧版 <Text>等组件不支持 神坑！
  
### <Touch...>
<Touch...>组件内有<Text>且内容不为string（比如number）onPress事件会有一定概率触发onStartShouldSetResponderCapture错误（还是一定概率，真神坑 -_-#）解决方式 toString()
[链接](https://github.com/facebook/react-native/issues/13080)

### SegmentControl 采坑之旅
边框整体包裹radius加tab左边
尖角冒出，白色缝隙=> tab radius
rightRadius产生bug 边框无效 => 整体加 正片叠底色加负margin 
overflow:hidden 无效 => tab radius
rightRadius产生bug 边框无效 => 第二个左右都有 其它右边

### 静态方法与实例交换数据
构造一个emitter 发布订阅模式

### 工具
expo 有时在无wifi情况下不能识别二维码
# 细节错误
* 三元表达式都会执行 a === undefined ? a : a[0] 仍会报错 要用if...else...
* 判断 === ！== 不是= 小心 if里面的=
* 图片处理 写在onload后面
* focus()在chrome firefox里有时会失效！要加setTimeout
* node里 #! /usr/bin/env node 是env！！！不是nev！！！
* code EINTEGRITY一般是代理问题
* getElement除了id没有s其它都有s
* typeof 小写
* 创建原型时不要忘了 this！
* 注意不要发生嵌套错误！
```
//wrong
let vm=new Vue({
  el:'.main',
  data:{
    list:list,
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ],
    methods:{
    addTodo(e) {
        alert()
      if(e.key==13){
        alert()
        this.list.push({title:e.target.value})
        }
      }
    }
  }
})
//right
let vm=new Vue({
  el:'.main',
  data:{
    list:list,
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  },
  methods:{
    addTodo(e) {
        alert()
      if(e.key==13){
        alert()
        this.list.push({title:e.target.value})
      }
    }
  }
})
```
