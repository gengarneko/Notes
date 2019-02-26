## Redis 的安装



### 搭建环境

---

- 虚拟机：VMware 10.0.2
- Linux 系统：CentOS-6.5
- SSH 客户端：SecureCRT7.3 



### CentOS 安装 Redis

---

redis 是 c 语言开发，安装 redis 需要先将官网下载的源码进行编译，编译依赖 gcc 环境。如果没有请安装。



**1.安装 gcc 环境**

```shell
yum install gcc-c++
```



**2.windows 上面解压的文件上传到 Linux**

通过 FileZila 将压缩文件上传

![1541470060585](E:\笔记\Redis 的入门与应用\4-1 03-Redis 的安装.assets\1541470060585.png)

redis可以看到已经到服务器上了，将它进行解压：

```shell
tar -zxvf redis-3.0.7.tar.gz
```



**3.进入到 redis 路径对其进行编译：**

```
cd redis-3.0.7
make 
```



**4.安装：**

```shell
make PREFIX=/usr/local/redis install
```

![1541470367330](E:\笔记\Redis 的入门与应用\4-1 03-Redis 的安装.assets\1541470367330.png)

```
cd /usr/local/redis/bin
```

其中有一些可执行的文件。

下面进入编译的路径下：

```shell
cd ~
cd redis-3.0.7
```

我们看到一个文件 `redis.conf`，对这个文件进行拷贝：

```
cp redis.conf /usr/local/redis
cd /usr/local/redis
ll
```

到此安装完毕！



**5.启动 redis：**

就是运行 /bin 中的 redis-server

```
./redis-server
```

这种启动属于前端启动，启动起来了，但是当前窗口无法输入其他命令。

这就需要后端启动方式：

修改配置文件：

```
vim redis.conf
```

![1541470773341](E:\笔记\Redis 的入门与应用\4-1 03-Redis 的安装.assets\1541470773341.png)

改成 yes

这时候我们再来启动 redis：

```shell
./bin/redis-server ./redis.conf
```

这时候我们再来检测 redis 是否启动：

```shell
ps -ef | grep -i redis
```

默认端口 6379。



**6.关闭 Redis：**

继续进入到 .bin 路径：

```shell
./bin/redis-cli shutdown
```

我们再来检测 redis 是否启动，这时候已经找不到 redis 服务。



**7.简单使用：**

 启动 redis：

```
./bin/redis-server ./redis.conf
./bin/redis-cli
```

当我们输入 `ping` 返回 `PONG ` 说明我们的连接没有问题了。

现在我们可以向 redis 当中存入数据了：

```
set name test
get name       // 获取 name
del name       // 删除 name
keys *         // 查到所有的 key
```

