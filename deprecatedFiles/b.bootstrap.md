### 避免归零 保留部分默认样式
- 移除body的margin声明
- 设置body的背景色为白色
- 为排版设置了基本的字体、字号和行高
- 设置全局链接颜色，且当链接处于悬浮“:hover”状态时才会显示下划线样式
#常用标签/类
- <small> subheading/副标题
- <div class="h1">Bootstrap标题一</div> == <h1>Bootstrap标题一</h1>
- <p class="lead"> 突出文本
- <b>和<strong>标签让文本直接加粗。
- <em>或<i>斜体

- .text-muted：提示，使用浅灰色（#999）
- .text-primary：主要，使用蓝色（#428bca）
- .text-success：成功，使用浅绿色(#3c763d)
- .text-info：通知信息，使用浅蓝色（#31708f）
- .text-warning：警告，使用黄色（#8a6d3b）
- .text-danger：危险，使用褐色（#a94442）
- .text-left：左对齐
- .text-center：居中对齐
- .text-right：右对齐
- .text-justify：两端对齐

- .list-unstyled：去除列表样式
- .list-inline：实现内联列表
- .dl-horizontal：给定义列表（dl dt dd)实现水平显示效果。
### 输入代码
- <code>：一般是针对于单个单词或单个句子的代码
- <pre>：一般是针对于多行代码（也就是成块的代码）
- .pre-scrollable:就可以控制代码块区域最大高度为340px，一旦超出这个高度，就会在Y轴出现滚动条。
- <kbd>:一般是表示用户要通过键盘输入的内容
不管使用哪种代码风格，在代码中碰到小于号（<）要使用硬编码“&lt;”来替代，大于号(>)使用“&gt;”来替代。 
### 表格
- .table：基础表格
- .table .table-striped：斑马线表格
- .table .table-bordered：带边框的表格
- .table .table-hover：鼠标悬停高亮的表格
- .table .table-condensed：紧凑型表格
- .table .table-responsive：响应式表格
- <tr class="active"> active/success/info/warning/danger 显示不同颜色 参见上方text-
- 
```
 <table class="table">
   <thead>
     <tr>
       <th>表格标题</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>表格单元格</td>
     </tr>
   </tbody>
 </table>
 ```
### 表单
- .form-control:宽度变成了100%/设置了一个浅灰色（#ccc）的边框/具有4px的圆角/设置阴影效果，并且元素得到焦点之时，阴影和边框效果会有所变化/设置了placeholder的颜色为#999
- <form class="form-horizontal" role="form">: 水平表单效果
- <form class="form-inline" role="form">：表单的控件都在一行内显示
- .form-control <input type="email" class="form-control" placeholder="Enter email">: 让控件在各种表单风格中样式不出错 基本都要加
- <select multiple class="form-control">新的多行样式
- checkbox-inline/radio-inline
- input-sm:让控件比正常大小更小/input-lg:让控件比正常大小更大


























