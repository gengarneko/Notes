## Header 制作

这个项目之中我们使用 styles 这样一个 css 开发工具，它类似于 less 和 sass，帮助我们使用变量。

首先终端打开项目所在文件夹，安装几个依赖包：

安装 `stylus`：

```shell
cnpm install stylus --save
```

安装 `stylus-loader`：

```shell
cnpm install stylus-loader --save
```

至此，`stylus` 相关配置安装完毕，我们使用 `npm run dev` 重启项目：

```shell
npm run dev
```

为了顺应时代潮流，我们可以使用 `Sass` 作为我们的 css 代码编译器。引入过程：

```shell
cnpm istall node-sass --save
cnpm istall sass-loader --save
```



接下来我们开始写 Home 首页的 header，打开 `src/pages/home/Home`

```vue
<template>
	<div>
		Hello World!
	</div>
</template>

<script>
export default {
	name: 'Home'
}
</script>

<style>

</style>
```

然后我们在 `src/pages/home` 文件夹下面新建 `components`  文件夹，我们把首页拆分出来的小组件都放到 `components` 文件夹下面。我们在这个文件夹中创建 `header.vue` ：

```vue
<template>
	<div>
		this is header.
	</div>
</template>

<script>
export default {
	name: 'HomeHeader',
}
</script>

<style>

</style>
```



打开 `src/pages/home、Home.vue` ，修改代码：

```vue
<template>
	<div>
		Hello World!
	</div>
</template>

<script>
import HomeHeader from './components/Header'
export default {
	name: 'Home'
}
</script>

<style>

</style>
```

```vue
import HomeHeader from './components/Header'
```

如何在 `Home.vue` 中使用 `Header.vue` ，只要在 <script> 标签内写入这行代码，项目就会自动去找组件。引入组件后，实际上这就是一个局部组件，之后我们需要在文件内声明这个局部组件：

```vue
<template>
	<div>
		<home-header></home-header>
	</div>
</template>

<script>
import HomeHeader from './components/Header'
export default {
	name: 'Home',
	components: {
		HomeHeader
	}
}
</script>

<style>

</style>
```

打开页面为我们可以看到首页上面的 `this is header.`



我们设计的 header 组件主要由三个部分组成：

```vue
<template>
	<div class="header">
		<div class="header-left"></div>
		<div class="header-input"></div>
		<div class="header-right"></div>
	</div>
</template>

<script>
export default {
	name: 'HomeHeader',
}
</script>

<style>

</style>
```

我们接下来开始写样式，我们希望使用 `sass ` 书写样式，同时我们组件的样式不要影响到其他样式（添加关键字 `scoped`）

```vue
<template>
  <div class="header">
    <div class="header-left">返回</div>
    <div class="header-input">输入城市/景点/游玩主题</div>
    <div class="header-right">城市</div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader'
}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    line-height: .86rem;
    background: #00bcb4;
    color: #fff;
    .header-left {
      width: .64rem;
      float: left;
    }
    .header-input {
      flex: 1;
      height: .64rem;
      line-height: .64rem;
      margin-top: .12rem;
      margin-left: .2rem;
      background: #ffffff;
      border-radius: .1rem;
      color: #ccc;
    }
    .header-right {
      width: 1.24rem;
      float: right;
      text-align: center;
    }
  }
</style>

```

移动端我们一般使用 `rem` 作为我们的布局单位，打开 `reset.css` 我们可以看到 `html` 的 `font-size` 是 `50px` ，那么如果我们写的 `86px` 就不再正确，应该写成 `43px` ，因为我们使用的是 2 倍尺寸图片。那么 `43px` 等于多少 `rem` 呢？ 1rem = html.fontSize = 50px，综上所述我们的 `43px` 应该写成 `.86 rem` 。所以说为什么把 `html.fontSize` 设置成 `50px` 呢？因为这样可以方便地将 2 倍设计图的尺寸/100 从而得到代码中的数值。



