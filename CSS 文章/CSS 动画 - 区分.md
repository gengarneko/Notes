[TOC]

# animation、transition、transform、translate



## 前言

日常开发中，都是自己摸索，没有 UI 给到特别详细的原型图，所以一些特效要求什么的，一直不是很熟悉，所以有了这篇文章。



## 容易混淆的几个属性

CSS 属性很多，有些无论是字母的拼写还是字面上的意思，都容易混淆，比如我列出来的几个属性，是不是也混淆过你～

| 属性               | 含义                                                         |
| ------------------ | ------------------------------------------------------------ |
| animation（动画）  | 用于设置动画属性，他是一个简写的属性，包含 6 个属性          |
| transition（过渡） | 用于设置元素的样式过度，和 animation 有着类似的效果，但细节上有很大的不同 |
| transform（变形）  | 用于元素进行旋转、缩放、移动或倾斜，和设置样式的动画并没有什么关系，就相当于 color 一样用来设置元素的“外表” |
| translate（移动）  | translate 只是 transform 的一个属性值，即移动。              |

弄清这些问题，就可以清醒地去学习 CSS 动画



## transition

什么叫过渡？字面意思上，技术元素从这个属性的某个值过渡到另一个属性的一个值，这是一种状态的转变，需要一种条件来触发这种转变，比如我们平时所使用的：

- `:hover`
- `:focus`
- `:checked`
- 媒体查询
- `JavaScript`

### 代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>transition</title>
  <style>
    #box {
      height: 100px;
      width: 100px;
      background: green;
      transition: transform 1s ease-in 1s;
    }

    #box:hover {
      transform: rotate(180deg) scale(.5, .5);
    }
  </style>
</head>
<body>
  <div id="box"></div>
</body>
</html>
```

### 分析过程

1. `transition` 给元素设置的过渡属性是 `transform`
2. 鼠标移入，通过 `:hover` 触发 `transition`，产生动画
3. 鼠标移出，同样 `:hover` 触发 `transition`，产生动画

> 综上，`transition` 产生动画的条件时其设置的 `property` 发生变化。

这种动画的特点是需要条件去触发，有几点不足：

1. 需要触发事件，没法在网页加载的时候自动发生
2. 一次触发无法重复发生
3. 只能定义起始结束的状态，无法定义中间状态，也就是说只能有两个状态
4. 一条 `transition` 规则，只能定义一个属性的变化，不能涉及多个属性

### 语法

```css
transition: property duration timing-function delay;
```

| 值                         | 描述                              |
| -------------------------- | --------------------------------- |
| transition-property        | 规定设置过渡效果的 CSS 属性的名称 |
| transition-duration        | 规定完成过渡效果需要多少秒或毫秒  |
| transition-timing-function | 规定速度效果的速度曲线            |
| transition-delay           | 定义过渡效果何时开始              |



## animation

官方介绍这个是 `transition` 的扩展属性，弥补了 `transition` 的很多不足，我理解为 `animation` 是由多个 `transition` 的效果的叠加，并且可操作性强，能够做出复杂酷炫的效果（瓶颈在你）。

### 代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <title>animation</title>
  <style>
    .box {
      height: 100px;
      width: 100px;
      border: 15px solid black;
      animation: changebox 1s ease-in-out 1s infinite alternate running forwards;
    }

    .box:hover {
      animation-play-state: paused;
    }

    @keyframes changebox {
      10% {
        background: red;
      }
      50% {
        width: 80px;
      }
      70% {
        border: 15px solid yellow;
      }
      100% {
        width: 180px;
        height: 180px;
      }
    }
  </style>
</head>

<body>
  <div class="box"></div>
</body>

</html>
```

### 分析

1. 声明 `keyframes`，定义了一个动画组合 `changebox`
2. 10%，50%，70%，100% 代表中间不同阶段点的属性值，精确控制
3. animation 中间有足足八个值，夸张啦，下面来了解一下。

### 语法

```css
animation: name duration timing-function delay iteration-count direction play-state fill-mode;
```

| 值              | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| name            | 用来调用@keyframes定义好的动画，与@keyframes定义的动画名称一致 |
| duration        | 指定元素播放动画所持续的时间                                 |
| timing-function | 规定速度效果的速度曲线，是针对每一个小动画所在时间范围的变换速率 |
| delay           | 定义在浏览器开始执行动画之前等待的时间，值整个animation执行之前等待的时间 |
| iteration-count | 定义动画的播放次数，可选具体次数或者无限(infinite)           |
| direction       | 设置动画播放方向：normal(按时间轴顺序),reverse(时间轴反方向运行),alternate(轮流，即来回往复进行),alternate-reverse(动画先反运行再正方向运行，并持续交替运行) |
| play-state      | 控制元素动画的播放状态，通过此来控制动画的暂停和继续，两个值：running(继续)，paused(暂停) |
| fill-mode       | 控制动画结束后，元素的样式，有四个值：none(回到动画没开始时的状态)，forwards(动画结束后动画停留在结束状态)，backwords(动画回到第一帧的状态)，both(根据animation-direction轮流应用forwards和backwards规则)，注意与iteration-count不要冲突(动画执行无限次) |





## 总结

