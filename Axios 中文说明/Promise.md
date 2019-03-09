`Promise` 对象用于表示一个异步操作的最终状态（完成或失败），以及其返回的值。

>  本条目为 Promise 构造函数

JavaScript Demo:

```js
var promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 300);
});

peomise1.then(function(value) {
  console.log(value);
  // excepted output: 'foo'
});

console.log(promise1);
// excepted output: [object Promise]
```

## 语法

```js
new Promise(function(resolve, reject) {...} /*executor*/ );
```

### 参数

**executor**

- `executor` 是带有 `resolve` 和 `reject` 两个参数的函数、`Promise` 构造函数执行时立即调用 `executor` 函数，`resolve` 和 `reject` 两个函数作为参数传递给 `executor` （`executor` 函数在 `Promise` 构造函数返回新建对象之前被调用）。`resolve` 和 `reject` 函数别调用时，分别将 `promise` 的状态改为 `fulfilled`（完成）或 `rejected`（失败）。`executor` 内部通常会执行一些异步操作，一旦完成，可以调用 `resolve` 函数来将 `promise` 的状态改成 `fulfilled`，或者发生错误的时候将它状态改成 `rejected`。
- 如果在 `executor` 函数中抛出一个错误，那么该 `promise` 状态为 `rejected`。`executor` 函数返回值被忽略。



## 描述

`Promise` 对象是一个代理对象（代理一个值），被代理的值在 `Promise` 对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果。 而是一个能代表未来出现的结果的 `promise` 对象。

一个 `Promise` 有以下几种状态：

- pending：初始状态，即不是成功，也不是失败状态
- fulfilled：意味着操作成功完成
- rejected：意味着操作失败

`pending` 状态的 `Promise` 对象可能触发 `fulfilled` 状态并传递一个值给相应的状态处理方法，也可能触发失败状态（rejected）并传递失败信息。当其中任一种情况出现时，`Promise` 对象的 `then` 方法绑定的处理方法（handlers）就会被调用。

`then` 方法包含两个参数：`onfulfilled` 和 `onrejected`，它们都是 `Function` 类型。

- 当 `Promise` 状态为 *fulfilled* 时，调用 `then` 的 `onfulfilled` 方法
- 当 `Promise` 状态为 *rejected* 时，调用 `then` 的 `onrejected` 方法

所以在异步操作的完成和绑定处理方法之间不存在竞争。

因为 `Promise.prototype.then` 和 `Promise.protoytype.catch` 方法返回 `promise` 对象，所以它们可以被链式调用。

