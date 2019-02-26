# 规划（页面结构及组件树）

评论功能效果图：

![](http://huzidaha.github.io/static/assets/img/posts/2B86ED50-DDF5-4B3A-82A0-DECFD6767A8F.png)

## 组件划分

vue 的一大核心思想就是**组件化**，所以我们可以认为 vue.js 中一切皆组件，用 vue.js 构建的功能其实也就是各种组件组合而成。所以首先我们要进行需求分析。

组件的划分没有特别明确的标准。划分组件的目的是为了代码可复用性、可维护性。这要某个部分有可复用到别处的地方，就可以将它抽离出来作为一个组件；或者把某一部分抽离出来对代码的组织和管理带来帮助，也可以进行组件化。

以上评论功能，划分为以下几部分：

![组件划分图](http://huzidaha.github.io/static/assets/img/posts/1.003.png)

CommentApp：整体组件，包含两部分。

CommentInput：主要负责输入及提交功能，包括用户名输入，评论内容输入和提交按钮。

CommentList：评论列表，负责评论内容列表的输出。

Comment：负责每个评论列表的显示，被 CommentList 所用。

以上四类组件用组件树表示如下：

![](http://huzidaha.github.io/static/assets/img/posts/DAFA784B-6AD3-474B-9A87-316E5741DED6.png)



## 组件实现