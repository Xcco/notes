# 知识点
* iOS会阻止所有非https的请求

# style
### flexbox布局
默认

特有：
flex:1 自动扩张 ===flexGrow:1

# 组件
### ScollView
ScollView中的所有组件都会被渲染，哪怕有些组件因为内容太长被挤出了屏幕外。
### ListView
ListView并不立即渲染所有元素，而是优先渲染屏幕上可见的元素。
### Image
都有尺寸（引用图片尺寸或设置尺寸）防止加载图片时页面UI跳动


* 静态图片资源/静态非图片资源

```
<Image source={require('./my-icon.png')} />
为了使新的图片资源机制正常工作，require中的图片名字必须是一个静态字符串。(不能拼装)
通过这种方式引用的图片资源包含图片的尺寸（宽度，高度）信息，如果需要动态缩放图片（例如，通过flex），你可能必须手动在style属性设置{ width: undefined, height: undefined }。
```
* 混合App的图片资源
```
<Image source={{uri: 'app_icon'}} style={{width: 40, height: 40}} />
这一做法并没有任何安全检查。你需要自己确保图片在应用中确实存在，而且还需要指定尺寸。
```
* 网络图片
```
<Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
       style={{width: 400, height: 400}} />
需要手动指定图片的尺寸 使用https
```
* 缓存控制（仅iOS）
字段：cache
  * default：使用原生平台默认策略。
  * reload：URL的数据将从原始地址加载。不使用现有的缓存数据。
  * force-cache：现有的缓存数据将用于满足请求，忽略其期限或到期日。如果缓存中没有对应请求的数据，则从原始地址加载。
  * only-if-cached：现有的缓存数据将用于满足请求，忽略其期限或到期日。如果缓存中没有对应请求的数据，则不尝试从原始地址加载，并且认为请求是失败的。
```
<Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png', cache: 'only-if-cached'}}
       style={{width: 400, height: 400}} />
```
# 事件
### onChangeText
react中的onChange对应的是rn中的onChangeText

# 动画
* View、Text、Image和ScrollView默认封装 **一定要加Animated前缀，Animated.View Animated.Image...**
否则报错：**attempted to assign to readonly property**
* Animated.createAnimatedComponent()主动封装
* parallel（同时执行）、sequence（顺序执行）、stagger和delay来组合使用
* 出于优化 不读取animation的值 需依靠spring.stopAnimation(callback)和spring.addListener(callback)

### 步骤
1. 使用基本的Animated组件，如Animated.View Animated.Image Animated.Text （重要！不加Animated的后果就是一个看不懂的报错，然后查半天动画参数，最后怀疑人生）
2. 使用Animated.Value设定一个或多个初始化值（透明度，位置等等）。
3. 将初始化值绑定到动画目标的属性上（如style）
4. 通过Animated.timing等函数设定动画参数
5. 调用start启动动画。

### 过程
* Animated.decay() 
* Animated.spring()
* Animated.timing()
### setNativeProps
setNativeProps方法可以使我们直接修改基于原生视图的组件的属性
### requestAnimationFrame

# Timer
### 务必在卸载组件前清除定时器！
* setTimeout, clearTimeout
* setInterval, clearInterval
* setImmediate, clearImmediate
* requestAnimationFrame, cancelAnimationFrame

requestAnimationFrame(fn)和setTimeout(fn, 0)不同，前者会在每帧刷新之后执行一次，而后者则会尽可能快的执行
### InteractionManager
```
InteractionManager.runAfterInteractions(() => {
   // ...需要长时间同步执行的任务...
});
var handle = InteractionManager.createInteractionHandle();
// 执行动画... (`runAfterInteractions`中的任务现在开始排队等候)
// 在动画完成之后
InteractionManager.clearInteractionHandle(handle);
// 在所有句柄都清除之后，现在开始依序执行队列中的任务
```
# 跨平台(Platform Specific Code)
### Platform module
* Platform.OS==='ios'||'android'
* Platform.select 
```
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'blue',
      },
    }),
  },
});

//返回对应组件
const Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
})();

<Component />
```
* Platform.Version android返回版本数number ios返回版本号string 需要parseInt
### Platform-specific extensions
```
BigButton.ios.js
BigButton.android.js
//自动识别环境
const BigButton = require('./BigButton');
```









