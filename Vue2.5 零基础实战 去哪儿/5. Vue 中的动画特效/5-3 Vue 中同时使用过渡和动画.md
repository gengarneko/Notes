# 同时使用过渡和动画

当我们刷新页面，第一次显示动画效果并没有被添加上，希望一开始就有效果：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/animate.css/3.7.0/animate.css">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
</head> 
<body>
    <div id="app">
        <transition 
            name="fade" 
            appear
            enter-active-class="animated swing"
            leave-active-class="animated shake"
            appear-avtive-class="animated swing">
            <div v-if="show">
                hello PHP!
            </div>
        </transition>
        
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
                }
            }
        })
    </script>
</body>
</html>  
```

我们只使用了 animate.css 提供的一种动画，实际上它提供的是 @keyframes 这种 css3 的动画效果，如果我们既想要 c3 动画效果还想要过渡效果：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/animate.css/3.7.0/animate.css">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <style>
        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }
        .fade-enter-active,
        .fade-leave-active {
            transition: opacity 3s
        }
    </style>
</head> 
<body>
    <div id="app">
        <transition 
            name="fade" 
            appear
            enter-active-class="animated swing fade-enter-active"
            leave-active-class="animated shake fade-leave-active"
            appear-avtive-class="animated swing">
            <div v-if="show">
                hello PHP!
            </div>
        </transition>
        
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
                }
            }
        })
    </script>
</body>
</html>  
```

两个动画时长不一样的时候，我们应该这样设置：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/animate.css/3.7.0/animate.css">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <style>
        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }
        .fade-enter-active,
        .fade-leave-active {
            transition: opacity 3s
        }
    </style>
</head> 
<body>
    <div id="app">
        <!-- 以 transition 的动画时长为基准 -->
        <transition 
            type="transition" 
            name="fade" 
            appear
            enter-active-class="animated swing fade-enter-active"
            leave-active-class="animated shake fade-leave-active"
            appear-avtive-class="animated swing">
            <div v-if="show">
                hello PHP!
            </div>
        </transition>
        
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
                }
            }
        })
    </script>
</body>
</html>  
```

自定义动画播放时长：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/animate.css/3.7.0/animate.css">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <style>
        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }
        .fade-enter-active,
        .fade-leave-active {
            transition: opacity 1s
        }
    </style>
</head> 
<body>
    <div id="app">
        <!-- 以 transition 的动画时长为基准 -->
        <transition 
            :duration="5000"
            name="fade" 
            appear
            enter-active-class="animated swing fade-enter-active"
            leave-active-class="animated shake fade-leave-active"
            appear-avtive-class="animated swing">
            <div v-if="show">
                hello PHP!
            </div>
        </transition>
        
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
                }
            }
        })
    </script>
</body>
</html>  
```

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/animate.css/3.7.0/animate.css">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <style>
        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }
        .fade-enter-active,
        .fade-leave-active {
            transition: opacity 1s
        }
    </style>
</head> 
<body>
    <div id="app">
        <!-- 以 transition 的动画时长为基准 -->
        <transition 
            :duration="{enter:5000, leave:10000}"
            name="fade" 
            appear
            enter-active-class="animated swing fade-enter-active"
            leave-active-class="animated shake fade-leave-active"
            appear-avtive-class="animated swing">
            <div v-if="show">
                hello PHP!
            </div>
        </transition>
        
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
                }
            }
        })
    </script>
</body>
</html>  
```

