

inline no-replace元素上下margin padding无效 width height无效
[inline-block两个知识点]{https://jscode.me/t/inline-block-bug/1037}

html5 新增语义标签
header
section
article
aside
footer
nav

### text-align:center;
- 写在父元素 作用于子元素 img为子元素 写在上一级 写在div上 作用于内部文字
- 具有继承性 所以子元素为块级元素 其内部文字也会自动居中

width: calc(100% - 80px);
width: calc(100% / 6);
运算符号左右空格不能省略！

##z-index property will not apply to statically positioned elements. In order to use z-index the CSS must also include any position value other than static (ie relative, absolute, fixed).

绝对定位能使伪元素的height:100%生效！

position:relative和float可以同时使用 absolute脱离分档流 float没用

html实体 &name或者&#name_number;
css实体 \name

::before ::after默认display为inline 要设置block 或absolute使其显现
伪元素必须要有content
块级元素才有伪元素

white-space


# <meta>
The <meta> tag provides metadata about the HTML document. Metadata will not be displayed on the page, but will be machine parsable.





























