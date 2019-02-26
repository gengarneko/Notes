# 部署到 GitHub Pages

步骤

1. 前提是你已经在 GitHub 上拥有一个仓库，这个仓库的根目录要有一个 index.html 文件。你可以把仓库取名为 resume 或者 cv，因为这是你的简历。

2. 进入仓库的 Settings

   ![图片](https://video.jirengu.com/Fn7t9xYyJsSpaxPkJ1SDxmWAtjzp)图片

3. 往下滚，滚到 GitHub Pages

   ![图片](https://video.jirengu.com/FtZnAldE1mTe5TLPUSNuL4dPFHXJ)图片

4. 在下拉列表中选到 master branch，然后点击 Save，就会得到一个预览地址，如上图红色的 3 指向的地址。

5. 复制这个地址，粘贴到地址栏，不要打回车。

6. 不要打回车。

7. 不要打回车。

8. 不要打回车。

9. 在地址后面输入 index.html，就可以预览 index.html 了。

10. 有人会发现即使不输入 index.html 也能访问 index.html，这是因为默认会访问 index.html，如果你的根目录还有另外一个 HTML 文件，比如 xxx.html，那你就必须添加 xxx.html 才能访问它了，所以我上面教的是一般方法，而不输入 index.html 就能访问 index.html 是一个特例。

注意这个方法只能用来预览 HTML，不能用来预览 Markdown、CSS、JS 等文件。

这是 GitHub 免费提供给我们的 HTTP 服务，非常好用。我们的 hexo 博客就是使用这种方式进行预览的。

不过 GitHub Pages 并不提供编程功能，也就是说你不能把上节课的 server.js 上传到 GitHub，指望能用 Node.js 来接受请求和发出响应，GitHub 没有提供这种功能。