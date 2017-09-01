https://zhuanlan.zhihu.com/p/25178630  
http://es6.ruanyifeng.com/#docs/promise  
https://zhuanlan.zhihu.com/p/21834559  

### 
1. Promise 本质是一个状态机。每个 promise 只能是 3 种状态中的一种：pending、fulfilled 或 rejected。状态转变只能是 pending -> fulfilled 或者 pending -> rejected。状态转变不可逆。
2. then 方法可以被同一个 promise 调用多次。
3. then 方法必须返回一个 promise。规范里没有明确说明返回一个新的 promise 还是复用老的 promise（即 return this），大多数实现都是返回一个新的 promise，而且复用老的 promise 可能改变内部状态，这与规范也是相违背的。
4. 值穿透。下面会细讲。

```
var promise = new MyPromise(function(resolve, reject) {
  /*
    如果操作成功，调用resolve并传入value
    如果操作失败，调用reject并传入reason
  */
})

function MyPromise(executor) {
  var self = this

  self.status = 'pending'
  self.data = undefined
  self.onResolve = []
  self.onReject = []
/*
  resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 Pending 变为 Resolved），
  在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
*/
  function resolve(value) {
    if (self.status === 'pending'){
      self.status = 'resolved'

    }
  }

  function reject(error) {
  // TODO
  }
  try { // 考虑到执行executor的过程中有可能出错，所以我们用try/catch块给包起来，并且在出错后以catch到的值reject掉这个Promise
    executor(resolve, reject) // 执行executor
  } catch(e) {
    reject(e)
  }
}


function timeout(ms) {
  return new Promise(function(resolve, reject){
    setTimeout(resolve, ms, 'done');
  })
}

timeout(100).then((value) => {
  console.log(value);
});
```







































