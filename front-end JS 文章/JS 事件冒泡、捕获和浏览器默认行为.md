# JS 事件冒泡、捕获和浏览器默认行为

JavaScript 是一门主要应用于浏览器的交互性语言，所谓交互，就是跟用户建立一定的互动联系，比如用户店家表单提交按钮，浏览器应该响应用户的点击事件，并发送表单数据。今天我们一起来学 JS 事件，学习目录：

- DOM 事件流
- 事件冒泡
- 事件捕获
- 事件对象（event）
- 浏览器默认行为
- 事件委托
- 事件冒泡、捕获的应用场景

## 一、DOM 事件流

所谓的 DOM 事件流，指的是这三个阶段：事件捕获 --> 目标事件  --> 事件冒泡。

我们来看一个案例，index.html：

```html
<div id="div" style="background:pink;height:30px">
	<span id="span" style="background:orchid;">点我试试</span>
</div>
```

当我们点击 span 元素的时候，看看控制台输出什么。

test.js（DOM 事件流）

```js
window.addEventListener('click', function() {
  console.log('点击了 window')
})
document.addEventListener('click', function() {
  console.log('点击了 document')
})
document.documentElement.addEventListener('click', function() {
  console.log('点击了 html')
})
document.body.addEventListener('click', function() {
  console.log('点击了 body')
})
div.addEventListener('click', function() {
  console.log('点击了 div 标签')
}, true) // 注意，这里开启了捕获模式，默认 false 是冒泡
span.addEventListener('click', function(e) {
  console.log('点击了 span 标签')
})
```

我们可以清楚地看到，先触发捕获事件（div），然后到目标事件（span），最后一只向上冒泡到最顶层的对象（window）。

## 二、事件冒泡

**定义**：就是事件从开始目标，往上一直冒泡到页面最顶层的对象（window）。

**语法**：事件默认都是冒泡模式

- W3C 写法： `dom.addEventListener('eventName', fn, false)`，**默认是false，可不写**
- IE 写法： `dom.attachEvent('on+eventName', fn)`，**注意，IE没有捕获**

index.html

```html
<div id="div" style="background:pink;height:30px;">
  <span id="span" style="background:orchid;">点我试试</span>
</div>
```

test.js

```js
window.addEventListener('click', function() {
  console.log('点击了window')
})
document.addEventListener('click', function() {
  console.log('点击了document')
})
document.documentElement.addEventListener('click', function() {
  console.log('点击了html')
})
document.body.addEventListener('click', function() {
  console.log('点击了body')
})
div.addEventListener('click', function(e) {
  console.log('点击了div标签')
})
span.addEventListener('click', function(e) {
  console.log('点击了span标签')
})
```

事件一个接着一个冒泡：span div body html document window。

### 阻止事件冒泡

-  W3C 写法： `e.stopPropagation()` 或者 `return false`（不仅阻止了冒泡，还阻止了事件本身）
- IE 写法： `window.e.cancelBubble = true/false`

将 span 标签的点击事件进行阻止冒泡，看看控制台会输出什么：

```js
span.addEventListener('click', function(e) {
  console.log('点击了span标签')
  e.stopPropagation();
})
```

我们可以看到，只有 span 响应了该点击事件，但是这里的解决方案没有兼容 IE，我们来写一个兼容版本：

```js
function handlePropagation(e) {
    let e = e || window.event
    if (e.stopPropagation) {
        e.stopPropagation(); // 除IE外
    } else {
        e.cancelBubble = true; // IE专属
    }
}
```

## 三、事件捕获

**定义**：事件从被点击元素是层级最高的祖先元素（设置捕获为 true）开始，一直渗透到其下所有的子元素。一网打尽~

**语法**：

- W3C：`dom.addEventListener('evnetName', fn, true)`

测试一下他的用法：

```js
window.addEventListener('click', function() {
  console.log('点击了window')
})
document.addEventListener('click', function() {
  console.log('点击了document')
})
document.documentElement.addEventListener('click', function() {
  console.log('点击了html')
})
document.body.addEventListener('click', function() {
  console.log('点击了body')
})
div.addEventListener('click', function(e) {
  console.log('点击了div标签')
}， true)
span.addEventListener('click', function(e) {
  console.log('点击了span标签')
})
```

