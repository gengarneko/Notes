# 使用 Animate.css 库

我们知道 `fade-enter-active` 和 `fade-leave-active `在显示和隐藏过程中是一直存在的。知道这个特性我们就可以运用 @keyframes 

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
        @keyframes bounce-in {
            0% {
                transform: scale(0);
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
            }
        }
        .fade-enter-active {
            transform-origin: left center;
            animation: bounce-in 1s;
        }

        .fade-leave-active {
            transform-origin: left center;
            animation: bounce-in 1s reverse;
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

自己定义 class `.active` `.leave`：

```html

```



## Animate.css  动画

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
            enter-active-class="animated swing"
            leave-active-class="animated shake">
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

