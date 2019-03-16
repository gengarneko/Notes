# JS 黑历史

我们捋一下时间轴：

1. 1991 李爵士 www

2. 1992 李爵士的小伙伴 CSS

3. 1993 W3C

4. 1995 浏览器，Netscape（网景）=> Navigator 浏览器发布，带了一个重量级功能：脚本

   Branden Eich，JS 之父，擅长 Scheme，喜欢函数式。

   开始的名字是 Mocha，抹茶 + 咖啡（Mocha + Java），Netscape 和 sun 当时合作，一开始想用 Java，但是之后觉得 Java 对于浏览器太重了，就没用，不过依然是想和 Java 语言配合开发网络应用。（商业互吹）

   Mocha => LiveScript => JavaScript

   Branden Eich 觉得真正实现类 Java 语言这不可能，所以他表面做到了（`var obj = new Object()`）

5. 1996 微软的CAB（MS Cabinet）规格在UTF-8标准正式落实前就明确容许在任何地方使用UTF-8编码系统。这也表明了 JS 的编码不是完整的 Unicode，这是一个 BUG，比较落后的编码（**BUG 1**）

6. 1996 微软发布 IE 3，（1、2 在 1995 发布），仿照 JS 发明了 JScript，抢占浏览器市场

7. 1997 ECMAScript 1.0发布，网景为了制衡微软，一直向 ECMA 申请 JS 的通行标准

8. 1998 网景打不过微软，Monzilla 诞生，也就是我们熟悉的火狐（firefox）的基金会

9. 1999 微软发布 IE 5，部署了 XMLHttpRequest 接口，允许 JS 发送 HTTP 请求，为后面的 ajax 应用打基础

10. 2004 Gmail 发布，利用的就是上述发请求功能，促成了互联网应用概念的诞生，JS 正式被视作编程语言

    这时候真正有了前端，Front-end（以 JS 为生），中国要到 2010 年左右才有真正的前端开发，以前的前端都是后端转过来的

11. 这时候真正有了前端，Front-end（以 JS 为生），中国要到 2010 年左右才有真正的前端开发

12. JS 不行，**都是全局变量**，互相干扰（没有模块化），**标准库不行**（内置代码不够多，比如 HTTP 模块，date 模块，常见算法模块，JS 啥都没）

13. 2015 ECMA 标准化组织正式批准了 ECMAScript 6 语言标准，我们熟悉的 ES6 诞生

    当然之前也有 ES4，不过太过于激进，所以死了，ES5 升级步伐吸取教训，进行小升级。Rails 社区的 CoffeeScript 有很多特性：类，箭头函数、optional chain 语法，ES6 参照这个进行了很大改进。作者说了目标就是倒逼 JavaScript 填坑。所以我们可以看到，JS 是集大家所长的语言，它的原创之处并不优秀。优秀之处并非原创（by Eich）

14. 自从ES6 之后就每年一更了，每年更新几个特性之类的。当然，有 ES Next，直接用 Webpack 打包就能使用 ES 暂时不支持的特性。

> 以上就是我们需要知道的 JS 历史。



答疑：

1. 我们学的是哪个版本：ES6，核心是 ES3，推荐从 ES3 -> ES5 -> ES6 -> ...

2. 现在 JS 用法是，没有发布的特性就已经被使用了，比如说，谷歌发明了一个新的语法 y1，火狐跟进，IE 也跟进，然后纳入规范。如果谷歌的新语法没发布呢？我们就使用 babel 进行转义，使用没发布的虚空语法。

3. optional chain：

   ```
   var obj = window.obj2
   
   obj.a.b.c.name
   // obj.a === undefined
   // obj.a.b => 报错
   // obj.a.b.c.name 
   // 第一次出现不存在的语法就报错
   
   if (obj.a !== undefined && obj.a.b !== undefine $$ ...) {
     console.log(obj.a.b.name)
   }
   // optional chain
   console.log(obj?.a?.b?.c?.name)
   ```