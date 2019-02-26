# 单文件组件和路由



打开 `src/main.js`，它是整个项目的入口文件：

```js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```

可以看到 `src/main.js` 挂载了 `idnex.html`：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>travel</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

以下代码是一种 ES6 写法，实际上省略了 `:App`

```
components: { App },
```

等价于：（定义了一个局部组件的使用）

```
components: { App: App },
```

渲染局部组件：

```
template: '<App/>'
```

这个根实例就会将 App 这个局部组件渲染到页面之上， 打开 `App.vue`：

```vue
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

当一个文件以 .vue 结尾的时候，我们把它叫做单文件组件，放的就是一个 vue 的组件。





## 路由

路由就是根据网址的不同，返回不同的内容给用户。

`App.vue` 中的数据内容来自于 <router-view>，<router-view> 显示的是当前路由地址所对应的内容。

当前路由地址：/#/

打开  `src/main.js` 

```js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

```

```
router: router,
```

```
import router from './router'
```

这个 `router` 就是路由排至相关内容，打开 `src/router/` ，自动引入 `index.js` 文件：

```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})

```

在这个路由里面我们做了这样的配置：当你访问根路径，对应的内容是 ‘HelloWorld’，这个 `HelloWorld` 要去 `src/component/HelloWorld.vue` 找。这也是一个单文件组件。

回到 `src/router/idnex.js`  文件，我们来分析，路由配置了这么一项：当用户访问根路径，展示的是 HelloWorld 组件，恰好 `App.vue` 写了 `router-view`，`router-view` 展示了当前路由所对应的内容。



```
<router-view/>
```

这行代码的意思是：这里显示的内容就是当前路由所对应的组件。

