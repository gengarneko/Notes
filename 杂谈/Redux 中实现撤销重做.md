# 实现撤销历史

在应用中构建撤销和重做功能往往需要开发者刻意付出一点精力。对于经典的 MVC 框架来说，这不是一个简单的问题，因为你需要克隆所有相关的 model 来追踪每一个历史状态。此外，你需要考虑整个撤销堆栈，因为用户的初识更改也是可以撤销的。

这意味着在 MVC 应用中实现撤销和重做功能时，不得不使用一些类似于 Command 的特殊的数据修改模式来重写你的应用代码。

然而你可以用 Redux 轻易实现撤销历史，因为以下三个原因：

- 不存在多个模型的问题，你需要关心的只是 state 的子树
- state 是不可变数据，所有的修改被描述成独立的 action，而这些action 与预期的撤销堆栈模型很接近了。
- reducer 的签名 `(state, action) => state` 可以自然实现 “reducer enhancers” 或者 “higher order reducers”。它们在你为 reducer 添加额外的功能时保持着这个签名。撤销历史就是一个典型的应用场景。

在动手之前，确认已经掌握好 reducer 合成。



## 理解撤销历史

### 设计状态结构

撤销历史也是应用 state 的一部分，我们没必要以不同的方式实现它们。当你实现撤销和重做两个功能的时候，无论 state 如何随着时间不断变化，你都需要追踪 state 在不同时刻的历史记录。

例如，一个计数器应用的 state 结构看起来可能是这样：

```js
{
  counter: 10
}
```

如果我们希望在这样一个应用中实现撤销和重做的话，我们必须保存更多的 state 以解决以下几个问题：

- 撤销或重做留下了哪些信息？
- 当前的状态是什么？
- 撤销堆栈中过去（和未来）的状态是什么？

为此我们对 state 的结构做了以下的修改以便解决上述问题：

```js
{
  counter: {
    past: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    present: 10,
    future: []
  }
}
```

现在，如果按下 “撤销”，我们希望恢复到过去的状态：

```js
{
  counter: {
    past: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ],
    present: 9,
    future: [10]
  }
}
```

再按一次：

```
{
  counter: {
    past: [ 0, 1, 2, 3, 4, 5, 6, 7 ],
    present: 8,
    future: [9, 10]
  }
}
```

当我们按下 “重做”，我们希望往未来的状态移动一步：

```js
{
  counter: {
    past: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ],
    present: 9,
    future: [ 10 ]
  }
}
```

最终，当处于撤销堆栈中时，用户发起一个操作（例如，减少计数），那么我们需要舍弃所有的未来信息：

```
{
  counter: {
    past: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    present: 8,
    future: []
  }
}
```

有趣的一点是，我们在撤销堆栈中保存的是数组、字符串、数组或是对象都不重要，重要的是结构始终保持一致：

```
{
  counter: {
    past: [ 0, 1, 2 ],
    present: 3,
    future: [ 4 ]
  }
}
```

```json
{
  todos: {
    past: [
      [],
      [ { text: 'Use Redux' } ],
      [ { text: 'Use Redux', complete: true } ]
    ],
    present: [ { text: 'Use Redux', complete: true }, { text: 'Implement Undo' } ],
    future: [
      [ { text: 'Use Redux', complete: true }, { text: 'Implement Undo', complete: true } ]
    ]
  }
}
```

它通常看起来是这样的：

```js
{
  past: Array<T>,
  present: T,
  future: Array<T>
}
```

我们可以在顶层保存单一的历史记录：

```js
{
  past: [
    { counterA: 1, counterB: 1 },
    { counterA: 1, counterB: 0 },
    { counterA: 0, counterB: 0 }
  ],
  present: { counterA: 2, counterB: 1 },
  future: []
}
```

也可以分离历史记录，这样我们就可以独立地执行撤销和重做操作：

```
{
  counterA: {
    past: [ 1, 0 ],
    present: 2,
    future: []
  },
  counterB: {
    past: [ 0 ],
    present: 1,
    future: []
  }
}
```

接下来我们将会看到如何合适地分离撤销和重做。



### 设计算法

无论何种特定的数据类型，重做历史记录的 state 结构始终保持一致：

```js
{
  past: Array<T>,
  present: T,
  future: Array<T>
}
```

让我们讨论一下如何通过算法来操作上文中所述的 state 结构。我们可以定义两个 action 来操作该 state：`UNDO` 和 `REDO`。在 reducer 中，我们希望以如下步骤处理这两个 action：

#### 处理 Undo

- 移除 `past` 中的最后一个元素
- 将上一步移除的元素赋予 `present`
- 将原来的 `present` 插入到 `future` 最前端

#### 处理 Redo

- 移除 `future` 中的第一个元素
- 将上一步移除的元素赋予 `present`
- 将原来的 `present` 追加到 `past` 的最后面

#### 处理其他 Action

- 将当前的 `present` 追加到 `past` 的最后面
- 将处理完 action 所产生的新的 state 赋予 `present`
- 清空 `future`



## 第一次尝试：编写 Reducer

