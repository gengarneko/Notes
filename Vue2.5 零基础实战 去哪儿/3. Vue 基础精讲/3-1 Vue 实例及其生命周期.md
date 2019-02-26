## Vue 实例简单介绍

在 Vue 的官方文档中我们能看见 vm， 这个变量一般指的是 Vue 实例，这个实例是通过 new Vue() 创建出来的，。



### el

我们让实例接管页面上某部分 DOM 渲染，el 就是负责定义 Vue 实例接管的 DOM 的最外层标签。



### data

让 Vue 实例接管 root DOM，实例对 DOM 进行分析，发现其中用了 {{ }} 语法，就会到 data 中寻找相应的数据。



### methods

通过 `v-on:click="handleClick"` 绑定一个事件，事件必须定义在 methods 下面



```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>TodoList</title>
    <link rel="stylesheet" href="">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
</head>
<body>
    <div id="root">
        <div @click="handleClick">
            {{ msg }}
        </div>
    </div>


    <script>
        var vm = new Vue({
            el: '#root',
            data: {
                msg: 'Hello World!'
            },
            methods:{
                handleClick: function() {
                    alert('click');
                }
            }
        })
    </script>
</body>
</html>
```

> 当一个程序进行加载的时候有一个入口点，我们的入口点就是  Vue 实例，这个实例叫做根实例，除了根实例每一个组件也是 Vue 实例，当我们创建一个组件的时候，Vue 的底层也会将它编译成一个实例。





## Vue 实例的生命周期钩子

![Vue 生命周期](https://cn.vuejs.org/images/lifecycle.png)

生命周期函数就是 Vue 实例在某一个时间点自动执行的函数，

在创建实例之前

在创建实例时

如果没有 template 属性，那么就将 el 所代表的 DOM 当作是 template

如果有 template，那么就插入 tempalte

渲染之前，自动执行 beforeMount

模板结合数据生成的 Vue 实例里面的 DOM 元素就会挂载到页面之上

当页面挂载，执行 mounted

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Vue 实例生命周期函数</title>
    <link rel="stylesheet" href="">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
</head>
<body>
    <div id="app"></div>


    <script>
        var vm = new Vue({
            el: '#app',
            template: `<div>{{ test }}</div>`,
            data: {
                test: "hello world"
            },
            beforeCreate: function() {
                console.log('beforeCreate');
            },
            created: function() {
                console.log('created');
            },
            beforeMount: function() {
                console.log(this.$el);
                console.log('beforeMount');
            },
            mounted: function() {
                console.log(this.$el);
                console.log('mounted');
            },
            beforeDestroy: function() {
                console.log('beforeDestroy');
            },
            destroyed: function() {
                console.log('destroyed');
            },
            beforeUpdate: function() {
                console.log('beforeUpdate');
            },
            updated: function() {
                console.log('updated');
            },
        })
    </script>
</body>
</html>
```

