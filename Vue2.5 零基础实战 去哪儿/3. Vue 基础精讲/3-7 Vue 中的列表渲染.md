# Vue 中的列表渲染



## 基础搭建

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
        <div v-for="item in list">
            {{ item }}
        </div>
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                list: [
                    "hello",
                    "HP",
                    "dota",
                    "lol",
                    "ow"
                ]
            }
        })
    </script>
</body>
</html>  
```

我们可以尝试用 index 作为 key 值

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
        <div v-for="item in list">
            {{ item }}
        </div>
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                list: [
                    "hello",
                    "HP",
                    "dota",
                    "lol",
                    "ow"
                ]
            }
        })
    </script>
</body>
</html>  
```

> 用这种方法会使得 Vue 没法充分复用 DOM 元素，影响性能，所以不推荐

一般来说，list 这组数据是从后端传递过来，后端返回数据一般会带 id 值，是数据库中的唯一标识

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
        <div v-for="(item, index) in list"
             :key="item.id">
            {{ index }} ------ {{ item }}
        </div>
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                list: [{
                    id: '050128123',
                    text: 'hello'
                }, {
                    id: '050128124',
                    text: 'php'
                }, {
                    id: '050128125',
                    text: 'c#'
                }]
            }
        })
    </script>
</body>
</html>  
```

> key 最优写法：使用后端传进来的 id，并且不使用数组的 index





## 通过变异方法改变数组

当我们尝试修改数组中的内容的时候，不能直接通过下标的形式改变数组，我们只能通过 Vue 提供的 API 来操作数组：pop，push，shift，unshift，splice，sort，reverse。

以下是改变数组数据的代码

```
vm.list.slice(1, 1, {id: "001", text: "Dell"})
```





## 通过改变引用改变数组

因为我们知道，list 数组在 js 里面是一个引用类型，我们改变引用来改变页面数据。

以下是代码：

```
vm.list = [{
                    id: '050128123',
                    text: 'hello'
                }, {
                    id: '050128124',
                    text: 'php'
                }, {
                    id: '050128125',
                    text: 'c#'
                }]
```



## set( ) 改变数组内容

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
        <div v-for="(item, index) in userInfo">
            {{ index }} --- {{ item }}
        </div>
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                userInfo: [1, 2, 3, 4]
            }
        })
    </script>
</body>
</html>  
```

```
Vue.set(vm.userInfo, 1, 5)
vm.$set(vm.userInfo, 1, 5)
```



## template 占位符

当我们不想要外层 div，我们可以使用 template 包裹元素进行页面渲染。

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
        <template v-for="(item, index) in list"
             :key="item.id">
            <div>
                {{ index }} ------ {{ item.text }}
            </div>
            <span>
                {{ item.text }}
            </span>
        </template>
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                list: [{
                    id: '050128123',
                    text: 'hello'
                }, {
                    id: '050128124',
                    text: 'php'
                }, {
                    id: '050128125',
                    text: 'c#'
                }]
            }
        })
    </script>
</body>
</html>  
```



## 对象的循环渲染

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
        <div v-for="(item, key, index) in userInfo">
            {{ index }} --- {{ key }} --- {{ item }}
        </div>
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                userInfo: {
                    name: "PHP",
                    age: 28,
                    gender: "male",
                    salary: "secret"
                }
            }
        })
    </script>
</body>
</html>  
```

改变对象数据：

```html
vm.userInfo.username = "Dell"
vm.userInfo = {
    name: "PHP",
    age: 38,
    gender: "male",
    salary: "secret",
	address: "beijing"
}
```

### 通过 set 方法向对象注入数据

```
Vue.set(vm.userInfo, "address", "beijing")
```

Vue.set( ) 方法既是一个 Vue 中的全局方法，又是一个 Vue 的实例方法。

```
vm.$set(vm.userInfo, "address", "beijing")
```





