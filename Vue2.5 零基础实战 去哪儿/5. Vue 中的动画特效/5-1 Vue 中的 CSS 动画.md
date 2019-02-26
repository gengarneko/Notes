# Vue 中的 CSS 动画



## 基础搭建

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
        <div v-if="show">
            hello PHP!
        </div>
        <button @click="handleBtnClick">切换</button>
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
                }
            }
        })
    </script>
</body>
</html>  
```



## transition 过渡动画原理

![1542682814525](E:\笔记\Vue2.5 零基础实战 去哪儿\5. Vue 中的动画特效\5-1 Vue 中的 CSS 动画.assets\1542682814525.png)

当一个元素被 transition 包裹之后，Vue 会自动分析元素的 CSS 样式，然后构建一个动画的流程。在动画即将被执行的那一瞬间，Vue 会在 <div> 增加两个 `class` 名字，分别为 `fade-enter` 和 `fade-enter-active`，当动画第一帧执行过后，`transition` Vue 在知道它是一个动画效果后，会在动画运行到第二帧时帮助你做两件事：去掉 `fade-enter` 改为 `fade-enter-to`，然后动画继续执行，执行到结束的瞬间，Vue 会去除掉 `fade-enter-active` 和 `fade-enter-to`。





## 显示动画

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <style>
        .fade-enter {
            opacity: 0
        }
        .fade-enter-active {
            transition: opacity 1s;
        }
    </style>
</head> 
<body>
    <div id="app">
        <transition name="fade">
            <div v-if="show">
                hello PHP!
            </div>
        </transition>
        
        <button @click="handleBtnClick">切换</button>
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
                }
            }
        })
    </script>
</body>
</html>  
```

当我们不写 `fade` 用 `v-` 也是可以的

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <style>
        .v-enter {
            opacity: 0
        }
        .v-enter-active {
            transition: opacity 0.5s;
        }
    </style>
</head> 
<body>
    <div id="app">
        <transition>
            <div v-if="show">
                hello PHP!
            </div>
        </transition>
        
        <button @click="handleBtnClick">切换</button>
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
                }
            }
        })
    </script>
</body>
</html>  
```





## 显示到隐藏的动画

![1542683561713](E:\笔记\Vue2.5 零基础实战 去哪儿\5. Vue 中的动画特效\5-1 Vue 中的 CSS 动画.assets\1542683561713.png)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <style>
        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }
        .fade-enter-active,
        .fade-leave-active {
            transition: opacity 0.5s;
        }
    </style>
</head> 
<body>
    <div id="app">
        <transition name="fade">
            <div v-if="show">
                hello PHP!
            </div>
        </transition>
        
        <button @click="handleBtnClick">切换</button>
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
                }
            }
        })
    </script>
</body>
</html>  
```

进一步简化代码：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <style>
        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }
        .fade-enter-active,
        .fade-leave-active {
            transition: opacity 0.3s;
        }
    </style>
</head> 
<body>
    <div id="app">
        <transition name="fade">
            <div v-if="show">
                hello PHP!
            </div>
        </transition>
        
        <button v-on:click="show=!show">切换</button>
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
                }
            }
        })
    </script>
</body>
</html>  
```

