## 创建分支

city-vuex



## 代码开发

我们希望点击城市的时候，首页的位置城市能够变动，也就是 city.vue 组件的数据能够传入 home.vue 组件，

这是我们就要借助 vue 框架提供的数据框架，vuex，大量数据传递的时候需要这个框架进行辅助。

### 如何使用 Vuex

![](https://vuex.vuejs.org/vuex.png)

state：我们所有的公用数据都存放在 state 之中，如果组件想用一个公用数据，直接调用 state，有些时候我们希望改变公用的数据，怎么去改数据呢？我们不能在组件中直接改变公用数据，我们必须走一个流程：

- 如果我们有一个异步流程，那么我把异步数据放在 Actions 当中，或者一些复杂的批量的同步操作也可以放在 Actions 中，Actions 紧接着调用 Mutations ，其中放的是一个一个同步的对 state 的修改。只有通过 multations 最终才能改变 state
- 有时候我们也可以略过 Actions 直接调用 Mutations
- 额外注意，当组件调用 Actions 时，组件使用了 Dispatch 方法来操作 Actions，通过 commit 来操作 Mutations

其实这就是一个单向的数据改变流程

### 安装使用 Vuex

```shell
cnpm install vuex --save
```

我们在 src 目录中新建 store 文件夹，然后新建 index.js 文件：

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: '北京'
  }
})
```

然后我们回到 main.js 中这么写：

```js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './store'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

```



接下来我们打开 Home 文件夹下面的 Home.vue，以前我们的 header 组件是传入 city 数据进去，现在不需要了：

```vue
<template>
  <div class="list" ref="wrapper">
    <div class="content">
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">{{ this.$store.state.city }}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门区域</div>
        <div class="button-list">
          <div
            class="button-wrapper"
            v-for="item of hot"
            :key="item.id"
            @click="handleCityClick(item.name)"
          >
            <div class="button">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div
        class="area"
        v-for="(item, key) of cities"
        :key="key"
        :ref="key"
      >
        <div class="title border-topbottom">{{ key }}</div>
        <div class="item-list">
          <div
            class="item border-bottom"
            v-for="innerItem of item"
            :key="innerItem.id"
            @click="handleCityClick(innerItem.name)"
          >
            {{ innerItem.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  name: 'CityList',
  props: {
    cities: Object,
    hot: Array,
    letter: String
  },
  methods: {
    handleCityClick (city) {
      this.$store.dispatch('changeCity', city)
    }
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.wrapper)
  },
  watch: {
    letter () {
      if (this.letter) {
        const element = this.$refs[this.letter][0]
        this.scroll.scrollToElement(element)
      }
    }
  }
}
</script>

```



```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: '上海'
  },
  actions: {
    // 传入上下文和city
    changeCity (ctx, city) {
      // 借助 ctx 拿到 commit 方法
      ctx.commit('changeCity', city)
    }
  },
  mutations: {
    changeCity (state, city) {
      // state 指的是所有的公用数据
      state.city = city
    }
  }
})

```



我们刚才的操作没有异步操作，也没有批量的同步操作，所以我们直接调用 mutation：

```vue
  methods: {
    handleCityClick (city) {
      this.$store.commit('changeCity', city)
    }
  },
```



## 提交线上





## Vuex 高级使用和 localStorage

上面我们在 store/index.js 文件中使用了 vuex：

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: '上海'
  },
  mutations: {
    changeCity (state, city) {
      // state 指的是所有的公用数据
      state.city = city
    }
  }
})

```

但是这么写是有问题的，打开浏览器点击三亚，返回首页，这时候米问题，但是如果刷新首页，城市又回到了默认值。实际上我们选中网站需要彻底修改，这时候就需要引入 h5 的 API ：localStorage 实现类似 cookie 的功能，做到本地存储。它的 api 比 cookie 更加的简单：

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: localStorage.city || '上海'
  },
  mutations: {
    changeCity (state, city) {
      // state 指的是所有的公用数据
      state.city = city
      localStorage.city = city
    }
  }
})

```

如果我们取不到本地值，那么我们就是用默认值。

但是我们要记住这个技巧：但供我们使用 localStorage，建议在外层包裹 try catch，因为有些浏览器如果开启了隐身模式或者关闭了本地存储，使用 localStorage 会使得浏览器直接抛出异常：

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let defaultCity = '上海'
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {}

export default new Vuex.Store({
  state: {
    city: defaultCity
  },
  // actions: {
  //   // 传入上下文和city
  //   changeCity (ctx, city) {
  //     // 借助 ctx 拿到 commit 方法
  //     ctx.commit('changeCity', city)
  //   }
  // },
  mutations: {
    changeCity (state, city) {
      // state 指的是所有的公用数据
      state.city = city
      try {
        localStorage.city = city
      } catch (e) {}
    }
  }
})

```

