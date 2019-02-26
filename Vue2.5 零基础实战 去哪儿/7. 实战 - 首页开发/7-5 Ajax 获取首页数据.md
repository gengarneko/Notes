# Ajax 动态获取数据



## 创建分支

创建 `index-ajax`

```
git pull
git checkout index-ajax
```



## 代码开发

vue 中发送 ajax 有很多工具供我们使用：

- 浏览器中的 fetch

- vue-resource 第三方模块

- axios 第三方模块（vue 官方推荐）

  ​	实现跨平台数据请求，浏览器端发送 heir 请求，node 服务器上发送 http 请求



我们使用 axios 来完成 ajax 的请求。

```
cnpm install axios --save
```

这么多组件，每一个组件都有自己的数据，每个组件都需要 ajax 请求，将自己对应的数据拿取过来，如果这么做，是有问题的，这样组件多带来低性能。

解决方案：整个首页发送一个 `ajax` 请求，很显然，我们在 Home.vue 里面获取 ajax 数据。我们使用 `mounted ()` 函数来进行 ajax 请求的发送：

```vue
<template>
  <div>
    <home-header></home-header>
    <home-swiper></home-swiper>
    <home-icons></home-icons>
    <home-recommend></home-recommend>
    <home-weekend></home-weekend>
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons from './components/Icons'
import HomeRecommend from './components/Recommend'
import HomeWeekend from './components/Weekend'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  methods: {
    getHomeInfo () {
      axios.get('/api/index.json')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
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

这时候我们刷新页面，可以看到 404，因为没有 /api/index.json 这个文件，在没有后端支持的情况下，我们怎么进行模拟呢？我们可以在 static 文件夹内新建 mock 文件夹，然后在文件夹内新建文件 index.json。

为什么我们将我们的模拟数据放入 static 文件夹下呢，因为整个项目文件夹中只有 static 可以被外部访问到。

因为这是本地的一些模拟数据，我们并不希望提交到线上，所以我们可以在 .gitignore 文件中添加一行：

```git
.DS_Store
node_modules/
/dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
static/mock

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln

```

如果我们这么定义了一个 json 文件，那么我们 ajax 请求的时候就应该是 `/static/mock/index.json`

```vue
  methods: {
    getHomeInfo () {
      axios.get('/static/mock/index.json')
        .then(this.getHomeInfoSucc)
    },
```

这时候我们就能在控制台看到 hello world，可是这么写我们就遇到一个新的问题，我们现在用的都是本地模拟的接口的地址，加入我们的代码要上线，肯定不能写，那么上线前就需要我们手动修改代码内容。而上线之前改动代码是危险的，我们不建议大家这么做。我们希望有一个转发机制，当我们访问 `/api/index.json` 的时候，真正访问的其实是 `/static/mock/index.json`，很高兴 vue 中有 proxy 代理的功能可以帮助我们实现，我们打开 `/config/index.js` 里面有一个 `proxyTable：`

```js
 // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/api': '/static/mock'
        }
      }
    },
