# vue 组件通信解析

对于 vue 来说，组件是非常常见的，有很多平台都封装了自己的一套 UI 组件，如 element ui、we ui 等等。既然有不同的组件，那么组件间通信就会变得十分重要，下面我们来介绍组件间消息传递的 8 种方式。

## 一、props 和 $emit

这是最常见的父子组件通信方式：

- 父组件向子组件通过 `props` 传递数据
- 子组件向父组件通过 `$emit` 触发事件传递数据

父组件

```vue
Vue.component('parent', {
  tempalte: `
  	<div>
  		<p>父组件</p>
  		<child
  			:msg="message"
  			@getChildData="getChildData"
  		>
      </child>
  	</div>
  `,
  data () {
    return {
      message: 'Hello Vue'
    }
  },
  methods: {
    // 执行子组件触发的事件
    getChildData(val) {
      console.log(val)
    }
  }
})
var app = new Vue({
  el: '#app',
  tempalte: `
  	<div>
  		<parent></parent>
  	</div>
  `
})
```

子组件

```vue
Vue.component('child', {
  // 得到父组件传递过来的数据
  props: ['message'],
  data () {
    return {
      myMessage: this.message
    }
  },
  template: `
  	<div>
  		<input 
  			type="text" 
        v-model="myMessage" 
        @input="passData(myMessage)"
      >
  	</div>
  `,
  methods: {
    passData(val) {
      // 触发父组件中的事件
      this.$emit('getChildData', val)
    }
  }
})
```

我们可以看到：

- 父组件传递了 message 给子组件的 props，子组件在 data 中获得 props 的值。
- 子组件通过 this.$emit 触发了父组件的 getChildData 事件，并将值传递过去。

## 二、$attrs 和 $listeners

方案一处理父子组件通信的方式有一个问题，如果存在多层嵌套，怎么传递数据？难道每层都需要将自身数据提升到顶部嘛？那样如果层级过大，管理起来会很复杂。

从 Vue 2.4 开始，提供了 `$attrs` 和 `$listeners` 来解决这个问题，能够让组件 A 的数据传递给组件 C，而不必通过中间的组件 B。

C 组件

```vue
Vue.component('C', {
  template: `
  	<div>
  		<input
  			type="text"
  			v-model="$attrs.messageC"
  			@input="passCData($attrs.messageC)"
  		>
  	</div>
  `,
  methods: {
    passCData: {
      // 触发组件 A 中的事件
      this.$emit('getCData', val)
    }
  }
})
```

B 组件

```vue
Vue.component('B', {
  data () {
    return {
      myMessage: this.message
    }
  },
  template: `
  	<div>
  		<input
  			type="text"
  			v-model="myMessage"
  			@input="passData(myMessage)"
  		>
  		<C
  			v-bind="$attrs"
  			v-on="$listeners"
  		>
  		</C>
  	</div>
  `,
  // 获得父组件数据
  props: ['message'],
  methods: {
    passData(val) {
      // 触发父组件中的事件
      this.$emit('getChildData', val)
    }
  }
})
```

A 组件

```vue
Vue.component('A', {
  template: `
  	<div>
  		<p>this is parent component!</p>
  		<B
  			:messageC="messageC"
  			:message="message"
  			@getCData="getCData"
  			@getChildData="getChildData(message)"
  		>
  		</B>
  	</div>
  `,
  data () {
    return {
      message: 'Hello',
      messageC: 'Hello C'
    }
  },
  methods: {
    getChildData (val) {
      console.log('这是来自组件 B 的数据')
    },
    getCData (val) {
      console.log('这是来自组件 C 的数据：' + val)
    }
  }
})
var app = new Vue({
  el: '#app',
  template: `
  	<div>
  		<A></A>
  	<div>
  `
})
```

我们看一下流程：

- C 组件能直接触发 `getCData` 方法的原因是 B 组件调用 C 组件的时候使用 `v-on` 绑定了 `$listeners` 属性
- 通过 `v-bind` 绑定 `$attrs` 属性，C 组件可以直接获取到 A 组件中传递下来的 props（除了 B 组件中 props 声明的） 

## 三、v-model

父组件通过 `v-model` 传值给子组件的时候，会自动传递一个 `value` 的 `prop` 属性，在子组件中通过 `this.$emit('input', val)` 自动修改 `v-model` 绑定的值

子组件

```vue
Vue.component('child', {
  props: {
    // v-model 会自动传递一个字段为 value 的 prop 属性
    value: String
  },
  data () {
    return {
      myMessage: this.value
    }
  },
  methods: {
    changeValue () {
      // 通过如此调用可以改变父组件上 v-model 绑定的值
      this.$emit('input', this.myMessage)
    }
  },
  template: `
  	<div>
  		<input
  			type="text"
  			v-model="myMessage"
  			@change="changValue"
  		>
  	</div>
  `
})
```

