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