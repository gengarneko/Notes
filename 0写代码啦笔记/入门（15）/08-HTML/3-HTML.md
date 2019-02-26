# HTML

## 注意

1. 不需要把 HTML 学的很好，会用 div 和 span 就可以了。我们之后会在实践中反复学习标签。
2. 不要购买任何 HTML 相关书籍~

## 历史

1. HTML 的版本（W3C 组织制定规范）
   1. HTML 4.01
   2. XHTML
   3. HTML 5
   4. HTML 5.1
2. 规范文档（Specifications）
   1. 由 W3C 写文档（李爵士）
   2. W3C 根据浏览器的实际情况总结文档，并不是凭空想象
3. DOCTYPE
   1. 用来选择文档类型
   2. 除了 HTML 5 的 DOCTYPE，其他的都 TM 很难记：<https://www.w3.org/QA/2002/04/valid-dtd-list.html>
   3. 如果你没写 DOCTYPE，那你就惨了
4. html / head / body
5. 省略标签 head 、body（浏览器会自动补） 
6. 常见标签：a、form、input、button、h1、p、ul、ol、small、strong、div、span、kbd、video、audio、svg
   1. 基本上，你知道标签对应单词的意思，就知道这个标签怎么用了（语义化）
   2. 出了 div 和 span，其他标签都有默认样式
   3. MDN 上有所有标签的文档
7. 如何查看 MDN 文档
   1. Google：关键词 + MDN
   2. 切换成中文

本课视频中 HTML 代码如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>方方的个人简历</title>
    <style>
    </style>
  </head>
  <body>
    <div class="topNavBar">
      <img src="#" alt="logo"/>
      <nav>
        <ul>
          <li><a href="#">ABOUT</a></li>
          <li><a href="#">SKILLS</a></li>
          <li><a href="#">EXPERIENCE</a></li>
          <li><a href="#">PRICING</a></li>
          <li><a href="#">BLOG</a></li>
          <li><a href="#">CALENDAR</a></li>
          <li><a href="#">CONTACT</a></li>
          <li><a href="#">OTHER</a></li>
          <li><a href="#">ALL DEMOS</a></li>
        </ul>
      </nav>
    </div>
    <div class="banner" style="background-image: url(#)"></div>
    <main>
      <div class="card">
        <div class="picture">
          <img src="" alt="头像">
        </div>
        <div class="text">
          <div class="profile">
            <span class="welcome">Hello</span>
            <h1>方应杭</h1>
            <p>前端开发工程师</p>
            <hr>
            <dl>
              <dt>年龄</dt>
              <dd>18</dd>
              <dt>所在城市</dt>
              <dd>北京</dd>
              <dt>邮箱</dt>
              <dd>fangyinghang@foxmail.com</dd>
              <dt>手机</dt>
              <dd>13812345678</dd>
            </dl>
          </div>
          <footer class="media">
            <a href="#"><img src="#" alt="..."></a>
            <a href="#"><img src="#" alt="..."></a>
            <a href="#"><img src="#" alt="..."></a>
            <a href="#"><img src="#" alt="..."></a>
            <a href="#"><img src="#" alt="..."></a>
            <a href="#"><img src="#" alt="..."></a>
            <a href="#"><img src="#" alt="..."></a>
          </footer>
        </div>
      </div>

      <a class="button" href="#">下载 PDF 简历</a>

      <p>
        方应杭， 资深前端工程师，资深前端讲师，现在在 饥人谷 教前端课程。<br>
        技能：前端开发，Rails 开发，Node.js 开发
      </p>

    </main>
  </body>
</html>
```