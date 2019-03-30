## 前言

不知道大家有没有遇到这样一种情况？vuex 中的 state 会在某一个组件中使用，而这个状态的初始化是通过异步加载完成的。组件在渲染的过程中，获取的 state 状态为空。也就是说组件在异步完成之前就已经完成渲染了，导致组件的数据没有来得及渲染。



## 问题举例

```js
// topo.vue
created() {
    this.getUserAndSysIcons();
},
methods: {
    getUserAndSysIcons() {
        const self = this;
        // 用户图标
        iconApi.getUserIcons().then(response => {
        self.$store.dispatch('setUserIcons', response.data);
        });
    }
}
```

在 `topo.vue` 中 `create` 或者 `mounted` 完成的时候调用 `getUserAndSysIcons()` 异步初始化 `userIcons`，方便在其他组件中使用这个数组。

```js
// modifyhost.vue
mounted() {
    this.userIcons = this.$store.state.topo.userIcons; // 用户图标
}
```

在 `modifyhost.vue` 中渲染数据的时候，需要用到 `userIcons`。当此组件 `mounted` 完成的时候，`userIcons` 数据还没有被初始化，导致 `modifyhost.vue` 渲染为空。



## 思考

想的是，当 `topo.vue` 中异步获取 `userIcons` 完成的时候，再去将 `modifyhost.vue` 组件中的 `userIcons` 初始化。这样就会自动改变 完成渲染，那么怎么知道异步什么时候完成呢？

于是就想到了 vue 一个好东西 `watch`，监听某一个数据的变化。我们都知道，很容易监听组件中局部数据的变化。那么，怎么去监听全局变量 `state` 的变化呢？我们使用 `computed`，具体操作：



## 解决

在 `computed` 中写一个计算属性 `getUserIcons`，返回状态管理中的 `userIcons`。然后在 `watch` 中监听这个计算属性的变化，对 `modify.vue` 的 `userIcons` 重新赋值。

```js
computed: {
    getUserIcons() {
        return this.$store.state.topo.userIcons;
    }
},
watch: {
    getUserIcons(val) {
        this.userIcons = val;
    }
}
```

