# 图片热区组件开发



# 1 - React 实现



## 1.1 目录

1. 什么是热区
2. 热区功能介绍
3. 实现手段与结构划分
4. 相关指令介绍
5. 体验增强
6. 其他总结



## 1.2 什么是热区

热区，是指在一张图片上选取一些区域，每个区域链接到指定的地址。

因此，热区组件的功能，就是在图片上设置多个热区区域并配置相应的数据。



## 1.3 热区功能介绍

热区需要实现的功能：

1. 创建热区区域
2. 热区大小可调整
3. 热区位置可更改
4. 热区数据可设置
5. 设置数据可显示



## 1.4 实现手段与结构划分

> MVVM 讲究以数据为驱动，然而热区这类场景往往需要大量的 DOM 操作。

还好，Vue 等框架都提供了**自定义指令 directive**，方便开发者对纯 DOM 元素进行底层操作。

这也避免了在节点上大量挂载的 `on-` 开头的属性：

```html
<!-- not so good -->
<div on-keydown={this.handleKeyDown($event)}></div>

<!-- better -->
<div r-keydown></div>
```

由上可知，热曲组建重度依赖指令，我们将代码结构最终设定为：

```shell
src
 ├── assets
 │      ├── directive
 │      │     ├── addItem.js        添加热区指令
 │      │     ├── changeSize.js     改变尺寸指令
 │      │     ├── dragItem.js       移动位置指令
 │      │     ├── resizeImg.js      图片resize处理指令
 │      │     └── ...
 │      ├── constant.js             通用常量
 │      ├── filter.js               过滤器
 │      ├── operations.js           处理逻辑封装
 │      └── util.js                 工具函数
 ├── components
 │      ├── modal                   数据设置模态窗组件
 │      └── zone                    热区区域组件
 ├── mcss
 │      ├── _reset.mcss             限定作用范围的样式 reset
 │      └── index.mcss              基本样式
 ├── index.js                       组件入口
 └── view.html                      组件模板
```



## 1.5 相关指令介绍

> 指令一般需要返回一个函数用于指令销毁工作。
>
> 为什么要返回销毁函数，而不是通过监听 **$destroy** 事件来完成？
>
> 因为指令的销毁并不一定伴随着组件销毁，指令的生命周期更短，一些语法元素（ `if/list/include` ）会导致它在组件销毁之前被重复创建和销毁。

由于热区组件使用了较多的事件监听，基于上述考虑，热区操作指令中都返回了用于 **事件解绑** 的函数。

---

**新增热区**、**拖拽热区**和**调整热区大小**这几个指令，都存在三个操作阶段：

1. mousedown：鼠标选中；
2. mousemove：移动鼠标，此时通过 js 改变元素的样式，但是不对真实数据做修改；
3. mouseup：释放鼠标，将改动保存到真实数据中。

```js
import { dom } from 'regularjs';

export default function (content) {

    dom.on(content, 'mousedown', handleMouseDown);

    function handleMouseDown(e) {
        // ...

        dom.on(window, 'mousemove', handleChange);
        dom.on(window, 'mouseup', handleMouseUp);

        function handleChange(e) {
            // ...
        };

        function handleMouseUp() {
            // ...

            dom.off(window, 'mousemove', handleChange);
            dom.off(window, 'mouseup', handleMouseUp);
        };
    }

    return () => {
        // 解绑 mousedown 事件
        dom.off(content, 'mousedown', handleMouseDown);
    };
}
```

这里可以做一些优化：

1. 在 **changeSize** 时对可拖拽点的事件监听上，利用 **事件委托** + **自定义属性** 减少事件绑定，并统一处理不同方位的拖拽点。

   我们给热区八个小方块，也就是我们的拖拽点

   ```js
   <ul r-changeSize>
       <li class="hz-u-square hz-u-square-tl" data-pointer="dealTL"></li>
       <li class="hz-u-square hz-u-square-tc" data-pointer="dealTC"></li>
       <li class="hz-u-square hz-u-square-tr" data-pointer="dealTR"></li>
       <li class="hz-u-square hz-u-square-cl" data-pointer="dealCL"></li>
       <li class="hz-u-square hz-u-square-cr" data-pointer="dealCR"></li>
       <li class="hz-u-square hz-u-square-bl" data-pointer="dealBL"></li>
       <li class="hz-u-square hz-u-square-bc" data-pointer="dealBC"></li>
       <li class="hz-u-square hz-u-square-br" data-pointer="dealBR"></li>
   </ul>
   ```

   ```js
   function handleMouseDown(e) {
       // 获取选中节点的自定义属性值
       let pointer = e.target.dataset.pointer;
       if(!pointer) {
           return;
       }
       e && e.stopPropagation();
   
       dom.on(window, 'mousemove', handleChange);
       dom.on(window, 'mouseup', handleMouseUp);
   
       function handleChange(e) {
           e && e.preventDefault();
   
           // 处理选中不同拖拽点时的情况
           let styleInfo = operations[pointer](itemInfo, moveX, moveY);
   
           // 边界值处理
           itemInfo = operations.dealEdgeValue(itemInfo, styleInfo, container);
   
           // ...
       }
       function handleMouseUp() {
           // ...
   
           dom.off(window, 'mousemove', handleChange);
           dom.off(window, 'mouseup', handleMouseUp);
       }
   };
   ```

   统一封装 operations 处理逻辑：

   ```js
   export default {
       /**
        * 改变热区大小时的边界情况处理
        * @param {Object} itemInfo   实际使用的热区模块数据 
        * @param {Object} styleInfo  操作中的热区模块数据
        * @param {Object} container  图片区域的宽高数据
        */
       dealEdgeValue(itemInfo, styleInfo, container) {},
       /**
        * 处理不同的拖拽点，大写字母表示含义：T-top，L-left，C-center，R-right，B-bottom
        * @param  {Object} itemInfo 
        * @param  {Number} moveX 
        * @param  {Number} moveY
        * @return {Object} 对过程数据进行处理
        */
       dealTL(itemInfo, moveX, moveY, minLimit = MIN_LIMIT) {},
       dealTC(itemInfo, moveX, moveY, minLimit = MIN_LIMIT) {},
       dealTR(itemInfo, moveX, moveY, minLimit = MIN_LIMIT) {},
       dealCL(itemInfo, moveX, moveY, minLimit = MIN_LIMIT) {},
       dealCR(itemInfo, moveX, moveY, minLimit = MIN_LIMIT) {},
       dealBL(itemInfo, moveX, moveY, minLimit = MIN_LIMIT) {},
       dealBC(itemInfo, moveX, moveY, minLimit = MIN_LIMIT) {},
       dealBR(itemInfo, moveX, moveY, minLimit = MIN_LIMIT) {}
   };
   ```

