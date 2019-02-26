# Vue 中的 JS 动画以 Velocity.js 结合



## 基础搭建

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
        <!-- 以 transition 的动画时长为基准 -->
        <transition 
            name="fade"
            @before-enter="handleBeforeEnter">
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
                },
                handleBeforeEnter: function() {
                    console.log('before');
                }
            }
        })
    </script>
</body>
</html>  
```

第二次点击：隐藏到显示，即将显示的一瞬间会调用 `before-enter`我们对样式进行修改：

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
        <!-- 以 transition 的动画时长为基准 -->
        <transition 
            name="fade"
            @before-enter="handleBeforeEnter">
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
                },
                handleBeforeEnter: function(el) {
                    el.style.color = 'red'
                }
            }
        })
    </script>
</body>
</html>  
```

当 `before-enter` 触发结束之后，下一步开始运行动画，所有的动画都写在`enter` 钩子对应的回调函数里面。

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
        <!-- 以 transition 的动画时长为基准 -->
        <transition 
            name="fade"
            @before-enter="handleBeforeEnter"
            @enter="handleEnter">
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
                },
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
    </script>
</body>
</html>  
```

我们只用了 el 这个元素，实际上在这个方法里面 done 也很重要，当动画结束以后，我们要手动调用 done 这个回调函数。当 done( ) 被调用之后，Vue 又会触发一个事件 `after-enter`：

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
        <!-- 以 transition 的动画时长为基准 -->
        <transition 
            name="fade"
            @before-enter="handleBeforeEnter"
            @enter="handleEnter"
            @after-enter="handleAfterEnter">
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
                },
                handleBeforeEnter: function(el) {
                    el.style.color = 'red'
                },
                handleEnter: function(el, done) {
                    setTimeout(() => {
                        el.style.color = 'green'
                    }, 2000)
                    setTimeout(() => {
                        done()
                    }, 4000)
                },
                handleAfterEnter: function(el) {
                    el.style.color = 'black'
                }
            }
        })
    </script>
</body>
</html>  
```

以上我们完整实现了入场动画的效果，这是通过 js 钩子来实现的。

如果我们来创建出场动画，enter 换成 leave 即可。



## 更加复杂的动画实现： velocity.js

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
        <!-- 以 transition 的动画时长为基准 -->
        <transition 
            name="fade"
            @before-enter="handleBeforeEnter"
            @enter="handleEnter"
            @after-enter="handleAfterEnter">
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
                },
                handleBeforeEnter: function(el) {
                    el.style.opacity = 0;
                },
                handleEnter: function(el, done) {
                    Velocity(el, {opacity: 1}, {duration: 1000})
                },
                handleAfterEnter: function(el) {
                }
            }
        })
    </script>
</body>
</html>  
```

添加 velocity 配置项：

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
        <!-- 以 transition 的动画时长为基准 -->
        <transition 
            name="fade"
            @before-enter="handleBeforeEnter"
            @enter="handleEnter"
            @after-enter="handleAfterEnter">
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
                },
                handleBeforeEnter: function(el) {
                    el.style.opacity = 0;
                },
                handleEnter: function(el, done) {
                    Velocity(el, {
                        opacity: 1
                    }, {
                        duration: 1000, 
                        complete: done
                    })
                },
                handleAfterEnter: function(el) {
                    console.log("动画结束");
                }
            }
        })
    </script>
</body>
</html>  
```

