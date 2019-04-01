![Loading Vuex Modules Dynamically](https://i.loli.net/2019/04/01/5ca1c46d83c14.jpg)

# Loading Vuex Modules Dynamically

> Vuex is an easy to use and performant solution to handle state management. It makes it a breeze to manage large-scale Vue.js aplications and ensures a predictable way to mutate the state by exposing a store.

You may already know about Vuex, but if you don't Joshua Bemenderfer gave us a great introduction.

You can define modules in your Vuex store as follows:

```js
const dogs = {
  state: {
    data: []
  },
  mutations: {
    addDog (state, dog) {
    	state.data.push(dog)
    }
  }
}

const store = new Vuex.Store({
  modules: {
    dogs
  }
});
```

Usually a large application has several modules. All of them are defined statically in their own file, and combined together when calling `new Vuex.Store`. That's what you should do in practically all cases.

But there could be a very specific case where you'd want to load a Vuex module dynamically into your app, Extending the currenr store at that point. 

A very specific case, like what, you say? On could be writing an external component library that depends on Vuex.

The same could apply in an applications divided into several internal packages. Each package, could have their own components and stores.

Usually, this is the case for common reusable modules among apps. For example, a notifications module that provides some notification components and a store module that extends your application store, adding a new module that's accessible from everywhere in your app.

Let's see how to do that.

## Add a Module Dynamically to the Store

Given an app with an usual Vuex setup, let's create a notifications folder. You can place it wherever you'd like, just imagine it's an external package.

In there, add a state.js with a basic Vuex module:

notifications/state.js

```js
export default {
  state: [],
  mutations: {
    addNotification (state, notification) {
      state.push(notification);
    }
  }
};
```

Then create a `Notifications.vue` file where you import it. You'll then access the `$store` instance variable, assuming that there's a Vuex store for getting the state and committing an addNotification:

notifications/Notifications.vue

```js
<template>
	<div>
		<p v-for="notification in notifications">
			{{ notification }}
		</p>
		<button @click="addHey">Add Hey!</button>
	</div>
</template>

<script>
import state from "./state";

export default {
  computed: {
    notifications () {
      return this.$store.state.notifications;
    }
  },
  methods: {
    addHey () {
      this.$store.commit("addNotification", "Hey!");
    }
  }
};
</script>
```

 Now, the idea is that the notifications Vuex modules adds itself when the component is used. In the way, if an external app is using the component, it all comes packaged-in already and app doesn't have to care about adding it directly. So, we coould use the created hook for hat.

And, in order to dynamically add the Vuex module, we can use the store's instance property `$store.registerModule`:

notifications/Notifications.vue

```js
import state from "./state";

export default {
  // ...
  created () {
    this.$store.registerModule("notifications", state);
  }
};
```

Now the module will be registered when the `Notifications` components is used.

## Wrapping Up

The Vuex store in large applications is organized statically through different modules. That's how it should be. But in very specific cases, you might need to extend the store and add a module yourself.

You can see the working demo and code of this article in [this Codesandbox](https://codesandbox.io/s/k0733z80x5)