下面添加 iconfont，我们打开官网，选择大麦网的图标库，点击需要的图标然后添加到项目之中，这时候我们就有了导航所需要的三个图标。点击下载至本地，打开 `iconfont.woff` `iconfont.ttf` `iconfont.eot` `iconfont.svg`，然后在 `src/assets/styles/` 中创建 `iconfont` 文件夹，把这四个文件移动到这里。将 `iconfont.css` 文件放入  `src/assets/styles/` 文件夹。 移动完后修改 `iconfont.css` 文件：

```css

@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1542871322260'); /* IE9*/
  src: url('iconfont.eot?t=1542871322260#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAUUAAsAAAAAB6wAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFY8mkifY21hcAAAAYAAAABpAAABsszNnhFnbHlmAAAB7AAAARUAAAE86En3s2hlYWQAAAMEAAAALgAAADYTWDg0aGhlYQAAAzQAAAAcAAAAJAfeA4ZobXR4AAADUAAAAA4AAAAUFAAAAGxvY2EAAANgAAAADAAAAAwAhgDUbWF4cAAAA2wAAAAfAAAAIAESADBuYW1lAAADjAAAAUUAAAJtPlT+fXBvc3QAAATUAAAAPwAAAFU9PSGleJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BkYWCcwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGByeqTxbxdzwv4EhhrmZoQEozAiSAwDs2Ay0eJztkcENgCAMRR8FjTGO4dETE3B2Fk+O5WBdQ1vqwSH85BH+C+FAgQHIxmYUSCcJz2E2dZ+Zuy806zMTguiqVXe97hu+5zfJ7sXy14t1MTnyZ+l7e1vx3wt8ClqD7vfAp6BXgDw+nRo7AAAAeJw1jzFLw1AUhe95L01eGolt074kYBtETJRCwVLSIlKiCI6u/hFxFZyFdtLFP1BtZzuoBMHV3cW1P8Hp6Uukdzjcyzl8h0uM9PAFW1KDPCJvuy9904KLJE4Qp8PUP7hjn9Ee0FAP3ii0K+q+LoKmZM/7nban4kA0TIHvcORtQqNQ8i5Yl1hBwyN7UjPWVbN/7/ea/fAb3UU2zKYP2U8HumcwRNoD+1CnfoBXIWtCnQgLL46I+JU6CrNQnYl6S2AppI13J7LKGs1745c8I4d82iHa7SEZY9iB75aLPl1YHVTiMWQE6UI/9TVfGcZqvih0Mc0NI59OCsVtlbfa4rjUDe2tc9k6MZnmh85WDdXzUv8AdWxDrwAAAHicY2BkYGAA4gNKnuHx/DZfGbhZGEDghkyVFIL+38DCwNwM5HIwMIFEAfGpCFYAAHicY2BkYGBu+N/AEMPCAAJAkpEBFbACAEcLAm54nGNhYGBgQcMAAQQAFQAAAAAAAAAoADYAXgCeeJxjYGRgYGBlUGFgZgABJiDmAkIGhv9gPgMADJoBQwB4nGWPTU7DMBCFX/oHpBKqqGCH5AViASj9EatuWFRq911036ZOmyqJI8et1ANwHo7ACTgC3IA78EgnmzaWx9+8eWNPANzgBx6O3y33kT1cMjtyDRe4F65TfxBukF+Em2jjVbhF/U3YxzOmwm10YXmD17hi9oR3YQ8dfAjXcI1P4Tr1L+EG+Vu4iTv8CrfQ8erCPuZeV7iNRy/2x1YvnF6p5UHFockikzm/gple75KFrdLqnGtbxCZTg6BfSVOdaVvdU+zXQ+ciFVmTqgmrOkmMyq3Z6tAFG+fyUa8XiR6EJuVYY/62xgKOcQWFJQ6MMUIYZIjK6Og7VWb0r7FDwl57Vj3N53RbFNT/c4UBAvTPXFO6stJ5Ok+BPV8bUnV0K27LnpQ0kV7NSRKyQl7WtlRC6gE2ZVeOEXpc0Yk/KGdI/wAJWm7IAAAAeJxjYGKAAC4G7ICVkYmRmZGFkZWRjYE9KzMxryS/lB9KJxYV5ZebWJixpSXmZZRmshXnlxaX5jMwAAAzjg43AA==') format('woff'),
  url('iconfont.ttf?t=1542871322260') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('iconfont.svg?t=1542871322260#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-jiantou:before { content: "\e64a"; }

.icon-jiantouarrow486:before { content: "\e6aa"; }

.icon-fanhui:before { content: "\e624"; }

.icon-sousuo:before { content: "\e632"; }


```

