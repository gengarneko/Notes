TypeScript -> JavaScript

为什么出现？

​	JavaScript 有一些弱点，某些数据没有，你没想到所以会出现 NaN 的情况~

​	但是 TypeScript 不会出现，因为 Type

```
function add (a,b) {
    return a + b;
}
add (1,2); // 3
add(input.stringValue, 2); // 12
```

类型不正确会出现输出异常。

但是 TypeScript 这样写：

```
function add (a:number, b:number) {
    return a + b;
}
add(input.stringValue, 2); // 出错
```

TypeScript 就是 JavaScript 的超集，JavaScript 的一些弱点被 TypeScript 补齐了。

写 C# 的大佬写了 TypeScript，方方觉得这个很叼。

主要是加了类型，所以叫做 TypeScript。



JS 是很好运行的，直接在控制台就行了，那么 TS 怎么运行呢？

我们安装 ts-node https://github.com/TypeStrong/ts-node

下面我们来介绍编辑器：

​	VSCode

## TypeScript × React

我们先来搜索 TypeScript React，因为 React 是 facebook 写的，所以我们先来看 React 的官方网站。

我们最好去看 facebook 写的相关教程。

根据官方文档的指导进行项目初始化：

```
yarn create my-project 
```

然后我们打开项目并运行项目：

```shell
cd my-project
yarn start
```

以前我们的代码是 JSX，现在是 TSX，就是说我们的代码没有 JS 了。

目前为止我们没有任何的难度，只要有手有眼睛就能初始化成功，不成功的去吃屎。

### 目录介绍

node_modules

​	老朋友了，看都不想看，我们直接看下一个目录

scr 

​	所有源文件

tsconfig.json

​	ts 相关的配置，与你代码无关

public

​	所有的静态资源

package.json

​	依赖配置文件

README.md

​	说明文件

### 观察源代码

我们可以都删掉文件只剩下 一个 index.jsx 文件

```react
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
	<div>Hello World</div>
	document.getElementById('root')
)
```

我们就写了这么多，直接可以运行了。

我们在入门的时候一定要搞清楚什么是我们必须要知道的，有些不需要知道的可以先删除以后再说。

我们接触 react TypeScript 可以先造一些小东西，比如按钮：

```react
// 新建 Button.tsx
import React from 'react';
import './Button.css'

// interface IProps {
//     size: String;
// }

type Props = { size: string }

export default function Button(props: Props) {
    return <div className="button">button</div>
}
```

```
.button {
    border: 1px solid grey;
    display:inline-block;
    border-radius: 4px;
    padding: 4px;
}

.button:hover {
	background: grey;
    cursor: pointer;
    box-shadow: 2px
}

```

