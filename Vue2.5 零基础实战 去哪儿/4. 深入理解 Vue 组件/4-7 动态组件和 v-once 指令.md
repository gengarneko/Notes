# 动态组件与 v-once 指令



## 基础搭建

需求：通过按钮完成 toggle 操作。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
</head> 
<body>
    <div id="app">
        <child-one v-if=" show === 'child-one' "></child-one>
        <child-two v-if=" show === 'child-two' "></child-two>
        <button @click="handleBtnClick">change</button>
    </div>


    <script>

        Vue.component('child-one', {
            template: `<div>child-one</div>`
        })

        Vue.component('child-two', {
            template: `<div>child-two</div>`
        })

        var vm =new Vue({
            el: '#app',
            data: {
                show: 'child-one'
            },
            methods: {
                handleBtnClick: function() {
                    this.show = (this.show === 'child-one' ? 'child-two' : 'child-one');
                }
            }
        })
    </script>
</body>
</html>  
```

这样的效果还可以通过动态组件的方式来完成；

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
</head> 
<body>
    <div id="app">
        <component :is="show"></component>
        <!-- <child-one v-if=" show === 'child-one' "></child-one>
        <child-two v-if=" show === 'child-two' "></child-two> -->
        <button @click="handleBtnClick">change</button>
    </div>


    <script>

        Vue.component('child-one', {
            template: `<div>child-one</div>`
        })

        Vue.component('child-two', {
            template: `<div>child-two</div>`
        })

        var vm =new Vue({
            el: '#app',
            data: {
                show: 'child-one'
            },
            methods: {
                handleBtnClick: function() {
                    this.show = (this.show === 'child-one' ? 'child-two' : 'child-one');
                }
            }
        })
    </script>
</body>
</html>  
```

动态组件的意思是：根据 `:is` 里面数据的变化自动加载不同的组件。

但是这种操作每次切换都会销毁和新建组件，这是十分低性能的，我们用 `v-once` 指令优化性能：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
</head> 
<body>
    <div id="app">
        <component :is="show"></component>
        <!-- <child-one v-if=" show === 'child-one' "></child-one>
        <child-two v-if=" show === 'child-two' "></child-two> -->
        <button @click="handleBtnClick">change</button>
    </div>


    <script>

        Vue.component('child-one', {
            template: `<div v-once>child-one</div>`
        })

        Vue.component('child-two', {
            template: `<div v-once>child-two</div>`
        })

        var vm =new Vue({
            el: '#app',
            data: {
                show: 'child-one'
            },
            methods: {
                handleBtnClick: function() {
                    this.show = (this.show === 'child-one' ? 'child-two' : 'child-one');
                }
            }
        })
    </script>
</body>
</html>  
```

> 再次切换时就会从内存中拿取内容。