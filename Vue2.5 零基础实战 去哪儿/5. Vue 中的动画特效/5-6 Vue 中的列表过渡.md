# 列表过渡



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
            transition: opacity .6s;
        }
    </style>

</head> 
<body>
    <div id="app">
        <transition-group >
            <div v-for="(item, index) in list" :key="item.id">
                {{ item.title }} - {{ item.id }}
            </div>
        </transition-group>

        <button @click="handleBtnClick">Add</button>
    </div>

    <script>
        var count = 0;

        var vm =new Vue({
            el: '#app',
            data: {
                list: []
            },
            methods: {
                handleBtnClick: function() {
                    this.list.push({
                        id: count++,
                        title: 'hello world!'
                    })
                }
            }
        })

    </script>
</body>
</html>  
```

<transition-group> 中每个列表项都被 <transition> 包围。