# 计算属性的 getter 方法和 setter 方法



## 搭建骨架

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
        {{ fullName }}
    </div>


    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                firstName: 'Dell',
                lastName: 'Lee',
            },
            computed: {
                fullName: function() {
                    return this.firstName + " " + this.lastName;
                }
            }
        })
    </script>
</body>
</html>  
```



## 改写



### 将 fullName 当作一个对象，改写 fullName：



使用 get 获得 value

```html
computed: {
    fullName: {
        get: function() {
            return this.firstName + " " + this.lastName;
        },
		set: function(value) {
			console.log(value);
		}
    }
}
```

![1542604688723](E:\笔记\Vue2.5 零基础实战 去哪儿\3. Vue 基础精讲\3-4 计算属性 setter getter.assets\1542604688723.png)



使用 set 改变 value

```html
computed: {
    fullName: {
        get: function() {
            return this.firstName + " " + this.lastName;
        },
        set: function(value) {
            // 将 value 字符串用空格打散为一个数组
            var arr = value.split(" ");
            this.firstName = arr[0];
            this.lastName = arr[1];
        }
    }
} 
```



