![](https://upload-images.jianshu.io/upload_images/7143811-f3d6dbcd54cf37b4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)





通过 3 张图和 1 张表格，轻松区别 Javascript Event 对象中的offsetX, clientX, pageX, screenX, layerX, x等属性。

## 1、测试代码

```html

<!DOCTYPE HTML>
<html lang="zh-cn">
<head>
<meta charset="utf-8" />
<title>Javascript</title>
<style>
body{margin:0;padding:0;background:#ccc;font-size:12px;overflow:auto}
.main{width: 500px;height: 330px;position: relative;margin: 250px auto 0;background-color: #eee;}
.box{position: absolute;width: 220px;height: 180px;background-color: orange;top: 80px;left: 80px;}
</style>
</head>
 
<body style="height:1600px;">
<div class="main">
	<div class="box" id="box"></div>
</div>
 
<script>
var oBox = document.getElementById('box');
 
window.onload = function(){
	
	oBox.onmousedown = function(ev){
		ev = ev || window.event;
		
		console.log(ev.offsetX, ev.offsetY);
		console.log(ev.clientX, ev.clientY);
		console.log(ev.pageX, ev.pageY);
		console.log(ev.screenX, ev.screenY);
		console.log(ev.layerX, ev.layerY);
		console.log(ev.x, ev.y);
	}
}
 
</script>
</body>
```

## 2、不同浏览器支持

![](https://img-blog.csdn.net/20150502105654081?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbHpkaW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

## 3、图解属性

![](https://img-blog.csdn.net/20150502094344891?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbHpkaW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



![](https://img-blog.csdn.net/20150502134126249?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbHpkaW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



![](https://img-blog.csdn.net/20150502140010681?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbHpkaW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



## 4、Jquery 兼容写法

Jquery event 事件对象，包含有 event.offsetX， event.clientX，event.pageX，event.screenX等属性（firefox 浏览器中， offsetX 为 undefined）。firefox 获取 offsetX / offsetY 的值，需要通过 event 对象的属性 originalEvent。

```js
<script>
$(function(){
	$("#box").mousedown(function(event){
		console.log(event.offsetX, event.offsetY);
		console.log(event.clientX, event.clientY);
		console.log(event.pageX, event.pageY);
		console.log(event.screenX, event.screenY);
 
		/* firefox */
		console.log(event.originalEvent.layerX, event.originalEvent.layerY);
	});
});
</script>
```





![](C:\Users\Administrator\Desktop\Notes\CSS 文章\pageX、clientX、screenX 区别.assets\1009007-20170223112832882-336762012.png)