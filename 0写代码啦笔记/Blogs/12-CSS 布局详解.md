博客题：请写一篇博客，介绍如何使用CSS做出：

1. 左右布局

2. 左中右布局

3. 水平居中

4. 垂直居中

5. 等其他小技巧

   

# 目录

[TOC]

# CSS 布局

1. 左右布局（两列自适应）
2. 左中右布局（三栏布局）
3. 水平居中
4. 垂直居中
5. 等高布局
6. 粘连布局



## 1 - 左右布局（两列自适应）

> 一列由内容撑开，另一列撑满剩余宽度

### 1.1 float + overflow:hidden

如果是普通的布局，浮动 + 元素 margin 就可以实现，但是如果是自适应撑满的两列布局，用 `float + overflow:hidden` 可以实现。

此方法通过 `overflow` 触发 BFC，而 BFC 不会重叠浮动元素。由于设置 `overflow: hidden` 并不会触发 IE-6 的 `haslayout` 属性，所以需要设置 `zoom: 1` 来兼容 IE-6。代码：

```html
<div class="parent" style="background-color: lightgrey;">
    <div class="left" style="background-color: lightblue;">
        <p>left</p>
    </div>
    <div class="right"  style="background-color: lightgreen;">
        <p>right</p>
        <p>right</p>
    </div>        
</div>
```

```css
.parent {
  overflow: hidden;
  zoom: 1;
}
.left {
  float: left;
  margin-right: 20px;
}
.right {
  overflow: hidden;
  zoom: 1;
}
```

> 注意：如果侧边栏在右边，注意渲染顺序。

### 1.2 Flex 布局

> 弹性布局，很简单就能实现：

```css
.parent {
  display:flex;
}  
.right {
  margin-left:20px; 
  flex:1;
}
```

### 1.3 Grid 布局

> Grid 二维布局系统

```css
.parent {
  display:grid;
  grid-template-columns:auto 1fr;
  grid-gap:20px
} 
```



## 2 - 三栏布局（圣杯/双飞翼）

> 利用 Flex 和 Grid 可以迅速进行三栏布局，和上面两列布局类似

> 这里我们重点讨论一下**中间自适应，两侧固定**的圣杯布局和双飞翼布局

### 2.1 圣杯布局

#### 介绍

> 比较特殊的三栏布局，同样也是两边固定宽度，中间自适应，唯一区别是 DOM 结构必须是先写中间的部分以确保中间列可以优先加载。

```html
  <article class="container">
    <div class="center">
      <h2>圣杯布局</h2>
    </div>
    <div class="left"></div>
    <div class="right"></div>
  </article>
```

```css
  .container {
    padding-left: 220px;//为左右栏腾出空间
    padding-right: 220px;
  }
  .left {
    float: left;
    width: 200px;
    height: 400px;
    background: red;
    margin-left: -100%;
    position: relative;
    left: -220px;
  }
  .center {
    float: left;
    width: 100%;
    height: 500px;
    background: yellow;
  }
  .right {
    float: left;
    width: 200px;
    height: 400px;
    background: blue;
    margin-left: -200px;
    position: relative;
    right: -220px;
  }
```

#### 原理

1. 三列都设置为左浮动，使得三列保持在一行
2. 设置中间列宽度为 100% （自适应的关键），这时候左右会自动流动到下一行
3. 设置 `margin-left` 为负值，使得左右两列回到中间列一行
4. 设置大容器的 padding，为左右两列留出空间
5. 通过 `position: relative` 调整左右两列

#### 缺陷

- `center` 的 `min-width` 不能小于 `left` 的 `width`
- 三列中任何一列高度边长，其他两列不会自动填充

### 2.2 双飞翼布局

#### 介绍

> 优化了圣杯布局，解决圣杯布局错乱问题，实现内容与布局分离，而且没有高度适应问题

```html
    <article class="container">
        <div class="center">
            <div class="inner">双飞翼布局</div>
        </div>
        <div class="left"></div>
        <div class="right"></div>
    </article>
```

```css
    .container {
        min-width: 600px;//确保中间内容可以显示出来，两倍left宽+right宽
    }
    .left {
        float: left;
        width: 200px;
        height: 400px;
        background: red;
        margin-left: -100%;
    }
    .center {
        float: left;
        width: 100%;
        height: 500px;
        background: yellow;
    }
    .center .inner {
        margin: 0 200px; //新增部分
    }
    .right {
        float: left;
        width: 200px;
        height: 400px;
        background: blue;
        margin-left: -200px;
    }
```

#### 原理

