## 创建分支

detail-header



## 代码开发

Header.vue

```vue
<template>
  <div>
    <!-- 初始状态，默认显示 -->
    <router-link
      tag="div"
      to="/"
      class="header-abs"
      v-show="showAbs"
    >
      <div class="iconfont header-abs-back">&#xe624;</div>
    </router-link>
    <!-- 向下滚动，显示固定头部 -->
    <div
      class="header-fixed"
      v-show="!showAbs"
      :style="opacityStyle"
    >
      <router-link to="/">
        <div class="iconfont header-fixed-back">&#xe624;</div>
      </router-link>
      景点详情
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  data () {
    return {
      showAbs: true,
      opacityStyle: {
        opacity: 0
      }
    }
  },
  methods: {
    handleScroll () {
      const top = document.documentElement.scrollTop
      if (top > 60) {
        let opacity = top / 140
        opacity = opacity > 1 ? 1 : opacity
        // opacity = opacity > 1 ? 1
        this.opacityStyle = { opacity }
        this.showAbs = false
      } else {
        this.showAbs = true
      }
      console.log(document.documentElement.scrollTop)
    }
  },
  activated () {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/varibles.sass';
  .header-abs {
    position: absolute;
    text-align: center;
    line-height: .8rem;
    left: .2rem;
    top: .2rem;
    width: .8rem;
    height: .8rem;
    border-radius: .4rem;
    background: rgba($color: #000000, $alpha: 0.8);
    .header-abs-back {
      color: #fff;
      font-size: .4rem;
    }
  }
  .header-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $headerHeight;
    line-height: $headerHeight;
    text-align: center;
    color: #fff;
    background: $bgColor;
    font-size: .32rem;
    .header-fixed-back {
      position: absolute;
      top: 0;
      width: .64rem;
      text-align: center;
      font-size: .4rem;
      color: #fff;
    }
  }
</style>

```



## 提交代码

```shell
git commit -m "finish detail-header"
```

