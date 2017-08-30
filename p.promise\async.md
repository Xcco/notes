# 异步种类
- 回调函数
- 事件监听
- 发布/订阅
- promise
# 流程控制
- 串行执行
```
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];
function series(item) {
  if(item) {
    async( item, function(result) {
      results.push(result);
      return series(items.shift());
    });
  } else {
    return final(results);
  }
}
series(items.shift());
```
- 并行执行
```
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];

items.forEach(function(item) {
  async(item, function(result){
    results.push(result);
    if(results.length == items.length) {
      final(results);
    }
  })
});
```
- 并行与串行的结合
```
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];
var running = 0;
var limit = 2;

function launcher() {
  while(running < limit && items.length > 0) {
    var item = items.shift();
    async(item, function(result) {
      results.push(result);
      running--;
      if(items.length > 0) {
        launcher();
      } else if(running == 0) {
        final(results);
      }
    });
    running++;
  }
}

launcher();
```
# Promise
(new Promise(f1)).then(f2);
### Promise接口
- 异步操作“未完成”（pending）
- 异步操作“已完成”（resolved，又称fulfilled）
- 异步操作“失败”（rejected）
##### 状态变化只有一次 结果只有两种
- 异步操作成功，Promise对象传回一个值，状态变为resolved。
- 异步操作失败，Promise对象抛出一个错误，状态变为rejected。
### promise对象实例
```
var promise = new Promise(function(resolve, reject) {
  // 异步操作的代码

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(function(value) {
  // success
}, function(value) {
  // failure
});
```
- 该函数的两个参数分别是resolve和reject。它们是两个函数，由JavaScript引擎提供，不用自己部署。
- 如果一个任务已经完成，再添加回调函数，该回调函数会立即执行。所以，你不用担心是否错过了某个事件或信号。



