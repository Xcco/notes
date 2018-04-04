### module
编写每个模块时，都有require、exports、module三个预先定义好的变量可供使用。
* exports对象是当前模块的导出对象
* module对象最多的用途是替换当前模块的导出对象。
### package
* 当模块的文件名是index.js，加载模块时可以使用模块所在目录的路径代替模块文件路径
### 命令行程序
1.文件头部加注释 表明使用nodejs解析
```
 #! /usr/bin/env node
```
