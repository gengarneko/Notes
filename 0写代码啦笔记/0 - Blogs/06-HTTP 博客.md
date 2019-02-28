# HTTP 初探

[TOC]

## 基础知识

### 场景

我们打开浏览器，输入网址（比如 `https://www.bilibili.com/`），然后我们就可以看到 b 站的 Web 页面，Web 页面当然不能凭空显示出来。根据 Web 浏览器地址栏中指定的 URL（`https://www.bilibili.com/`），Web 浏览器从 Web 服务器端获取文件资源（resource）等信息，从而显示出 Web 页面。

> ​客户端：像这种通过发送请求获取服务器资源的 Web 浏览器等，都可称为客 户端（client），当然客户端并不都是浏览器，还有 app 啊，微信什么的。

### 什么是 HTTP？

我们输入一个 URL，然后展现页面加载数据，这里面遵循了什么样的协议呢？就是 HTTP。

Web 使用一种名为 HTTP（HyperText Transfer Protocol，超文本传输协议）的协议作为规范，完成从**客户端**到**服务器端**等一系列运作流 程。而协议是指规则的约定。可以说，Web 是建立在 HTTP 协议上通信的。

> 总之，HTTP是一个基于 TCP/IP 通信协议的，用于从万维网服务器传输超文本到本地浏览器的传送协议。

### 什么是 URL？

Uniform Resource Locator（统一资源定位符），属于两种 URI（统一资源标志符）的一种，也就是我们平常输入的网络地址，它的格式是：