父组件

```vue
Vue.component('parent', {
  template: `
  	<div>
  		<p>this is parent component</p>
  		<p>{{ message }}</p>
  		<child v-model="message"></child>
  	</div>
  `,
  data () {
    return {
      message: 'Hello'
    }
  }
})
var app = new Vue({
  el: '#app',
  template: `
  	<div>
  		<parent></parent>
  	<div>
  `
})
```

## 四、provider 和 inject

父组件中通过 `provider` 来提供变量，然后在子组件中通过 `inject` 来注入变量。无论子组件有多深，只要调用了 `inject` 那么就可以注入 `provider` 中的数据。而不是局限于只能从当前父组件的 `prop` 属性来获取数据 。

子组件

```vue
Vue.component('child', {
  inject: ['for'] // 父组件传递来的数据
  data () {
    return {
      myMessage: this.for
    }
  },
  template: `
  	<div>
  		<input type="text" v-model="myMessage">
  	</div>
  `
})
```

父组件

```vue
Vue.component('parent', {
  template: `
  	<div>
  		<p>this is parent</p>
  		<child></child>
  	</div>
  `,
  provide: {
    for: 'test'
  },
  data () {
    return {
      message: 'Hello'
    }
  }
})
var app = new Vue({
  el: '#app',
  template: `
  	<div>
  		<parent></parent>
		</div>
  `
})
```

## 五、event bus

上面都是处理父子间通信的，如果两个组件不是父子关系，比如兄弟关系？

这种情况需要使用中央事件总线方式，新建一个 Vue 事件 bus 对象，然后通过 `bus.$emit` 触发事件，`bus.$on` 监听触发的事件。

brother1

```vue
Vue.component('brother1', {
  data () {
    return {
      myMessage: 'Hello brother1'
    }
  },
  template: `
  	<div>
  		<p>this is brother1</p>
  		<input
  			type="text"
  			v-model="myMessage"
  			@input="passData(myMessage)"
      >
  	</div>
  `,
	methods: {
		passData (val) {
			// 触发全局事件
			bus.$emit('globalEvent', val)
		}
	}
})
```

brother2

```vue
Vue.component('brother2', {
  temlate: `
  	<div>
  		<p>this is brother2</p>
  		<p>brother1: {{ brotherMessage }}</p>
  	</div>
  `,
  data () {
    return {
      myMessage: 'Hello brother2',
      brotherMessage: ''
    }
  },
  mounted () {
    // 绑定全局事件 blobalEvent
    bus.$on('globalEvent', (val) => {
      this.brotherMessage = val
    })
  }
})
```

中央事件总线

```vue
var bus = new Vue()
var app = new Vue({
  el: '#app',
  template: `
  	<div>
  		<brother1></brother1>
  		<brother2></brother2>
  	</div>
  `
})
```

## 六、parent 和 children

子组件

```
Vue.component('child', {
  props: {
    value: String // v-model 会自动传递一个字段为 value 的 prop 属性
  },
  data () {
    return {
      myMessage: this.value
    }
  },
  methods: {
    changeValue () {
      this.$parent.message = this.myMessage // 通过如此可以改变父组件的值
    }
  },
  template: `
  	<div>
  		<input
      	type="text"
      	v-model="myMessage"
      	@change="changeValue"
      >
  	</div>
  `
})
```

父组件

```vue
Vue.component('parent', {
  template: `
  	<div>
  		<p>this is parent</p>
  		<button @click="changeChildValue">test</button>
  	</div>
  `,
  methods: {
    changeChildValue () {
      this.$child[0].myMessage = 'hello'
    }
  },
  data () {
    return {
      message: 'hello'
    }
  }
})

var app = new Vue({
  el: '#app',
  template: `
  	<div>
  		<parent></parent>
  	</div>
  `
})
```

## 七、brodcast 和 dispatch

brodcast 是向特定的父组件，触发事件，dispatch 是向特定的子组件触发事件，本质上还是 `on` 和 `emit` 的封装，但在一些基础组件中却很实用。

```js
function broadcast(component, eventName, params) {
  this.$children.foeEach(child => {
    var name = child.$options.componentName
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat(params))
    }
  })
}
export default {
  methods: {
    dispatch(component, eventName, params) {
      var parent = this.$parent
      var name = parent.$options.componentName
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  }
}
```

## 八、vuex 处理组件之间的数据交互

如果业务复杂，很多组件之间需要同时处理一些公共的数据，这个时候才有上面这一些方法可能不利于维护的项目，vuex 的做法就是将这一些公共的数据抽离出来，然后其他组件就可以对这个公共方法进行读写操作，这样就达到了解耦的