![](https://mdn.mozillademos.org/files/8633/promises.png)

> **不要和惰性求值混淆：** 有一些语言中有惰性求值和延时计算的特性，它们也被称为“promises”，例如Scheme. Javascript中的promise代表一种已经发生的状态， 而且可以通过回调方法链在一起。 如果你想要的是表达式的延时计算，考虑无参数的"[箭头方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)":  `f = () =>`*表达式* 创建惰性求值的表达式*，*使用 `f()` 求值。

> **注意：** 如果一个promise对象处在fulfilled或rejected状态而不是pending状态，那么它也可以被称为*settled*状态。你可能也会听到一个术语*resolved* ，它表示promise对象处于fulfilled状态。关于promise的术语， Domenic Denicola 的 [States and fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md) 有更多详情可供参考。



## 属性

- `Promise.length`：length 的属性，其值总是为 1（构造器参数的数目）
- `Promise.prototype`：表示 `Promise` 构造器的原型



## 方法

- `Promise.all(iterable)`

  - 这个方法返回一个新的 `promise` 对象，该 `promise` 对象在 `iterable` 参数对象里所有的 `promise` 对象都成功的时候才触发成功，一旦有任何一个 `iterable` 里面的 `promise` 对象失败则立即触发该 `promise` 对象的失败。这个新的 `promise` 对象在触发成功状态以后，会把一个包含 `iterable` 里所有 `promise` 返回值的数组作为成功回调的返回值，顺序跟 `iterable` 的顺序保持一致；如果这个新的 `promise` 对象触发了失败状态，它会把 `iterable` 里第一个触发失败的 `promise` 对象的错误作为它的失败错误信息。
  - `Promise.all` 常用于处理多个 Promise 对象的状态集合。（参考 jQuery.when 方法）

- `Promise.race(iterable)`

  - 当 `iterable` 参数里的任意一个子 `promise` 被成功或失败后，父 `promise` 马上也会用子 `promise` 的成功返回值或失败详情作为参数调用父 `promise` 绑定的相应句柄，并返回该 promise 对象。

- `Promise.reject(reason)`

  - 返回一个状态为失败的 `Promise` 对象，并将给定的失败信息传递给对应的处理方法

- `Promise.resolve(value)`

  - 返回一个状态由给定 `value` 决定的 `Promise` 对象。
  - 如果该值是一个 `Promise` 对象，则直接返回该对象；
  - 如果该值是 `thenable`（即，带有 `then` 方法的对象），返回的 `Promise` 对象的最终状态由 `then` 方法执行决定；
  - 否则的话（该 `value` 为空，基本类型或者不带 `then` 方法的对象），返回的 `Promise` 对象状态为 `fulfilled`，并且将该 `value` 值传递给对应的 `then` 方法。

  > 通常而言，如果你不知道一个值是否是 `Promise` 对象，使用 `Promise.resolve(value)` 来返回一个 `Promise` 对象，这样就能够将该 `value` 以 `Promise` 对象形式使用。



## Promise 原型

### 属性

`Promise.prototype.constructor`

​	返回被创建的实例函数，默认为 `Promise` 函数

### 方法

`Promise.prototype.catch(onRejected)`

- 添加一个拒绝（`rejected`）回调到当前 `promise`，返回一个新的 `promise`。当这个回调函数被调用，新的 `promise` 将以它的返回值来 `resolve`，否则如果当前 `promise` 进入 `fulfilled` 状态，则以当前 `promise` 的完成结果作为新的 `promise` 的完成结果。

`Promise.prototype.then(onFulfilled, onRejected)`

- 添加解决（`fulfilled`）和拒绝（`rejected`）回调到当前 `promise`，返回一个新的 `promise`，将以回调的返回值来 `resolve`

`Promise.prototype.finally(onFinally)`

- 添加一个事件处理回调于当前 `promise` 对象，并且在原 `promise` 对象解析完毕后，返回一个新的 `promise` 对象。回调会在当前的 `promise` 运行完毕后被调用，无论当前 `promise` 的状态是完成 `fulfilled` 还是拒绝 `rejected`



## 创建 Promise

`Promise` 对象是由关键字 `new` 及其构造函数来创建的。该构造函数会把一个叫做 “处理器函数” 的函数作为它的参数。这个 “处理器函数” 接受两个函数——`resolve` 和 `reject`——作为其参数。当异步任务顺利完成且返回结果值时，会调用 `resolve` 函数；而当异步任务失败且返回失败原因（通常是一个错误对象）时，会调用 `reject` 函数。

```js
const myFirstPromise = new Promise((resolve, reject) => {
  // ?做一些异步操作，最终会调用下面两者之一:
  //
  //   resolve(someValue); // fulfilled
  // ?或
  //   reject("failure reason"); // rejected
});
```

想要某个函数？拥有 promise 功能，只需让其返回一个 promise 即可。

```js
function myAsyncFunction(url) {
  return new Promise((resolve, reject) =》 {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
};
```



## 实例

### 非常简单的例子

```js
let myFirstPromise = new Promise(function(resolve, reject) {
  // 当异步代码执行成功的时候，我们才会调用 resolve(...)，当异步代码失败时就会调用 reject(...)
  // 在本例中，我们使用 setTimeout(...) 来模拟异步代码，实际编码时可能是 XHR 请求或是 HTML5 API
  setTimeout(function(){
    resolve("成功！"); // 代码正常执行！
  }, 250);
});

myFirstPromise.then(function(successMessage){
  // successMessage 的值是上面调用 resolve(...) 方法传入的值
  // successMessage 参数不一定非要是字符串类型，这里只是个例子
  console.log("Yay! " + successMessage);
})
```

### 高级一点的例子

本例展示了 `Promise` 的一些机制。 `testPromise()` 方法在每次点击 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button) 按钮时被调用，该方法会创建一个promise 对象，使用 [`window.setTimeout()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout) 让Promise等待 1-3 秒不等的时间来填充数据（通过Math.random()方法）。

Promise 的值的填充过程都被日志记录（logged）下来，这些日志信息展示了方法中的同步代码和异步代码是如何通过Promise完成解耦的。

```js
'use strict';
var promiseCount = 0;

function testPromise() {
    let thisPromiseCount = ++promiseCount;

    let log = document.getElementById('log');
    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') 开始 (<small>同步代码开始</small>)<br/>');

    // 新构建一个 Promise 实例：使用Promise实现每过一段时间给计数器加一的过程，每段时间间隔为1~3秒不等
    let p1 = new Promise(
        // resolver 函数在 Promise 成功或失败时都可能被调用
       (resolve, reject) => {
            log.insertAdjacentHTML('beforeend', thisPromiseCount +
                ') Promise 开始 (<small>异步代码开始</small>)<br/>');
            // 创建一个异步调用
            window.setTimeout(
                function() {
                    // 填充 Promise
                    resolve(thisPromiseCount);
                }, Math.random() * 2000 + 1000);
        }
    );

    // Promise 不论成功或失败都会调用 then
    // catch() 只有当 promise 失败时才会调用
    p1.then(
        // 记录填充值
        function(val) {
            log.insertAdjacentHTML('beforeend', val +
                ') Promise 已填充完毕 (<small>异步代码结束</small>)<br/>');
        })
    .catch(
        // 记录失败原因
       (reason) => {
            console.log('处理失败的 promise ('+reason+')');
        });

    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') Promise made (<small>同步代码结束</small>)<br/>');
}
```

