# WWW 历史

## 1990 年

万维网（World Wide Web）出生的年份。

这一年 Tim Berners-Lee 发明了用网址就能访问网页的办法，他发明了第一个网页、第一个浏览器和第一个服务器。

## 1990 年之前

人类在 1950 年 ~ 1960 年就已经发明了互联网的雏形，不过那时只有科研机构、军方和政府能进入这个网络。

后来逐步扩大到所有人都能进入这个网络。

不过 1990 年之前，没有网页。

那么人们在电脑面前做啥呢？游戏和办公软件软件不需要联网，当时也没有浏览器，所以大家是怎么上网的？

当时我还没出生，所以也不太清楚，于是我查了一下[维基百科](https://en.wikipedia.org/wiki/History_of_the_Internet#Use_and_culture)。以下是我了解到的内容。

当时人们对互联网的使用主要集中在 Email。

- 1965 年，Email 被发明出来，成为互联网的「杀手级」应用，因为你可以瞬间发一封信给远方的人，不需要信纸、邮票和邮递员。
- 1971 年，用 @ 符号来表示 Email 的方法被发明出来。我挺好奇之前的邮箱地址是怎么表示的。
- 1979 年，邮件讨论组被发明出来，人们可以在一个话题下公开地互发邮件。
- 人们通过 FTP 来下载文件附件
- 1980 年至 1990 年间，人们迫切需要一种更好的上网方式，很多方案被提出，如 HTTP 和 Gopher。后面的事情大家都知道了，HTTP 因为其易用性胜出。
- 当时的邮件内容全都是普通文本，或者是类 Markdown 形式的文本，人们需要一种超级文本用来做页面跳转，也就是我们现在见到的 `<a>` 标签，不过那时的人还没想到这一点，当时的超集文本方案有很多，HTML 只是其中之一，而且当时的 HTML 也非常简陋，只有 11 个标签。

我在知乎上提了一个问题：[1990 年之前，人们是如何使用互联网的？](https://www.zhihu.com/question/66439119)

## WWW 的发明

在这种背景之下， Tim Berners-Lee（下文中称为李爵士） 在 1989 年至 1992 年间，发明了 WWW（World Wide Web），一种适用于全世界的网络。

主要包含三个概念

1. URI，俗称网址
2. HTTP，两个电脑之间传输内容的协议
3. HTML，超级文本，主要用来做页面跳转

URL 的作用是能让你访问一个页面，HTTP 的作用是让你能下载这个页面，HTML 的作用是让你能看懂这个页面。

这是一个简单而完美的系统。

李爵士除了发明了这些概念，还付诸了行动：

1. 发明了第一个服务器
2. 发明了第一个浏览器
3. 写出了第一个网页

以下是截图：



![第一个浏览器](https://video.jirengu.com/FhAxNCK1iPtdRMdW9sAN32wv-Bur)第一个浏览器





![第一张网页](https://video.jirengu.com/FlEmgfw66umKdWvJZLvpTBu_6hMX)第一张网页



2009 年李爵士在 TED 上有一个演讲：<https://www.ted.com/talks/tim_berners_lee_on_the_next_web> ，说出了他为什么发明 WWW。

2017 年，李爵士获得了图灵奖，我觉得这个奖实至名归。

- [万维网之父Tim Berners-Lee获图灵奖：奖金100万美元](http://www.sohu.com/a/132077489_465975)
- [如何评价 Tim Berners-Lee 于 2017 年获得图灵奖？](https://www.zhihu.com/question/58034118)

## URI 是什么

Google URI 维基百科 即可查看全称。**Uniform Resource Identifier**（统一资源标志符）

URI 分为 URL 和 URN，我们一般使用 URL 作为网址。

### URN

Google URN 维基百科 即可查看全称。**Uniform Resource Name**（统一资源名称）

ISBN: 9787115275790 就是一个 URN，通过 URN 你可以确定一个「唯一的」资源，ISBN: 9787115275790 对应的资源的是《JavaScript 高级程序设计（第三版）》这本书。你去是介绍任何一个图书馆、书店，他们都知道是这本书。

### URL

Google URL 维基百科 即可查看全称。**Uniform Resource Locator**（统一资源定位符）

<https://www.baidu.com/s?wd=hello&rsv_spt=1#5> 就是一个 URL，通过 URL 你可以确定一个「唯一的」地址（网址）。



![URL的常见组成](https://video.jirengu.com/FpsK0ulK4zdceaBQS2fiCpil8XrX)URL的常见组成



注意：图中并没有包括「端口」，端口将在下节课学习。

## DNS

Google DNS 维基百科即可查看全称。域名系统，Domain Name System

- 输入域名
- 输出 IP

```bash
nslookup baidu.com
ping baidu.com
```

`nslookup baidu.com` 会访问电信，解析目标地址的 IP，告诉你地址的服务员，就是 DNS，解析服务器。

