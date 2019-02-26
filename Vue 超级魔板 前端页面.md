# 项目初始化



## 新建项目



### 码云新建项目

------

打开码云，将电脑公钥保存到远端，保证本地可以连接到远程仓库。新建我的项目 mini-language。

### 本地新建项目

------

将仓库的项目拉取下来

```shell
cd D:/vue
git clone git@gitee.com:hentaimiao/mini-language.git
```

安装 vue-cli 命令行工具

```shell
// 全局安装 webpack
cnpm install -g webpack

// 全局安装 vue-cli
cnpm install -g vue-cli

// 创建一个基于 webpack 模板的新项目
vue init webpack mini-language

cd mini-language
npm run dev
```

这时候我们的项目就可以在浏览器中显示出来了

### 提交仓库

------

```
git add .
git commit -m "init project"
git push
```





## 依赖引入



### 安装依赖

------

#### 安装 axios 和 vue-axios

> Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。在我们的项目中用于异步请求数据。
>
> Vue-axios 只是帮你在 axios 上再封装一层（源码很短 48 行）

```shell
cnpm i axios vue-axios -S
```

#### 安装 sass 和 sass loader

> Sass 是世界上最成熟、最稳定、最强大的专业级 CSS 扩展语言（官网这么写的，爱信不信）。

```shell
cnpm i node-sass sass-loader -S
```

#### 安装 vuex

> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。

```shell
cnpm i vuex -S
```

#### 安装 element

> Element 是一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。

```shell
cnpm i element-ui -S
```

#### 安装 vuescroll.js

> Vuescroll.js 是一个滚动条插件， 可以让你在 Vue.js 下自定义滚动条，平滑地滚动。

```shell
cnpm i vuescroll -S
```



### 插件引入

------

> src/main.js

```js
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入 element UI 组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入 axios 异步加载插件
import axios from 'axios'
import VueAxios from 'vue-axios'
// 引入 vue-scroll 滚动条插件
import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'
// 引入样式
import 'styles/reset.css'
import 'styles/iconfont.css'

// 全局注册
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(vuescroll)
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

```

我们在  `build/webpack.base.conf.js` 文件中修改我们的路径：

```js
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'styles': resolve('src/assets/styles'),
      'common': resolve('src/common'),
    }
  },
```

我们初期的文件夹架构：

```
--src（资源）
	--assets（样式文件）
	--common（公用组件）
	--pages（页面资源）
		--user（前台页面）
		--admin（后台页面）
	--store（vuex 根数据）
	App.vue
	main.js
```

### 提交仓库

------

```shell
git add .
git commit -m "add base plugins"
git push
```