2. 在拖拽移动热区位置时，使用 translate 替代改变 top && left 值避免重绘，实现更流畅的拖拽效果：

   ```js
   // bad
   dom.css(elem, {
       top: `${moveY}px`,
       left: `${moveX}px` 
   });
   
   // better
   dom.css(elem, {
       transform: `translate(${moveX}px, ${moveY}px)` 
   });
   ```

3. 热区尺寸单位用 % 取代 px，不同屏幕尺寸的用户都获得更好的热区操作体验。

   但是热区区域存在最小尺寸限制，需要利用 [element-resize-detector](https://link.juejin.im/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Felement-resize-detector) 对图片进行监听，在图片尺寸变化的时候对边界区域进行兼容：

   ```js
   import elementResizeDetectorMaker from 'element-resize-detector';
   const erd = elementResizeDetectorMaker();
   
   export default function resizeImg(elem) {
       // ...
   
       const resize = _.debounce(() => {
           // ...
       }, 500);
   
       erd.listenTo(elem, resize);
   
       return () => {
           erd.removeListener(elem, resize);
       };
   };
   ```

4. 通过计算属性动态修改设置数据的 hover 位置，确保不超过图片范围，以确保信息的正确显示

   ```html
   <ul r-style={{top: infoTop, bottom: infoBottom, left: infoLeft, right: infoRight, transform: infoTransform}}></ul>
   ```



## 1.6 体验增强

1. 使用透明小方块增强鼠标从热区区域移动到设置信息区域的体验
2. 双击热区弹出模态框时，使用 `r-autofocus` 指令自动聚焦
3. 绑定键盘监听事件，监听 Enter 键和 Esc 键，增强 **确认** 和 **取消** 体验。



## 1.7 其他总结

1. 无论 **reset**（容易遗漏）或基础样式，都需要限制 scope，避免命名空间污染
2. 同一控制 Constant 全局变量，如最小热区尺寸限制







# 2 - Vue 实现热区图



## 2.1 前言

当今流行的前端框架把组件化开发的模式推进得十分出色，也激发了开发者针对各类框架写组件的热情，因为接口明确，上手也相对容易，一个组件只为了解决一个点或一类问题而生。

> 在图片中，上图选中热区，下图点击热区位置执行相应的跳转操作，展示的虚线是为了方便查看区域边界，真实场景会是设计师放上去的按钮或者点击区域。

> 它解决了什么问题？

看似画蛇添足的功能，有人会想直接在前端用定位 + 点击事件就能解决问题，干嘛要一个管理热区的平台呢？这就是重复性工作和组件化之间的取舍，如果重复性工作带来的开销远大于轮子开发，为何不采用工程化和模块化的方案解决呢？

> 热区图解决了前端大量的重复写定位样式和事件绑定，我们更希望设计切一张完整的图片，让他们自己框定热区，不希望切多张图片前端拼凑。

> 使用场景？

- 图片内存在多个点击区域
- 活动弹出框（带有详情和取消按钮）



## 2.2 目录

```
vue-hotzone
├── __tests__ (单元测试)
├── lib (此组件)
├── public (DEMO网站入口)
├── src (DEMO网站)
├── .eslintrc.js (eslint配置)
├── jest.config.js (jest配置)
├── vue.config.js (vue配置)
├── package.json
├── ......
```



## 2.3 功能划分

在 `regular-hotzone` 中强调的是管理和共享内存，通过 props 判断是编辑还是展示状态。

设计之初并没有实现这种模式，因为客户端 vue 代码短短几句就能实现定位，没必要把整体引入进来浪费首屏时间。

本组件采用的设计只针对后台编辑端使用，将数据持久化存储后前端调取数据可以参考 src 下的例子去做。



## 2.4 数据结构

存下来的结构可以是带有自定义字段的本例子存的结构，本例如下：

```js
zones: [{
  heightPer: 0.4374,
  widthPer: 0.2827,
  topPer: 0.238,
  leftPer: 0.1153,
  url: 'https://github.com/OrangeXC'
}]
```

这里的基础数据都是 `Per` 结尾的百分比的数值，url 是我们定义绑定到热区上的属性（根据需要可以绑定更多信息）



## 2.5 配置和事件

<https://github.com/OrangeXC/vue-hotzone#options>