![URL基本格式](https://i.loli.net/2019/02/21/5c6e381084c5b.png)

> URI 相比于 URL 概念更加的宽泛，比如它可以定位到 FTP 上的资源、邮件资源、电话，已经超出了网页的范畴。
>
> URL 则是专门用于定位网页资源。

### 简单了解 TCP/IP 四层模型

TCP/IP 模型分为**应用层**、**传输层**、**网络层**、**数据链路层**四层。每一个应用层协议一般都会使用到传输层协议 TCP 和 UDP 协议之一：

我们依然是去想象一个场景：

> 二年级的小明想写信给在国外的小朋友亨利，他**按照信的标准格式写好了一封信**。然后小明不会寄信，他求助于他的爸爸，他爸帮他寄信。
>
> 为什么小明会认识亨利呢？因为他们俩的父亲是好朋友，寄信前小明父亲会向亨利父亲确认亨利家没搬家，也就是信是可以寄到的，**连接是存在的（三次握手）**，然后因为是小明给亨利的，所以备注送到亨利的房间（端口号）。
>
> 小明父亲将信给邮差，由邮差填写**亨利家的街道地址和邮编（IP 地址）**
>
> 最后邮差将信封放进邮筒，信的**尺寸**肯定要能放进邮筒，不然寄不出去。
>
>  
>
> 当然别忘了贴邮票（交网费，没网你访问个啥？）

这个场景就和 TCP/IP 传输协议类似了，我们分别看一下：

- **应用层**：大多数网络相关程序为了通过网络与其他程序通信所使用的层，一般都会使用 TCP 或者 UDP 协议。
- **传输层**：解决诸如端到端的可靠性，保证数据按照正确的顺序到达这样的问题。
- **网络层**：解决在一个单一网络上传输数据包的问题，IP 协议是网络层协议。
- **数据链路层**：是数据包从一个设备的网络层传输到另外一个设备的网络层的方法。

**HTTP 在应用层（也就是信的格式），是运行在 TCP 协议上的协议。**

由上面可简单了解到 IP 协议负责传输，TCP 协议确保可靠性，还有一个 DNS 负责域名解析。

### 什么是 DNS？

Domain Name System，域名系统,和 HTTP 协议一样位于应用层的 协议,它提供域名到 IP 地址之间的解析服务。

用户通常使用主机名或域名来访问对方的计算机，而不是直接通过 IP 地址访问。因为与 IP 地址的一组纯数字相比，用字母配合数字的表示形式来指定计算机名更符合人类的记忆习惯。但要让计算机去理解名称，相对而言就变得困难了。因为计算机更擅 长处理一长串数字。

为了解决上述的问题，DNS 服务应运而生。DNS 协议提供通过域名 查找 IP 地址，或逆向从 IP 地址反查域名的服务。

- 输入域名
- 输出 IP

```
nslookup baidu.com
ping baidu.com
```

`nslookup baidu.com` 会访问电信，解析目标地址的 IP，告诉你地址的服务员，就是 DNS，解析服务器。

![](https://i.loli.net/2019/02/21/5c6e3fcbdb0ec.png)

### HTTP 的一些特点

- **简单快速**：客户向服务器请求服务时，只需传送请求方法和路径。由于HTTP协议简单，使得HTTP服务器的程序规模小，因而通信速度很快。
- **灵活**：HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type加以标记。
- **无连接**：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。
- **无状态**：无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。
- **支持 B/S 及 C/S 模式。**



## HTTP 内容

### 服务器与浏览器的交互

- 浏览器负责发起请求
- 服务器在 80 端口接收请求
- 服务器负责返回内容（响应）
- 浏览器负责下载响应内容

HTTP 的作用是指导浏览器和服务器如何进行沟通。                               

### curl 命令

curl 是一个编程用的函数库，也是是一个无比有用的网站开发工具。

#### URL访问

1. 直接在curl命令后加上网址，就可以看到网页源码。

   ```http
   $ curl www.baidu.com
   ```

2. 使用 `-L` 参数来重定向追踪

   ```http
   $ curl -L www.baidu.com
   ```

3. 使用 `-o` 参数将页面源码保存到本地

   ```http
   $ curl -o [文件名] www.baidu.com
   ```

4. 添加 `-i` 或 `--include` 参数查看访问页面

   ```http
   $ curl -i www.baidu.com
   ```

   添加 `-i` 参数后，页面响应头会和页面源码（响应体）一块返回。如果只想查看响应头，可以使用 `-I` 或 `--head` 参数。

#### 表单提交

1. 全用 `GET` 提交表单数据，数据被附加到请求的 URL 后面

   ```http
   $ curl example.com/form.cgi?data=xxx
   ```

2. `POST` 方法必须把数据和网址分开，curl 就要用到 `--data` 参数

   ```http
   $ curl -X POST --data "data=xxx" example.com/form.cgi
   ```

3. 如果你的数据没有经过表单编码，还可以让 curl 编码，参数是 `--data-urlencode`

   ```http
   $ curl -X POST --data-urlencode "date=April 1" example.com/form.cgi
   ```

4. 使用 `-X` 使用其他的 HTTP 动词（默认 `GET`）

   ```http
   $ curl -X DELETE www.example.com
   ```

#### 文件上传

1. 使用 `-T` 或者 `--upload-file` 参数

   ```http
   $ curl -T ./index.html www.uploadhttp.com/receive.cgi
   ```

#### 显示通信过程

1. 使用 `-v` 显示一次 http 通信的整个过程，包括端口连接和 http request 头信息

   ```http
   $ curl -v www.baidu.com
   ```

#### Coocie

1. 通过 `--cookie` 参数指定发送请求时的 `Cookie` 值，或通过 `-b [文件名]` 指定一个存储了 `Cookie` 值的本地文件

   ```http
   $ curl -b stored_cookies_in_file www.baidu.com
   ```

2. 通过 `-c` 参数指定存储服务器返回 `Cookie` 值的存储文件

   ```http
   $ curl -b cookies.txt -c newcookies.txt www.baidu.com
   ```

#### 添加请求头

1. 通过 `-H` 或者 `--header` 参数来指定请求头，可以多次使用

   ```http
   $ curl -H "Content-Type:application/json" http://example.com
   ```

### 报文内容

我们打开 `https://xiedaimala.com/tasks/9b3be6e2-3ad0-43cf-b102-9de9da718074` 在检查中的 Network 里面可以使用 `copy request headers` `copy response headers` 获得请求和响应报文：

**request headers**：

```http
GET /tasks/9b3be6e2-3ad0-43cf-b102-9de9da718074 HTTP/1.1
Host: xiedaimala.com
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Referer: https://xiedaimala.com/courses/ec3a5e28-02da-47d6-9226-927db23e82a2
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: UM_distinctid=1690d821f9413c-0dd5cee0b282e8-5d1f3b1c-1fa400-1690d821f9561d; CNZZDATA1271340636=1197645923-1550709159-https%253A%252F%252Fwww.google.com%252F%7C1550724880; _task_center_session=SnFCMGF2WmZ6d2hUS3djY1NZb0UxTnh3R2pDeHVwNUx1czBYeXlVT0JSTzZtc2pZWldLc0s2WHR5Z3V6ZFAzM3ZaU1IwMkNod3lIVytuS01Bbm03TWtaRnhuaEt3V2diUlZLdE92bXpSU1krRGpHT2xDZGIyRWJOdm95Z2xyMEV6MldqUXlsR3ZwQWtCeGFDTWpFc2FBPT0tLWNheDJ3TGVadWNUQ2l1NnFGbXFxOEE9PQ%3D%3D--7717d40d5d746ff64508d247581a356f4ab90880

```

**response headers**：

```http
HTTP/1.1 200 OK
Server: nginx/1.4.6 (Ubuntu)
Date: Thu, 21 Feb 2019 06:10:33 GMT
Content-Type: text/html; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Cache-Control: max-age=0, private, must-revalidate
Set-Cookie: _task_center_session=SDJiMWpDNFhLNndaT0sxb3lELzJBalYxSXpnQThjWUdKakhoV2dhUXYrc3FMY2VPQjEyVEo2bUlGcGl4U3hQbXZ0SEJudkk5TjRjWUVheFYzdmxROGh1YXJrV0NCZll4emNIKzlyUlBNazJNdXBNR05LU0V3aTJDR29NbjlNMnJ6MjlZcHgxQWY5dXFmMkpKRUtFNWNRPT0tLVZtenZLakdKMmZRVGN4aG1xWFpQK1E9PQ%3D%3D--34bc79c0107efb6ef4f174ded40f6171158ec4d6; path=/; secure; HttpOnly
X-Request-Id: 026b247b-b03c-4c42-9fa1-f01dff1306d5
X-Runtime: 0.032906
Strict-Transport-Security: max-age=15552000; includeSubDomains
Strict-Transport-Security: max-age=15768000
Content-Encoding: gzip

```

就好像我们之前的小故事一样，`request` 是发送出去的信，`response` 是回复的信。

请求有请求的规矩，响应有响应的规矩，HTTP 就是请求与响应的规矩。不遵循 HTTP 规矩的请求与响应就会处理报错。

### 报文结构

#### 请求的格式

请求报文是由请求方法、请求 URI、协议版本、可选的请求首部字段 和内容实体构成的。

![](https://i.loli.net/2019/02/21/5c6e430835f48.png)

我们使用 `curl` 语句来创造一个请求：

```http
curl -s -v -H "Frank: xxx" -- "https://www.baidu.com"
```

请求的内容为：

```http
GET / HTTP/1.1
Host: www.baidu.com
User-Agent: curl/7.54.0
Accept: */*
Frank: xxx
```

添加 -X POST 参数：

```http
curl -X POST -s -v -H "Frank: xxx" -- "https://www.baidu.com"
```

请求的内容为：

```http
POST / HTTP/1.1
Host: www.baidu.com
User-Agent: curl/7.54.0
Accept: */*
Frank: xxx
```

添加 -d “1234567890” 参数：

```http
curl -X POST -d "1234567890" -s -v -H "Frank: xxx" -- "https://www.baidu.com"
```

请求的内容为：

```http
POST / HTTP/1.1
Host: www.baidu.com
User-Agent: curl/7.54.0
Accept: */*
Frank: xxx
Content-Length: 10
Content-Type: application/x-www-form-urlencoded

1234567890
```

客户端发送一个 HTTP 请求到服务器的请求消息包括以下内容：

- 请求行（request line）：动词 路径 协议/版本
- 请求头部（header）：说明服务器要使用的附加信息
- 空行：即使第四部分的请求数据为空，也必须有空行
- 请求数据：就是请求数据咯

![](https://upload-images.jianshu.io/upload_images/2964446-fdfb1a8fce8de946.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/466/format/webp)

#### 用 Chrome 调试请求

1. 打开 Network
2. 地址栏输入网址
3. 在 Network 点击，查看 request，点击「view source」
4. 点击「view source」
5. 可以看到请求的前三部分了
6. 如果有请求的第四部分，那么在 FormData 或 Payload 里面可以看到



#### 响应的格式

一般情况下，服务器接收并处理客户端发过来的请求后会返回一个HTTP的响应消息。

响应是由状态行、消息头部、空行和响应正文组成。

![](https://i.loli.net/2019/02/21/5c6e4ea6b8f6d.png)

上面的三个响应分别为：

```http
curl -s -v -H "Frank: xxx" -- "https://www.baidu.com"
```

```http
HTTP/1.1 200 OK
Accept-Ranges: bytes
Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform
Connection: Keep-Alive
Content-Length: 2443
Content-Type: text/html
Date: Tue, 10 Oct 2017 09:14:05 GMT
Etag: "5886041d-98b"
Last-Modified: Mon, 23 Jan 2017 13:24:45 GMT
Pragma: no-cache
Server: bfe/1.0.8.18
Set-Cookie: BDORZ=27315; max-age=86400; domain=.baidu.com; path=/

<!DOCTYPE html>
......
```



```http
curl -X POST -s -v -H "Frank: xxx" -- "https://www.baidu.com"
```

```http
HTTP/1.1 302 Found
Connection: Keep-Alive
Content-Length: 17931
Content-Type: text/html
Date: Tue, 10 Oct 2017 09:19:47 GMT
Etag: "54d9749e-460b"
Server: bfe/1.0.8.18

<html>
......
```



```http
curl -X POST -d "1234567890" -s -v -H "Frank: xxx" -- "https://www.baidu.com"
```

```http
HTTP/1.1 302 Found
Connection: Keep-Alive
Content-Length: 17931
Content-Type: text/html
Date: Thu, 21 Feb 2019 07:11:28 GMT
Etag: "54d9749e-460b"
Server: bfe/1.0.8.18

<html>
......
```



服务端发送一个 HTTP 响应到客户端的响应消息包括以下内容：

- 状态行：协议/版本 状态码 状态消息
- 消息头部：说明客户端要使用的一些附加信息
- 空行：空行，消息报头后面的空行是必须的
- 响应正文：服务器返回给客户端的文本信息

**状态码及对应状态消息**：

![](https://i.loli.net/2019/02/21/5c6e513583615.png)

#### 用 Chrome 调试响应

1. 打开 Network
2. 输入网址
3. 选中第一个响应
4. 查看 Response Headers，点击「view source
5. 你会看到响应的前两部分
6. 查看 Response 或者 Preview，你会看到响应的第 4 部分

#### 总结一下报文结构

![](https://i.loli.net/2019/02/21/5c6e51fa43dca.png)



## 常见 HTTP 方法及应用场景

### 常见 HTTP 方法

---

#### GET（获取资源）

> GET 方法用来请求访问已被 URI 识别的资源。指定的资源经服务器 端解析后返回响应内容。也就是说，如果请求的资源是文本，那就保 持原样返回；如果是像 CGI（Common Gateway Interface，通用网关接 口）那样的程序，则返回经过执行后的输出结果。

告诉服务器我要要东西。

#### POST（传输实体主体）

> 虽然用 GET 方法也可以传输实体的主体，但一般不用 GET 方法进行传输，而是用 POST 方法。虽说 POST 的功能与 GET 很相似，但 POST 的主要目的并不是获取响应的主体内容。

告诉服务器我要给东西。

#### PUT（传输文件）

> PUT 方法用来传输文件。就像 FTP 协议的文件上传一样，要求在请求报文的主体中包含文件内容，然后保存到请求 URI 指定的位置。

> 但是，鉴于 HTTP/1.1 的 PUT 方法自身不带验证机制，任何人都可以 上传文件 , 存在安全性问题，因此一般的 Web 网站不使用该方法。若 配合 Web 应用程序的验证机制，或架构设计采用 REST（REpresentational State Transfer，表征状态转移）标准的同类 Web 网站，就可能会开放使用 PUT 方法。

告诉服务器我要更新。

#### HEAD（获得报文首部）

> HEAD 方法和 GET 方法一样，只是不返回报文主体部分。用于确认 URI 的有效性及资源更新的日期时间等。

#### DELETE（删除文件）

> DELETE 方法用来删除文件，是与 PUT 相反的方法。DELETE 方法按 请求 URI 删除指定的资源。 但是，HTTP/1.1 的 DELETE 方法本身和 PUT 方法一样不带验证机 制，所以一般的 Web 网站也不使用 DELETE 方法。当配合 Web 应用 程序的验证机制，或遵守 REST 标准时还是有可能会开放使用的。

#### OPTIONS（询问支持的方法）

> OPTIONS 方法用来查询针对请求 URI 指定的资源支持的方法。

#### CONNECT（要求用隧道协议连接代理）

> 方法要求在与代理服务器通信时建立隧道，实现用隧道协 议进行 TCP 通信。主要使用 SSL（Secure Sockets Layer，安全套接 层）和 TLS（Transport Layer Security，传输层安全）协议把通信内容 加 密后经网络隧道传输。

#### TRACE（追踪路径）

> TRACE 方法是让 Web 服务器端将之前的请求通信环回给客户端的方 法。 发送请求时，在 Max-Forwards 首部字段中填入数值，每经过一个服 务器端就将该数字减 1，当数值刚好减到 0 时，就停止继续传输，最 后接收到请求的服务器端则返回状态码 200 OK 的响应。 客户端通过 TRACE 方法可以查询发送出去的请求是怎样被加工修改 / 篡改的。这是因为，请求想要连接到源目标服务器可能会通过代理 中转，TRACE 方法就是用来确认连接过程中发生的一系列操作。 但是，TRACE 方法本来就不怎么常用，再加上它容易引发 XST（Cross-Site Tracing，跨站追踪）攻击，通常就更不会用到了。



### GET 和 POST 区别

---

最直观的区别就是GET把参数包含在URL中，POST通过request body传递参数。

- GET在浏览器回退时是无害的，而POST会再次提交请求。
- GET产生的URL地址可以被Bookmark，而POST不可以。
- GET请求会被浏览器主动cache，而POST不会，除非手动设置。
- GET请求只能进行url编码，而POST支持多种编码方式。
- GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。
- GET请求在URL中传送的参数是有长度限制的，而POST么有。
- 对参数的数据类型，GET只接受ASCII字符，而POST没有限制。
- GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
- GET参数通过URL传递，POST放在Request body中。

![](https://i.loli.net/2019/02/21/5c6e5a022729e.png)

本质上它们都是 TCP 链接，因为它们是 HTTP 协议中的两种发送请求的方式，底层都是 TCP/IP。

> `GET` 的语义是请求获取指定的资源。
>
> ​	`GET` 方法是安全、幂等、可缓存的（除非有 `Cache-ControlHeader` 的约束）
>
> ​	`GET` 方法的报文主体没有任何语义
>
> `POST` 的语义是根据请求负荷（报文主体）对指定的资源做出处理，具体的处理方式视资源类型而不同。
>
> ​	`POST` 不安全，不幂等，（大部分实现）不可缓存
>
> ​	为了针对其不可缓存性，有一系列的方法来进行优化



## HTTP 持久化连接

```http
Connection: keep-alive
```

以上就是 **持久连接节省通信量** 的字段。

HTTP 协议的初始版本中，每进行一次 HTTP 通信就要断开一次 TCP 连接。

以当年的通信情况来说，因为都是些容量很小的文本传输，所以即使 这样也没有多大问题。可随着 HTTP 的普及，文档中包含大量图片的 情况多了起来。 比如，使用浏览器浏览一个包含多张图片的 HTML页面时，在发送 请求访问 HTML页面资源的同时，也会请求该 HTML页面里包含的 其他资源。因此，每次的请求都会造成无谓的 TCP 连接建立和断 开，增加通信量的开销。

### 持久连接

为解决上述 TCP 连接的问题，HTTP/1.1 和一部分的 HTTP/1.0 想出了 持久连接（HTTP Persistent Connections，也称为 HTTP keep-alive 或 HTTP connection reuse）的方法。持久连接的特点是，只要任意一端 没有明确提出断开连接，则保持 TCP 连接状态。

持久连接的好处在于减少了 TCP 连接的重复建立和断开所造成的额 外开销，减轻了服务器端的负载。另外，减少开销的那部分时间，使 HTTP 请求和响应能够更早地结束，这样 Web 页面的显示速度也就相 应提高了。 

在 HTTP/1.1 中，所有的连接默认都是持久连接，但在 HTTP/1.0 内并 未标准化。虽然有一部分服务器通过非标准的手段实现了持久连接， 但服务器端不一定能够支持持久连接。毫无疑问，除了服务器端，客 户端也需要支持持久连接。

### 管线化

持久连接使得多数请求以管线化（pipelining）方式发送成为可能。从前发送请求后需等待并收到响应，才能发送下一个请求。管线化技术出现后，不用等待响应亦可直接发送下一个请求。这样就能做到同时并行发送多个请求，而不需要一个接一个地等待响应了。

### Cookie 状态管理

HTTP 是无状态协议，它不对之前发生过的请求和响应的状态进行管理。也就是说，无法根据之前的状态进行本次的请求处理。

不可否认，无状态协议当然也有它的优点。由于不必保存状态，自然 可减少服务器的 CPU 及内存资源的消耗。从另一侧面来说，也正是 因为 HTTP 协议本身是非常简单的，所以才会被应用在各种场景里。

保留无状态协议这个特征的同时又要解决类似的矛盾问题，于是引入 了 Cookie 技术。Cookie 技术通过在请求和响应报文中写入 Cookie 信 息来控制客户端的状态。 

Cookie 会根据从服务器端发送的响应报文内的一个叫做 Set-Cookie 的 首部字段信息，通知客户端保存 Cookie。当下次客户端再往该服务器 发送请求时，客户端会自动在请求报文中加入 Cookie 值后发送出 去。

 服务器端发现客户端发送过来的 Cookie 后，会去检查究竟是从哪一 个客户端发来的连接请求，然后对比服务器上的记录，最后得到之前 的状态信息。



## HTTP 缓存控制

浏览器在请求已经访问过的URL的时候，会判断是否使用缓存,。

判断是否使用缓存，主要通过判断缓存是否在**有效期**内, 通过两个字段来判断：

1. **Expires**，有效期，返回的是一个GMT时间，但是使用的是**客户端时间**，与服务器时间存在一定时间差。
2. **Cache-Control => max-age**，最大有效时间，单位是s，优先级比 expires 高，为了解决 expires 时间差的问题而出现的。

缓存过期后，浏览器不会直接去服务器上拿缓存，而是判断缓存是否有更新，能否继续使用，判断的方法有两种：

1. **Last-Modified / If-Modified-Since**：服务器会响应一个Last-Modified 字段，表示最近一次修改缓存的时间，当缓存过期后，浏览器就会把这个时间放在 If-Modified-Since 去请求服务器，判断缓存是否有更新。
2. **Etag / If-None-Match**：服务器会响应一个 Etag 字段，一个表示文件唯一的字符串, 一旦文件更新，Etag也会跟着更改；缓存过期后，浏览器会把这个字符串放在 If-None-Match 去请求服务器，判断是否有更新，Etag的优先级比Last-Modified 的更高, Etag 的出现, 是为了解决一个缓存文件在短时间内被多次修改的问题, 因为 Last-Modified 只能精确到秒。



## HTTP 工作流程

HTTP 协议定义 Web 客户端如何从 Web 服务器请求Web页面，以及服务器如何把 Web 页面传送给客户端。HTTP 协议采用了请求/响应模型。客户端向服务器发送一个请求报文，请求报文包含请求的方法、URL、协议版本、请求头部和请求数据。服务器以一个状态行作为响应，响应的内容包括协议的版本、成功或者错误代码、服务器信息、响应头部和响应数据。

### HTTP 请求/响应的步骤

---

#### 1、客户端连接到Web服务器

一个 HTTP 客户端（通常是浏览器）与 Web 服务器的HTTP端口（默认 80）建立一个TCP套接字连接。

#### 2、发送HTTP请求

通过 TCP 套接字，客户端向 Web 服务器发送一个文本的请求报文。

#### 3、服务器接受请求并返回 HTTP 响应

Web 服务器解析请求，定位请求资源。服务器将资源复本写到 TCP 套接字，由客户端读取。

#### 4、释放连接 TCP 连接

若 `connection` 模式为 `close`，则服务器主动关闭 TCP 连接，客户端被动关闭连接，释放 TCP 连接；若 `connection` 模式为 `keepalive`，则该连接会保持一段时间，在该时间内可以继续接收请求；

#### 5、客户端浏览器解析HTML内容

客户端浏览器首先解析状态行，查看表明请求是否成功的状态代码。然后解析每一个响应头，响应头告知以下为若干字节的 HTML 文档和文档的字符集。客户端浏览器读取响应数据 HTML，根据 HTML 的语法对其进行格式化，并在浏览器窗口中显示。

### 生活中常见例子

---

在浏览器中输入 URL 地址，回车后：

1、浏览器向 DNS 服务器请求解析该 URL 中的域名所对应的 IP 地址 

2、解析出 IP 地址后，根据该 IP 地址和默认端口 80，和服务器建立 TCP 连接

3、浏览器发出读取文件（URL 中域名后面部分对应的文件）的HTTP 请求，该请求报文作为 TCP 三次握手的第三个报文数据发送给服务器;

4、服务器对浏览器请求作出响应，并把对应的 html 文本发送给浏览器;

5、释放 TCP 连接

6、浏览器将该 html 文本并显示内容;