```js
const initialState = {
  past: [],
  present: null, // (?) 我们如何初始化当前状态？
  future: []
}

function undoable (state = initialState, action) {
  const { past, present, future } = state
  
  switch (action.type) {
    case 'UNDO':
      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)
      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }
    case 'REDO':
      cosnt next = future[0]
      const newFuture = future.slice(1)
      return {
        past: [...past, present],
        present: next,
        future: newFuture
      }
    default:
      // (?) 我们如何处理其它 action？
      return state
  }
}
```

这个实现是无法实现的，因为它忽略了以下三个重要问题：

- 我们从何处获取初识的 `present` 状态？我们无法预先知道它
- 当处理完外部的 action 后，我们在哪里完成将 `present` 保存到 `past` 的工作？
- 我们如何将 `present` 状态的控制委托给一个自定义的 reducer？

看起来 reducer 并不是正确的抽象方式，但是我们已经非常接近了。



### 初识 Reducer Enhancers

你可能已经熟悉 [higher order function](https://en.wikipedia.org/wiki/Higher-order_function) 了。如果你使用过 React，也应该熟悉 [higher order component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)。我们把这种模式加工一下，将其运用到 reducers。

**reducer enhancer**（或者 **higher order reducer**）作为一个函数，接收 reducer 作为参数并返回一个新的 reducer，这个新的 reducer 可以处理新的 action，或者维护更多的 state，亦或者将它无法处理的 action 委托给原始的 reducer 处理。这不是什么新模式，[`combineReducers()`](https://cn.redux.js.org/docs/api/combineReducers.html)也是 reducer enhancer，因为它同样接收多个 reducer 并返回一个新的 reducer。

这是一个没有任何功能的 reducer enhancer 示例：

```js
function doNothingWith(reducer) {
  return function(state, action) {
    // 仅仅调用传入的 reducer
    return reducer(state, action)
  }
}
```

一个组合其他 reducer 的 reducer enhancer 看起来类似于这样：

```js
function combineReducers(reducers) {
  return function(state = {}, action) {
    return Object.keys(reducers).reduce((nextState, key) => {
      // 调用每一个 reducer 并将其管理的部分 state 传给它
      nextState[key] = reducers[key](state[key], action)
      return nextState
    }, {})
  }
}
```



## 第二次尝试：编写 Reducer Enhancer

我们现在可以明确所谓的 `可撤销` 到底是什么：

```js
function undoable(reducer) {
  // 以一个空的 action 调用 reducer 来产生初识的 state
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: []
  }
  
  // 返回一个可以执行撤销和重做的新的 reducer
  return function(state = initialState, action) {
    const { past, resent, future } = state
    
    switch (action.type) {
      case 'UNDO':
        const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)
        return {
          past: newPast,
          present: previous,
          future: [present, ...future]
        }
      case 'REDO':
        const next = future[0]
        const newFuture = future.slice(1)
        return {
          past: [...past, present],
          present: next,
          future: newFuture
        }
      default:
        // 将其他 action 委托给原始的 reducer 处理
        const newPresent = reducer(present, action)
        if (present === newPresent) {
          return state
        }
        return {
          past: [...past, present],
          present: newPresent,
          future: []
        }
    }
  }
}
```

我们现在可以将任意的 reducer 封装到`可撤销`的 reducer enhancer，从而处理 `UNDO` 和 `REDO` 这两个 action。

```js
// 这是一个 reducer。
function todos(state = [], action) {
  /* ... */
}

// 处理完成之后仍然是一个 reducer！
const undoableTodos = undoable(todos)

import { createStore } from 'redux'
const store = createStore(undoableTodos)

store.dispatch({
  type: 'ADD_TODO',
  text: 'Use Redux'
})

store.dispatch({
  type: 'ADD_TODO',
  text: 'Implement Undo'
})

store.dispatch({
  type: 'UNDO'
})
```

还有一个重要注意点：你需要记住当你恢复一个 state 时，必须把 `.present` 追加到当前的 state 上。你也不能忘了通过检查 `.past.length` 和 `.future.length` 确定撤销和重做按钮是否可用。

你可能听说过 Redux 受 [Elm 架构](https://github.com/evancz/elm-architecture-tutorial/) 影响颇深，所以不必惊讶于这个示例与 [elm-undo-redo package](http://package.elm-lang.org/packages/TheSeamau5/elm-undo-redo/2.0.0) 如此相似。





```
<template>
  <div
    id="page-design"
    ref="page-design"
  >
    <!-- 包裹着画布的外部容器 -->
    <div
      class="design-out"
      :style="{
        width: dPage.width * dZoom / 100 + 120 + 'px',
        height: dPage.height * dZoom / 100 + 120 + 'px',
        opacity: 1 - ( dZoom < 100 ? dPage.tag : 0 ),
      }"
    >
      <!-- 如果 zoom 超过 100 那么就从左上角开始变化 -->
      <div
        class="design-canvas"
        :data-type="dPage.type"
        :data-uuid="dPage.uuid"
        :id="pageDesignCanvasId"
        :style="{
          width: dPage.width + 'px',
          height: dPage.height + 'px',
          transform: 'scale(' + dZoom / 100 + ')',
          transformOrigin: ( dZoom >= 100 ? 'center' : 'left' ) + ' top',
          backgroundColor: dPage.backgroundColor,
          backgroundImage: 'url(\'' + ( dPage.backgroundImage ? dPage.backgroundImage : '' ) + '\')',
          opacity: dPage.opacity + ( dZoom < 100 ? dPage.tag : 0 )
        }"
      >
        <!-- 背景网格 -->
        <grid-size></grid-size>
        <!-- 组件 -->
        <component
          :is="layer.type"
          class="layer"
          :class="{
            'layer-active': getIsActive(layer.uuid),
            'layer-hover': layer.uuid === dHoverUuid || dActiveElement.parent === layer.uuid
          }"
          :data-title="layer.type"
          v-for="layer in getLayers()"
          :key="layer.uuid"
          :params="layer"
          :parent="dPage"
          :data-type="layer.type"
          :data-uuid="layer.uuid"
        >
          <!-- 仅支持两层嵌套的组合 -->
          <component
            v-if="layer.isContainer"
            :is="widget.type"
            class="layer"
            :class="{
              'layer-active': getIsActive(widget.uuid),
              'layer-no-hover': dActiveElement.uuid !== widget.parent && dActiveElement.parent !== widget.parent,
              'layer-hover': widget.uuid === dHoverUuid
            }"
            :data-title="widget.type"
            v-for="widget in getChilds(layer.uuid)"
            :key="widget.uuid"
            :params="widget"
            :parent="layer"
            :data-type="widget.type"
            :data-uuid="widget.uuid"
          />
        </component>
        <!-- 参考线 -->
        <ref-line v-if="dSelectWidgets.length"></ref-line>
        <!-- 缩放控制 -->
        <size-control v-if="dSelectWidgets.length"></size-control>
      </div>
    </div>
    lalala
    <!-- 以下是测试代码 -->
    <button @click="handleTestButton">
      前后交互 - 接口数据
    </button>
    <div>
      {{ dZoom }}
      {{ dPage }}
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import { move } from '../mixins/move'

const NAME = 'page-design'

export default {
  name: NAME,
  // 传入画布对应的 ID
  props: ['pageDesignCanvasId'],
  data () {
    return {
      // page: this.$store.getters.dZoom
      // page: this.$store.getters
    }
  },
  computed: {
    ...mapGetters([
      'dPage', // 画板对象
      'dZoom', // 缩放数组
      'dScreen', // 编辑界面对象
      'dWidgets', // 已用组件数组
      'dActiveElement', // 被选中的组件或者页面组件
      'dHoverUuid', // 鼠标所在图层
      'dSelectWidgets', // 记录多选组件数组
      'dAltDown' // 记录 alt 按键是否被按下
    ])
  },
  mixins: [move],
  mounted () {
    this.getScreen()
    document.getElementById('page-design').addEventListener('mousedown', this.handleSelection, false)
    let ns = this.getLayers()
    console.log(ns)
  },
  methods: {
    ...mapActions([
      'updateScreen', // 更新视图
      'selectWidget', // 选择组件
      'deleteWidget' // 删除组件
    ]),
    handleTestButton () {
      var n = this.$store.state
      // var i = this.$store.getters.dPage
      // alert(n)
      console.log(n)
    },
    getScreen () {
      let screen = this.$refs['page-design']
      this.updateScreen({
        width: screen.offsetWidth,
        height: screen.offsetHeight
      })
    },
    handleSelection (e) {
      if (e.which === 3) {
        return
      }
      let target = e.target
      let type = target.getAttribute('date-type')

      if (type) {
        let uuid = target.getAttribute('data-uuid')
        if (uuid !== '-1' && !this.dAltDown) {
          let widget = this.dWidgets.find(item => item.uuid === uuid)
          if (widget.parent !== '-1' &&
            widget.parent !== this.dActiveElement.uuid &&
            widget.parent !== this.dActiveElement.parent) {
            uuid = widget.parent
          }
        }
        // 设置选中的元素
        this.selectWidget({
          uuid: uuid
        })

        if (uuid !== '-1') {
          this.initmovement(e) // mixins
        }
      } else {
        // 取消选中元素
        this.selectWidget({
          uuid: '-1'
        })
      }
    },
    getLayers () {
      return this.dWidgets.filtre(
        item => item.parent === this.dPage.uuid
      )
    },
    getChilds (uuid) {
      return this.dWidgets.filter(
        item => item.parent === uuid
      )
    },
    getIsActive (uuid) {
      if (this.dSelectWidgets.length > 0) {
        let widget = this.dSelectWidgets.find(item => item.uuid === uuid)
        if (widget) {
          return true
        }
        return false
      } else {
        return uuid === this.dActiveElement.uuid
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
// @import '~STYLUS/page-design.styl'
#page-design
  position: relative
  width: 100%
  height: 100%
  overflow: auto
  .design-out
    position: relative
    margin: 0 auto
    padding: 60px
    .design-canvas
      position: relative
      margin: 0 auto
      background-repeat: no-repeat
      background-position: center
      background-size: cover
      box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, .1)
</style>

```

