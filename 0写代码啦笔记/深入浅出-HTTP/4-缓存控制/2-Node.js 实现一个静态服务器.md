# Node.js 实现静态服务器

我们来写一个最简单的静态服务器：

```js
/* 一个最简单的静态服务器 */
/* 访问 http://localhost:8080/picture.jpg */

const http = require('http')
const fs = require('fs')
const path = require('path')


http.createServer((req, res) => {
  fs.readFile(path.join(__dirname, req.url), (err, data) => {
  	if (err) {
  		res.writeHead(404, 'not found')
  		res.end('Oh, Not Found')
  	} else {
      res.writeHead(200, 'OK')
			res.end(data)
			// res.end(req.url)
  	}
  })
}).listen(8000)
console.log('Visit http://localhost:8000' )

```

想要实现的功能：当用户输入地址时，读取当前文件夹的 index.html 文件。

使用 fs.readFile 方法读取文件

使用绝对路径 + req.url 构造最完整路径

​	如果不存在，写一个响应报文 404，返回一个错误提示信息字符串

​	如果存在，写一个响应报文 200，返回相应数据

我们使用 `node index.js` 进行启动之后，可以在浏览器中访问到对应的页面内容。

