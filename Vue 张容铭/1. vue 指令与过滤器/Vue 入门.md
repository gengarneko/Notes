# Vue

​	vue 是一个**数据驱动页面**的框架，基于 MVVM 模式，这个框架着重于 VM 部分，因此学起来比较简单，目标就是用简单 API 实现数据绑定及视图组合。

​	Vue 基于双向绑定原理，使我们开发页面更简单，比如我们以前用原生 js 开发页面的时候，书写复杂可读性差，后来用 jQuery 开发页面业务逻辑重复，可复用性差（页面插入数据要写 n 遍），Vue 通过数据双向绑定使得这一切变得简单。



### MVVM 模式（M 模型 V 视图 VM 视图模型）

- M 指的是数据（原生数据）
- V 指的是视图（人眼可见的页面）
- VM 指的是视图模型，做的是将数据绑定视图上（双向绑定）



## 初体验

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="">
</head>
<body>
	<div>
		{{ msg }}
	</div>
	
	<!-- <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script> -->
	<!-- 开发环境版本，包含了有帮助的命令行警告 -->
	<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	<script type="text/javascript">
		// 原生写法：向 div 中插入一条数据
		// document.getElementsByTagName('div')[0].innerHTML = '国足赢球了你敢信？'
		// document.getElementsByTagName('div')[0].innerHTML = '下周对阵伊朗。'

		// JQuery 实现
		// $('div').html('国足赢球了你敢信？')
		// $('div').html('下周对阵伊朗。')

		// Vue 实现
		var data ={
			msg: '国足赢球了你敢信？'
		}
		new Vue({
			el: 'div',
			data: data
		})
		data.msg = 'PHP is good.'
	</script>
</body>
</html>

```



## 体验 vue

​	Vue 提供一个 API， 就是 Vue，它是类，我们要想获取 Vue 实例化对象，只能通过 new 创建。



## 选择器

​	我们可以通过 el 定义一个 Vue 视图的容器元素，我们可以传递 **css 选择器**，**id 选择器**，**类选择器**，**元素名称选择器**。

​	页面中有多个符合条件选择器，vue 只会捕获第一个符合条件的选择器对应的元素。



## 数据的绑定

​	我们可以通过 data 属性绑定一个数据

​	通过 data 属性可以为 Vue 实例化对象添加属性，添加的属性与外部的 data 中的数据是同步的。

​	不论是修改外部 data 中的数据，还是修改 Vue 实例化对象中的数据，它们的数据始终是同步的。



## 插值

​	**模型到视图模型**的这一过程我们称之为**数据绑定**

​	**数据模型到视图**的这一过程我们称之为**插值**



### 属性插值

​	插值的内容不仅仅可以插入到 DOM 元素的内容区域内，还可以插入到元素的属性中，使用方式同内容插值使用方式一致。



### 单次插值

​	插值的内容在数据改变的会改变，有时我们需求是插入后就不要再改变了，此时需要单次插值

​	语法： {{ *数据的名称 }}

​	

​	



























































