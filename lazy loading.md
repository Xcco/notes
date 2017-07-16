# 题目1：如何判断一个元素是否出现在窗口可视范围（浏览器的上边缘和下边缘之间，肉眼可视）。写一个函数 isVisible实现
```
function isVisible ($node){
      var offsetTop=$node.offset().top
      var scrollTop=$(window).scrollTop
      var height=$(window).height
      if(offsetTop<scrollTop+height && offsetTop>scrollTop){
        return true
      }
      return false
    }
```
# 当窗口滚动时，判断一个元素是不是出现在窗口可视范围。每次出现都在控制台打印 true 。用代码实现
```
$(window).scroll(function(){
  if(isVisible($node)){
    console.log('hello');
  }
})
function isVisible ($node){
      var offsetTop=$node.offset().top
      var scrollTop=$(window).scrollTop
      var height=$(window).height
      if(offsetTop<scrollTop+height && offsetTop>scrollTop){
        return true
      }
      return false
    }
```
# 当窗口滚动时，判断一个元素是不是出现在窗口可视范围。在元素第一次出现时在控制台打印 true，以后再次出现不做任何处理。用代码实现
```
$(window).scroll(function(){
  if(isVisible($node)){
    if($node).hasClass("visited"){
      return
    }
    else{
      console.log(true)
      $node.addClass("visited")
    }
  }
})
function isVisible ($node){
      var offsetTop=$node.offset().top
      var scrollTop=$(window).scrollTop
      var height=$(window).height
      if(offsetTop<scrollTop+height && offsetTop>scrollTop){
        return true
      }
      return false
    }
```
# 图片懒加载的原理是什么？
不在一开始加载图片 而是当网页移动到一定位置时才进行加载
