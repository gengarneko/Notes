# Vue 中使用插槽

插槽这个概念十分重要，很多第三方 Vue 插件和模块中都大量使用了插槽这个特性。



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
        <child></child>
    </div>


    <script>

        Vue.component('child', {
            template: '<div><p>hello</p></div>'
        })

        var vm =new Vue({
            el: '#app',

        })
    </script>
</body>
</html>  
```

什么时候用到 `slot` 呢？假设有个需求，希望子组件中除了展示 <p> 还要展示一段内容，但是这段内容并不是子组件决定的，而是父组件传递过来的。按照之前的做法，是通过 props 传递：

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
        <child content="<p>PHP</p>"></child>
    </div>


    <script>

        Vue.component('child', {
            props: ['content'],
            template: '<div><p>hello</p>{{ content }}</div>'
        })

        var vm =new Vue({
            el: '#app',

        })
    </script>
</body>
</html>  
```

出了一点问题，<p> 被做了一次转义，下面我们进行修改：

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
        <child content="<p>PHP</p>"></child>
    </div>


    <script>

        Vue.component('child', {
            props: ['content'],
            template: `
                <div>
                    <p>hello</p>
                    <div v-html="this.content">{{ content }}</div>
                </div>
            `
        })

        var vm =new Vue({
            el: '#app',

        })
    </script>
</body>
</html>  
```

这时候 {{ content }} 就会被正常显示。这时候又出现一个问题就是 <p> 被 <div> 包裹着，我们可以用 <template> 占位符来解决，但是这时候是无效的。

综上，通过 `content` 传值，是无法直接使用传递过来的标签的，而且当我们传递的内容很多的时候，就会十分地难看。

当子组件有一部分是根据父组件传递过来的 DOM 显示的时候，我们可以使用 `slot` 插槽。



## slot 语法

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
        <child>
            <p>PHP</p>
        </child>
    </div>


    <script>

        Vue.component('child', {
            template: `
                <div>
                    <p>hello</p>
                    <slot></slot>
                </div>
            `
        })

        var vm =new Vue({
            el: '#app',
        })
    </script>
</body>
</html>  
```

```html
Vue.component('child', {
            template: `
                <div>
                    <p>hello</p>
                    <slot>默认内容</slot>
                </div>
            `
        })
```

此时页面不会有任何变化。

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
        <child>
        </child>
    </div>


    <script>

        Vue.component('child', {
            template: `
                <div>
                    <p>hello</p>
                    <slot>默认内容</slot>
                </div>
            `
        })

        var vm =new Vue({
            el: '#app',
        })
    </script>
</body>
</html>  
```

此时页面发生变化。由此可见 <slot> 插槽还有可以定义默认值，默认值定义在标签内部。

新的需求：想在子组件接受 header 和 footer。

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
        <body-content>
            <div class="header">header</div>
            <div class="footer">footer</div>
        </body-content>
    </div>


    <script>

        Vue.component('body-content', {
            template: `
                <div>
                    <slot></slot>
                    <div class='content'>
                        content
                    </div>
                    <slot></slot>
                </div>
            `
        })

        var vm =new Vue({
            el: '#app',
        })
    </script>
</body>
</html>  
```

显示效果与预期不符：每次调用 slot 都会把所有内容输出，现在我们使用 **具名插槽**





## 具名插槽

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
        <body-content>
            <div class="header" slot="header">header</div>
            <div class="footer" slot="footer">footer</div>
        </body-content>
    </div>


    <script>

        Vue.component('body-content', {
            template: `
                <div>
                    <slot name="header"></slot>
                    <div class='content'>
                        content
                    </div>
                    <slot name="footer"></slot>
                </div>
            `
        })

        var vm =new Vue({
            el: '#app',
        })
    </script>
</body>
</html>  
```





## 作用域插槽



### 搭建基础

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
        <child></child>
    </div>


    <script>

        Vue.component('child', {
            data: function() {
                return {
                    list: [1, 2, 3, 4]
                }
            },
            template: `
                <div>
                    <ul>
                        <li v-for="item in list">{{ item }}</li>
                    </ul>
                </div>
            `
        })

        var vm =new Vue({
            el: '#app',
        })
    </script>
</body>
</html>  
```

我们希望 child 能在很多的地方被调用，当 child 在不同的地方被调用，列表怎么循环，而列表样式不是 child 所控制的，而是外部告诉我们组件如何渲染，也就是说我们要用 `slot` 替代 `li` 

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
        <child></child>
    </div>


    <script>

        Vue.component('child', {
            data: function() {
                return {
                    list: [1, 2, 3, 4]
                }
            },
            template: `
                <div>
                    <ul>
                        <slot 
                            v-for="item in list"
                            :item=item>
                        </slot>
                    </ul>
                </div>
            `
        })

        var vm =new Vue({
            el: '#app',
        })
    </script>
</body>
</html>  
```

我们希望 child 组件中每一项做一个列表循环。但是循环样式 child 组件并不关心，具体怎么显示由外部告诉它。

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
        <child>
            <template slot-scope="props">
                <h1>{{ props.item }} - hello</h1>
            </template>
        </child>
    </div>


    <script>

        Vue.component('child', {
            data: function() {
                return {
                    list: [1, 2, 3, 4]
                }
            },
            template: `
                <div>
                    <ul>
                        <slot 
                            v-for="item in list"
                            :item=item>
                        </slot>
                    </ul>
                </div>
            `
        })

        var vm =new Vue({
            el: '#app',
        })
    </script>
</body>
</html>  
```

