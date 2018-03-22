

# 互联网协议
* TCP/IP :互联网相关协议集
  * 应用层：FTP DNS HTTP
  * 传输层：TCP
  * 网络层：IP
  * 数据链路层：物理层
* 以太网协议： 
  * 一组电信号构成一个数据包，叫做"帧"（Frame）。每一帧分成两个部分：标头（Head）和数据（Data）。
  * 不是把数据包准确送到接收方，而是向本网络内所有计算机发送，让每台计算机自己判断，是否为接收方。
* MAC地址： 数据包的发送地址和接收地址，这叫做MAC地址。
  * ARP协议：用于同一子网内获得MAC地址
* IP协议：规定网络地址的协议，叫做IP协议。它所定义的地址，就被称为IP地址。
  * IP数据包超过了1500字节，它就需要分割成几个以太网数据包 TCP数据包的长度不会超过IP数据包的长度（TCP切割HTTP报文段）
  * 处于同一个子网络的电脑，它们IP地址的网络部分必定是相同的，
  * 子网掩码：就是表示子网络特征的一个参数。它在形式上等同于IP地址，也是一个32位二进制数字，它的网络部分全部为1，主机

# HTTP协议
### 请求报文构成
方法 URI 协议版本 请求首部字段 内容实体
### 响应报文构成
协议版本 状态码 状态码原因短语 响应首部字段 主体
### 报文结构
头部 CR+LF 主体
### Method
GET POST 
* Put(have security problem):发送文件
* DELETE:删除文件
* HEAD:确认URI有效性 资源更新时间
* OPTIONS:询问支持方法
* TRACE:追踪路径
* CONNECT:隧道协议连接代理
### 状态码
##### 1XX 正在处理
##### 2XX 成功
* 200 OK
* 204 No Content 无返回资源
* 206 Partial Content 部分资源
##### 3XX 重定向
* 301 Moved permanently 永久重定向
* 302 Found 临时重定向
* 303 See Other 存在另一个URI
* 304 Not Modified 找到资源 资源未改变 不符合请求条件 （可直接使用缓存）
##### 4XX 客户端错误
* 400 Bad Request
* 401 Unauthorized 
* 403 Forbidden
* 404 Not Found
##### 5XX 服务器错误
* 500 Internal Server Error
* 503 Service Unavailable


##### GET POST区别
* GET产生一个TCP数据包；POST产生两个TCP数据包。
对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；
而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。
* GET在浏览器回退时是无害的，而POST会再次提交请求。
* GET产生的URL地址可以被Bookmark，而POST不可以。
* GET请求会被浏览器主动cache，而POST不会，除非手动设置。
* GET请求只能进行url编码，而POST支持多种编码方式。
* GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。
* GET请求在URL中传送的参数是有长度限制的，而POST么有。
* 对参数的数据类型，GET只接受ASCII字符，而POST没有限制。
* GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
* GET参数通过URL传递，POST放在Request body中。

##### 其它
* URL 表明位置的标识符 是URI子集

# Web服务器
### 代理
具有转发功能的应用程序
* 使用缓存技术减少流量
* 特定网站访问控制
### 网关
转发其他服务器通信数据的服务器
* 能提供非HTTP协议服务 提高安全性
### 隧道
特点是有两个IP头
* 使用加密手段通信 提高安全性

# HTTPS
HTTP Secure =HTTP + SSL(Secure Socket Layer)
### HTTP缺点
* 通信明文
* 不验证身份 Dos攻击
* 无法证明完整性 中间人攻击(Man-in-the-Middle attack)