首先点击获得的是 span 元素的父元素 div，然后才传递给 span 元素。如果我们将 body 也设置为捕获模式，结果会是什么？明显是：body div span

```js
window.addEventListener('click', function() {
  console.log('点击了window')
})
document.addEventListener('click', function() {
  console.log('点击了document')
})
document.documentElement.addEventListener('click', function() {
  console.log('点击了html')
})
document.body.addEventListener('click', function(e) {
  console.log('点击了body')
}, true)
div.addEventListener('click', function(e) {
  console.log('点击了div标签')
}, false)
span.addEventListener('click', function(e) {
  console.log('点击了span标签')
  // e.stopPropagation();
})
```

从图可以看出，事件的传递顺序是：body span div html document window

如果给 span 标签设置了阻止事件冒泡，其他的不变：

```js
span.addEventListener('click', function(e) {
  console.log('点击了span标签')
  e.stopPropagation();
})
```

事件传递顺序：body span。因为此时 div 为冒泡模式，而 span 已经阻止了冒泡，所以不会一直往上冒泡到上层对象

## 四、浏览器行为

**定义**：就是标签特有的响应某一事件的行为。

例如：

1. `<a href="www.baidu.com">`，当点击 a 标签，自然会跳转到百度搜索页。
2. `<input type="checkbox">`，点击这个 checkbox，就会被勾选中。
3. `<button type="submit">`，点击按钮之后，页面就会提交表单信息。

### 阻止浏览器默认行为

- W3C：`e.preventDefault()`
- IE：`window.event.returnValue = false`

因此综合一下，可以很快给出兼容版本的阻止默认代码，但是在取消默认行为之前，一定要判断一下是否可以取消默认行为，否则会报错。

```js
function handlePropagation(e) {
    let e = e || window.event
    if (e.preventDefault) {
        e.preventDefault(); // 除IE外
    } else {
        e.returnValue = false; // IE专属
    }
}
```

## 五、事件对象（event）

事件对象有以下几个属性值：

1. `target`
2. `timeStamp`
3. `type`（事件类型）
4. `currentType`（最开始触发事件的节点）
5. `pageX`（事件触发的 x 轴坐标）
6. `pageY`（事件触发的 y 轴坐标）
7. `which`（鼠标的左、中、右键值（1、4、2））

```js
div.addEventListener('click', function(e) {
  console.log('=======点击了div标签=======')
  console.log('当前目标对象：', e.target)
  console.log('当前时间戳：', e.timeStamp)
  console.log('当前目标对象节点', e.target.id)
  console.log('当前节点（最先开始触发事件的节点）：', e.currentTarget.id)
  console.log('当前事件类型：', e.type)
  console.log('当前事件发生的横坐标点：', e.pageX)
  console.log('当前事件发生的纵坐标点：', e.pageY)
  console.log('当前点击鼠标的哪个键：', e.which)
  console.log('==========================')
}, false) // 注意：这里是false，如果改成捕获模式，当点击span标签时，e.currentTarget.id会输出div
span.addEventListener('click', function(e) {
  console.log('点击了span标签')
  e.stopPropagation();
})
```

`e.target.id`表示的是触发事件的标签名称，我们可以根据这一点进行控制节点事件的响应。比如，点击 `div` 标签，只有它响应，其它 DOM 节点不准响应。也就是说点谁谁响应，这就涉及事件委托。

## 六、事件委托

**定义**：所谓事件委托，顾名思义，就是将事件的响应交由其它节点对象去处理。

**理解**：老板交给你一个任务，你不会做，但是你可以委托你的朋友去完成，他完成之后，交给老板。这个场景中，老板不在乎你是怎么完成它的，只关心结果。也就是说我点击了 span，它只要给我响应事件就行，我并不关心它是怎么响应的（委托给第三方/亲自解决）。

我们来试一下：

```html
<div id="div" style="background:pink;height:30px;">
  <span id="span" style="background:orchid;">点我试试</span>
</div>
```