1. 三列都设置为左浮动，使得三列保持在一行
2. 设置中间列宽度为 100% （自适应的关键），这时候左右会自动流动到下一行
3. 设置 `margin-left` 为负值，使得左右两列回到中间列一行
4. 在 `center` 新增 `inner` 子容器，样式 `margin: 0 200px；`

#### 缺点

> 多加了一层 DOM 节点~

### 2.3 比较

- 相同
  - 中间列写在最前，主列优先加载
  - 三列浮动，用负 `margin` 形成三列
- 不同
  - **圣杯布局是利用父容器的左、右内边距 + 两个从列相对定位**；
  - **双飞翼布局是把主列嵌套在一个新的父级块中利用主列的左、右外边距进行布局调整**



## 3 - 水平居中

### 3.1 inline-block + text-align

> 兼容性好，甚至可以兼容ie6、ie7

#### 代码

```html
<div class="parent">
    <div class="child>DEMO</div>
</div>
```

```css
.child{
    display: inline-block;
}
.parent{
    text-align: center;
}
```

#### 原理

- 子块变为行内块元素，再设置行内块元素居中

#### 缺点

- `child` 里的文字会被影响也会水平居中，需要使用 `text-align: left;` 在 `.child`  中还原样式

- 不过这说不定也是个优点，省的子块文字居中了~

### 3.2 table + margin

> 只设置了child，样式简单。IE 8 以上都支持。

#### 代码

```html
<div class="parent">
    <div class="child>DEMO</div>
</div>
```

```css
.child {
    display: table;
    margin: 0 auto;
}
```

#### 原理

- 将子块设置为块级表格来显示（类似 <table>），再设置子块居中

#### 缺点

- 不支持 IE 6、IE 7，需要将 `div` 换成 `table`

### 3.3 absolute + transform

> 居中元素不会对其他的产生影响的水平居中办法

#### 代码

```html
<div class="parent">
    <div class="child>DEMO</div>
</div>
```

```css
.parent {
    position:relative;
}
.child {
    position:absolute;
    left:50%;
    transform:translateX(-50%);
}
```

#### 原理

- 父块设置为相对定位，子块设置为绝对定位
- 移动子块，使得其左侧距离相对父块左边框距离为相对父块宽度的一半
- 再向左移动子块的一半宽度

#### 缺点

- `transform` 属于 CSS3 标签，有兼容性问题

### 3.4 flex + margin

#### 代码

```html
<div class="parent">
    <div class="child>DEMO</div>
</div>
```

```css
.parent {
    display:flex;
}
.child {
    margin:0 auto;
}
```

#### 原理

- flex 将子块声明为 flex item，然后设置子块居中

#### 缺点

- 沙雕 IE 6/7/8 不支持

### 3.4 flex + justify-content

> 不考虑兼容性的情况下，无脑用这个就行了

#### 代码

```html
<div class="parent">
    <div class="child>DEMO</div>
</div>
```

```css
.parent {
    display:flex;
    justify-content:center;
}
```

#### 原理

- flex 语法

#### 缺点

- 沙雕 IE 6/7/8 不支持



## 4 - 垂直居中

### 4.1 table-cell + vertical-align

```html
<div class="parent">
    <div class="child>DEMO</div>
</div>
```

```css
.parent {
    display:table-cell;
    vertical-align:middle;
}
```

> 将父块转化为一个表格单元格显示，再通过设置属性，使表格单元格内容垂直居中以达到垂直居中。

> 兼容性好，IE 8 以上均支持

### 4.2 absolute + transform

```html
<div class="parent">
    <div class="child>DEMO</div>
</div>
```

```css
.parent {
    position:relative;
}
.child {
    position:absolute;
    top:50%;
    transform:translateY(-50%);
}
```

> 同水平居中时的 absolute + transform 原理。

> 居中元素不会对其他的产生影响

> transform 兼容性问题

### 4.3 flex + align-items

```html
<div class="parent">
    <div class="child>DEMO</div>
</div>
```

```css
.parent {
    position:flex;
    align-items:center;
}
```

#### flex 赛高~不考虑兼容性，无脑用就是了。



## 5 - 等高布局

> 子元素在父元素中高度相等的布局方式

### 5.1 正 padding + 负 margin

> 用等高布局解决上面圣杯布局的第二缺点：
>
> 因为**背景**是在 `padding` 区域显示的，设置一个大数值的 `padding-bottom`，再设置相同数值的负的 `margin-bottom`，并在所有列外面加上一个容器，并设置 `overflow: hidden` 把溢出背景切掉。

