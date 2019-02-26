# Last-Modified 字段对缓存的控制

```js

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
      // let stat = fs.statSync(filePath)
      // console.log(stat.mtime)
      // let modifyDate = new Date(Date.parse(stat.mtime)).toGMTString()
      // console.log(modifyDate)
      // res.setHeader('Last-Modified', modifyDate)
      // res.writeHead(200, 'OK')
      // res.end(data)


      //example2
      // console.log(req.headers)
      // let mtime = Date.parse(fs.statSync(filePath).mtime)
      // if(!req.headers['if-modified-since']) {
      //   res.setHeader('Last-Modified', new Date(mtime).toGMTString())
      //   res.writeHead(200, 'OK')
      //   res.end(data)        
      // }else {
      //   let oldMtime = Date.parse(req.headers['if-modified-since'])
      //   if(mtime > oldMtime) {
      //     res.setHeader('Last-Modified', new Date(mtime).toGMTString())
      //     res.writeHead(200, 'OK')
      //     res.end(data)            
      //   }else {
      //     res.writeHead(304)
      //     res.end()
      //   }
      // }

      //example3
      let mtime = Date.parse(fs.statSync(filePath).mtime)
      //10秒内，浏览器直接从自己本地拿，10秒后找服务器要。如果没修改，告诉浏览器没修改就行，如果修改了，给浏览器最新的
      res.setHeader('Cache-Control', 'max-age=10')

      if(!req.headers['if-modified-since']) {
        res.setHeader('Last-Modified', new Date(mtime).toGMTString())
        res.writeHead(200, 'OK')
        res.end(data)        
      }else {
        let oldMtime = Date.parse(req.headers['if-modified-since'])
        if(mtime > oldMtime) {
          res.setHeader('Last-Modified', new Date(mtime).toGMTString())
          res.writeHead(200, 'OK')
          res.end(data)            
        }else {
          res.writeHead(304)
          res.end()
        }
      }

  	}
  })
}).listen(8080)
console.log('Visit http://localhost:8080' )

```

当我们的请求到达之后，我们使用 stat 获取文件的很多基本信息。

其中有一个 mtime 也就是文件的修改时间，我们来获取他，接着解析出这个时间，将它转换为 GMT 格式的事件对象。