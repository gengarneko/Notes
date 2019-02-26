## 创建分支

detail-banner



## 代码开发

我们想要点击 recommend 的景点就跳转到相应的详情页，我们可以在 <li> 标签外部包裹 <router-link> ，但是这样会使得我们的文字变色，我们可以将 <li> 直接替换成 <router-link>，并且添加 `tag="li"` 这样就会将 <router-link> 渲染为 <li> 。

添加路由，index.js：

```js
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/home/Home'
// import List from '@/pages/list/List'
import City from '@/pages/city/City'
import Detail from '@/pages/detail/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/city',
      name: 'City',
      component: City
    }, {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }
  ]
})

```

修改跳转，recommend.vue：

```vue
<template>
  <div>
    <div class="recommend-title">热销推荐</div>
    <ul>
      <router-link
        tag="li"
        :to="'/detail/' + item.id"
        class="item border-bottom"
        v-for="item of list"
        :key="item.id"
      >
        <img class="item-img" :src="item.imgUrl" alt="">
        <div class="item-info">
          <p class="item-title">{{ item.title }}</p>
          <p class="item-desc">{{ item.desc }}</p>
          <button class="item-button">查看详情</button>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    list: Array
  }
}
</script>

```

新建文件，Detail.vue：

```vue
<template>
  <div class="detail">
    detail
  </div>
</template>

<script>
export default {
  name: 'Detail'
}
</script>

<style lang="scss" scoped>

</style>

```



banner.vue

```vue
<template>
  <div class="banner">
    <img
      class="banner-img"
      src="http://img1.qunarzz.com/sight/p0/1602/de/de8400021b664c5390.img.jpg_600x330_35e2f813.jpg" alt="">
      <div class="banner-info">
        <div class="banner-title">盐城海洋世界（AAAAA景区）</div>
        <div class="banner-number">
          <span class="iconfont banner-icon">&#xe692;</span>
          39
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBanner'
}
</script>

<style lang="scss" scoped>
  @import '~styles/varibles.sass';
  .banner {
    position: relative;
    overflow: hidden;
    height: 0;
    padding-bottom: 55%;
    .banner-img {
      width: 100%;
    }
    .banner-info {
      display: flex;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      line-height: .6rem;
      color: #fff;
      background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
      .banner-title {
        flex: 1;
        font-size: .32rem;
        padding: 0 .2rem;
      }
      .banner-number {
        height: .32rem;
        line-height: .32rem;
        margin: .14rem .2rem 0 .2rem;
        padding: 0 .4rem;
        border-radius: .2rem;
        background: rgba($color: #000000, $alpha: .6);
        font-size: .24rem;
        .banner-icon {
          font-size: .24rem;
        }
      }
    }
  }
</style>

```



Detail.vue

```vue
<template>
  <div>
    <detail-banner></detail-banner>
  </div>
</template>

<script>
import DetailBanner from './components/Banner'
export default {
  name: 'Detail',
  components: {
    DetailBanner
  }
}
</script>

<style lang="scss" scoped>

</style>

```



