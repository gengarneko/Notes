# Velocity.js简明使用教程

> Make Your Website Interactive and Fun with Velocity.js (No jQuery)

本文中，我们将介绍 `Velocity.js` ，这是一个快速、高性能的 JavaScript 动画引擎。当你浏览完所有的 demo 时，你可以使用 `Velocity.js` 创建自己的动画，并且使你的网站更具互动性和用户友好性。

## 功能概览

`Velocity.js` 是一个功能强大的库，它将 DOM 置于你的指尖！它的动画涵盖：

- CSS 动画属性的数值，包括颜色
- `Transform`（变换）
- SVG 属性
- 滚动事件，相对于页面或页面中的容器元素
- 淡入淡出动画

一般来说，`Velocity.js` 一次可以操控一个数值属性值的动画。

例如，如果要沿 X 和 Y 坐标移动元素，则不能使用 `translate['10px', '15px']`，相反，应该将 `translate` 属性与其响应的轴结合在一起，如：`translateX：'10px'，translateY：'15px'`。

`Velocity` 有一个功能称为 `forcefeeding`，它可以让你同时制定两个值。

## 配置项

Velocity的配置项在制作动画时给予了相当的灵活性。

以下是本文的demo中将会看到的配置项：

- Durantion：每个动画持续的时间，测量单位为毫秒。
- Easing：Velocity支持大多数的easing类型。`ease`，`ease-in`，`ease-out`, `ease-in-out`，贝塞尔曲线，甚至是很酷的物理弹簧效果。 
- Loop：动画应该重复的次数。如果将此选项设置为true，它将无限期运行。
- Delay：动画开始之前的延迟时长。

全部的配置项可以在[Velocity的官网](http://velocityjs.org/#duration)查看，此处也附上[Velocity中文网站](http://www.mrfront.com/docs/velocity.js/option.html)。

## 语法

如果你使用jQuery，Velocity.js可以轻松上手。 事实上，Velocity 与 jQuery 具有相同的 API：
下载Velocity，引入你的项目，然后将 $.animate() 替换成 $.velocity()