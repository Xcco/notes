# 概念
webpack 聚焦于项目中的所有资源(asset)，而浏览器不需要关注考虑这些（明确的说，这并不意味着所有资源(asset)都必须打包在一起）。webpack 把每个文件(.css, .html, .scss, .jpg, etc.) 都作为模块处理。然而 webpack 自身只理解 JavaScript。
核心：入口(entry)、输出(output)、loader、插件(plugins)
### 一切皆模块 只有一个入口
### entry
可以将应用程序的入口起点认为是根上下文(contextual root) 或 app 第一个启动文件。
### output
将所有的资源(assets)归拢在一起后，还需要告诉 webpack 在哪里打包应用程序。webpack 的 output 属性描述了如何处理归拢在一起的代码(bundled code)。
### loader
1. 识别出(identify)应该被对应的 loader 进行转换(transform)的那些文件。(test 属性)
2. 转换这些文件，从而使其能够被添加到依赖图中（并且最终添加到 bundle 中）(use 属性)
在 webpack 配置中定义 loader 时，要定义在 module.rules 中，而不是 rules。
### plugins
然而由于 loader 仅在每个文件的基础上执行转换，而 插件(plugins) 更常用于（但不限于）在打包模块的 “compilation” 和 “chunk” 生命周期执行操作和自定义功能

# 安装
推荐单个项目本地安装而非全局安装（考虑版本原因）  
```
//webpack execute/input file/output bundle file
./node_modules/.bin/webpack src/index.js dist/bundle.js

//配置scripts
{
  ...
  "scripts": {
    "build": "webpack"//通过模块名调用
  },
  ...
}
```
Custom parameters can be passed to webpack by adding two dashes between the npm run build command and your parameters, e.g. npm run build -- --colors.
```
//导入模块写法
module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        }
      ]
    }
 ```
# 路径
entry => loaders => webpack => output
# attention
- path 最好是绝对路径
- JSON 支持实际上是内置的
- '[chunkhash:3]_[name].js' //前置哈希数 位数 名字 hash=>webpack编译过程 chunkhash=>webpack对每个文件hash
- library 将输出形成包供别人引用
- libraryTarget 包规范格式 通常为 'umd'universal module difinition
- publicPath 指定异步加载文件位置 与服务器位置有关 
- chunkFilename 指定异步加载文件名
- devtool:'source map' 源文件debug
- plungins webpack.ProvidePlugin()自定义插件 部分替代require()功能 
-plungins webpack.optimize.commonsChunkplugin()提供常用功能
