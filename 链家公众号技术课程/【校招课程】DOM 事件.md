# DOM 事件

> 上一篇 DOM 基础已经让大家对 DOM 有了基本的了解，其实在讲 DOM 操作过程中已经涉及到事件概念，因为 JavaScript 与 DOM 的交互就是通过事件来实现的，这两者基本密不可分，因此本文对 DOM 事件基础做个简单的介绍。

## 一、事件流

在之前的分享有介绍过浏览器的发展历程，而在浏览器发展到第四代，浏览器开发团队遇到一个很有意思的问题：页面的哪一部分会拥有某个特定的事件？要明白这个问题问什么，可以想象画在一张纸上的一组同心圆。如果你的手指放在圆心里面，那么你的手指指向的不是一个圆，而是纸上的所有同心圆。两家公司的浏览器开发团队在看待这个事件方面还是一致的，如果你单击了某个按钮，他们都认为单击事件不仅仅发生在按钮上。换句话说，再单击按钮的同时，也单击按钮的容器元素，甚至单击了整个页面。（本段摘自《JavaScript 高级程序设计（第三版）》）

虽然双方对浏览事件方面的看法一致，但是对事件流（描述从页面接收事件的顺序）的看法却是完全相反的、IE 的事件流是事件冒泡，而 Netscape Communicatior 的事件流是事件捕获流。

### 1.事件冒泡

IE 提出的事件流叫事件冒泡（event bubbling），即事件由最具体的元素接收，然后逐级向上传播，如下：

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYpJkw5YJUEzmibuKJz0TqjtZiaM4ibt7ecnhXpXz8IdjhpmyRsVdpejdJnA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

事件冒泡的传播顺序如下图所示：div、body、html、document

