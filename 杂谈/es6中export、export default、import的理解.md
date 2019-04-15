# ES6 中 export、export default、import 的理解

## export 与 import 的使用

export 与 import 是 es6 中新增模块功能最主要的两个命令。我们知道在 es6 中，实现了模块功能，而且相当简单，意在取代 common.js 和 AMD 规范，成为一种模块化的通用解决方案。

其设计思想为尽量的静态化，我们可以理解为在加载之前就知道自己所需要依赖的是哪个文件，而非在运行的时候才知道依赖谁。es6 的模块不是对象，通过 export 输出指令，通过 import 输入。就目前来说，不用一些编译器的话最新版的浏览器是不识别 import 这个关键字的。

在 es6 模块中是自动采用严格模式的，具体条例参考阮一峰的 es6 入门中的 module 模块。

最简单的使用：

在 vue-cli 脚手架中进行验证，因为其环境支持 es6 的语法，首先在 src 下面新建一个 export 文件夹，里面新建两个 js 分别为 a.js 和 b.js。

![](https://images2017.cnblogs.com/blog/1192284/201710/1192284-20171010151451434-294070559.png)

a.js

```js
export var a = 'my name is van';
```

然后一定要在 hello 模板中 import 该 js

```js
import { a } from '../../export/a.js';
console.log(a);
```

from 后面的路径要写对，然后不能写到 app.vue 或者 main.js 中，因为那是入口文件，里面的 import 都是各种依赖包，其中 { } 是一定要有的。

export 多个文件：

```js
var a = 'my name is van.', b = 'i'm an artist.';
export { a, b }
```

然后 import

```js
import { a, b } from '../../export/a.js';
console.log(a,b)
```

如果不想暴露变量的名称，使用 as 可以重命名关键字：

```js
var a = 'my name is van.', b = 'i'm an artist.';
export { a as x, b as y }
```

## export default 的用法

export 之后加上 default 意指默认接口的意思，在一个文件里面默认的只能有一个，其区别就是 {} 在 export 中引入需要用 {} 来存放。

```js
var a = 'my name is van';
export default a;
```

引入

```js
import a from '../../export/a.js';
```

要是多个变量：

```js
var a = 'my name is van.', b = 'i'm an artist.';
export default { a, b };
```

在需要使用的 js 中

```js
import anyoneword from '../../export/a.js'
console.log(anyoneword) //一个对象里面包含a,b两个变量。
```

是不是发现和 vue 组件很像。

其中，export 和 export default 最大的区别就是 export 不限变量数，可以一直写；而 export default 只输出一次而且 export 出的变量想要使用必须使用 {} 来存放，而 export default 不需要，只要 import 任意一个名字来接收对象即可。

export default 可以跟在非匿名函数之前，也可以跟在匿名函数之前，同时也可以是一个对象之前。

## import

import  '**' from 'vue'直接寻找的是依赖包里的文件

如果import '**' from './vue' 表示是同级文件下的js。

