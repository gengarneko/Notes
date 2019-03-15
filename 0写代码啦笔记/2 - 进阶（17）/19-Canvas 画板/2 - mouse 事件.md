# mosue 事件

### 1. 按下鼠标

```js
	// 按下鼠标  
	document.onmousedown = function () {
    console.log('1');
  }
```

全局的鼠标按下事件

```js
  document.onmousedown = function (e) {
    console.log(e);
  }
```

我们可以通过打印事件 e 来查看这个鼠标事件里面有多少个属性：

```
MouseEvent {isTrusted: true, screenX: 629, screenY: 240, clientX: 621, clientY: 156, …}
  altKey: false
  bubbles: true
  button: 0
  buttons: 1
  cancelBubble: false
  cancelable: true
  clientX: 621
  clientY: 156
  composed: true
  ctrlKey: false
  currentTarget: null
  defaultPrevented: false
  detail: 1
  eventPhase: 0
  fromElement: null
  isTrusted: true
  layerX: 621
  layerY: 156
  metaKey: false
  movementX: 0
  movementY: 0
  offsetX: 621
  offsetY: 156
  pageX: 621
  pageY: 156
  path: (3) [html, document, Window]
  relatedTarget: null
  returnValue: true
  screenX: 629
  screenY: 240
  shiftKey: false
  sourceCapabilities: InputDeviceCapabilities {firesTouchEvents: false}
  srcElement: html
  target: html
  timeStamp: 861.7549999999028
  toElement: html
  type: "mousedown"
  view: Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
  which: 1
  x: 621
  y: 156
  __proto__: MouseEvent
```



### 2. 动鼠标

```js
  // 移动鼠标
  document.onmousemove = function () {
    console.log('1');
  }
```

我们能看到鼠标移动的时候，一直在触发事件。





### 3. 松开鼠标

```js
  // 松开你鼠标
  document.onmouseup = function () {
    console.log('1');
  }
```

按下鼠标的时候没有任何事情发生，松开的时候触发事件。



## 生成小圆圈

```js
div.onmousedown = function (e) {
    var x = e.clientX
    var y = e.clientY
    console.log(x);
    console.log(y);
    var divA = document.createElement('div')
    div.appendChild(divA)
    divA.style = "width:6px; height: 6px; background: black; border-radius: 3px; position: absolute;" + "left:" + (x-3) +"px;" + "top:" + (y-3) +"px;"
    // console.log('1');
  }
```

我们获取到具体的坐标轴之后，使用绝对定位，在目标位置生成 `div`。

> 使用 `-3` 来使得我们的圆心在鼠标上面。



















### clientX clientY

- event.clientX

- event.clientY

client 直译就是客户端，客户端的窗口就是指游览器的显示页面内容的窗口大小（不包含工具栏、导航栏等等）。

event.clientX、event.clientY 就是用来获取鼠标距游览器显示窗口的长度。

![img](https://upload-images.jianshu.io/upload_images/1245223-186b20021739e6f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/814/format/webp)



### offsetX offsetY

------

event.offsetX
 event.offsetY

offset意为偏移量，是被点击的元素距左上角为参考原点的长度，而IE、FF和Chrome的参考点有所差异。

Chrome下，offsetX offsetY是包含边框的，如图所示。



![img](https:////upload-images.jianshu.io/upload_images/1245223-06e00d7afadcb800.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/626/format/webp)

chrome下的offset参考点

而IE、FF是不包含边框的，如果鼠标进入到border区域，为返回负值，如图所示。



![img](https:////upload-images.jianshu.io/upload_images/1245223-df5b5aa5466c2170.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/468/format/webp)

IE、FF下的offset参考点

兼容性：IE9+,chrome,FF都支持此属性。



### screenX screenY

------

event.screenX
event.sreenY

screen顾名思义是屏幕，是用来获取鼠标点击位置到屏幕显示器的距离，距离的最大值需根据屏幕分辨率的尺寸来计算。

兼容性：所有游览器都支持此属性。





### pageX pageY

------

event.pageX
 event.pageY

page为页面的意思，页面的高度一般情况**client游览器**显示区域装不下，所以会出现垂直滚动条。

鼠标距离页面初始page原点的长度。



![img](https:////upload-images.jianshu.io/upload_images/1245223-c7157ef272a7bdfc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/652/format/webp)



在IE中没有pageX、pageY取而代之的是event.x、evnet.y。x和y在webkit内核下也实现了，所以火狐不支持x，y。

兼容性：IE不支持，其他高级游览器支持。