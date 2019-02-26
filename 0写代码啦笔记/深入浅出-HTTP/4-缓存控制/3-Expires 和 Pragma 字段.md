# Expires 和 pragma

```js
/*
  缓存的第一种方案，Http1.0时的产物，Expires字段表示过期截止日期,Pragma表示不用缓存
  范例：
  Expires: Wed, 23 Jan 2019 07:33:51 GMT
  Pragma: no-cache

  如果同时设置，Pragma的优先级高于Expires

  访问 http://localhost:8080/picture.jpg */

const http = require('http')
const fs = require('fs')
const path = require('path')


http.createServer((req, res) => {
	let filePath = path.join(__dirname, req.url)
  fs.readFile(filePath, (err, data) => {
  	if (err) {
  		res.writeHead(404, 'not found')
  		res.end('Oh, Not Found')
  	} else {

  		// example1
  		res.setHeader('Expires', 'Wed, 23 Jan 2019 07:40:51 GMT')


  		// example2
			//res.setHeader('Pragma', 'no-cache')

			// example3
			//res.setHeader('Expires', 'Wed, 23 Jan 2019 07:40:51 GMT')
			//res.setHeader('Pragma', 'no-cache')

			// example4
			let date = new Date(Date.now() + 1000*5).toGMTString()
			res.setHeader('Expires', date)

      res.writeHead(200, 'OK')
  		res.end(data)
  	}
  })
}).listen(8080)
console.log('Visit http://localhost:8080' )

```

我们可以看到响应的图片文件：

```http
Connection: keep-alive
Date: Wed, 20 Feb 2019 05:15:26 GMT
Expires: Wed, 20 Feb 2019 05:15:31 GMT
Transfer-Encoding: chunked
```

设置 Expires 之后我们可以在浏览器检查的 Network Size 中看到资源的来源是 memory cache 或者 disk cache



如果我们不走 Expires 而是 Pragma：

告诉浏览器不要走本地的缓存，而是走服务器。