```css
@font-face {font-family: "iconfont";
  src: url('./iconfont/iconfont.eot?t=1542871322260'); /* IE9*/
  src: url('./iconfont/iconfont.eot?t=1542871322260#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAUUAAsAAAAAB6wAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFY8mkifY21hcAAAAYAAAABpAAABsszNnhFnbHlmAAAB7AAAARUAAAE86En3s2hlYWQAAAMEAAAALgAAADYTWDg0aGhlYQAAAzQAAAAcAAAAJAfeA4ZobXR4AAADUAAAAA4AAAAUFAAAAGxvY2EAAANgAAAADAAAAAwAhgDUbWF4cAAAA2wAAAAfAAAAIAESADBuYW1lAAADjAAAAUUAAAJtPlT+fXBvc3QAAATUAAAAPwAAAFU9PSGleJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BkYWCcwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGByeqTxbxdzwv4EhhrmZoQEozAiSAwDs2Ay0eJztkcENgCAMRR8FjTGO4dETE3B2Fk+O5WBdQ1vqwSH85BH+C+FAgQHIxmYUSCcJz2E2dZ+Zuy806zMTguiqVXe97hu+5zfJ7sXy14t1MTnyZ+l7e1vx3wt8ClqD7vfAp6BXgDw+nRo7AAAAeJw1jzFLw1AUhe95L01eGolt074kYBtETJRCwVLSIlKiCI6u/hFxFZyFdtLFP1BtZzuoBMHV3cW1P8Hp6Uukdzjcyzl8h0uM9PAFW1KDPCJvuy9904KLJE4Qp8PUP7hjn9Ee0FAP3ii0K+q+LoKmZM/7nban4kA0TIHvcORtQqNQ8i5Yl1hBwyN7UjPWVbN/7/ea/fAb3UU2zKYP2U8HumcwRNoD+1CnfoBXIWtCnQgLL46I+JU6CrNQnYl6S2AppI13J7LKGs1745c8I4d82iHa7SEZY9iB75aLPl1YHVTiMWQE6UI/9TVfGcZqvih0Mc0NI59OCsVtlbfa4rjUDe2tc9k6MZnmh85WDdXzUv8AdWxDrwAAAHicY2BkYGAA4gNKnuHx/DZfGbhZGEDghkyVFIL+38DCwNwM5HIwMIFEAfGpCFYAAHicY2BkYGBu+N/AEMPCAAJAkpEBFbACAEcLAm54nGNhYGBgQcMAAQQAFQAAAAAAAAAoADYAXgCeeJxjYGRgYGBlUGFgZgABJiDmAkIGhv9gPgMADJoBQwB4nGWPTU7DMBCFX/oHpBKqqGCH5AViASj9EatuWFRq911036ZOmyqJI8et1ANwHo7ACTgC3IA78EgnmzaWx9+8eWNPANzgBx6O3y33kT1cMjtyDRe4F65TfxBukF+Em2jjVbhF/U3YxzOmwm10YXmD17hi9oR3YQ8dfAjXcI1P4Tr1L+EG+Vu4iTv8CrfQ8erCPuZeV7iNRy/2x1YvnF6p5UHFockikzm/gple75KFrdLqnGtbxCZTg6BfSVOdaVvdU+zXQ+ciFVmTqgmrOkmMyq3Z6tAFG+fyUa8XiR6EJuVYY/62xgKOcQWFJQ6MMUIYZIjK6Og7VWb0r7FDwl57Vj3N53RbFNT/c4UBAvTPXFO6stJ5Ok+BPV8bUnV0K27LnpQ0kV7NSRKyQl7WtlRC6gE2ZVeOEXpc0Yk/KGdI/wAJWm7IAAAAeJxjYGKAAC4G7ICVkYmRmZGFkZWRjYE9KzMxryS/lB9KJxYV5ZebWJixpSXmZZRmshXnlxaX5jMwAAAzjg43AA==') format('woff'),
  url('./iconfont/iconfont.ttf?t=1542871322260') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('./iconfont/iconfont.svg?t=1542871322260#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

```

