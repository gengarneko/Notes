# VuePress 从零开始搭建自己的博客

最近将自己的博客从Hexo转移到VuePress中来，使用VuePress的过程中也遇到了一些问题，写一篇文章来记录一下搭建过程和踩过的坑。

## VuePress 是什么？

VuePress 是以 Vue 驱动的静态网站生成器，是一个 Vue、Vue Router 和 webpack 驱动的单页应用。在 VuePress 中，你可以使用 Markdown 编写文档，然后生成网页，每一个由 VuePress 生成的页面都带有预渲染好的 HTML，也因此具有非常好的加载性能和搜索引擎优化。同时，一旦页面被加载，Vue 将接管这些静态内容，并将其转换成一个完整的单页应用，其他的页面则会只在用户浏览到的时候才按需加载。

## VuePress特性

- 为技术文档而优化的内置 Markdown 拓展
- 在 Markdown 文件中使用 Vue 组件的能力
- Vue 驱动的自定义主题系统
- 自动生成 Service Worker（支持 PWA）
- Google Analytics 集成
- 基于 Git 的“最后更新时间”
- 多语言支持
- 响应式布局

## 环境搭建

### 安装

VuePress 支持使用 Yarn 和 npm 来安装，Node >= 8。

#### 全局安装VuePress

```bash
yarn global add vuepress # 或者：npm install -g vuepress
```

#### 创建项目目录

```bash
mkdir project
cd project
```

#### 初始化项目

```bash
yarn init -y # 或者 npm init -y
```

#### 新建 docs 文件夹

docs文件夹作为项目文档根目录，主要放置Markdown类型的文章和.vuepress文件夹。

```bash
mkdir docs
```

#### 设置 package.json

VuePress 中有两个命令，`vuepress dev docs` 命令运行本地服务，通过访问 http://localhost:8080 即可预览网站，`vuepress build docs` 命令用来生成静态文件，默认情况下，放置在 docs/.vuepress/dist 目录中，当然你也可以在 docs/.vuepress/config.js 中的 dest 字段来修改默认存放目录。在这里将两个命令封装成脚本的方式，直接使用 `npm run docs:dev` 和 `npm run docs:build` 即可。

