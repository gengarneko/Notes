# 一、Promise

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

## 1.1 语法

```js
new Promise(function(resolve, reject) {...} /*executor*/ );
```

### 参数

**executor**

- `executor` 是带有 `resolve` 和 `reject` 两个参数的函数、`Promise` 构造函数执行时立即调用 `executor` 函数，`resolve` 和 `reject` 两个函数作为参数传递给 `executor` （`executor` 函数在 `Promise` 构造函数返回新建对象之前被调用）。`resolve` 和 `reject` 函数别调用时，分别将 `promise` 的状态改为 `fulfilled`（完成）或 `rejected`（失败）。`executor` 内部通常会执行一些异步操作，一旦完成，可以调用 `resolve` 函数来将 `promise` 的状态改成 `fulfilled`，或者发生错误的时候将它状态改成 `rejected`。
- 如果在 `executor` 函数中抛出一个错误，那么该 `promise` 状态为 `rejected`。`executor` 函数返回值被忽略。



## 1.2 描述

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



## 1.3 属性

- `Promise.length`：length 的属性，其值总是为 1（构造器参数的数目）
- `Promise.prototype`：表示 `Promise` 构造器的原型



## 1.4 方法

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



## 1.5 Promise 原型

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



## 1.6 创建 Promise

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



## 1.7 实例

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

