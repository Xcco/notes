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
2.赋予文件执行权限
```
chmod +x /home/user/bin/node-echo.js
```
3.在PATH环境变量中指定的某个目录下，例如在/usr/local/bin下边创建一个软链文件
```
sudo ln -s /home/user/bin/node-echo.js /usr/local/bin/node-echo
```
### 工程目录
```
- /home/user/workspace/node-echo/   # 工程目录
    - bin/                          # 存放命令行相关代码
        node-echo
    + doc/                          # 存放文档
    - lib/                          # 存放API相关代码
        echo.js
    - node_modules/                 # 存放三方包
        + argv/
    + tests/                        # 存放测试用例
    package.json                    # 元数据文件
    README.md                       # 说明文件
 ```
 