```js
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

#### 创建 .vuepress 目录

在 docs 目录中，创建 .vuepress 目录，.vuepress 目录主要用于存放 VuePress 相关的文件。

```bash
mkdir .vuepress
```

#### 创建 config.js

进入到 .vuepress 目录中，然后创建 config.js，config.js 是 VuePress 必要的配置文件，它导出 y 一个 javascript 对象。

```bash
touch config.js
```

#### 创建 public 文件夹

进入到.vuepress目录中，然后创建public文件夹，此文件夹主要放静态资源文件，例如favicons和 PWA的图标。

```bash
mkdir public
```

此时，目录结构就差不多出来了：

```bash
project
├─── docs
│   ├── README.md
│   └── .vuepress
│       ├── public
│       └── config.js
└── package.json
```

以上只是简单地搭建了一下博客的开发环境，接下来是博客主要的基本配置 config，js，也是必要的。

## 基本配置

一个 config.js 的主要配置包括网站的标题、描述等基本信息，以及主题的配置。这里简单的列举一下常用配置。

### 网站信息

```js
module.exports = {
    title: '个人主页', 
    description: '姜帅杰的博客',
    head: [
        ['link', { rel: 'icon', href: '/img/logo.ico' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
    ]
}
```

- title：网站标题
- description：网站描述
- head：额外的需要被注入到当前页面的 HTML"head" 中的标签，其中路径的 "/" 就是 public 资源目录。

### 主题配置

```js
module.exports = {
  themeConfig: {
    nav: [{
        text: '主页',
        link: '/'
      },
      {
        text: '博文',
        items: [{
            text: 'Android',
            link: '/android/'
          },
          {
            text: 'ios',
            link: '/ios/'
          },
          {
            text: 'Web',
            link: '/web/'
          }
        ]
      },
      {
        text: '关于',
        link: '/about/'
      },
      {
        text: 'Github',
        link: 'https://www.github.com/codeteenager'
      },
    ],
    sidebar: {
      '/android/': [
        "",
        "android1",
        ...
      ],
      "/ios/": [
        "",
        "ios1",
      ],
      "/web/": [
        "",
        "web1",
        ...
      ],
    },
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
  },
}

```

nav：导航栏配置，此配置主要用于配置导航栏的链接，例如以上主页的link为"/"，默认是根目录下的README.md。"/android/"链接到根目录docs下的android文件夹下的README.md文件。

sidebar：侧边栏配置，你可以省略.md拓展名，同时以/结尾的路径将会被视为 */README.md。'/android/'、'/ios/'和'/web/'是通过路由的方式将每个页面的标题抽取出来显示。"/android/"是指根目录下android文件夹中的路由，每个路由链接都要有README.md。所以目录结构如下：

```
├─── docs
├── README.md
└── android
│   └── README.md
└── ios
   └── README.md
```

- sidebarDepth：嵌套的标题链接深度，默认的深度为1。
- lastUpdated：最后更新时间。

侧边栏如图：

![img](https://user-gold-cdn.xitu.io/2018/6/9/163e478f42cde7da?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



### PWA配置

VuePress默认支持PWA配置的，需要在基本配置中开启serviceWorker。

```
module.exports = {
	serviceWorker: true,
}
```

然后再添加icons和Manifest配置，在public中添加manifest.json配置，和图标。如果不知道PWA的可以到[PWA配置](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FManifest)查看相关资料。

```json
{
  "name": "姜帅杰",
  "short_name": "姜帅杰",
  "start_url": "index.html",
  "display": "standalone",
  "background_color": "#2196f3",
  "description": "姜帅杰的个人主页",
  "theme_color": "blue",
  "icons": [
    {
      "src": "./logo.png",
      "sizes": "144x144",
      "type": "image/png"
    }
  ],
  "related_applications": [
    {
      "platform": "web"
    },
    {
      "platform": "play",
      "url": "https://play.google.com/store/apps/details?id=cheeaun.hackerweb"
    }
  ]
}
```

在config.js配置中添加manifest.json，由于iphone11.3不支持manifest的图标，所以加上apple-touch-icon图标配置即可。

```js
module.exports = {
	head: [
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'apple-touch-icon', href: '/img/logo.png' }],
  ]
}
```

最后在iphone中访问网站，然后添加主屏幕即可。

### 自定义页面

默认的主题提供了一个首页（Homepage）的布局(用于这个网站的主页)。想要使用它，需要在你的根级 README.md的home: true，然后添加数据。

```
---
home: true
heroImage: /hero.png
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
复制代码
```

效果如下： 

![img](https://user-gold-cdn.xitu.io/2018/6/9/163e478f42e18a92?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



如果你想自定义首页或者其他页面，可以在页面的md文件中添加页面Vue文件。Vue文件放置在docs/.vuepress/components目录中。

```
---
layout: HomeLayout
---
复制代码
```

例如我博客的自定义首页： 

![img](https://user-gold-cdn.xitu.io/2018/6/9/163e478f42feb4a5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



## 部署上线

由于构建的时候生成静态页面，所以将dist文件夹中的内容可以部署在gitHub的pages或者coding的pages都可以。如果使用git上传到github上，操作比较繁琐，这里使用脚本的方式自动部署到github上。

### 创建一个deploy.sh

在project下创建deploy.sh。

```
touch deploy.sh
复制代码
```

### 编写脚本

```
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
复制代码
```

### 设置package.json

```
{
	"scripts": {
	    "deploy": "bash deploy.sh"
	  },
}
复制代码
```

运行npm run deploy 即可自动构建部署到github上。

详情请看，[部署](https://link.juejin.im?target=https%3A%2F%2Fvuepress.vuejs.org%2Fzh%2Fguide%2Fdeploy.html)

示例：[我的博客](https://link.juejin.im?target=https%3A%2F%2Fwww.jiangshuaijie.com)





