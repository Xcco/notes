# Everything is a file
参考资料[linux](http://billie66.github.io/TLCL/book/zh/index.html)
# 指令
- cd - 返回原来目录
- tab 补全目录
- > 创建文件/输出重定向(每次重定向前会把文件清空)
- < 把标准输入源从键盘改成文件
- |管道线
- file 显示文件信息
- cat 连接文件并浏览文件内容
- less 浏览文件内容(less新窗口浏览 cat当前窗口)
- -l 查看文件详细信息
- -r, --recursive 递归操作 一般调整文件夹会用到
- wget(安装工具) 下载文件
- echo 打印变量值
- locate 搜索
- grep 
![通配符](https://i.loli.net/2017/08/15/599230c31dcd9.png)
- zip/unzip 压缩/解压
# 概念
### shell 就是一个程序，它接受从键盘输入的命令， 然后把命令传递给操作系统去执行。，bash 是最初 Unix 上shell 程序的增强版。
### file descriptor 几种输出类型
- 0 stdin
- 1 stdout
- 2 stderr
### 权限 rwx 读 写 执行 chmod(change mod)可以修改权限 chmod +x filename  




操作             | 命令
-----------------|-----------------------|
进入目录         | cd
显示当前目录     | pwd
创建目录         | mkdir 目录名
创建目录         | mkdir -p 目录路径
--               | --
查看路径         | ls 路径
查看路径         | ls -a 路径
查看路径         | ls -l 路径
查看路径         | ls -al 路径
--               | --
创建文件         | echo '1' > 文件路径
创建文件         | echo '1' >! 文件路径
创建文件         | echo '1' >> 文件路径
创建文件         | touch 文件名
改变文件更新时间 | touch 文件名
--               | --
复制文件         | cp 源路径 目标路径
复制目录         | cp -r 源路径 目标路径
--               | --
移动节点         | mv 源路径 目标路径
--               | --
删除文件         | rm 文件路径
强制删除文件     | rm -f 文件路径
删除目录         | rm -r 目录路径
--               | --
查看目录结构     | tree
建立软链接       | ln -s 真实文件 链接


操作                     | 命令
-------------------------|-------------------------------|
回到刚才的目录（返回）   | cd -
使用上一次的命令         | 上
使用上一次的命令         | !!
使用上一次的最后一个参数 | <kbd>alt</kbd> + <kbd>.</kbd>
一句话执行两个命令       | xxx; yyy
一句话执行两个命令       | xxx&& yyy
