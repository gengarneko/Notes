## 创建分支

创建 city-keepAlive



## 代码开发

我们打开项目，打开控制台，点击 network，点击 XHR，我们可以看到每次路由发生切换的时候，AJAX 都会被重新发送，原因：每次路由切换组件的时候，目标组件都会被重新渲染，mounted 钩子都会被重新调用，然后其中的 ajax 数据就会被重新获取。这样就会造成性能不理想。

我们打开 App.vue 组件，看到 <router-view> 显示的是路由所对应的内容，我们在外层包裹一个 <keep-alive> ，这是 router 所自带的标签：

```vue
<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

```

意思是路由的内容被加载过一次之后，就把路由中的内容放到内存之中，下一次再调用这个路由，不需要重新渲染这个组件执行 ajax 获取数据，只需要从内存中拿数据。

接着我们来操作页面，可以看到 XHR 中文件不会被重新调用。

但是这时候还存在着问题，当我们切换城市，首页内容应该重新加载 ajax 请求，打开 Home.vue 组件：

```vue
<template>
  <div>
    <home-header></home-header>
    <home-swiper :list="swiperList"></home-swiper>
    <home-icons :list="iconList"></home-icons>
    <home-recommend :list="recommendList"></home-recommend>
    <home-weekend :list="weekendList"></home-weekend>
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons from './components/Icons'
import HomeRecommend from './components/Recommend'
import HomeWeekend from './components/Weekend'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  data () {
    return {
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekendList: []
    }
  },
  computed: {
    ...mapState(['city'])
  },
  methods: {
    getHomeInfo () {
      axios.get('/api/index.json?city=' + this.city)
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.swiperList = data.swiperList
        this.iconList = data.iconList
        this.recommendList = data.recommendList
        this.weekendList = data.weekendList
      }
      console.log(res)
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style>
</style>

```

打开控制台可以看到 headers 里面获取到的参数，但是选择城市的时候参数并没有改变，因为 <keep-alive> 将数据缓存起来了，直接取的是缓存的数据。当我们使用 keep-alive 的时候，生命周期里面会多一个函数 activated：

```vue
<template>
  <div>
    <home-header></home-header>
    <home-swiper :list="swiperList"></home-swiper>
    <home-icons :list="iconList"></home-icons>
    <home-recommend :list="recommendList"></home-recommend>
    <home-weekend :list="weekendList"></home-weekend>
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons from './components/Icons'
import HomeRecommend from './components/Recommend'
import HomeWeekend from './components/Weekend'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  data () {
    return {
      lastCity: '',
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekendList: []
    }
  },
  computed: {
    ...mapState(['city'])
  },
  methods: {
    getHomeInfo () {
      axios.get('/api/index.json?city=' + this.city)
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.swiperList = data.swiperList
        this.iconList = data.iconList
        this.recommendList = data.recommendList
        this.weekendList = data.weekendList
      }
      console.log(res)
    }
  },
  mounted () {
    this.lastCity = this.city
    this.getHomeInfo()
  },
  activated () {
    if (this.lastCity !== this.city) {
      this.lastCity = this.city
      this.getHomeInfo()
    }
  }
}
</script>

<style>
</style>

```

这个函数在我们切换城市的时候会响应，而 mounted 不会响应。所以我们可以判断城市是否改变，在 activated 函数里面调用方法。我们通过一个判断 + 临时变量解决了这个问题。



## 提交线上