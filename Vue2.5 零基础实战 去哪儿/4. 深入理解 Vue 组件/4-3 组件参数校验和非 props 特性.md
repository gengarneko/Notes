# 组件参数校验



## 简单的校验

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
        <Child :content="'hello world'"></Child>
    </div>


    <script>

        Vue.component('child', {
            props: {
                content: {
                    type: String,
                    required: false,
                    default: 'default value'
                }
            },
            data: function() {
                return {
                    text: this.content
                }
            },
            template: '<div>{{ text }}</div>'
        })

        var vm = new Vue({
            el: '#app',
        })
    </script>
</body>
</html>  
```



## 较为复杂的自定义校验

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
        <Child :content="'hello world'"></Child>
    </div>


    <script>

        Vue.component('child', {
            props: {
                content: {
                    type: String,
                    validator: function(value) {
                        return (value.length > 5)
                    }
                }
            },
            data: function() {
                return {
                    text: this.content
                }
            },
            template: '<div>{{ text }}</div>'
        })

        var vm = new Vue({
            el: '#app',
        })
    </script>
</body>
</html>  
```





# 非 props 特性



## props 特性

当你的父组件通过属性传值给子组件时，恰好子组件里面声明了对父组件传递过来的属性的接受，父子组件有一个对应关系，这就是 props 特性。

props 特性特点：子组件里直接通过插值表达式/this. 语句来使用父组件传进来的值



## 非 props 特性

情况一：父组件向自组件传递了一个属性，但是子组件并没有 props，没有相应声明。

情况二：实际上会显示在 DOM 当中，属性会展示在子组件最外成 DOM 标签的 HTMl 属性里面