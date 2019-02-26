# 动画封装



需求：通过 toggle 进行 div 的隐藏或者显示

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
        .v-enter, .v-leave-to {
            opacity: 0;
        }
        .v-enter-active, .v-leave-active {
            transition: opacity .4s;
        }
    </style>

</head> 
<body>
    <div id="app">
        <transition>
            <div v-show="show">
                Hello World!
            </div>
        </transition>

        <button v-on:click="show=!show"> toggle </button>
    </div>

    <script>
        var count = 0;

        var vm =new Vue({
            el: '#app',
            data: {
                show: true
            },
        })

    </script>
</body>
</html>  
```

可能这个渐隐渐现的效果在我们的业务中运用的比较多，那么就希望可以对这个效果进行封装：

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
        .v-enter, .v-leave-to {
            opacity: 0;
        }
        .v-enter-active, .v-leave-active {
            transition: opacity .4s;
        }
    </style>

</head> 
<body>
    <div id="app">
        <fade :show="show">
            <div>
                Hello World!
            </div>
        </fade>

        <button v-on:click="show=!show"> toggle </button>
    </div>

    <script>
        Vue.component('fade', {
            props: ['show'],
            template: `
                <transition>
                    <slot v-if="show"></slot>
                </transition>
            `
        })

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

顺带着将样式和动画一起封装（使用 js 动画）：

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
</head> 
<body>
    <div id="app">
        <fade :show="show">
            <div>
                Hello World!
            </div>
        </fade> 

        <button v-on:click="show=!show"> toggle </button>
    </div>

    <script>
        Vue.component('fade', {
            props: ['show'],
            template: `
                <transition 
                    @before-enter="handleBeforeEnter"
                    @enter="handleEnter">
                    <slot v-if="show"></slot>
                </transition>
            `,
            methods: {
                handleBeforeEnter: function(el) {
                    el.style.color = 'red'
                },
                handleEnter: function(el, done) {
                    setTimeout(() => {
                        el.style.color = 'green'
                        done()
                    }, 2000)
                }
            }
        })

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

比较推荐这种方式来封装动画