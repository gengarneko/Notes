我们在 `mousemove` 方法中使用画点：

```js
  var div = document.getElementById('canvas')
  var flag = false
  // 按下鼠标
  div.onmousedown = function (e) {
    flag = true
    var x = e.clientX
    var y = e.clientY
    console.log(x);
    console.log(y);
    var divA = document.createElement('div')
    div.appendChild(divA)
    divA.style = "width:6px; height: 6px; background: black; border-radius: 3px; position: absolute;" + "left:" + (x-3) +"px;" + "top:" + (y-3) +"px;"
    // console.log('1');
  }
  // 移动鼠标
  div.onmousemove = function (e) {
    if (flag === true) {
      var x = e.clientX
      var y = e.clientY
      console.log(x);
      console.log(y);
      var divB = document.createElement('div')
      div.appendChild(divB)
      divB.style = "width:6px; height: 6px; background: black; border-radius: 3px; position: absolute;" + "left:" + (x-3) +"px;" + "top:" + (y-3) +"px;"
    }
    // console.log('1');
  }
  // 松开鼠标
  div.onmouseup = function () {
    flag = false
    console.log('0');
  }
```

可以看出，我们新增了锁 `flag`，只有在按下鼠标，锁是开着的时候，才能进行绘画，离开鼠标则重新锁上。



但是浏览器触发事件的时候是有间隔的，所以我们快速移动鼠标的时候，是没办法画一条漂亮的实线的。

浏览器为这个需求特意提供了一个元素叫做 `canvas`：

```html
  <style>
    body { margin: 0; }
    #xxx {
      background: red;
      display: block;
    }
  </style>
</head>

<body>
  <canvas id="xxx"></canvas>
</body>
```

`canvas` 默认是一个 `inline-block` 元素，所以我们需要将它变成 `block` 形式。



我们来看一个简单的例子：

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

![](https://mdn.mozillademos.org/files/228/canvas_ex1.png)