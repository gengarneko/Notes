# 前端路由配置 by Vue Router

单页面应用的实现有赖于 [HTML 5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History) ，不过并不必要现在学 H5 History API，Vue Router 已经帮我们处理了几乎所有的底层操作，比如推入和弹出状态，而且我们通过 Vue 构建应用，使用起来会更加如鱼得水，并且可以和 Vue 中的其他组件无缝对接。

在这篇教程中，我们会：

1. 设置首页路由
2. 设置咖啡店列表路由
3. 设置咖啡店详情路由
4. 设置新增咖啡店路由

这些就是我们本章需要设置的 **前端** 路由。

## Step 1：配置路由文件

打开 `resources/assets/js/routes.js` 文件，我们将在此文件中维护应用所有前端路由。

首先，需要导入 Vue 和 Vue Router 并告诉 Vue 我们使用 Vue Router 来处理应用路由：

```js
/*
 |-------------------------------------------------------------------------------
 | routes.js
 |-------------------------------------------------------------------------------
 | Contains all of the routes for the application
 */

/**
 * Imports Vue and VueRouter to extend with the routes.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * Extends Vue to use Vue Router
 */
Vue.use( VueRouter )
```

## Step 2：添加路由

我们要将以下四个前端路由添加到应用中：

- `/` - 首页
- `/cafes` - 咖啡店列表
- `/cafes/new` - 新增咖啡店
- `/cafes/:id` - 显示单个咖啡店

对于如何添加路由，[Vue Router 文档](https://router.vuejs.org/zh/guide/) 写的很清楚。和 Laravel 一样，在 Vue Router 中也可以使用命名路由。

在 Vue Router 路由数组中，每个路由都是一个对象，由于我们将路由放到了不同的文件中，所以需要导出默认模块以便可以将其导入到 `app.js` 文件。

添加路由后的 `resources/assets/js/routes.js` 文件内容如下：

```js
/*
 |-------------------------------------------------------------------------------
 | routes.js
 |-------------------------------------------------------------------------------
 | Contains all of the routes for the application
 */

/**
 * Imports Vue and VueRouter to extend with the routes.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * Extends Vue to use Vue Router
 */
Vue.use( VueRouter )

/**
 * Makes a new VueRouter that we will use to run all of the routes for the app.
 */
export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Vue.component( 'Home', require( './pages/Home.vue' ) )
        },
        {
            path: '/cafes',
            name: 'cafes',
            component: Vue.component( 'Cafes', require( './pages/Cafes.vue' ) )
        },
        {
            path: '/cafes/new',
            name: 'newcafe',
            component: Vue.component( 'NewCafe', require( './pages/NewCafe.vue' ) )
        },
        {
            path: '/cafes/:id',
            name: 'cafe',
            component: Vue.component( 'Cafe', require( './pages/Cafe.vue' ) )
        }
    ]
});
```

每个路由都有一个名字，以便我们在应用中直接通过名字就可以访问该路由。此外，在每个路由还有一个 `component` 对象，用于定义渲染每个页面的 Vue 组件上，上一篇教程中已经提及，我们会将这些页面存放到 `resources/assets/js/pages` 目录下。最后需要注意的是最后一个路由 `/cafes/:id` 包含 `:id` 参数，表明它是一个动态路由，可以根据传入指定 ID 参数来加载对应的咖啡店详情。 

## Step 3：添加页面组件

在 Vue Router 中，所有被渲染的页面都是组件。在[上一篇教程](http://laravelacademy.org/post/9504.html#toc_4)中，我们创建了 `resources/assets/js/pages` 来存放这些页面组件，根据上一步定义的路由，需要创建如下文件：

- `resources/assets/js/pages/Cafe.vue`
- `resources/assets/js/pages/Cafes.vue`
- `resources/assets/js/pages/Home.vue`
- `resources/assets/js/pages/NewCafe.vue`

接下来将以下内容填充到上面四个文件：

```vue
<style>

</style>

<template>
  <div>

  </div>
</template>

<script>
  export default {

  }
</script>
```

如果你之前没使用过单文件 Vue 组件，可以先阅读[对应官方文档](https://cn.vuejs.org/v2/guide/single-file-components.html)，简单来说，其实就是将页面的 JavaScript、CSS、HTML 都塞到一个文件中。由于我们使用的是 Laravel 和 Laravel Mix，这些组件的编译功能是开箱可用的。

## Step 4：将路由导入 app.js

现在我们可以将路由导入 `resources/assets/js/app.js` 了。

在

```js
import Vue from 'vue';
```

之后插入如下这行代码：

```js
import router from './routes.js'
```

接下来告知 Vue 实例使用刚刚导入的 `router`：

```js
new Vue({
    router
}).$mount('#app') 
```

## Step 5：构建应用

现在我们已经配置好了 Vue、axios 和 Vue Router，如果没有运行 `npm run watch` 实时监听前端文件变动并重新编译构建应用，也可以在开发环境中每次手动 `npm run dev` 来编译构建应用。

现在页面仍然没有任何数据和功能，但是已经可以通过 Vue 开发者工具看到路由信息了：

![vue router](../../../../%E7%AC%94%E8%AE%B0/Laravel%20%E5%AD%A6%E9%99%A2/Laravel%20%E5%89%8D%E5%90%8E%E7%AB%AF%E5%88%86%E7%A6%BB%E5%BA%94%E7%94%A8%E5%AE%9E%E4%BE%8B%E6%95%99%E7%A8%8B%EF%BC%9ARoast/02-JavaScript%20%E5%88%9D%E5%A7%8B%E5%8C%96/4-%E4%B8%BA%E5%89%8D%E7%AB%AF%E8%B7%AF%E7%94%B1%E7%BC%96%E5%86%99%E5%90%8E%E7%AB%AF%20API%20%E6%8E%A5%E5%8F%A3.assets/073b7a385b05e86860d8b5d9c6c105cb.jpg)

在下一篇教程添加完后端 API 路由之后就可以使用 Axios 来发送 HTTP 请求到后端 API 获取数据，我们将在 Laravel 后端构建 API，在前端通过 JavaScript 请求这些 API，然后配置 Vuex 来保存返回的数据，在此基础上，我们就可以为 Roast 应用开发出一些实际的功能了。