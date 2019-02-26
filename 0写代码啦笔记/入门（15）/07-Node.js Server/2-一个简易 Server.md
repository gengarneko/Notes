# 一个简易 Server

我们现在来搞一个服务器吧，然后提供 HTTP 服务。

1. 服务器你已经有了，你是用的电脑就是服务器
2. 但是你还没有提供 HTTP 服务的【程序】

用脚本就可以提供 HTTP 服务，不管是 Bash 脚本还是 Node.js 脚本都可以。

由于 Bash 脚本的语法实在是反人类，而且今后我们要学习 javaScript，所以我们先用 Node.js 脚本试试水。

> 声明：本章重点不是 JS 语法，所以代码可以直接复制，不用自己敲代码。
>
> 这节课的重点是了解服务器的运行过程。

李爵士写出了第一个网页、第一个浏览器和第一个服务器。

- 网页我们见过
- 浏览器我们见过
- 服务器？我们从来没见过

所以了解服务器的原理是非常非常重要的，否则你的知识永远少一块。这就是我们为什么花了这么多时间去学习命令行、脚本和 HTTP 的原因。



服务器特点：

- 有网
- CPU 要好
- 内存要高

我们直接用 SSH 连接就好了~~~



## Node.js 服务器

### 接收请求

我们的脚本只需要一个文件就可以搞定

1. 新建一个安全的目录，不需要我重复强调吧？
   `cd ~/Desktop; mkdir node-demo; cd node-demo`
2. touch server.js
3. 编辑 server.js，[内容我已经上传到 GitHub](https://github.com/FrankFang/nodejs-test/blob/master/server.js)。
4. 运行 node server 或者 node server.js，看到报错
5. 根据报错提示调整你的命令
6. 成功之后，这个 server 会保持运行，无法退出
   - 如果你想「中断」这个 server，按 <kb>Ctrl</kbd> + <kbd>C</kbd> 即可（C 就是 Cancel 的意思）
   - 中断后你才能输入其他命令
   - 我建议你把这个 server 放在那里别动，新开一个 Bash 窗口，完成下面的教程

好了服务器完成。只不过

1. 这个服务器目前只有一个功能，那就是打印出路径和查询字符串
2. 还缺少一个重要的功能，那就是发出 HTTP 响应

目前我们先只做一个功能玩玩。

接下来你要发起一个请求到这个服务器。这听起来有点怪异，「我向自己发起请求」，目前是的，因为你买不起服务器啊。

在新的 Bash 窗口运行 `curl http://localhost:你的指定的端口/xxx` 或者 `curl http://127.0.0.1:你指定的端口/xxx`。

你会马上发现 server 打印出了路径：

![图片](https://video.jirengu.com/FppS4B1iyvhxLSLLwa8-iETh-M0E)图片



1. 这说明我们的 server 收到了我们用 curl 发出的请求
2. 由于 server 迟迟没有发出响应，所以 curl 就一直等在那里，无法退出（用 <kb>Ctrl</kbd> + <kbd>C</kbd> 中断这个傻 curl）

### 发出响应

接下来我们让我们 server 发出响应

1. 编辑 server.js

2. 在中间我标注的区域添加两行代码

   ```
    response.write('Hi')
    response.end()
   ```

3. 中断之前的 server，重新运行 node server 8888

4. ```
   curl http://127.0.0.1:8888/xxx
   ```

   ，结果如下：

   ```
    Hi%
   ```

   这个 % 不是我们的内容，% 表示结尾。别再问我了。如果你看 % 不爽，就把 'Hi' 换成 'Hi\n'。

5. 好了，响应添加成功

6. 使用 `curl -s -v -- "http://localhost:8888/xxx"` 可以查看完整的请求和响应（上节课的内容）

### 根据请求返回不同的响应

1. 响应 /
2. 响应 /xxx
3. 响应 404
4. 响应 /xxx.html
5. 响应 /xxx.frank
6. 再次强调，后缀是废话。文件内容是有 HTTP 头中的 Content-Type 保证的
7. 响应 /xxx.css
8. 响应 /xxx.js
9. HTTP 路径不是文件路径！！！/xxx.html 不一定对应 xxx.html 文件
10. HTTP 路径不是文件路径！！！/xxx.html 不一定对应 xxx.html 文件
11. HTTP 路径不是文件路径！！！/xxx.html 不一定对应 xxx.html 文件

## 上传代码供以后复习

1. 在 GitHub 创建新的空 repo，名称为 node-demo
2. 按照 GitHub 的提示上传代码

这是完整的代码

```javascript
var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var path = request.url 
  var query = ''
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('HTTP 路径为\n' + path)
  if(path == '/style.js'){
    response.setHeader('Content-Type', 'text/css; charset=utf-8')
    response.write('body{background-color: #ddd;}h1{color: red;}')
    response.end()
  }else if(path == '/script.html'){
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    response.write('alert("这是JS执行的")')
    response.end()
  }else if(path == '/index.css'){
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write('<!DOCTYPE>\n<html>'  + 
      '<head><link rel="stylesheet" href="/style.js">' +
      '</head><body>'  +
      '<h1>你好</h1>' +
      '<script src="/script.html"></script>' +
      '</body></html>')
    response.end()
  }else{
    response.statusCode = 404
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
```

完

