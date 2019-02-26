# Vue 的条件渲染



## `v-if`

`v-if` 后面也是一个 js 表达式，表达式的返回值决定了 div 是否被挂载

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Vue 实例生命周期函数</title>
    <link rel="stylesheet" href="">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <style>
        .activated {
            color: red;
        }
    </style>
</head> 
<body>
    <div id="app">
        <div v-if="show">
            {{ msg }}
        </div>
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                show: false,
                msg: "Hello World!"
            }
            
        })
    </script>
</body>
</html>  
```



## `v-show`

`v-show` 和 `v-if` 类似，但是 div 会被挂载，只是 display 被设置为 none

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Vue 实例生命周期函数</title>
    <link rel="stylesheet" href="">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <style>
        .activated {
            color: red;
        }
    </style>
</head> 
<body>
    <div id="app">
        <div v-if="show">
            {{ msg }}
        </div>
        <div v-show="show">
            {{ msg }}
        </div>
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                show: false,
                msg: "Hello World!"
            }
            
        })
    </script>
</body>
</html>  
```

> 当我们经常改变一个 DOM 的 display，我们选择 `v-show`



## 更复杂的 `v-if` `v-show`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Vue 实例生命周期函数</title>
    <link rel="stylesheet" href="">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <style>
        .activated {
            color: red;
        }
    </style>
</head> 
<body>
    <div id="app">
        <div v-if="show">
            {{ msg }}
        </div>
        <div v-else>
            Bye Bye!
        </div>
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                show: false,
                msg: "Hello World!"
            }
            
        })
    </script>
</body>
</html>  
```

> 注：`v-if` 和 `v-else` 一定要连在一起，不能分开。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Vue 实例生命周期函数</title>
    <link rel="stylesheet" href="">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <style>
        .activated {
            color: red;
        }
    </style>
</head> 
<body>
    <div id="app">
        <div v-if=" show === 'a' ">
            This is A.
        </div>
        <div v-else-if=" show === 'b' ">
            This is B.
        </div>
        <div v-else>
            This is others.
        </div>
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                show: 'a',
                msg: "Hello World!"
            }
            
        })
    </script>
</body>
</html>  
```





## Key 的问题

例子：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Vue 实例生命周期函数</title>
    <link rel="stylesheet" href="">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <style>
        .activated {
            color: red;
        }
    </style>
</head> 
<body>
    <div id="app">
        <div v-if="show">
            用户名： <input type="" name="">
        </div>
        <div v-else>
            邮箱： <input type="" name="">
        </div>
        
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                show: false,
                msg: "Hello World!"
            }
            
        })
    </script>
</body>
</html>  
```

引出问题：Vue 在重新渲染页面的时候尽量尝试复用已存在的 DOM，这就使得我们切换 show 属性的时候，input 栏里面仍然是旧数据。



解决问题：使用 key 值。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Vue 实例生命周期函数</title>
    <link rel="stylesheet" href="">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
    <style>
        .activated {
            color: red;
        }
    </style>
</head> 
<body>
    <div id="app">
        <div v-if="show">
            用户名： <input key="username">
        </div>
        <div v-else>
            邮箱： <input key="email">
        </div>
        
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                show: false,
                msg: "Hello World!"
            }
            
        })
    </script>
</body>
</html>  
```

当我们给某个元素标签添加一个 key 值的时候，Vue 会知道它是页面上唯一的元素，如果 key 值不一样就不会复用 DOM。