现在我们可以使用 `iconfont` 了：（打开 `Header.vue`）

```vue
<template>
  <div class="header">
    <div class="header-left">
      <span class="iconfont"></span>
    </div>
    <div class="header-input">输入城市/景点/游玩主题</div>
    <div class="header-right">城市</div>
  </div>
</template>
```

下面我们去我们的图库去寻找 16 进制代码，复制到项目代码中：

```vue
<template>
  <div class="header">
    <div class="header-left">
      <span class="iconfont">&#xe624;</span>
    </div>
    <div class="header-input">输入城市/景点/游玩主题</div>
    <div class="header-right">城市</div>
  </div>
</template>
```

可以看到生效，我们继续进行 css 样式的优化：

```vue
<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont back-icon">&#xe624;</div>
    </div>
    <div class="header-input">
      <span class="iconfont">&#xe632;</span>
      输入城市/景点/游玩主题
    </div>
    <div class="header-right">
      城市
      <span class="iconfont arrow-icon">&#xe6aa;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader'
}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    line-height: .86rem;
    background: #00bcb4;
    color: #fff;
    .header-left {
      width: .64rem;
      float: left;
      .back-icon {
        text-align: center;
        font-size: .4rem;
      }
    }
    .header-input {
      flex: 1;
      height: .64rem;
      line-height: .64rem;
      margin-top: .12rem;
      margin-left: .2rem;
      padding-left: .2rem;
      background: #ffffff;
      border-radius: .1rem;
      color: #ccc;
    }
    .header-right {
      width: 1.24rem;
      float: right;
      text-align: center;
      .arrow-icon {
        margin-left: -.04rem;
        font-size: .3rem;
      }
    }
  }
</style>

```



### 第一步优化

接下来我们对 css 代码进行变量复用优化，在 `src/assets/styles` 文件目录下创建一个文件 `varibles.sass`

```css
$bg-color: #00bcb4;
```

然后我们就可以在原来的 Header.vue 文件中进行引用：

```css
...

<style lang="scss" scoped>
  @import "../../../assets/styles/varibles.sass";
  .header {
    display: flex;
    line-height: .86rem;
    background: $bg-color;
    color: #fff;
    .header-left {
      width: .64rem;
      float: left;
      .back-icon {
        text-align: center;
        font-size: .4rem;
      }
    }
    
...    
```

我们可以使用这种方式将公用样式抽离出来，放到 `varibles.sass` 之中。



### 第二步优化

```css
@import "~@/assets/styles/varibles.sass";
```

我们可以是用这种方式来更简便地引入公共样式文件。



### 第三部优化

我们发现我们经常使用到 `src/assets/styles` 这个文件夹名字，所以我们可以用一个变量来替换它，打开 `build/webpack.base.conf.js`

```js
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module
```

我们对其进行添加代码：

```js
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'styles': resolve('src/assets/styles'),
    }
  },
```

然后在各处代码中进行精简（此时发现项目报错，因为 webpack 文件被修改时要重启），此处略。

至此，header 组件开发完成，我们使用 git 提交代码：

```
git add.
git commit -m "add header"
git push
```














