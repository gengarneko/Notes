# 试试 VuePress 搭建个人博客

## VuePress

基于 Vue SSR 的静态站生成器，完全用 vue 来做 theme 和 layout，轻轻爽爽写文档。

## 上手搭建

你可以跟着文档上的例子自己玩一玩，不过由于 VuePress 的文档也是用 VuePress 来实现的，所以我取巧直接拿 [VuePress仓库](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvuepress) 里面的 **docs** 目录来试水。

1. 首先安装VuePress到全局

```bash
npm install -g vuepress
```

1. 然后把VuePress仓库克隆到你的电脑

```bash
git clone git@github.com:docschina/vuepress.git
```

1. 在docs文件中执行（请确保你的 Node.js 版本 >= 8）

```bash
cd vuepress
cd docs
vuepress dev
```

当你看到这一行就说明已经成功了：

```bash
 VuePress dev server listening at http://localhost:8080/
```

下面的工作就是数据的替换了，我们先来看一下官方给出的 docs 的目录结构：

```
.
|-- README.md
|-- config
|   `-- README.md
|-- default-theme-config
|   `-- README.md
|-- guide
|   |-- README.md
|   |-- assets.md
|   |-- basic-config.md
|   |-- custom-themes.md
|   |-- deploy.md
|   |-- getting-started.md
|   |-- i18n.md
|   |-- markdown.md
|   `-- using-vue.md
`-- zh
    |-- README.md
    |-- config
    |   `-- README.md
    |-- default-theme-config
    |   `-- README.md
    `-- guide
        |-- README.md
        |-- assets.md
        |-- basic-config.md
        |-- custom-themes.md
        |-- deploy.md
        |-- getting-started.md
        |-- i18n.md
        |-- markdown.md
        `-- using-vue.md
```

文档分成了两部分，中文文档在 `/zh/` 目录下，英文文档在根目录下。

其实目录中的东西一眼就能看明白的，首先 `guide、default-theme-config、config` 这三个目录都是 Vuepress 文档的主要内容，从中文文档中也可以看到只有这三个目录被替换了。

## 首页配置

默认主题提供了一个主页布局，要使用它，需要你在根目录的 `README.md` 的 `YAML front matter` 中指定 `home: true`，并加上一些其他的元数据。

我们先来看看看根目录下的 `README.md`：

```markdown
home: true // 是否使用Vuepress默认主题
heroImage: /hero.png // 首页的图片
actionText: Get Started →  // 按钮的文字
actionLink: /guide/ // 按钮跳转的目录
features: // 首页三个特性
- title: Simplicity First
  details: Minimal setup with markdown-centered project structure helps you focus on writing.
- title: Vue-Powered
  details: Enjoy the dev experience of Vue + webpack, use Vue components in markdown, and develop custom themes with Vue.
- title: Performant
  details: VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
footer: MIT Licensed | Copyright © 2018-present Evan You // 页尾
```

这些配置看官网的更加详细~

## 导航配置

导航配置文件在 `.vuepress/config.js` 中

在导航配置文件中 nav 是控制导航栏链接的，你可以将它改成自己的博客的目录。

```js
nav: [
    {
        text: 'Guide',
        link: '/guide/',
    },
    {
        text: 'Config Reference',
        link: '/config/'
    },
    {
        text: 'Default Theme Config',
        link: '/default-theme-config/'
    }
]
```

剩下的默认主题配置官方文档都很详细了。

## 更改默认主题色

可以在 `.vuepress/` 目录下创建一个 `override.styl` 文件，vuepress 提供四个可更改颜色：

```css
$accentColor = #3eaf7c // 主题色
$textColor = #2c3e50 // 文字颜色
$borderColor = #eaecef // 边框颜色
$codeBgColor = #282c34 // 代码背景颜色
```

我把它改成了这样：

![](https://user-gold-cdn.xitu.io/2018/4/23/162f21a0e07ec947?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 侧边栏的实现

其实还是官方文档写的详细：

```js
sidebar: [
  {
    title: 'JavaScript', // 侧边栏名称
    collapsable: true, // 可折叠
    children: [
      '/blog/JavaScript/学会了ES6，就不会写出那样的代码', // 你的md文件地址
    ]
  },
  {
    title: 'CSS', 
    collapsable: true,
    children: [
      '/blog/CSS/搞懂Z-index的所有细节',
    ]
  },
  {
    title: 'HTTP',
    collapsable: true,
    children: [
      '/blog/HTTP/认识HTTP-Cookie和Session篇',
    ]
  },
]
```

对应的文档结构：

```
├─blog // docs目录下新建一个博客目录
│  ├─CSS
│  ├─HTTP
│  └─JavaScript
```

## 部署

在配置好你博客之后，命令行执行：

```
Vuepress build
```

当你看到这一行就说明成功了：

```
Success! Generated static files in vuepress.
```

将打包好的 vuepress 目录上传到你的 github 仓库，和 github page 配合，就可以配置好你的博客网站了。