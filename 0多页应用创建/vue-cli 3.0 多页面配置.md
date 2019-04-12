# vue-cli 3.0 多页面配置

## 前言

vue-cli 是 Vue.js 官方推出的脚手架，它功能丰富、扩展性强，为 Vue 应用开发带来了极大的便利，它提供了多种开发范式，诠释了开箱即用。本文主要讲解如何使用 vue-cli 创建一个多入口工程。

## 什么是多页应用

单页应用（SPA）往往只包含一个主入口文件与 `index.html`，页面切换通过局部资源刷新完成。而在多页应用中，我们会为每个 HTML 文档文件都指定好一个 JS 入口，这样一来当页面跳转的时候用户会获得一个新的 HTML 文档，整个页面就会重新加载。

单页应用、多页应用的优劣势在这里就不再次分析了，总而言之，多页架构模式暂时是无法取代的，如果尝试把几十个不关联的页面做成一个，那么开发成本就会很大，**Not every app has to be an SPA**。

## 初始化项目

首先我们安装好 vue-cli 脚手架，并初始化一个默认工程，修改项目目录为：

```
.
├── assets
│   └── logo.png
├── components
│   ├── About.vue
│   ├── HelloWorld.vue
│   └── Home.vue
├── pages
│   ├── page1
│   │   ├── page1.html
│   │   ├── page1.js
│   │   └── page1.vue
│   └── page2
│       ├── page2.html
│       ├── page2.js
│       └── page2.vue
└── style
    ├── common.css
    └── common.less
```

`vue.config.js` 是一个可选文件，用户需要自行创建，它会被 `@vue/cli-service` 读取。当正确添加配置之后，重启项目，测试项目在改变目录之后能否正常运行。试想一下，若照着这个思路进行配置多入口，那么首先需要删除或者修改原有 webpack 配置项，然后还需要添加多入口的一些插件，虽然通过脚手架对外提供的 API 可以实现，可是这种修改方式还不是直接修改 原生构建配置更快，那么还有其他解决方法吗？

### vue.config.js 配置

```
let path = require('path')
let glob = require('glob')
// 配置 pages 多页面获取当前文件夹下的 html 和 js
function getEntry (globPath) {
  let entries = {},
  basename, tmp, pathname, appname;
  
  glob.sync(globPath)
  
}
```

