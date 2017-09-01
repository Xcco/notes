https://zhuanlan.zhihu.com/p/25178630  
http://es6.ruanyifeng.com/#docs/promise  
https://zhuanlan.zhihu.com/p/21834559  

### 
1. Promise 本质是一个状态机。每个 promise 只能是 3 种状态中的一种：pending、fulfilled 或 rejected。状态转变只能是 pending -> fulfilled 或者 pending -> rejected。状态转变不可逆。
2. then 方法可以被同一个 promise 调用多次。
3. then 方法必须返回一个 promise。规范里没有明确说明返回一个新的 promise 还是复用老的 promise（即 return this），大多数实现都是返回一个新的 promise，而且复用老的 promise 可能改变内部状态，这与规范也是相违背的。
4. 值穿透。下面会细讲。

```
/*
  实现目标
*/

let promise = new MyPromise(function(resolve, reject) {
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
})

class MyPromise {
  constructor(executor) {
    let self = this
    self.status = 'pending'
    self.data = undefined
    self.onResolve = []
    self.onReject = []
    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }

  /*
    resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 Pending 变为 Resolved），
    在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；具体实现为存储在promise的方法上，
    reject类似。
  */
  resolve(value) {
    if (self.status === 'pending'){
      self.status = 'resolved'
      self.data = value
      for(let i = 0; i < self.onResolve.length; i++) {
        self.onResolve[i](value)
      }
    }
  }

  reject(error) {
    if (self.status === 'pending'){
      self.status = 'resolved'
      self.data = value
      for(let i = 0; i < self.onResolve.length; i++) {
        self.onResolve[i](value)
      }
    }
  }

  /*
  then 方法必须返回一个 promise。规范里没有明确说明返回一个新的 promise
  还是复用老的 promise（即 return this），大多数实现都是返回一个新的 promise，
  而且复用老的 promise 可能改变内部状态，这与规范也是相违背的。
  */
  then = function(onResolved, onRejected) {
    let promise2
    onResolved = typeof onResolved === 'function' ? onResolved : function(value) {return value}//值的穿透
    onRejected = typeof onRejected === 'function' ? onRejected : function(error) {return error}
    if (self.status === 'resolved') {
    return promise2 = new Promise(function(resolve, reject) {
      try {
        var x = onResolved(self.data)
        if (x instanceof Promise) { 
          x.then(resolve, reject)
        }
        resolve(x)
      } catch (e) {
        reject(e)
      }
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new Promise(function(resolve, reject) {
      try {
        var x = onRejected(self.data)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        }
      } catch (e) {
        reject(e)
      }
    })
  }

    else if (self.status === 'pending') {
      return promise2 = new Promise(function(resolve, reject) {

      })
    }
    /*
     pending状态下就把相应函数放在处理函数数列中
     */
    if (self.status === 'pending') {
    return promise2 = new Promise(function(resolve, reject) {
      self.onResolve.push(function(value) {
        try {
          var x = onResolved(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })

      self.onReject.push(function(error) {
        try {
          var x = onRejected(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  }
  catch = function(onRejected) {
    return this.then(null, onRejected)
  }
}

```







































