# Canvas

## 01 - 简介

`<canvas>` 是 HTML5 新增的元素，可用于通过使用 JavaScript 中的脚本来绘制图形。例如，它可以用于绘制图形、制作照片、创建动画，甚至可以进行实时视频处理或渲染。

一个小示例：

html

```html
<canvas id="canvas"></canvas>
```

js

```
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100)
```

## 02 - 基本用法

我们来学习一下如何设置一个 canvas 2D 上下文以及如何在浏览器上创建第一个例子。

```html
<canvas id="tutorial" width="150" height="150"></canvas>
```

`<canvas>` 看起来和 `<img>` 元素很像，唯一不同的是它并没有 `scr` 和 `alt` 属性。实际上，`<canvas>` 标签只有两个属性——`width` 和 `height`。这些都是可选的，并且同样利用 DOM properties 来设置。当没有设置宽度和高度的时候，canvas 会初始化为 300px 宽和 150px 高。该元素可以使用 CSS 来定义大小，但在绘制的时候会伸缩以适应它的框架尺寸：如果 CSS 的尺寸与初始画布的比例不一致，它就会出现扭曲。

> 如果你绘制出来的图像是扭曲的，尝试用 width 和 height 属性为 <canvas> 明确规定宽高，而不是使用 CSS。

`id` 属性并不是 `<canvas>` 所特有的，而是每一个 HTML 元素都默认具有的属性。给每个标签加上一个 id 是一个好习惯，这样就可以在脚本中很容易的找到它。

`<canvas>` 元素可以像任何一个普通的图像一样（有 `margin`、`border`、`background` 等等属性）被设计。然而这些样式不会影响在 canvas 中的实际图像。我们将会在后面看到这是如何解决的。当开始时没有为 canvas 规定样式规则，其将会完全透明。

### 2.1 替换内容

`<canvas>` 元素与 `<img>` 标签的不同之处在于，就像 `<video>`、`<audio>` 或者 `<picture>` 元素一样，很容易定义一些替代内容。由于旧版本浏览器不支持 canvas，在这些浏览器上你应该总是能展示替代内容。

这很容易理解，我们只是在 `<canvas>` 标签中提供了替换内容。不支持     `<canvas>` 的浏览器会忽略容器并在其中渲染后备内容。而支持 `<canvas>` 的浏览器会忽略在容器中包含的内容，并且只是正常渲染 `canvas`。

举个例子，我们可以提供对 canvas 内容的文字描述或者是提供动态生成内容相对应的静态图片：

```html
<canvas id="stockGraph" width="150" height="150">
  current stock price: $3.15 +0.15
</canvas>

<canvas id="clock" width="150" height="150">
  <img src="images/clock.png" width="150" height="150" alt=""/>
</canvas>
```

### 2.2 `</canvas>` 标签不可省去

与 `<img>` 元素不同，`<canvas>` 需要结束标签 `</canvas>`。如果结束标签不存在，则文档剩余部分会被认为是替代内容，不会显示。

如果不需要替代内容，一个简单的 `<canvas id="foo" ...></canvas>` 在所有支持 canvas 的浏览器中都是完全兼容的。

### 2.3 渲染上下文(The renderng context） 

`<canvas>` 元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文文，其可以用来绘制和处理要展示的内容。我们将会把注意力放在 2D 渲染上下文中，其他种类的上下文也许提供了不同的渲染方式；比如：WebGL 使用了基于 OpenGL ES 的 3D 上下文。

`canvas` 起初是空白的，为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。`<canvas>` 元素有一个叫做 `getContext()` 的方法，这个方法是用来获取渲染上下文和它的绘画功能。`getContext()` 只有一个参数，那就是上下文的格式。对于 2D 的图像而言，本教程，你可以用 `CanvasRenderingContext2D`。

```js
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
```

如上所示，代码的第一行通过 `document.getElementById()` 方法来为 `<canvas>` 元素获得 DOM 对象。一旦有了对象，你就可以通过使用它的 `getContext()` 方法来访问绘画上下文。

### 2.4 检查支持性

替换内容是用于在不支持 `<canvas>` 标签的浏览器中展示的。通过简单的测试 `getContext()` 方法的存在，脚本可以检查编程支持性。上面的代码片段现在变成了这个样子：

```js
var canvas = document.getElementById('tutorial')；

if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

### 2.5 一个模板骨架

这里是一个最简单的模板，我们之后就可以把它作为之后例子的起点。

```html
<html>
  <head>
    <title>Canvas tutorial</title>
    <script type="text/javascript">
      function draw(){
        var canvas = document.getElementById('tutorial');
        if (canvas.getContext){
          var ctx = canvas.getContext('2d');
        }
      }
    </script>
    <style type="text/css">
      canvas { border: 1px solid black; }
    </style>
  </head>
  <body onload="draw();">
    <canvas id="tutorial" width="150" height="150"></canvas>
  </body>
</html>
```

上面的脚本中包含一个叫做 `draw()` 的函数，当页面加载结束的时候就会执行这个函数。通过使用在文档上加载事件来完成。只要页面加载结束，这个函数，或者像是这个的，同样可以使用 `window.setTimeout()`，`window.setInterval()`，或者其他任何事件处理程序来调用。

模板起初是空白的。

### 2.6 一个简单例子

一开始，让我们来看个简单的例子，我们绘制了两个有趣的长方形，其中的一个有着alpha透明度。我们将在接下来的例子里深入探索一下这是如何工作的。

```html
<html>
 <head>
  <script type="application/javascript">
    function draw() {
      var canvas = document.getElementById("canvas");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);
      }
    }
  </script>
 </head>
 <body onload="draw();">
   <canvas id="canvas" width="150" height="150"></canvas>
 </body>
</html>
```

例子看起来像是这样：:

![image-20190510172636516](https://i.loli.net/2019/05/10/5cd543fd5323d.png)

## 03 - 绘制形状

既然我们已经设置了 canvas 环境，我们可以深入了解如何在 canvas 上绘制。到本文的最后，你将会学会如何绘制矩形、三角形、直线、圆弧和曲线，变得熟悉这些基本的形状。绘制物体到 Canvas 前，需要掌握路径，我们来看看到底应该怎么做。

17166344240

04 - 添加样式和颜色

05 - 绘制文本

06 - 使用图片

07 - 变形

08 - 合成与裁剪

09 - 基本动画

10 - 高级动画

11 - 像素操作

12 - 点击区域和无障碍访问

13 - canvas 的优化

14 - 终极