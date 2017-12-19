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
