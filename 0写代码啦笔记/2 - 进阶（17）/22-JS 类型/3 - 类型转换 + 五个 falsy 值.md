# JS 类型

JS 七种数据类型，`number   string   null   undefined   boolean   object   symbol`

|           | number | string   | boolean | symbol | null | undefined | object |
| --------- | ------ | -------- | ------- | ------ | ---- | --------- | ------ |
| number    | ×      | toString | 0 NaN   |        |      |           |        |
| string    |        | ×        | ''      |        |      |           |        |
| boolean   |        | toString | ×       |        |      |           |        |
| symbol    |        |          |         | ×      |      |           |        |
| null      |        | 报错     | false   |        | ×    |           |        |
| undefined |        | 报错     | false   |        |      | ×         |        |
| object    |        | 结果不行 | !!      |        |      |           | ×      |

> null. 这样写是不行的，null.toString 没有。

> object.toString 变为 [object Object]，只能自己写一个转换方法

**老司机的转换字符串：**

```
1 + ''
=> "1"

true + ''
=> "true"
```

我们只需要用 `+ ''` 就能快捷使用 `toString`，而且之前 `null` 是没有 `toString` 方法的，但是我们使用 `'' + null` 是可以的，这就是 `+` 的厉害之处，`+` 总是想得到两个字符串，它会尝试将两边数据格式同一。

```
1 + '1'
// 等价于
(1).toString + '1'
=> '11'
```

除了用 `toString`，我们还能用 `String` 这个全局方法：

```
var n = 1
window.String(1)
"1"
```

`String` 和 `''` 功能一样强大



```
Boolean(1)
true
Boolean(2)
true
Boolean(0)
false
Boolean('')
false
Boolean(' ')
true
Boolean('123131')
true
Boolean(null)
false
Boolean(undefined)
false
Boolean({})
true // 只要是对象就是 true
```

**老司机的取布尔值：**

```
!true
false
!!true
true

!!xxx
```

> 我们使用 `!!` 来快速获得布尔值，和 `Boolean()` 一样的。

> JS 中其他的值变为 boolean 的时候，只有五个特殊值，背下来，number（0、NaN）、string（''）、null、undefined，五个 falsy 值。



## 如何转换为 number？

将 '1' 转换为 1

- `Number('1') === 1`
- `parseInt('1', 10) === 1` 全局函数，当作十进制来转
- `parseFloat('1.23') === 1.23` 浮点数只有十进制的形式
- `'1' - 0` 任何东西 `- 0` 都会转换为 `Number`
- `+ '1' === 1` 取正，取它原本的值，以数字的形式，`- '-1'` 会得到 `1`，使用 `-(-'1')` 取到 `1`

> parse 就是解析的意思

```js
parseInt('011')
=> 11
parseInt('011', 8)
=> 9
parseInt('011', 10)
=> 11
```

```
parseInt('s')
=> NaN
parseInt('123px')
=> 123
```

从头开始，能 `parse` 多少就 `parse` 多少，遇到不能 `parse` 的，就返回。



## 转换为对象

当我们写：

```
var n = 1
```

这时候，到底在做什么？搞清楚了才能明白 1 和 对象的区别。我们知道对象由基本类型组成，那么基本类型是由什么组成的？

这就是我们讲的内存图