```

这时候我们访问 `/api/index.json` 的时候就能自动访问到 `/static/mock/index.json`，实际上这个功能并不是 vue 所提供的，是 webpack-dev-server 这个工具所提供的。我们重启服务器。



然后我们编写 json 文件：

```json
{
  "ret": true,
  "data": {
    "swiperList": [{
        "id": "0001",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1801/1a/94428c6dea109402.jpg_640x200_2cf590d8.jpg"
      },{
        "id": "0002",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1802/42/7c92b9a381e46402.jpg_640x200_1cdce2a4.jpg"
      },{
        "id": "0003",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1802/51/e78f936a5b404102.jpg_640x200_c14f0b3a.jpg"
      },{
        "id": "0004",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1712/91/a275569091681d02.jpg_640x200_0519ccb9.jpg"
      }],
    "iconList": [{
        "id": "0001",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",
        "desc": "景点门票"
      }, {
        "id": "0002",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1711/df/86cbcfc533330d02.png",
        "desc": "滑雪季"
      }, {
        "id": "0003",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1710/a6/83f636bd75ae6302.png",
        "desc": "泡温泉"
      }, {
        "id": "0004",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1611/35/2640cab202c41b02.png",
        "desc": "动植园"
      }, {
        "id": "0005",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1611/d0/e09575e66f4aa402.png",
        "desc": "游乐园"
      }, {
        "id": "0006",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1611/59/569d3c096e542502.png",
        "desc": "必游榜单"
      }, {
        "id": "0007",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1611/17/4bd370f3eb1acd02.png",
        "desc": "演出"
      }, {
        "id": "0008",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1611/7f/b1ea3c8c7fb6db02.png",
        "desc": "城市观光"
      }, {
        "id": "0009",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1611/a9/ffc620dbda9b9c02.png",
        "desc": "一日游"
      }],
    "recommendList": [{
        "id": "0001",
        "imgUrl": "http://img1.qunarzz.com/sight/p0/1409/19/adca619faaab0898245dc4ec482b5722.jpg_140x140_80f63803.jpg",
        "title": "故宫",
        "desc": "东方宫殿建筑代表，世界宫殿建筑典范"
      }, {
        "id": "0002",
        "imgUrl": "http://img1.qunarzz.com/sight/p0/1511/d2/d2aec2dfc5aa771290.water.jpg_140x140_abb362a7.jpg",
        "title": "南山滑雪场",
        "desc": "北京专业级滑雪圣地"
      }, {
        "id": "0003",
        "imgUrl": "http://img1.qunarzz.com/sight/p0/1501/f4/f467729126949c3a.water.jpg_140x140_ef235b1c.jpg",
        "title": "天安门广场",
        "desc": "我爱北京天安门，天安门上太阳升"
      }, {
        "id": "0004",
        "imgUrl": "http://img1.qunarzz.com/sight/p0/1501/40/40b2b6c951b28fdd.water.jpg_140x140_1c863e5c.jpg",
        "title": "水立方",
        "desc": "中国的荣耀，阳光下的晶莹水滴"
      }, {
        "id": "0005",
        "imgUrl": "http://img1.qunarzz.com/sight/p0/201308/23/b283071686e64dfec8d65eac.jpg_140x140_8c5a7c49.jpg",
        "title": "温都水城养生馆",
        "desc": "各种亚热带植物掩映其间仿佛置身热带雨林"
      }],
    "weekendList": [{
        "id": "0001",
        "imgUrl": "http://img1.qunarzz.com/sight/source/1510/6e/1ea71e2f04e.jpg_r_640x214_aa6f091d.jpg",
        "title": "北京温泉排行榜",
        "desc": "细数北京温泉，温暖你的冬天"
      }, {
        "id": "0002",
        "imgUrl": "http://img1.qunarzz.com/sight/source/1505/aa/7baaf8a851d221.jpg_r_640x214_1431200f.jpg",
        "title": "北京必游TOP10",
        "desc": "来北京必去的景点非这些地方莫属"
      }, {
        "id": "0003",
        "imgUrl": "http://img1.qunarzz.com/sight/source/1505/9e/21df651e19af5d.jpg_r_640x214_3ea5bb38.jpg",
        "title": "寻找北京的皇城范儿",
        "desc": "数百年的宫廷庙宇，至今依旧威严霸气"
      }, {
        "id": "0004",
        "imgUrl": "http://img1.qunarzz.com/sight/source/1505/ce/bc89bc2f0e33ea.jpg_r_640x214_3e408453.jpg",
        "title": "学生最爱的博物馆",
        "desc": "周末干嘛？北京很多博物馆已经免费开放啦"
      }, {
        "id": "0005",
        "imgUrl": "http://img1.qunarzz.com/sight/source/1505/b2/fde1bfcd057a52.jpg_r_640x214_bbf3fa44.jpg",
        "title": "儿童剧场，孩子的乐园",
        "desc": "带宝贝观看演出，近距离体验艺术的无穷魅力"
      }]
  }
}
```

ret 代表的是服务器成功响应 ajax 请求。



## 首页父子组件数据传递

```vue
<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <!-- slides -->
      <swiper-slide v-for="item of list" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl" alt="轮播图片">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        autoplay: true
      }
    }
  },
  computed: {
    showSwiper () {
      return this.list.length
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper /deep/ .swiper-pagination-bullet-active {
    background: white !important;
  }
  .wrapper {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 31.47%;
    background: #eeeeee;
    .swiper-img {
      width: 100%;
    }
  }
</style>

```

```vue
<template>
  <div>
    <home-header :city="city"></home-header>
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
      city: '',
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekendList: []
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('/api/index.json')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.city = data.city
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



## 提交线上

```
git add .
git commit -m "finish index"
git push
git checkout master
git merge index-ajax
git push
```