`animation` 与 `transition` 不同的是，`keyframes` 提供更多的控制，尤其是时间轴的控制，这点让 CSS `animation` 更加强大，也由此诞生了一些动画库如 [Animate.css](https://link.juejin.im/?target=https%3A%2F%2Fdaneden.github.io%2Fanimate.css%2F) 

写这篇文章的目的是提醒自己不要将这四个属性混淆，顺便详细讲解CSS制作动画的方法，简单一次性的动画中推荐使用`transition`，比较逻辑清晰，可维护性较好。如果遇到比较复杂的动画，这个时候便可以拿出 `animation` 开始你的表演，其实不仅仅用 css 能实现动画，用 js 同样可以操控元素的样式实现动画，这个时候你脑海里是不是浮现出 `setTimeout`、`setInterval`来控制样式实现动画，当然可以，但是相比新出的 `requestAnimationFrame`，它能够更高性能地执行动画，这里抛砖引玉，小伙伴们可以尝试去谷歌以下，后面我也会就这个新出的函数写一篇详细的指南。





# 混合进阶

我们来讲述 CSS3 能够做成动画的最小单位，讲述如何使用这些独立元素构成一个高大上的组合动画。

![](https://lc-gold-cdn.xitu.io/b0683da72aa708254aeb.gif?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 最小独立单元

1. transform2d 或者 transform3d（这类动画必须要事件触发）
2. animation
3. transition（这类动画必须要事件触发）

#### tranform2d，transform3d

transform 是变形动画：

- 2d 类的动画沿着 x 轴和 y 轴的变化
- 3d动画：
  - 仅 x 值的变化使得动画在 yz 所形成的平面内的变化
  - 仅 y 值的变化使得动画在 xz 所形成的平面内的变化
  - 仅 z 值的变化使得动画在 xy 所形成的平面内的变化
  - 如果是 x，y 值同时变化，则形成的是在 x 轴上的变化
  - 如果是 x，z 值同时变化，则形成的是在 y 轴上的变化
  - 如果是 y，z 值同时变化，则形成的是在 x 轴上的变化
  - 如果是 x，y，z 的值都变化，则形成的是关于空间中的一点上（0, 0, 0）做变化

#### transiton

这个是一个在执行的过程中声明关键帧的动画，可以一旦元素的属性发生变化就可以形成一个动画

#### animation

通过 `@keyframes` 来设置关键帧，在没个关键帧中设置在该帧动画中某个元素的一个或几个属性的变化。

### 按钮动效

![](https://lc-gold-cdn.xitu.io/c5345248088365799b7c.gif?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

`:hover` 或者 `click` 事件：

```html
<div class="menu-outer">
    <span class="menu"></span>
</div>
```

```css
.menu-outer {
  position: relative;
  display: inline-block;
  margin: 30px;
  width: 20px;
  height: 24px;
  cursor: pointer;
}
.menu-outer:hover .menu {
  background-color: transparent;
}
.menu-outer:hover .menu::before {
  transform: translateY(8px) rotate(45deg);
}
.menu-outer:hover .menu::after {
  transform: translateY(-8px) rotate(-45deg);
}

.menu {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 2px;
  padding: 8px 0;
  transform: translate(-50%, -50%);
  background-clip: content-box;
  background-color: #585247;
}
.menu::after, .menu::before {
  position: absolute;
  left: 0;
  display: inline-block;
  content: '';
  width: 100%;
  height: 2px;
  background-color: #585247;
  transition: transform 0.3s, background-color 0.3s;
}
.menu::before {
  top: 0;
}
.menu::after {
  bottom: 0;
}
```

### 鼠标动效

![](https://lc-gold-cdn.xitu.io/77ae7f487e6e1fd26e00.gif?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

其次，来看看菜单选项的鼠标移入动画，这种动画在鼠标移入后背景透明的发生变化，背景颜色变黑，文字会由左边切入，并且带有弹性碰撞效果，这种效果，我们在很多场合见到，比如说，产品栏目中……

```html
<div class="mouse-in">
    <a href="javascript:;">
        <img src="./img/l-logo.jpg" alt="logo">
        <h2 class="l-logo">logo</h2>
        <p>源自世界的logo</p>
    </a>
</div>
```

```css
.mouse-in {
    position: relative;
    overflow: hidden;
    width: 160px;
    height: 160px;
    margin: 60px;
    border-radius: 10%;
    perspective: 500px;
    transform-origin: 0 0;
    transition: background-color 0.3s;
}

.mouse-in img {
    position: absolute;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    transition: opacity 0.3s;
}

.mouse-in h2,
.mouse-in p {
    position: absolute;
    padding: 0 16px;
    color: #fff;
    opacity: 0;
    transform: translate3d(-160px, 0, -160px);
}

.mouse-in h2 {
    bottom: 50%;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 20px;
    transition: transform 0.3s cubic-bezier(0, 2.3, 0.8, 1), opacity 0.3s;
}

.mouse-in p {
    top: 50%;
    font-size: 14px;
    transition: transform 0.3s 0.1s cubic-bezier(0, 2.3, 0.8, 1), opacity 0.3s 0.1s;
}

.mouse-in:hover {
    background: #000;
}

.mouse-in:hover h2,
.mouse-in:hover p {
    opacity: 1;
    transform: translate3d(0, 0, 0);
}

.mouse-in:hover img {
    opacity: 0.4;
}
```

