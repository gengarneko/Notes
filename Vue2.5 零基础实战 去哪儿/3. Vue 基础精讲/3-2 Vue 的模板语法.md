## Vue的模板语法



### 插值表达式

```
{{ name }}
```



### 模板语法

> 当我们看到一个 vue 指令后面跟着一个值的时候，此时值不再是一个字符串，而是一个 js 的表达式。

`v-text` 将 div 中 innerText 内容变成 data 里的数据，作用和插值表达式一样。

`v-html` 将 div 中 innerHTML 内容和 name 数据变量进行一个绑定。



```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Vue 实例生命周期函数</title>
    <link rel="stylesheet" href="">
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
</head>
<body>
    <div id="app">
        <div>{{ name + 'Lee' }}</div>
        <div v-text=" name + 'Lee' "></div>
        <div v-html=" name + 'Lee' "></div>
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                name: '<h1>nana</h1>'
            }
           
        })
    </script>
</body>
</html>
```

