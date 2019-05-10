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

### 替换内容

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

### `</canvas>` 标签不可省去

与 `<img>` 元素不同，`<canvas>` 需要结束标签 `</canvas>`。如果结束标签不存在，则文档剩余部分会被认为是替代内容，不会显示。

如果不需要替代内容，一个简单的 `<canvas id="foo" ...></canvas>` 在所有支持 canvas 的浏览器中都是完全兼容的。

### 渲染上下文(The renderng context） 

`<canvas>` 元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文文，其可以用来绘制和处理要展示的内容。我们将会把注意力放在 2D 渲染上下文中，其他种类的上下文也许提供了不同的渲染方式；比如：WebGL 使用了基于 OpenGL ES 的 3D 上下文。





03 - 绘制形状

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