本例展示了 `Promise` 的一些机制。 `testPromise()` 方法在每次点击 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button) 按钮时被调用，该方法会创建一个 `promise` 对象，使用 [`window.setTimeout()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout) 让Promise等待 1-3 秒不等的时间来填充数据（通过Math.random()方法）。

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



# 二、使用 Promise

一个 `Promise` 就是一个代表了异步操作最终完成或者失败的结果对象。大多数人仅使用 Promise，因此这里我们来说明怎样使用 Promise。

Promise 本质上是一个绑定了回调对象，而不是将回调传进函数内部。

假设存在一个名为 `createAudioFileAsync()` 的函数，这个函数异步地生成声音文件，在声音文件创建成功或者创建失败后执行回调函数。

以下为使用 `createAudioFileAsync()` 的示例：

```js
// 成功的回调函数
function successCallback(result) {
  console.log("声音文件创建成功：" + result);
}

// 失败的回调函数
function failureCallback(error) {
  console.log("声音文件创建失败：" + error);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback);
```

如果函数返回 Promise 对象：

```js
const promise = createAudioFileAsync(audioSettings);
promise.then(successCallback, failureCallback);
```

```js
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
```

我们将这个称为异步函数调用，这种形式有若干优点，我们会逐一讨论。



## 2.1 约定

不同于老式的传入回调，在应用 Promise 时，我们将会有以下约定：

- 在 JavaScript 事件队列的当前运行完成之前，回调函数永远不会被调用。
- 通过 `.then` 形式添加的回调函数，甚至都在异步操作完成之后才被添加的函数，都会被调用。
- 通过多次调用 `.then` ，可以添加多个回调函数，它们会按照插入顺序并且独立运行。

因此，`Promise` 最直接的好处就是链式调用。



## 2.2 链式调用

一个常见的需求就是连续执行两个或者多个异步操作，这种情况下，每一个后来的操作都在前面的异步执行成功之后，带着上一步操作所返回的结果开始执行。我们可以通过创造一个 `Promise chain` 来完成这种需求。

见证奇迹的时刻：`then` 函数会返回一个新的 `Promise`，跟原来的不同：

```js
const promise1 = doSomething();
cosnt promise2 = promise1.then(successCallback, failureCallback);
```

或者

```js
const promise2 = doSomething().then(successCallback, failureCallback);
```

第二个对象 `promise2` 不仅代表 `doSomething()` 函数的完成，也代表了你传入的 `successCallback` 或者 `failureCallback` 的完成，这也可能是其它异步函数返回的 `Promise`。这样的话，任何被添加给 `promise2` 的回调函数都会被排在 `successCallback` 或 `failureCallback` 返回的 `Promsie` 后面。

基本上，每一个 `Promise` 代表了链式中另一个异步过程的完成。

在过去，做多重的异步操作，会导致经典的回调地狱：

```js
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

> 这种回调地狱不仅看起来很不舒服，可读性比较差；除此之外还有比较重要的一点就是对异常的捕获无法支持。

通过新式函数，我们把回调绑定到被返回的 `Promise` 上代替以往的做法，形成一个 `Promise` 链：

```js
doSomething().then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);
```

`then` 里的参数是可选的，`catch(failureCallback)` 是 `then(null, failureCallback)` 的缩略形式。如下所示，也可以用 [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)（箭头函数）来表示：

```js
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => {
  console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);
```

> 注意：如果想要在回调获取上个 Promise 中的结果，上个 `Promise` 中必须要返回结果。（使用 `() => x` 比 `() => { return x; }` 更简洁一点）

### Catch 的后续链式操作

在一个失败操作（即一个 `catch`）之后可以继续使用链式操作，即使链式中的一个动作失败之后还能有助于新的动作继续完成：

```js
new Promise((resolve, reject) => {
  console.log('Initial');
  resolve();
})
.then(() => {
  throw new Error('Something failed');
  console.log('Do this');
})
.catch(() => {
  console.log('Do that');
})
.then(() => {
	console.log('Do this whatever happened before');
});
```

输出结果如下：

```
Initial
Do that
Do this whatever happened before
```

> 注意，由于 “Something failed” 错误导致了拒绝操作，所以 “Do this” 文本没有被输出。



## 2.3 错误传播

在之前的回调地狱示例中，你可能记得 3 次 `failureCallback` 的调用，而在 `Promise` 链中只有底部的一次调用：

```js
doSomething()
.then(result => doSomethingElse(value))
.then(newRusult => doThirdThing(newResult))
.then(finalResult => console.log(`Got the final result: ${finalResult}`))
.catch(failureCallback);
```

基本上，一个 `Promise` 链式遇到异常就会停止，查看链式的底端，寻找 `catch` 处理程序来代替当前执行。在同步的代码执行之后，这是非常模型化的。

```js
try {
  let result = syncDoSomething();
  let newResult = syncDoSomethingElse(result);
  let finalResult = syncDoThirdTing(newResult);
  console.log(`Got the final result: ${finalResult}`);
} catch(error) {
  failureCallback(error);
}
```

在 ECMAScript2017 标准的 `async/await` 语法糖中，这主公同步形式代码的整齐性得到了极致的体现：

```js
async function foo() {
  try {
    let result = await doSomething();
    let newResult = await doSomethingElse(result);
    let finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch(error) {
    failureCallback(error);
  }
}
```

这个例子是在 `Promise` 的基础上构建的，例如，`doSomething()` 与之前的函数是相同的。

通过捕获所有的错误，甚至抛出异常和程序错误，`Promise` 解决了回调地狱的基本缺陷。这是异步操作的基本功能。



## 2.4 在旧式回调 API 中创建 Promise

`Promise` 通过它的构造器从头开始创建，只应用在包裹旧的 API。

理想状态下，所有的异步函数都已经返回 `Promise` 了。但有一些 API 仍然使用旧式的被传入的成功或者失败的回调。典型的例子旧式 `setTimeout()` 函数：

```js
setTimeout(() => saySomething("10 seconds passed"), 10000);
```

混用旧式回调和 `Promise` 是会有问题的，如果 `saySomething` 函数失败了或者包含了变成错误，那就没办法捕获它了。

幸运的是我们可以用 `Promise` 来包裹它。最好的做法是将有问题的函数包装在最低级别，并且永远不要再直接调用它们：

```js
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait(10000).then(() => saySomething("10 seconds")).catch(failureCallback);
```

通常，`Promise` 的构造器会有一个可以让我们手动操作 `resolve` 和 `reject` 的执行函数，既然 `setTimeout` 没有真的执行失败，那么我们可以在这种情况下忽略 `reject`。



## 2.5 组合

`Promise.resolve()` 和 `Promise.reject()` 是手动创建一个已经 `resolve` 或者 `reject` 的 `promise` 快捷方法。它们有时候很有用。

`Promise.all()` 和 `Promise.race()` 是并行运行异步操作的两个组合式工具。

时许组合可以使用一些优雅的 javascript 形式：

```js
[func1, func2].reduce((p, f) =>  p.then(f), Promise.resolve());
```

通常，我们递归调用一个由异步函数组成的数组时相当于一个 Promise 链式：

```js
Promise.resolve().then(func1).then(func2);
```

我们也可以写成可复用的函数形式，这在函数式编程中极为普遍：

```js
let applyAsync = (acc, val) => acc.then(val);
let composeAsync = (...funcs) => x => funcs.reduce(applyAsync, Promise.resolve(x));
```

`composeAsync` 函数将会接受任意数量的函数作为其参数，并返回一个新的函数，该函数接受一个通过 `composition pipeline` 传入的初始值。这对我们来说非常有益，因为任意函数可以是异步或同步的，它们能被保证按顺序执行：

```js
let transformData = composeAsync(func1, asyncFunc1, asyncFunc2, func2);
transformData(data);
```

在 ECMAScript 2017 标准中，时序组合可以通过使用 `async/await` 而变得简单：

```js
for (let f of [func1, func2]) {
  await f();
}
```



## 2.6 时序

为了避免意外，即使是一个已经变成 resolve 状态的 Promise，传递给 `then` 的函数也总是会被异步调用：

```js
Promise.resolve().then(() => console.log(2));
console.log(1); // 1, 2
```

传递到then中的函数被置入了一个微任务队列，而不是立即执行，这意味着它是在JavaScript事件队列的所有运行时结束了，事件队列被清空之后才开始执行：

```js
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait().then(() => console.log(4));
Promise.resolve().then(() => console.log(2)).then(() => console.log(3));
console.log(1); // 1, 2, 3, 4
```



## 2.7 嵌套

简便的 `Promise` 链式编程最好保持扁平化，不要嵌套 `Promise`，嵌套经常会是粗心导致的。

嵌套 Promise 是一种可以限制 catch 语句的作用域的控制结构写法。明确来说，嵌套的 catch 仅捕捉在其之前同时还必须是其作用域的 failureres，而捕捉不到在其链式以外或者其嵌套域以外的 error。如果使用正确，那么可以实现高精度的错误修复。

```
doSomethingCritical()
.then(result => doSomethingOptional()
  .then(optionalResult => doSomethingExtraNice(optionalResult))
  .catch(e => {console.log(e.message)})) // 即使有异常也会忽略，继续运行;(最后会输出)
.then(() => moreCriticalStuff())
.catch(e => console.log("Critical failure: " + e.message));// 没有输出
```

注意,有些代码步骤是嵌套的，而不是一个简单的纯链式，这些语句前与后都被（）包裹着。

这个内部的 catch 语句仅能捕获到 `doSomethingOptional() 和 doSomethingExtraNice() 的失败，而且还是在`moreCriticalStuff() 并发运行以后。重要提醒，如果 doSomethingCritical() 失败，这个错误才仅会被最后的（外部）catch 语句捕获到。



## 2.8 常见错误

在编写 Promise 链时，需要注意以下示例中展示的几个错误：

```
// 错误示例，包含 3 个问题

doSomething().then(function(result) {
  doSomethingElse(result) // 没有返回 Promise 以及没有必要的嵌套 Promise
  .then(newResult => doThirdThing(newResult));
}).then(() => doFourthThing());
// 最后是没有使用 catch 终止 Promise 调用链，可能导致没有捕获的异常

```

第一个错误是没有正确地将事物相连接。当我们创建新 Promise 但忘记返回它时，会发生这种情况。因此，链条被打破，或者更确切地说，我们有两个独立的链条竞争（同时在执行两个异步而非一个一个的执行）。这意味着 `doFourthThing()` 不会等待 `doSomethingElse()`或`doThirdThing()` 完成，并且将与它们并行运行，可能是无意的。单独的链也有单独的错误处理，导致未捕获的错误。

第二个错误是不必要地嵌套，实现第一个错误。嵌套还限制了内部错误处理程序的范围，如果是非预期的，可能会导致未捕获的错误。其中一个变体是 [promise 构造函数反模式](https://stackoverflow.com/questions/23803743/what-is-the-explicit-promise-construction-antipattern-and-how-do-i-avoid-it)，它结合了 Promise 构造函数的多余使用和嵌套。

第三个错误是忘记用 `catch` 终止链。这导致在大多数浏览器中不能终止的 Promise 链里的 rejection。

一个好的经验法则是总是返回或终止 Promise 链，并且一旦你得到一个新的 Promise，返回它。下面是修改后的平面化的代码：

 

```js
doSomething()
.then(function(result) {
  return doSomethingElse(result);
})
.then(newResult => doThirdThing(newResult))
.then(() => doFourthThing());
.catch(error => console.log(error));
```

现在我们有一个具有适当错误处理的确定性链。

使用 `async/await` 解决了大多数，如果不是所有这些问题的话 - 最常见的错误就是忘记了`await` 关键字。





