```js
window.addEventListener('click', function() {
  console.log('点击了window')
})
document.addEventListener('click', function(e) {
  console.log(e.target)
  if (e.target.id == 'div') { // 注意：这里的id是HTML结构中有的id名称，如果没有e.target.id返回undefined
    console.log(`点击了${e.target.id}标签`)
  }
  if (e.target.id == 'span') {
    console.log(`点击了${e.target.id}标签`)
  }
  e.stopPropagation()
})
```

从上图可以看出，点击了 span 元素，只有 span 响应了该事件，其余节点不吭声。但是需要注意一个小细节，就是在获取当前事件节点标签名称的时候，如果该标签有 id 属性名，可以直接 `e.target.id` 获取到小写的标签名称。如果没有设置 id，我们可以使用 `e.target.nodeName` 来获取标签名称，不过是大写的。

多个 li 中，鼠标移上去，添加背景，其余 li 无背景：

```html
<body>
<ul id="ul">
  <li>123</li>
  <li>456</li>
  <li>789</li>
</ul>
<script>
// 传统的写法
document.body.onload = function(){
   var oUl = document.getElementById("ul")
   var aLi = oUl.getElementsByTagName("li")
   var i = 0
   for(; i < aLi.length; i++) {
      aLi[i].onmouseover = function() {
         this.style.background = "gray"
      }
      aLi[i].onmouseout = function() {
         this.style.background = ""
      }
   }
}
// 采用事件委托，委托给 document 帮忙处理
window.onload = function(){
  document.addEventListener('mouseover', function(e) {
    var e = e || window.event
    var target = e.target || e.srcElement
    if (e.target.nodeName.toLowerCase() == 'li') {
      e.target.style.background = 'gray'
    }
  })
  document.addEventListener('mouseout', function(e) {
    var e = e || window.event
    var target = e.target || e.srcElement // IE：e.srcElement
    if (e.target.nodeName.toLowerCase() == 'li') {
      e.target.style.background = ''
    }
  })
}
</script>
</body>
```

这里还需要注意一个问题：如果是动态创建的节点，则新添加的节点在传统的写法中是没有该事件。因为事件是循环出来的，在添加新节点的时候，for 循环已经结束了。所以新添加的节点当然不会拥有该事件，怎么让他拥有该事件呢？

```html
<ul id="ul">
  <li>123</li>
  <li>456</li>
  <li>789</li>
</ul>
<button id="btn">添加li节点</button>
```

```js
window.onload = function() {
  // 新增节点
  oBtn.onclick = function(){
    iNow ++;
    var oLi = document.createElement("li");
    oLi.innerHTML = 1111 *iNow;
    oUl.appendChild(oLi);
  }

  var oUl = document.getElementById("ul");
  var aLi = oUl.getElementsByTagName("li");
  // 为每一个li节点添加mouseover、mouseout事件
  for(var i=0; i<aLi.length; i++){
    aLi[i].onmouseover = function(){
      this.style.background = "red";
    }
    aLi[i].onmouseout = function(){
      this.style.background = "";
    }
    console.log(aLi[i])
  }
}
```

![](https://pic4.zhimg.com/80/v2-f9fadfa30dc81ea0ee0a05268bab38df_hd.jpg)

解决方案可以采用事件委托：

```js
// 采用事件委托，委托给document帮忙处理
window.onload = function(){
  document.addEventListener('mouseover', function(e) {
    var e = e || window.event
    var target = e.target || e.srcElement
    if (e.target.nodeName.toLowerCase() == 'li') {
      e.target.style.background = 'gray'
    }
  })
  document.addEventListener('mouseout', function(e) {
    var e = e || window.event
    var target = e.target || e.srcElement // IE：e.srcElement
    if (e.target.nodeName.toLowerCase() == 'li') {
      e.target.style.background = ''
    }
  })
}
```

## 七、哪些事件可以冒泡，哪些不可以（常用）

#### 冒泡事件：

1. `click`
2. `dblclick`
3. `copy`
4. `cut`
5. `drag`
6. `mouseover` 指针移动到有监听事件的元素，或者其子元素（有渗透，作用范围渗透到其子元素）
7. `mouseout`指针移除元素，或者其子元素

#### 不冒泡事件

1. blur
2. focus
3. load
4. unload