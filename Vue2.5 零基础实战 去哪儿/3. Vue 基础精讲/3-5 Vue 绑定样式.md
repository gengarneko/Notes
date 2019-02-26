# 样式绑定



## class 的对象绑定

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
        <div @click="handleDivClick"
             :class="{activated: isActivated}">
            Hello World!
        </div>
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                isActivated: false,
            },
            methods: {
                handleDivClick: function() {
                    this.isActivated = !this.isActivated;
                }
            }
        })
    </script>
</body>
</html>  
```





## class 的数组绑定

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
        <div @click="handleDivClick"
             :class="[activated]">
            Hello World!
        </div>
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                activated: '',
            },
            methods: {
                handleDivClick: function() {
                    // if (this.activated === "activated") {
                    //     this.activated = ""
                    // } else {
                    //     this.activated = "activated"
                    // }
                    this.activated = this.activated === "activated" ? "" : "activated";
                }
            }
        })
    </script>
</body>
</html>  
```



## 内联样式的对象绑定

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
        <div :style="styleObj"
             @click="handleDivClick">
            Hello World!
        </div>
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                styleObj: {
                    color: "black"
                }
            },
            methods: {
                handleDivClick: function() {
                    this.styleObj.color = this.styleObj.color === "black" ? "red" : "black";
                }
            }
        })
    </script>
</body>
</html>  
```



## 内联样式的数组绑定

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
        <div :style="[styleObj, {fontSize: '20px'}]"
             @click="handleDivClick">
            Hello World!
        </div>
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                styleObj: {
                    color: "black"
                }
            },
            methods: {
                handleDivClick: function() {
                    this.styleObj.color = this.styleObj.color === "black" ? "red" : "black";
                }
            }
        })
    </script>
</body>
</html>    
```

跟上面的效果完全一致，样式由数组里面的对象所决定。











