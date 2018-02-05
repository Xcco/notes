# React Native
### 输入react-native run-ios报错：ENOENT no such file or directory, uv_chdir
* react-native upgrade
* react-native run-ios
### flatlist 数据不显示
添加属性 removeClippedSubviews={false}
### 操作TextInput的value值
用setNativeProps
### mobx + defaultValue 有value效果
### RN动画
RN动画 标签前加Animated. 否则报错attempted to assign to readonly property

### borderBottomWidth
旧版 <Text>等组件不支持 神坑！
  
### TouchableNativeFeedback
<TouchableNativeFeedback> 只能跟一个<View>子组件 且style只能写在<View>内

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
