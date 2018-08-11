
# Flash
开发主要知识点
* ActionScript3：Flash平台使用的脚本语言
* MXML：基于XML语法的标记语言
* Flex：包含控件和布局的框架集，由AS3和MXML编写
* Robotlegs：
* Spark


### MXML







### Spark
设计原则：将组件中的视觉部分和逻辑部分分离
##### Spark组成
* 皮肤组件：样式部分，由MXML编写
* 组件类：逻辑部分，AS3编写
##### 组件的三个元素
* parts：组件的构成
* states：组件渲染的状态，同时影响样式和功能
* data：组件显示的数据

### Flex
如果你了解UIComponent的生命周期，你应该知道在UIComponent的生命周期中，Flex会依序调用createChildren，commitProperties，measure，layoutChrom和updateDisplayList方法