![](https://i.loli.net/2019/03/17/5c8db24384477.png)



先进行变量提升，也就是将所有的 var 都提升到最上面。

内存中的数据是以 64 位二进制浮点数存储的，如果我们写 `b=a` 那么就会把 a 对应的数值复制一份到 b 对应的栈

当我们声明对象 O 的时候，怎么存呢？是不是一个字符占四位？

![](https://i.loli.net/2019/03/17/5c8db577d613c.png)

这时候我们遇到一个问题，我们加了一个 `gender`，我们需要将内存空间下移，给 `o` 空出空间，这么做合适吗？

由于对象是需要添加内容的，如果早早地将它内容存储在内存栈中，不合适，我们在它的栈中存储一个地址，这个地址指向的就是一块堆内存，里面放着对象所有字段信息。堆内存里面没什么顺序



stack 内存指向 heap 内存，数字是 64 位（ECMA 规定），字符是 16 位的（ECMA 规定的，当然 6 以后不是了）

值分为：

- 简单类型 Stack  n/s/null/undefined/sy/b

- 复杂类型，复杂类型只有 Object Heap 地址存入 Stack

**没有指针，跟 JS 没关系**，要么存值，要么存地址，但是引用的概念是存在的。我们可以说 object 放到内存 100 ，内存 100 中正好一个对象1，object 是对象 1 的引用。

![](https://i.loli.net/2019/03/17/5c8ddc58dff53.png)

画图，画图，画图，画图就不会错。

![](https://i.loli.net/2019/03/17/5c8ddeccc85a1.png)

那么这样又如何呢？b 的类型为 null，a 不变。



## 循环引用

var a = {}

a.self.self.self......name

这只是 Heap 内存中存了一个 `key`：`self: ADRR 33`

如果按照上次的例子：

```js
var a = {
  self: a
}
```

这样是不行的，因为我们这是一个赋值，这样子我们可以写成：

```
var a
a = {self: a}
```

这时候报错 `self: undefined`，因为 a 在对象里面的时候还是 `undefined`

靠谱的声明方式应该是这样的：

```js
var a = {}
a.self = a
```

这样子就可以无限循环调用。循环引用不能胡乱声明。



## 题目

### 引用类型

```js
var a = {n:1}
var b = a;
a.x = a = {n:2} 
// 先确定 a，就是一块内存地址 ADDR 34
// 然后声明的才是 ADDR 54 的 {n:2} 对象，赋值给 a
// 

alert(a.x); // --> undefined
alert(b.x); // --> [object, Object]
```

![](https://i.loli.net/2019/03/17/5c8de6d8cc5b9.png)

b.x 就是一个对象，而 a.x 显然没有定义。





## GC 垃圾回收

每个页面都会用很多内存，结束了之后会还给浏览器。记住一句话（精髓）：

### **如果一个对象没有被应用，它就是垃圾，将会被回收**

**一个人如果没有梦想，那它就是一条咸鱼**

我们来看一个最典型的垃圾回收：

```js
var a = { name: 'a' }
var b = { name: 'b' }
a = b
```

显而易见，a 一开始声明的对象后来不被引用了，那么它就是一个垃圾，`{ name: 'a' }` 是一坨垃圾，将会被回收，当然并不是立即被回收，浏览器觉得它得被回收才回收。

来一点复杂的题目：

```js
var fn = function () {}
document.body.onclick = fn
fn = null
```

那么这个对象是不是垃圾（方法就是一个对象）？我们来画一下图：

![](https://i.loli.net/2019/03/17/5c8de939bf71f.png)

然后改变了 ADDR110 为 null 之后，fn = null，那么 function () {} 是不是垃圾？它仍然还有人罩着，onclick 引用的是它，也就是说 fn 仍然间接引用它，它并不是垃圾。

如果我们这样写：

```
document.body.onclick = null
```

那么这时候 `function () {}` 就是一个垃圾。

那么垃圾车怎么回收呢？有时候六点，有时候七点，内存多的话可能就不那么频繁回收。



我们再来看一题：

```js
var fn = function() {}
document.body.onclick = fn
var fn = null
```

把页面关掉， fn 还是不是垃圾？答案是 yes，因为 document 都没了，它不是垃圾是什么？

但是 IE6 有 BUG，他认为失去栈引用的代码仍然不是垃圾，只有把浏览器全关，才有用，怎么解决呢？

使用

```js
 window.onunload = function() {
   document.body.onclick = null
 }
```

需要把所有事件监听都设置为 null，记住，是所有的事件监听。

这就是所谓的内存泄漏，因为浏览器的一些 BUG，一些代码会永远占用电脑内存，除非干掉浏览器，浏览器会吃越来越多的内存，解决方法是把所有监听事件都设置为 null。



# 浅拷贝 VS 深拷贝

必须要结合内存图，只有通过画图才能得到清晰的拷贝知识细节，单凭文字无法做到详尽的描述。

```js
var a = 1
var b = a
b = 2
a = 1
```

b 变不影响 a，能实现这个就是深拷贝。

对于所有的基本数据类型，简单的赋值操作就是深拷贝（=）

我们需要重点看一下复杂数据类型，也就是对象（Object）

```js
var a = {
  name: 'a'
}
var b = a
b.name = 'b'
a.name // 也是 'b'
```

当我把 a 赋值给 b 之后，b 变导致 a 变，这就是浅拷贝。

![](https://i.loli.net/2019/03/17/5c8ded186a0f5.png)

图中就是深拷贝。

深拷贝的代码有点复杂，之后再讲。



## 总结

1. 转换为 `string`
   1. `toString(?)`
   2. `String(?)`
   3. `'' + ?`
2. 转换为 `boolean`
   1. `Boolean(?)`
   2. `!! + ?`
   3. 五个 falsy：`0 NaN '' null undefined` 
   4. 所有对象都是 `true`
3. `1` 和 `object` 区别，由此引伸到内存图（四段代码）
4. 垃圾、垃圾回收、IE BUG
5. 题目
   1. 深拷贝vs浅拷贝（克隆）

垃圾回收是和数据结构有关的，它是寻找一棵树的根的，看有没有人引用这个根，所以垃圾回收是和树有很大的关系的。



# 课后知识点

### String () vs toString ()



The big one is for `toString()` a value has to exist. With `String()`, you can use it on values that are undefined or null. Attempting a `toString()` from an undefined or null value will produce an error. String will often call an object's `toString()` anyway, so its a safer way of doing that.



`toString()`is a method that some "classes" implement, so it'll only work if the class of the object you're working on implements it.

So if you have `let x = null` and try to do `x.toString()`it'll fail since `null` doesn't have the method `toString()`.

On the other side if you try to do `let x = null` and then do `String(x)` it'll result in the *string* 'null'.

A detail about `String()` is that it'll call `toString()` internally if the passed value implements it, so:

```
let x = {
    toString() { return 'hey there!'; }
};
String(x); // it'll return 'hey there!'
```



You can also do `'' + variable` for the same result as `String(variable)`.

With one exception: symbols.

```
> String(Symbol())
'Symbol()'
> '' + Symbol()
TypeError: Cannot convert a Symbol value to a string
```



Always only use `String(x)`.

Run this in your console:

> > var x = { toString: function () { return NaN; }, valueOf: function () { return Infinity; }}; [x.toString(), x + '', String(x)] /* note that only the third item is both a string, and the toString value */

The only one that's actually correct is `String(x)`. Use that.

