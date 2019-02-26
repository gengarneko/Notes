# DOM 基础

> 本次分享简单介绍一下 DOM，让大家对 DOM 有个基本的了解，因为只是作为介绍，因此文中说到的 API 并未对兼容性做详细的讲解，在实际运用时还需要考虑兼容性问题。

我们知道，JavaScript 最初诞生的目的是为了用于浏览器，但是随着发展 JavaScript 不仅仅只用于浏览器，所以我们在开发过程中，有些是 JavaScript 的语言特性，有些则由客户端提供的 API，我们最常用的客户端就是浏览器。

打开这个网站我们可以清晰地看到 Web API 的发展历程，从 MDN 文档，我们会发现浏览器已经提供了太多 API，有的是我们常用的，有的甚至都没见到过，今天我们则介绍下我们常用的 DOM 相关的 API。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJowWrK6icNCVl9ZaB6JAVTcPc1LNvEtj31ib6oC9iaFeB7p4pq3xRaCXbNXQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 一、什么是 DOM

MDN 是这么定义的：文档对象模型（DOM）是 HTML 和 XML 文档的编程接口。它给文档（结构树）提供了一个结构化的表述并且定义了一种方式——程序可以对结构树进行访问，以改变文档的结构、样式和内容。DOM 提供了一种表述形式——将文档作为一个结构化的节点组以及包含属性和方法的对象。从本质上说，它将 web 页面和脚本或编程语言连接起来了。

W3C DOM 和 WHATWG DOM 标准在绝大多数现代浏览器中都有对 DOM 的基本实现。许多浏览器提供了对 W3C 标准的扩展，所以在使用时必须注意，文档可能会在多种浏览器上使用不同的 DOM 来访问。

因为规范在不断地改变和完善，DOM 模型也在精简，所以有很多废弃不用和新增的接口，需要我们在使用过程中注意各种兼容问题。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJowYHic1LlnictmO9VPvoeqxyvJxd7pPheynz0g9XicBwPicHAPKvPdbdzV2A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 二、DOM 规范

我们从 W3C 的 DOM Technical Reports 来看，Document Object Model (DOM)目前有 Level 1，Level 2，Level 3，以及 Level4 三个标准。每一个 Level 的标准下又分为多个模块，其中 DOM2 Core Specification 的发布时间为2000-11-13，而 DOM3 Core Specification 的发布时间为2004-04-07，最新的 DOM4 发布于2015-11-19

- DOM1 在1998年10月份成为W3C的提议，由DOM核心与DOM HTML两个模块组成。DOM核心能映射以XML为基础的文档结构，允许获取和操作文档的任意部分。DOM HTML通过添加HTML专用的对象与函数对DOM核心进行了扩展
- DOM2 通过对象接口增加了对鼠标和用户界面事件（DHTML长期支持鼠标与用户界面事件）、范围、遍历 （重复执行DOM文档）和层叠样式表（CSS）的支持。同时也对DOM 1的核心进行了扩展，从而可支持XML命名空间。
- DOM3 通过引入统一方式载入和保存文档和文档验证方法对DOM进行进一步扩展，DOM3包含一个名为“DOM载入与保存”的新模块，DOM核心扩展后可支持XML1.0的所有内容，包扩XML Infoset、 XPath、和XML Base
- DOM4 添加了Mutation Observer替代Mutation Events。

DOM 的各个版本是独立的，这里说的 DOM2，DOM3其实主要指 DOM Core Specification 的版本，在 DOM Core Specification 中会写明这个版本的 DOM Core和哪些版本的标准一起组成新一代DOM标准。

DOM标准实际由很多的子模块组成，包括Core module，XML module，Events module，User interface Events module，Mouse Events module，Text Events module，Keyboard Events module，Mutation Events module，Mutation name Events module，HTML Events module，Load and Save module，Asynchronous load module，Validation module，和XPath module。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJowpHV4dPib9JKqgLkNzCEvX98U5WVutKAkJzEYeM8ibDlWtQrxWRK60AKg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 三、DOM 树

DOM 可以将 HTML 或者 XML 文档描绘成一个由多层节点构成的结构，看起来就像一个树的展开，如下图所示：