```css
      .center,
      .left,
      .right {
        padding-bottom: 10000px;
        margin-bottom: -10000px;
      }
      .container {
        padding-left: 220px;
        padding-right: 220px;
        overflow: hidden;//把溢出背景切掉
      }
```

### 5.2 背景图片

> 实现等高列最早使用的一种方法，在父容器上使用背景图进行 Y 轴的重复平铺，从而实现等高列的假象。实现方法简单，兼容性强，不需要太多的 CSS 样式，但是此方法不适合刘布局等高列的布局。

```HTML
<div class=”container clearfix”>
    <div class=”left”></div>
    <div  class=”content”></div>
    <div class=”right”></div>
</div>
```

```css
.container {
  background: url("column.png") repeat-y;
  width: 960px;
  margin: 0 auto;
}
.left {
  float: left;
  width: 220px;
}
.content {
  float: left;
  width: 480px;
}
.right {
  float: left;
  width: 220px;
}
```

### 5.3 表格布局

> 这是一种非常简单，易于实现的方法。不过兼容性不好，在 IE 6-7 无法正常运行（又是辣鸡 IE 的问题）

```html
   <div class="container table">
      <div class="containerInner tableRow">
        <div class="column tableCell cell1">
          <div class="left aside">
            ....
          </div>
        </div>
        <div class="column tableCell cell2">
          <div class="content section">
            ...
          </div>
        </div>
        <div class="column tableCell cell3">
          <div class="right aside">
            ...
          </div>
        </div>
      </div>
    </div>
```

```css
.table {
  width: auto;
  min-width: 1000px;
  margin: 0 auto;
  padding: 0;
  display: table;
}
.tableRow {
  display: table-row;
}
.tableCell {
  display: table-cell;
  width: 33%;
}
.cell1 {
  background: #f00;
  height: 800px;
}
.cell2 {
  background: #0f0;
}
.cell3 {
  background: #00f;
}
```

### 5.4 利用边框和定位

> 使用边框和绝对定位来实现一个假的高度相等列的效果。结构简单，兼容各浏览器，容易掌握。假设你需要实现一个两列等高布局，侧栏高度要和主内容高度相等。

```html
<div id="wrapper">
    <div id="mainContent">...</div>
    <div id="sidebar">...</div>
</div>
```

```css
#wrapper {
  width: 960px;
  margin: 0 auto;
}
#mainContent {
  border-right: 220px solid #dfdfdf;
  position: absolute;
  width: 740px;
  height: 800px;  
  background: green;
}
#sidebar {
  background: #dfdfdf;
  margin-left: 740px;
  position: absolute;
  height: 800px;
  width: 220px;
}
```



## 6 - 粘连布局

### 介绍

- 高度足够时，会显示屏幕在底部
- 高度不够时，跟在内容下方，不显示

```html
    <div id="wrap">
      <div class="main">
        main <br />
        main <br />
        main <br />
      </div>
    </div>
    <div id="footer">footer</div>
```

```css
   * {
        margin: 0;
        padding: 0;
      }
      html,
      body {
        height: 100%;//高度一层层继承下来
      }
      #wrap {
        min-height: 100%;
        background: pink;
        text-align: center;
        overflow: hidden;
      }
      #wrap .main {
        padding-bottom: 50px;
      }
      #footer {
        height: 50px;
        line-height: 50px;
        background: deeppink;
        text-align: center;
        margin-top: -50px;
      }

```

### 原理

- `footer` 需要是一个独立结构，与 `wrap` 没有任何嵌套关系
- `wrap` 区域高度通过设置 `min-height`，变为窗口高度
- `footer` 要使用负 `margin` 确定自己的位置
- `main` 区域要设置和 `-margin` 对应的 `padding-bottom`，防止盖掉 `footer`





# 小技巧~集合



### 使用CSS复位