这时候我们的 js 文件变得复杂，我们可以进一步拆分，我们在同级目录中创建一个文件 state.js 和 mutations.js：

state.js：

```js
let defaultCity = '上海'
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {}

export default {
  city: defaultCity
}

```

mutations.js：

```js
export default {
  changeCity (state, city) {
    // state 指的是所有的公用数据
    state.city = city
    try {
      localStorage.city = city
    } catch (e) {}
  }
}

```

index.js：

```js
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations
})

```





现在我们进行点击城市的时候，出现了一些问题，城市无法容纳 三个字以上的内容，否则会出现样式错误。我们在 header.js 中这样解决：

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
    <router-link to='/city'>
      <div class="header-right">
        {{ this.$store.state.city }}
        <span class="iconfont arrow-icon">&#xe6aa;</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  props: {
    city: String
  }
}
</script>

<style lang="scss" scoped>
  @import "~styles/varibles.sass";
  .header {
    display: flex;
    line-height: .86rem;
    background: $bgColor;
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
      min-width: 1.04rem;
      padding: 0 .1rem;
      float: right;
      text-align: center;
      color: #fff;
      .arrow-icon {
        margin-left: -.04rem;
        font-size: .3rem;
      }
    }
  }
</style>

```

接下来我们可以对 header.js 代码进行进一步优化

```
{{ this.$store.state.city }}
```

每次获取 city 都要写这么一长串，vue 提供另外一个方法（比较高级的 api）：

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
    <router-link to='/city'>
      <div class="header-right">
        {{ this.city }}
        <span class="iconfont arrow-icon">&#xe6aa;</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HomeHeader',
  computed: {
    // 使用展开运算符 ...
    // 意思是指将 vuex 的数据映射到组件的 computed 的计算属性里
    ...mapState(['city'])
  }
}
</script>
```

下面我们改一改城市选择的代码：

```vue
<template>
  <div class="list" ref="wrapper">
    <div class="content">
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">{{ this.city }}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门区域</div>
        <div class="button-list">
          <div
            class="button-wrapper"
            v-for="item of hot"
            :key="item.id"
            @click="handleCityClick(item.name)"
          >
            <div class="button">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div
        class="area"
        v-for="(item, key) of cities"
        :key="key"
        :ref="key"
      >
        <div class="title border-topbottom">{{ key }}</div>
        <div class="item-list">
          <div
            class="item border-bottom"
            v-for="innerItem of item"
            :key="innerItem.id"
            @click="handleCityClick(innerItem.name)"
          >
            {{ innerItem.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import { mapState } from 'vuex'
export default {
  name: 'CityList',
  props: {
    cities: Object,
    hot: Array,
    letter: String
  },
  computed: {
    ...mapState({
      currentCity: 'city'
    })
  },
```

mapState 中映射的值可以是一个数组，也可以是一个对象。

下面我们对 commit 方法进行优化（vue 提供了一个 mapMutations 接口）

```js
<script>
import Bscroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CityList',
  props: {
    cities: Object,
    hot: Array,
    letter: String
  },
  computed: {
    ...mapState({
      currentCity: 'city'
    })
  },
  methods: {
    handleCityClick (city) {
      // this.$store.commit('changeCity', city)
      this.changeCity(city)
      this.$router.push('/')
    },
    ...mapMutations({
      changeCity: 'changeCity'
    })
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.wrapper)
  },
  watch: {
    letter () {
      if (this.letter) {
        const element = this.$refs[this.letter][0]
        this.scroll.scrollToElement(element)
      }
    }
  }
}
</script>
```

然后我们对 search.vue 进行优化。



## getter 的作用

我们到 store/index.js 中：

```js
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters: {
    doubleCity (state) {
      return state.city + ' ' + state.city
    }
  }
})

```

这样我们就可以在组件中这样使用 getters 中的 doubleCity：

```vue
import { mapGetters } from 'vuex'
...

computer: {
    ...mapGetters(['doubleCity'])
}
```

getters 完成的是类似于组件中 computed 的作用，需要根据 state 的数据算出新的数据，我们可以通过 getter 来计算出新的数据，这样可以避免数据的冗余。





## Module 的概念

当我们遇到一个非常复杂的场景，比如管理后台系统时，经常有很多功能数据在 vuex 中进行存储。如果把所有的 mutations 都放在 mutations 文件中，这个文件会慢慢变得非常庞大而难以维护。我们可以借助 module 对复杂的 mutations、state、actions 进行拆分。

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

官网例子中定义了一个模块，创建 store 的时候我们可以通过模块来做 store 的创建。好处：A 模块只需要存储 A 模块相关的数据和操作，然后创建 store 的时候，我们对各个模块进行整合



## 提交代码