![img](https://mmbiz.qpic.cn/mmbiz_jpg/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJowUeV3khuWoXojibolfGXZbuvkibesMAsNF5byXv6AujSna6GNPlqtDr0w/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

从图中可以看到，节点包含了三种直接关系：

​	（1）同级节点关系 

​	（2）子节点关系 

​	（3）父节点关系。

当然也还有各种间接关系，子节点的子节点，父节点的父节点等。

### 曾经的 BOM

在早期浏览器很多 API 还未被纳入 DOM 标准里时，我们通常把window、history、location、navigator、screen等称作 BOM，随着时间的推移，DOM 标准的不断更新，这些 API 逐步纳入 DOM 标准里，因为我们常说的 BOM 其实是个历史称呼，以当前的规范来看，DOM 和 BOM 是包含关系，而不是并行的概念。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJow1fqSwFdFibOo0eTRDr0BwnoicKP10WeKic7upynicoAOkUpo7RNiccvCibicQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

BOM （即浏览器对象模型）的核心是window，而window对象又具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个Global（全局）对象。这意味着在网页中定义的任何对象，变量和函数，都以 window 作为其 global 对象。

### UA 检测

navigator 对象中最重要的作用就是使用 useragent 实现用户代理检测。如下示例：

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJowzvaicAgVb88PgxrHuR8euSJbtAuZOCb7nLZ5eu2XGh7vEW2fSOgHDAQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

通过ua，我们能检测平台、操作系统、浏览器内核、浏览器版本等等;不过，因为浏览器一直在更新，版本不一样，api的实现不一样，一般建议通过能力检测来做判断。

### URL 编码和解码

在实际开发中，我们经常会对 url 进行操作，包括编码和解码，而 URL 包含的合法字符有如下两种：

- URL 元字符：分号（;），逗号（,），斜杠（/），问好（?），冒号（:），at（@），&，等号（=），加号（+），美元（$），井号（#）。
- 语义字符：a-z，A-Z，0-9，连词号（-），下划线（_），点（.），感叹号（!），波浪线（~），星号（*），单引号（\），圆括号（()`）

JavaScript 提供了四个方法来处理编码解码的问题

- encodeURI：它会将元字符和语义字符之外的字符，都进行转义
- decodeURI：以上方法逆运算
- encodeURIComponent：只转除了语义字符之外的字符，元字符也会被转义
- decodeURIComponent：以上方法逆运算

代码示例：

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJowSdKQlxwBCdWrhldglxZmiaLwagXmVjcNMMG2ClV03t1gl2YytYtBdKw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

实际上，还有 escape 和 unescape 方法可以实现编解码，但是因为处理非ASCII 字符时使用了非标准实现，目前 W3C 已经废弃了这个函数，所以我们通常不建议使用。另外，考虑到安全问题，encodeURIComponent 和 decodeURIComponent 编解码更彻底，因为我们通常用这两个方法来实现编解码。

## 四、URL 操作

location 对象中最常用的作用就是操作 url，如下示例：

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJowVg5ayCYX4Ivty1NNOCQ8GAEd6yoxQzUVr7hDF3FE7wlic1xvUd58X0w/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

在实际开发中，我们最常用的就是对 search 和 hash 部分做各种操作，因为 DOM 原生接口只有上述代码所示，使用起来并不易用，因此通常我们会自己做一些方法的封装来作为基本的工具，如下示例：

![img](https://mmbiz.qpic.cn/mmbiz_jpg/NPYic93bDvFzesSs73p3RfoXfswMSfIYpXCXVxZNicQWQkSRKlou0kJeYeZkZ6OgcpXksFXyDDd4bXicIYnyIbZnQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

示例中我们提供了一个对象urlhash，对象提供了四个基本方法，分别是获得当前hash、添加hash、删除hash 和 清空所有 hash 。在这个示例代码中，我们就运用到了前面说的 encodeURIComponent 和 decodeURIComponent 。

## 五、DOM 操作

在前端开发过程中，对 DOM 操作几乎不可避免，所以让 DOM 操作变得方便的 JS 库 jquery 变得很流行，因为它把兼容性问题就包裹在你看不到的地方，让你轻轻松松就能对 DOM 进行增删查改，做酷炫的动画也变得不难。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJowBmiaS3Cic7NibGYnjbUe0lKUIyDUpcPhYVheVKAxV4icWwWEmGSdTbhVhw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

在前端开发过程中，对 DOM 操作几乎不可避免，所以让 DOM 操作变得方便的 JS 库 jquery 变得很流行，因为它把兼容性问题就包裹在你看不到的地方，让你轻轻松松就能对 DOM 进行增删查改，做酷炫的动画也变得不难。 

### 节点操作 

我们可以通过 js 来获取、创建、修改和删除节点。

#### 1.获取节点：

- getElementById 根据 id 获取元素
- getElementsByTagName 根据标签名获取元素
- getElementsByClassName 根据类名获取元素
- querySelector / querySelectorAll 根据选择器获取元素

 以上是直接获取节点元素，我们还可以通过节点之间的关系来获取节点。

##### 父子关系：

- element.parentNode 父节点
- element.firstChild 第一个子节点
- element.lastChild 最后一个子节点
- element.childNodes/element.children 子节点集合

在文档结构中，除了元素节点，还有文本节点，因此兄弟关系所示的四个方法，前两个既包含元素节点也包含文本节点，后面的两个方法则只包含元素节点。我们举一个例子来看看：

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYprzD9qibjSdL4kHR6nNqaYrEN61KgribFBWNt4s7r2x2fg5d2kzELjvUA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

在这个示例中，我们发现ulNode.previousElementSibling为null，而ulNode.previousSibling 为空文本，因为在 ul 和 body 之间有空格，被当做文本处理了。

#### 2.创建节点：

创建节点的方法很简单：

- var element = document.createElement('tagName')

但是，因为创建元素后还未添加到文档流中，所以无法使用，因为我们创建节点之后需要做的操作时插入节点 appendChild 和 insertBefore。

#### 3.修改节点

修改几点提供了多个方法，譬如符合规范的 textContent 和事实标准的 innerText，所以通常在开发中我们会对浏览器做一个能力检测判断。

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYpIXcaibvJicDNu6RYoYSEucORnibSot8n3dyiaZoiciclcc5CRwQGia1mcRN5g/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 4.删除节点

删除节点的方法也很简单，直接删除指定节点的子元素节点，如下所示：

- element.removeChild(child)

下面是对节点的创建、添加、修改、删除的完整实例：

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYpq0dYnkmnegLTJHhPicosdpuR4DwNwfuia6d2bfwRwGLUymTfRxCx8Uwg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### 属性操作

#### 1.获取属性

- 通过属性方法获取
- 通过 getAttribute 获取
- 通过 dataset 获取
- 通过 attributes

#### 2.修改属性

- 通过属性方法修改
- 通过 setAttribute 获取

#### 3.删除属性

​	DOM 提供了 removeAttribute 用来删除指定属性

### 样式操作

在设置样式的时候，我们有两种方式：

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYpuI67bWBwAV3dBL6aauymOyxmic7O76ByZHDPYia2TtCUC7vBudDAh0TA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 1.获取样式

- 通过 style[属性名] 获取
- 通过 getComputedStyle 

> 通过 style[属性名] 的方式来获取样式只能获取内联样式，而 getComputedStyle 顾名思义就是计算出来的最终值。另外，在通过 style[属性名] 获取样式时，有些属性是不能完全按照 css 属性来的，譬如 float，得改成 styleFloat 或者 cssFloat，还有用-连接的属性都得改为驼峰式，譬如 style[background-color] 就是错误的方式，得改为style[backgroundColor] 等等。

#### 2.修改样式

- 通过 style[属性名] 修改
- 通过 style.cssText 批量修改

## 六、动画

DOM 操作比较常见的一个应用就是动画，而动画概括起来可以用下面这个图来说明。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJow82Uo9ajVibxibOPMpicl4vWGj12G9vBApNFHFWZCYRiaOzkvovsCWxbO8w/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 这里的动画就是通过定时器，在一定时间内或者反复循环改变 DOM 节点的属性，实现关键帧动画（这里不包含 SVG 动画）

## 七、结束语

感谢大家看到这里！由于篇幅有限，本文只简单做了介绍，在实际生产过程中远比本文示例复杂和对兼容性要求更好，因此需要对 DOM 规范了解，更需要了解各浏览器的不同实现，有兴趣的同学可以研究 jquery 关于 DOM 这部分的源码，用到了很多本文不曾提到的 API。如果本文有所疏漏，或对本文有所疑问，请联系作者，非常感谢！



**参考资料**

- MDN：https://developer.mozilla.org/zh-CN/docs/Web/API
- 兼容性查阅：http://w3help.org/zh-cn/causes/index.html
- 查看可用：http://caniuse.com/
- WHATWG DOM：https://dom.spec.whatwg.org/
- W3C DOM：https://www.w3.org/DOM/