![img](https://mmbiz.qpic.cn/mmbiz_jpg/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJow167aV5VQVuD6zOictO2hOzdOmorkGvghKOwjkbVJ0lXQmXr8d3SpRtg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### 2.事件捕获

Netscape 提出的事件流叫事件捕获（event capturing），即事件由最外层元素接收，然后传播到具体元素。

事件捕获的传播顺序如下：document、html、body、div

![img](https://mmbiz.qpic.cn/mmbiz_jpg/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJowLOgAOjXiau2E7baUz9sHzowXKiaoqBkRHgw7mnibI44zzs1MS0Fhxiay3w/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### 3.DOM 2 事件流

随着标准的逐步完善和规范，W3C 在 DOM2 级事件中规定，事件流包含三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。

还是以前面的示例为例，DOM2 事件流的传播顺序为：document -> html -> body -> div -> body -> html -> document

![img](https://mmbiz.qpic.cn/mmbiz_jpg/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJowp1fLG35wUADCBRKkxNU7mygrpueQygvCgVgCWyDPPpSjd6yq75w8aA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

明白了事件流，那么，我们来看一个示例，看看事件流的传播。

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYpiahUsXpwmVHK5qibGGUVhu0dO8QkWWXPny1QLSKoZwspaFxbHByPMBaA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

运行这个示例，我们发现事件的触发过程是：

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYpSZW9qHFISQ35bdqyJDAHWcyiboq9PnL6APQpM8NaD1Eo6Xm9V9RzyCg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 二、事件注册

在前面我们已经了解了事件流的概念，为了检测到事件的触发，我们需要一种机制来监听事件是否发生了，这就是事件注册或者说事件监听。

目前一共有两种事件注册方式：DOM 0 级事件注册和 DOM 2 级事件注册。

### 1.DOM 0 级事件注册

注册方式：element['on' + 事件类型] = function () {}，特点：

- 兼容性好
- 对同一元素的事件注册后面覆盖前面

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYpqeKiaQbnU8kCLUlFMzYcz38CfeicZaHN6kcAETwHD0a5MuIrH3dtRu8A/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

运行我们发现，只有第二次注册的事件生效了，第一次注册的被覆盖。

### 2.DOM 2 级事件注册

注册方式：element.addEventListener（事件类型, 回调函数, 是否冒泡），特点：

- 兼容性差，低版本浏览器不支持
- 对同一元素可以多次绑定通类型的事件，并按照绑定顺序触发执行

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYpn8ML8ybg3sbDePa8KCnJkAInv73sSMYz4ld7T6Pc9TuPHZhtoggyFw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

运行上述代码，我们发现两次注册的事件均得以执行。

根据前面介绍，我们在注册事件时，通常使用捕获或者冒泡，如下代码所示：

- btn.addEventListener('click',func, false) //冒泡方式
- btn.addEventListener('click',func, true)  //捕获方式

### 3.事件移除

既然事件可以注册，那么是不是也可以移除呢？答案是当然。针对前面两种事件注册的方式，我们分别来讲解如何移除事件注册。

对于 DOM0 级的事件注册，浏览器并没有提供专门的移除方式，但是我们可以根据其覆盖的特点来实现移除的效果，如下：

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYpEgRvOaBSa65B6I3Sge3yF7uCb3n4dp7wergUdqqxxTZVpWfKTN2xwA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

对于 DOM2 级的事件注册，浏览器提供了专门的方法来实现 removeEventListener，在移除注册的事件时，removeEventListener 的参数需要和 addEventListener 保持一致。如下：

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYpnddqTVgFnJTY5m9WicsmHdA3tBbia4ErNRRlYRuialRf7ibUbf1nOzSaMg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 三、事件对象

事件发生之后，会生成一个事件对象，作为参数传给监听回调函数。

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYpiaYGHg4D3Nic3ibRauGzowht3icjWicV9Ls5joK2yzHH7Px4lyFEgMtB3zA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

上面的示例代码，我们看到 event 即为当前事件对象，该对象会提供一些属性和方法。

### 1.target 与 currentTarget

在事件注册回调函数中，我们通常会需要知道当前触发的 DOM 元素是谁？于是，我们可以通过 target 和 currentTarget 来判断，但是提供的这两个对象有什么区别呢？

为了看出 target 与 currentTarget 的区别，我们可以运行下面的代码，点击按钮 btn 时，输出结果是：

![img](https://mmbiz.qpic.cn/mmbiz_jpg/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJowMaZxXrlSbeCttOlBx9rmbFLnYks1comMHMYTKUEicwH3R0EDGrXPaIg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

我们来分析下，因为注册事件用的冒泡方式，所以在点击 btn 时，先触发 btn 上的注册事件，然后再触发 box 的注册事件，因为事件流在btn上传播时，当前触发对象和传播对象都是 btn，所以 target 与 currentTarget 是相同的，但是传播到 box 时，target 是 btn，而 currentTarget 是 box，由此我们可以得出结论：target 是指事件触发的对象，而 currentTarget 则指当前传播到的对象。

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYpKeDFCRBvQX7yjBkzy1P2PEp1NUNgVnljTibNCNoLqiaKIL2n0ic5yQmjg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### 2.阻止事件默认行为

有时候我们在实现一个功能时，需要用 a 标签作为目标对象，但是不想触发 a 标签的链接跳转这一默认行为，那我们该怎么办？这时候我们可以依赖 event 的 preventDefault 方法。

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYpNS5tmCiaKxkicp1e6l0Q9ia9fLekjANlzT7wjqXDMWLRBRpQrubvOmj5g/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

我们可以试着对比下注释 event.preventDefault() 这行代码和不注释的情况，我们发现，注释时，点击 a 标签，跳转到了链家网，如果不注释，则未跳转。

### 3.阻止事件冒泡和阻止事件传播

假设我们的 html 如下：

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYpPDmkhjXgBkF00eOFGXNSB0xYTSaibqzR7e0rM3csMnKSMbWAhzp0YYg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

首先，我们运行如下代码：

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYpia4ZHkCaicWsoopv0Ah7KqIhObPRQJ1CLJZFJhENIwEeA32ia77kqtJ8g/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

我们在这里用的是捕获方式注册事件的，点击btn，我们发现输出结果如下：

![img](https://mmbiz.qpic.cn/mmbiz_jpg/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJow3XVSzobbRibhM5CUAQpoJTYGczbIH9nKp7kZKzcROS2JnFpN4pbZq7g/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

如果去掉注释，我们发现捕获阶段未执行

![img](https://mmbiz.qpic.cn/mmbiz_jpg/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJowNIlbSiamcoSSnewBYr72WnGY4L1EkgV4Y7lULljt5R9R8kV4ePcFmXQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

同样，我们如果采用冒泡的方式注册事件，我可以发现 stopPropagation 也能注册冒泡阶段的执行。于是，我们能够得出这样的结论： stopPropagation 可以阻止冒泡或捕获阶段的执行。所以，通常我们说 stopPropagation 用来组织冒泡其实是不全面的，虽然我们一般用冒泡的方式来注册事件，stopPropagation 就是用来阻止冒泡，但是我们不能否认组织捕获的能力。

搞清楚了 stopPropagation 的作用，我们还有一个跟这个方法很相似的 stopImmediatePropagation 方法，这个方法的作用又是什么呢？很显然，浏览器提供了两个方法，必然有不一样的作用，下面我们就来一探究竟。

我们分别执行以下两段代码：

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYpkb3C05vvkqLjt1iaxItmrOibJKlIo4sY23uQ3SoYCibOjhpHPzWfHhOew/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

执行第一段，点击 btn 我们可以看到输出如下结果：

![img](https://mmbiz.qpic.cn/mmbiz_jpg/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJowRjrnrxLsE7Mzstz7PcUNoqKrELEZ2k6aG4ca3hAqHBBpklb8saWicpg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

因为捕获被阻止了，所以 btn 上的注册事件未触发，符合我们的预期。

执行第二段代码，点击 btn 我们可以看到如下输出结果：

![img](https://mmbiz.qpic.cn/mmbiz_jpg/NPYic93bDvFyv3rMTxuWwsiaJhrdRjTJowE5YoX28jE58obP4LGqyK13p8xiaHWWtsryxsnwoibBtFduYrS7EC1CUQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)从结果我们可以，event.stopImmediatePropagation 不仅阻止了捕获阶段的触发，还阻止了注册在同一对象上其它注册事件的触发。

## 四、事件代理

因为事件的冒泡机制，我们可以利用这一特性来实现通过监听父级元素达到监听子级元素的功能，这种功能，我们称为事件代理。

假设有这样一个场景，我们需要给一个 ul 下面所有的 li 绑定 click 事件，如果 li 元素有1000个，那我们需要绑定1000次，光注册事件就得写1000行代码，显然不合理，这里我们就可以使用事件代理，把事件绑定在外层 ul 上，通过事件对象来处理，如下示例：

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYpHnagu4SlCwzibFich6qtkaCl8tzu7SWe0yAQyJWsVfVyplkwM0MaEdWg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

事件代理有几个优点：

- 程序解耦
- 可以监听动态变化的 DOM 元素
- 减少事件绑定，提升性能

## 五、自定义事件

除了浏览器预定义的事件外，在实际开发中，我们常常需要自定义事件来实现功能。如下，是一个简单的自定义事件的实现：

![img](https://mmbiz.qpic.cn/mmbiz_png/NPYic93bDvFzesSs73p3RfoXfswMSfIYp1ZFtpicoI8bBuOp8qoRIgawRvicAzAhZRVIjrkXYxX6zicWTfa6uDXiaaA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

示例中，我们新建了一个事件实例，并给元素绑定了自定义事件 test，我们预设当用户点击文档时就触发该自定义事件。

灵活运用自定义事件可以很好的对程序解耦，我们可以将一个复杂的功能分割成不同的小功能，每个功能绑定一个我们自定义的事件，譬如社交网站常见的点赞功能，只要满足我们的预设条件就触发该事件，这样，调用该功能变得很简单。

本质上来讲，自定义事件就是对观察者模式（也称订阅发布模式）的运用。

## 六、结束语 

感谢大家看到这里！由于篇幅有限，本文只简单做了介绍，在实际生产过程中远比本文示例复杂和对兼容性要求更好，因为在实际开发中需要处理更复杂的场景和兼容性。如果本文有所疏漏，或对本文有所疑问，请联系作者，非常感谢！



**参考资料**

- https://developer.mozilla.org/en-US/docs/Web/Events
- https://www.w3.org/TR/DOM-Level-2-Events/events.html
- 《JavaScript 高级程序设计（第3版）》