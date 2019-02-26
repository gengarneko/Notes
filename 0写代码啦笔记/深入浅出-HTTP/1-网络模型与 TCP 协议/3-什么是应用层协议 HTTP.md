# 简单理解应用层协议 HTTP

我们回顾上一个例子：小白写信需要遵循一定的规范格式，而这个规范就可以想象为 HTTP。

而实际传输中，我们可以刷新 [饥人谷](https://xiedaimala.com/tasks/b87728c0-58d8-40eb-aab8-f2c29961a2c8/text_tutorials/221e8b04-f4b6-4299-8aa2-7b9a17b54186) 拿取到以下一个简单的例子：

**request headers：**

```http
GET /tasks/b87728c0-58d8-40eb-aab8-f2c29961a2c8/text_tutorials/221e8b04-f4b6-4299-8aa2-7b9a17b54186 HTTP/1.1
Host: xiedaimala.com
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Referer: https://xiedaimala.com/tasks/b87728c0-58d8-40eb-aab8-f2c29961a2c8/text_tutorials/60eff4b0-1d37-40c9-9a9e-c8a254bbaa0c
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: UM_distinctid=168f3cb8745414-06892b2f62b01d-5d1f3b1c-1fa400-168f3cb874651c; CNZZDATA1271340636=980127574-1550278224-https%253A%252F%252Fwww.google.com%252F%7C1550311550; _task_center_session=RXVwWXpDMUFENzhsQjZqZTF0RC9kNmI2bW1DWnZ1MDMvRnFHVHQyQkd2Uk1OMkFzTWUvSzlkSFMybENBaWVYc0M5cHc0bWhRZUFQZ3dwRzFvUlI3eVJmcWpIbFFWR0FleXViTVErdmFEa2ppY3g4ajhEeGZlUWVmRDlKWkRPT3JRTTdnREZTRlpGQzdHZjRjTGZZSVdBPT0tLTB5ZzFodkY2U3hkWUhOUDdCT21TeHc9PQ%3D%3D--52762417707683076689780bae9661af28c6447b
```

**response headers：**

```http
HTTP/1.1 200 OK
Server: nginx/1.4.6 (Ubuntu)
Date: Sat, 16 Feb 2019 11:01:30 GMT
Content-Type: text/html; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Cache-Control: max-age=0, private, must-revalidate
Set-Cookie: _task_center_session=b2srNjd3TzZTM01OeU9LS2R3R0hKUXNQemhmUjhHOXFMTWZqWkMxY3gwVUZVSWdzaWxmNHFLMDVLcHhQUUtzODlRZ1FEemZERVZOWVR6dGJjUWNSNnZmd2VYdHQrODF0R3Vvc0o1WUN2WGpwL041WTcxL3JNTjZzTCtuSE1BeDNzK2Q2dzUvcENJVEtDT2VQYTIyY3JnPT0tLXB6SXM1bXpkL3ZlajBRb2kxcjVBNlE9PQ%3D%3D--e2cb4f7d469e57199d2ff0bf2d229611a3a41fc0; path=/; secure; HttpOnly
X-Request-Id: ab98a47c-0800-4c2a-9ad2-cd2948d14ab5
X-Runtime: 0.085876
Strict-Transport-Security: max-age=15552000; includeSubDomains
Strict-Transport-Security: max-age=15768000
Content-Encoding: gzip
```

以上的内容就好像我们故事中的信一样，request 是发出去的信，response 是回复的信。

请求有请求的规矩，响应有响应的规矩，HTTP 就是请求与响应的规矩。

不遵循 HTTP 规矩的请求与响应就会处理报错。

不遵循规范的书信，emmmm，会被以为是假信扔掉，因为豪门子弟不会那么粗俗。