CSS复位可以在不同的浏览器上保持一致的样式风格。您可以使用CSS reset 库[Normalize](http://necolas.github.io/normalize.css/)等，也可以使用一个更简化的复位方法：

```
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

现在元素的 margin 和 padding 已为0，`box-sizing`可以管理您的CSS盒模型布局。

> 注意：如果你遵循接下来[继承 `box-sizing`](https://github.com/AllThingsSmitty/css-protips/tree/master/translations/zh-CN#inherit-box-sizing)讲解的这个技巧, 你不需要在以上代码中添加 `box-sizing` 属性。



### 继承 `box-sizing`

从 `html` 元素继承 `box-sizing` ：

```
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
```

> 如此在插件或其它组件里改变 `box-sizing` 变得简单。



### 使用`unset`而不是重置所有属性

重置元素的属性时，不需要重置每个单独的属性：

```
button {
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  outline: none;
  padding: 0;
}
```

你可以用`all`简写來指定所有元素的属性。 将该值设置为`unset`会将元素的属性更改为其初始值：

```
button {
  all: unset;
}
```

> **注意：** 所有速记在IE11中不被支持，目前正在考虑Edge的支持。 IE11不支持`unset`。



### 使用 `:not()` 选择器来决定表单是否显示边框

先为元素添加边框

```
/* 添加边框 */
.nav li {
  border-right: 1px solid #666;
}
```

为最后一个元素去除边框

```
/* 去掉边框 */
.nav li:last-child {
  border-right: none;
}
```

不过不要这么做，使用 `:not()` 伪类来达到同样的效果：

```
.nav li:not(:last-child) {
  border-right: 1px solid #666;
}
```

> 当然，你也可以使用 `.nav li + li`，但是 `:not()` 更加清晰，具有可读性。



### 为 `body` 元素添加行高

不必为每一个 `<p>`，`<h*>` 元素逐一添加 `line-height`，直接添加到 `body` 元素：

```
body {
  line-height: 1.5;
}
```

> 文本元素可以很容易地继承 `body` 的样式。



### 为表单元素设置 `:focus`

依靠焦点确定键盘事件在页面中的位置，突出表单元素焦点，与浏览器默认实现保持一致。

```
a:focus,
button:focus,
input:focus,
select:focus,
textarea:focus {
  box-shadow: none;
  outline: #000 dotted 2px;
  outline-offset: .05em;
}
```



### 垂直居中任何元素

可以垂直居中任何元素：

```
html,
body {
  height: 100%;
  margin: 0;
}

body {
  -webkit-align-items: center;  
  -ms-flex-align: center;  
  align-items: center;
  display: -webkit-flex;
  display: flex;
}
```

...还有CSS Grid:

```
body {
  display: grid;
  height: 100vh;
  margin: 0;
  place-items: center center;
}
```

这还不够？垂直方向，水平方向？任何元素，任何时间，任何地点？CSS-Tricks [有篇好文](https://css-tricks.com/centering-css-complete-guide/) 讲到了各种居中的技巧。

> **注意：** IE11 对 flexbox 的支持[有点 bug](https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items)。



### 逗号分隔列表

使列表的每项都由逗号分隔：

```
ul > li:not(:last-child)::after {
  content: ",";
}
```

因最后一项不加逗号，可以使用 `:not()` 伪类。

> **注意：** 这一技巧对于无障碍，特别是屏幕阅读器而言并不理想。而且复制粘贴并不会带走CSS生成的内容,需要注意。



### 使用负的 `nth-child` 来选择元素

使用负的 `nth-child` 可以选择 1 至 n 个元素。

```
li {
  display: none;
}

/* 选择第 1 至第 3 个元素并显示出来 */
li:nth-child(-n+3) {
  display: block;
}
```

或许你已经掌握了[如何使用 `:not()`](https://github.com/AllThingsSmitty/css-protips/tree/master/translations/zh-CN#use-not-to-applyunapply-borders-on-navigation)这个技巧，试下这个：

```
/* 选择除前3个之外的所有项目，并显示它们 */
li:not(:nth-child(-n+3)) {
  display: none;
}
```

> 如此简单！妈妈再也不用担心......



### 使用 SVG 图标

没有理由不使用 SVG 图标：

```
.logo {
  background: url("logo.svg");
}
```

SVG 在所有分辨率下都可以良好缩放，并且支持所有 IE9 以后的浏览器，丢掉你的 .png, .jpg, 或 .gif-jif-whatev 文件吧。

**注意：** 针对仅有图标的按钮，如果 SVG 没有加载成功的话，以下样式对无障碍有所帮助：

```
.no-svg .icon-only::after {
  content: attr(aria-label);
}
```



### 使用 “形似猫头鹰” 的选择器

这个名字可能比较陌生，不过通用选择器 (`*`) 和 相邻兄弟选择器 (`+`) 一起使用，效果非凡：

```
* + * {
  margin-top: 1.5em;
}
```

在此示例中，文档流中的所有的相邻兄弟元素将都将设置 `margin-top: 1.5em` 的样式。

更多 “形似猫头鹰” 的选择器，可参考 *A List Apart* 上面 [Heydon Pickering 的文章](http://alistapart.com/article/axiomatic-css-and-lobotomized-owls)



### 使用 `max-height` 来建立纯 CSS 的滑块

`max-height` 与 overflow hidden 一起来建立纯 CSS 的滑块：

```
.slider {
  max-height: 200px;
  overflow-y: hidden;
  width: 300px;
}

.slider:hover {
  max-height: 600px;
  overflow-y: scroll;
}
```

鼠标移入滑块元素时增大它的 `max-height` 值，便可以显示溢出部分。



### 创造格子等宽的表格

`table-layout: fixed` 可以让每个格子保持等宽：

```
.calendar {
  table-layout: fixed;
}
```

无痛的 table 布局。



### 利用 Flexbox 去除多余的外边距

与其使用 `nth-`， `first-`， 和 `last-child` 去除列之间多余的间隙，不如使用 flexbox 的 `space-between` 属性：

```
.list {
  display: flex;
  justify-content: space-between;
}

.list .person {
  flex-basis: 23%;
}
```

列之间的间隙总是均匀相等。



### 利用属性选择器来选择空链接

当 `<a>` 元素没有文本内容，但有 `href` 属性的时候，显示它的 `href` 属性：

```
a[href^="http"]:empty::before {
  content: attr(href);
}
```

相当简便。



### 给 “默认” 链接定义样式

给 “默认” 链接定义样式：

```
a[href]:not([class]) {
  color: #008000;
  text-decoration: underline;
}
```

通过 CMS 系统插入的链接，通常没有 `class` 属性，以上样式可以甄别它们，而且不会影响其它样式。



### 一致垂直节奏

通用选择器 (`*`) 跟元素一起使用，可以保持一致的垂直节奏：

```
.intro > * {
  margin-bottom: 1.25rem;
}
```

一致的垂直节奏可以提供视觉美感，增强内容的可读性。



### 固定比例盒子

要创建具有固定比例的一个盒子，所有你需要做的就是给 div 设置一个 padding：

```
.container {
  height: 0;
  padding-bottom: 20%;
  position: relative;
}

.container div {
  border: 2px dashed #ddd;	
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
```

使用20％的padding-bottom使得框等于其宽度的20％的高度。与视口宽度无关，子元素的div将保持其宽高比（100％/ 20％= 5:1）。



### 为破碎图象定义样式

只要一点CSS就可以美化破碎的图象：

```
img {  
  display: block;
  font-family: sans-serif;
  font-weight: 300;
  height: auto;
  line-height: 2;
  position: relative;
  text-align: center;
  width: 100%;
}
```

以添加伪元素的法则来显示用户信息和URL的引用：

```
img::before {  
  content: "We're sorry, the image below is broken :(";
  display: block;
  margin-bottom: 10px;
}

img::after {  
  content: "(url: " attr(src) ")";
  display: block;
  font-size: 12px;
}
```

了解更多关于这类样式的技巧 [Ire Aderinokun](https://github.com/ireade/)的 [原帖](http://bitsofco.de/styling-broken-images/).



### 用 `rem` 来调整全局大小；用 `em` 来调整局部大小

在根元素设置基本字体大小后 (`html { font-size: 100%; }`), 使用 `em` 设置文本元素的字体大小:

```
h2 { 
  font-size: 2em;
}

p {
  font-size: 1em;
}
```

然后设置模块的字体大小为 `rem`:

```
article {
  font-size: 1.25rem;
}

aside .module {
  font-size: .9rem;
}
```

现在，每个模块变得独立，更容易、灵活的样式便于维护。



### 隐藏没有静音、自动播放的影片

这是一个自定义用户样式表的不错的技巧。避免在加载页面时自动播放。如果没有静音，则不显示视频：

```
video[autoplay]:not([muted]) {
  display: none;
}
```

再次，我们利用了 [`:not()`](https://github.com/AllThingsSmitty/css-protips/tree/master/translations/zh-CN#use-not-to-applyunapply-borders-on-navigation) 的优点。



### 使用选择器`:root`来控制字体弹性

在响应式布局中，字体大小应需要根据不同的视口进行调整。你可以计算字体大小根据视口高度的字体大小和宽度，这时需要用到`:root`:

```
:root {
  font-size: calc(1vw + 1vh + .5vmin);
}
```

现在，您可以使用 `root em`

```
body {
  font: 1rem/1.6 sans-serif;
}
```



### 为更好的移动体验，为表单元素设置字体大小

当触发`<select>`的下拉列表时，为了避免表单元素在移动浏览器（IOS Safari 等等）上的缩放，加上`font-size`：

```
input[type="text"],
input[type="number"],
select,
textarea {
  font-size: 16px;
}
```



### 使用指针事件來控制鼠标事件

[指针事件](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)允許您指定鼠标如何与其触摸的元素进行交互。 要禁用按钮上的默认指针事件，例如：

```
.button-disabled {
  opacity: .5;
  pointer-events: none;
}
```

就这么简单。