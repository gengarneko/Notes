# 多个元素或组件的过渡



## 多个元素之间的过渡

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/animate.css/3.7.0/animate.css">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <script src="https://cdn.bootcss.com/velocity/2.0.5/velocity.js"></script>
    <style>
        .fade-enter, .fade-leave-to {
            opacity: 0;
        }
        .fade-enter-active, .fade-leave-active {
            transition: opacity 1s;
        }
    </style>

</head> 
<body>
    <div id="app">
        <!-- 以 transition 的动画时长为基准 -->
        <transition 
            name="fade"
            @before-enter="handleBeforeEnter"
            @enter="handleEnter"
            @after-enter="handleAfterEnter">
            <div v-if="show">
                Hello PHP!
            </div>
            <div v-else>
                Bye JAVA!
            </div>
        </transition>
        <hr>
        <button v-on:click="show=!show">toggle</button>
    </div>

    <script>
        var vm =new Vue({
            el: '#app',
            data: {
                show: true
            },
            methods: {
                handleBtnClick: function() {
                    this.show = !this.show;
                },
                handleBeforeEnter: function(el) {
                    
                },
                handleEnter: function(el, done) {

                },
                handleAfterEnter: function(el) {
                    
                }
            }
        })
    </script>
</body>
</html>  
```

我们发现动画并没有如期生效，因为 Vue 在元素进行切换的时候会尽量复用 DOM，导致动画无效。

我们让 Vue 不复用 DOM，只要加上 key 值就行了：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/animate.css/3.7.0/animate.css">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <script src="https://cdn.bootcss.com/velocity/2.0.5/velocity.js"></script>
    <style>
        .fade-enter, .fade-leave-to {
            opacity: 0;
        }
        .fade-enter-active, .fade-leave-active {
            transition: opacity 1s;
        }
    </style>

</head> 
<body>
    <div id="app">
        <!-- 以 transition 的动画时长为基准 -->
        <transition 
            name="fade"
            @before-enter="handleBeforeEnter"
            @enter="handleEnter"
            @after-enter="handleAfterEnter">
            <div v-if="show" key="hello">
                Hello PHP!
            </div>
            <div v-else key="bye">
                Bye JAVA!
            </div>
        </transition>
        <hr>
        <button v-on:click="show=!show">toggle</button>
    </div>

    <script>
        var vm =new Vue({
            el: '#app',
            data: {
                show: true
            },
            methods: {
                handleBtnClick: function() {
                    this.show = !this.show;
                },
                handleBeforeEnter: function(el) {
                    
                },
                handleEnter: function(el, done) {

                },
                handleAfterEnter: function(el) {
                    
                }
            }
        })
    </script>
</body>
</html>  
```

这时候动画生效。

实际上 Vue 给我们提供了 `mode` 配置参数来设置多个属性切换时候的效果：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/animate.css/3.7.0/animate.css">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <script src="https://cdn.bootcss.com/velocity/2.0.5/velocity.js"></script>
    <style>
        .fade-enter, .fade-leave-to {
            opacity: 0;
        }
        .fade-enter-active, .fade-leave-active {
            transition: opacity 3s;
        }
    </style>

</head> 
<body>
    <div id="app">
        <!-- 以 transition 的动画时长为基准 -->
        <transition 
            mode="in-out">
            <div v-if="show" key="hello">
                Hello PHP!
            </div>
            <div v-else key="bye">
                Bye JAVA!
            </div>
        </transition>
        <hr>
        <button v-on:click="show=!show">toggle</button>
    </div>

    <script>
        var vm =new Vue({
            el: '#app',
            data: {
                show: true
            }
           
        })
    </script>
</body>
</html>  
```

`in-out` 先进入的元素先隐藏。与之对应的是 `out-in`





## 多个组件之间的过渡

需要运用动态组件来实现效果：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/animate.css/3.7.0/animate.css">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <script src="https://cdn.bootcss.com/velocity/2.0.5/velocity.js"></script>
    <style>
        .fade-enter, .fade-leave-to {
            opacity: 0;
        }
        .fade-enter-active, .fade-leave-active {
            transition: opacity .3s;
        }
    </style>

</head> 
<body>
    <div id="app">
        <!-- 以 transition 的动画时长为基准 -->
        <transition name="fade" mode="out-in">
            <child-one v-if="show"></child-one>
            <child-two v-else></child-two>
        </transition>
        <button v-on:click="show=!show">toggle</button>
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
                show: true
            }
           
        })
    </script>
</body>
</html>  
```

动画效果实现，下面通过动态组件的方式来实现：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/animate.css/3.7.0/animate.css">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <script src="https://cdn.bootcss.com/velocity/2.0.5/velocity.js"></script>
    <style>
        .fade-enter, .fade-leave-to {
            opacity: 0;
        }
        .fade-enter-active, .fade-leave-active {
            transition: opacity .2s;
        }
    </style>

</head> 
<body>
    <div id="app">
        <!-- 以 transition 的动画时长为基准 -->
        <transition name="fade" mode="out-in">
            <component :is="type"></component>
        </transition>
        <button @click="handleClick">toggle</button>
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
                type: 'child-one'
            },
            methods: {
                handleClick: function() {
                    this.type = (this.type === 'child-one' ? 'child-two' : 'child-one');
                }
            }
           
        })
    </script>
</body>
</html>  
```

