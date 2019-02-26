### 什么是 Redis

---

**redis 是远程的**，有客户端和服务端两个部分，客户端和服务端部署在不同的机器上，它们之间通过 redis 自定义的协议进行传输和交互的，我们通常指的是 redis 服务端，只有在错误定位的时候才会说客户端出现了什么问题。

redis 是基于内存的，它的所有数据和结构都是存储在内存当中，所以 redis 所有的操作都非常高速，但是另一方面这也使得它吃内存。

redis 是非关系型数据库，mysql  存储之前必须定义好数据字典， redis 不需要。



### redis 的应用场景

---

**缓存，**介于 redis 的高性能，我们通常用 redis 做的事情是将它作为缓存，当我们的系统接口速度比较慢的时候，我们可以将某个接口的某些数据缓存起来，当下次请求的时候我们就不要去 mysql 数据库中进行数据操作，这是提升系统性能最常用的方法之一。

**队列，**提供了 pop 和 push 操作，redis 保证了 pop 和 push 是原子性的，基于这个结构和原子性，我们可以将 redis 当作队列来使用，push 插入，pop 弹出。

**数据存储，**我们可以将 redis 当作数据存储，增删改查可以在 redis 中进行操作，不再需要借用 mysql 来进行数据存储，我们可以这么做的基础是 redis 有完备的硬盘持久化机制，redis 提供两种同步化机制。



### Redis 安装

---

安装环境：

1. 服务器环境：linux/CentOS release 6.8
2. Redis 版本（2.8.13 官网下载）
3. 预装软件（gcc c语言编译器，tcl 是一门语言，redis 的一些测试组件是 tcl 编写的）

服务端安装使用：

1. `tar-xf redis-2.8.13.tar.gz` 解压得到 redis 源码
2. `make` 执行 redis 编译
3. `sudo make install`  把生成的二进制文件放到 `/usr/local/bin/` 目录下（需要 root 权限）
4. `./redis-server /etc/sentinel.conf --sentinel` 启动

客户端安装：

1. `redis-cli -h 127.0.0.1 -p 7200` 登录远端服务器
2. `info` 查看 redis-server 的当前状态



### Redis 数据类型

---

![1541577281040](E:\笔记\Redis 的入门与 PHP\Redis 的介绍与安装.assets\1541577281040.png)



#### String 类型

![1541579374928](E:\笔记\Redis 的入门与 PHP\Redis 的介绍与安装.assets\1541579374928.png)

#### List 类型

![1541579563078](E:\笔记\Redis 的入门与 PHP\Redis 的介绍与安装.assets\1541579563078.png)

#### Set 类型

![1541580826018](E:\笔记\Redis 的入门与 PHP\Redis 的介绍与安装.assets\1541580826018.png)

####  Hash 类型

![1541581220101](E:\笔记\Redis 的入门与 PHP\Redis 的介绍与安装.assets\1541581220101.png)

#### Sorted-Set 类型

![1541581728196](E:\笔记\Redis 的入门与 PHP\Redis 的介绍与安装.assets\1541581728196.png)

score 如果值一样的，那么就按照名称字母序排序。