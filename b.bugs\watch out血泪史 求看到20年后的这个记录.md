# 判断 === ！== 不是= 小心 if里面的=
# 图片处理 写在onload后面
# node里 #! /usr/bin/env node 是env！！！不是nev！！！
### code EINTEGRITY一般是代理问题
### getElement除了id没有s其它都有s
### typeof 小写
### 创建原型时不要忘了 this！
### 注意不要发生嵌套错误！
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

