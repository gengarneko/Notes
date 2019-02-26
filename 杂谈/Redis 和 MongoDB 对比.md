## Redis和Mongodb应用场景研究

> 现在的分布式项目基本都会用到 redis 和 mongodb，可是 redis 和 mongodb 到底有什么不同呢，下面将会具体介绍一下各自的应用场景。

##### 首先我们有两种应用场景：

- 要求TPS（TransactionPerSecond）特别高的，比如我们项目有一个点赞的功能，触发频率很高但是数据量很小，这种情况我们采用 ==redis== 。
- 项目中涉及评论内容，而且这个评论表的数据后期非常大（海量数据），最后在数据量非常大的情况下还要求比较复杂的查询。基于上述这些情况，我们采用 ==mongodb== 作为评论表存储数据库。

> 应用升级：下面给大家介绍一下我们项目中关于 redis 和 mongodb 深入的应用，我们接着上面的场景继续深入下去，例如：

##### 两个场景：

- **场景一：**上面提到的点赞这个行为，因为我们项目对点赞这个数据的安全性要求特别高，而且取消点赞的过程中会涉及其他关联操作，而且必须保证线程是安全的，最重要的是我们需要 redis 高可用性，不能轻易挂掉。这个时候我们就用到了 redis 中 ==数据持久化== 和 ==分布锁== 的内容了，通过 redis 数据持久化，我们可以将缓存的数据保存到本地中来，利用 redis 分布式锁，我们可以控制取消点赞数据安全问题。关于高可用性的话，我们可以采用 redis 集群来实现， redis 集群我们采用 rediscluster 来实现，这样我们就可以实现点赞这种场景的所有要求了。
- **场景二：**刚开始评论表可能数据不是很大，可是随着时间的增长，评论表的数据会越来越大，但是我们查询的时间要控制在一段时间内，不能太久才搜索到相关的评论内容。最后也是同样的要求，评论查询的高可用性。基于这种场景我们可以采用 mongodb 中的分片 来实现，通过 mongodb 的分片机制，我们可以将海量的数据查询分别负载到不同的分片服务器上，最后将数据查询的数据结果整合到一起。基于这种情况，不管数据量有多大，我们都可以实现快速的查询功能，查询时间约等于（数据量/分数量）。分片其实本身就是一种高可用性的方案，因为每一个分片都保留着完整的一份数据，每次插入数据的时候，先插入一个主分片中，然后同步复制到所有从分片中，即使一个分片挂了，其余分片也能自动升级为主分片，继续工作。

##### 疑问点：

​	既然每个分片一样，那么查询时间不是也一样嘛？这个需要仔细研究一下mongodb 分片机制，它的查询			范围是不一样的。







### 从以下几个维度，对 redis、memcache、mongoDB 做了对比。

---

#### 1、性能

都比较高，性能对我们来说应该都不是瓶颈。

总体来讲，TPS 方面 redis 和 memcache 差不多，要大于 mongodb。

#### 2、操作的便利性

memcache：数据结构单一。（key-value）

redis：丰富一些，数据操作方面，redis 更好一些，较少的网络 IO 次数，同时还提供 list，set，hash 等数据结构的存储。

mongodb：支持丰富的数据表达，索引，最类似关系型数据库，支持的查询语言非常丰富。

#### 3、内存空间的大小和数据量的大小

redis：在 2.0 版本后增加了自己的 VM 特性，突破物理内存的限制；可以对 key value 设置过期时间（类似 memcache）

memcache：可以修改最大可用内存,采用 LRU 算法。

Memcached 代理软件 magent，比如建立10 台 4G 的 Memcache 集群，就相当于有了 40G。 

`magent -s 10.1.2.1 -s 10.1.2.2:11211 -b 10.1.2.3:14000` 

mongoDB：适合大数据量的存储，依赖操作系统 VM 做内存管理，吃内存也比较厉害，服务不要和别的服务在一起。

#### 4、可用性（单点问题）

对于单点问题：

redis：依赖客户端来实现分布式读写；主从复制时，每次从节点重新连接主节点都要依赖整个快照,无增量复制，因性能和效率问题，所以单点问题比较复杂；不支持自动 sharding,需要依赖程序设定一致 hash 机制。

一种替代方案是，不用 redis 本身的复制机制，采用自己做主动复制（多份存储），或者改成增量复制的方式（需要自己实现），一致性问题和性能的权衡

Memcache：本身没有数据冗余机制，也没必要；对于故障预防，采用依赖成熟的 hash 或者环状的算法，解决单点故障引起的抖动问题。

mongoDB：支持 master-slave,replicaset（内部采用 paxos 选举算法，自动故障恢复）,auto sharding 机制，对客户端屏蔽了故障转移和切分机制。

#### 5、可靠性（持久化）

对于数据持久化和数据恢复，

redis：支持（快照、AOF）：依赖快照进行持久化，aof 增强了可靠性的同时，对性能有所影响

memcache：不支持，通常用在做缓存,提升性能；

MongoDB：从 1.8 版本开始采用 binlog 方式支持持久化的可靠性

#### 6、数据一致性（事务支持）

Memcache：在并发场景下，用 cas 保证一致性

redis：事务支持比较弱，只能保证事务中的每个操作连续执行

mongoDB：不支持事务

#### 7、数据分析

mongoDB 内置了数据分析的功能(mapreduce),其他不支持

#### 8、应用场景

redis：数据量较小的更新操作和运算上

memcache：用于在动态系统中减少数据库负载，提升性能;做缓存，提高性能（适合读多写少，对于数据量比较大，可以采用 sharding）

MongoDB：主要解决海量数据的访问效率问题。



表格比较：

|              | Memcache                                       | Redis                             |
| ------------ | ---------------------------------------------- | --------------------------------- |
| 类型         | 内存数据库                                     | 内存数据库                        |
| 数据类型     | 在定义 value 时就要固定数据类型 不需要有字符串 | 链表，集合和有序集合              |
| 虚拟内存     | 不支持                                         | 支持                              |
| 过期策略     | 支持                                           | 支持                              |
| 分布式       | magent master-slav                             | 一主一从或一主多从                |
| 存储数据安全 | 不支持                                         | 使用 save 存储到 dump.rdb 中      |
| 灾难恢复     | 不支持                                         | append only file(aof)用于数据恢复 |



### 性能

1. 类型——memcache 和 redis 都是将数据存放在内存，所以是内存数据库。当然，memcache 也可用于缓存其他东西，例如图片等等。

2.  数据类型——Memcache 在添加数据时就要指定数据的字节长度,而 redis 不需要。

3.  虚拟内存——当物理内存用完时，可以将一些很久没用到的 value 交换到磁盘。

4. 过期策略——memcache 在 set 时就指定，例如 set key1 0 0 8,即永不过期。Redis 可以通过例如 expire 设定，例如 expire name 10。

5. 分布式——设定 memcache 集群，利用 magent 做一主多从;redis 可以做一主多从。都可以一主一从。

6. 存储数据安全——memcache 断电就断了，数据没了；redis 可以定期 save 到磁盘。

7. 灾难恢复——memcache 同上，redis 丢了后可以通过 aof 恢复。



   Memecache 端口 11211

   yum -y install memcached

   yum -y install php-pecl-memcache

   /etc/init.d/memcached start memcached -d -p 11211 -u memcached -m 64 -c 1024 -P /var/run/memcached/memcached.pid

   -d 启动一个守护进程

   -p 端口

   -m 分配的内存是 M

   -c 最大运行并发数-P memcache 的 pid

   //0 压缩（是否 MEMCACHE_COMPRESSED） 30 秒失效时间

   //delete 5 是 timeout <?php

   $memcache = new Memcache; $memcache -> connect('127.0.0.1', 11211); $memcache -> set('name','yang',0,30);

   if(!$memcache->add('name','susan',0, 30)) {

   //echo 'susan is exist'; }$memcache -> replace('name', 'lion', 0, 300); echo $memcache -> get('name');

   //$memcache -> delete('name', 5);

   printf "stats\r\n" | nc 127.0.0.1 11211

   telnet localhost 11211 stats quit 退出

   Redis 的配置文件 端口 6379

   /etc/redis.conf 启动 Redis

   redis-server /etc/redis.conf 插入一个值

   redis-cli set test "phper.yang" 获取键值

   redis-cli get test 关闭 Redis

   redis-cli shutdown 关闭所有

   redis-cli -p 6379 shutdown <?php

   $redis=new

   Redis(); $redis->connect('127.0.0.1',6379); $redis->set('test',

   'Hello World'); echo $redis->get('test'); Mongodb

   apt-get install mongo mongo 可以进入 shell 命令行

   pecl install mongo Mongodb 类似 phpmyadmin 操作平台 RockMongo





## Redis、MongoDB的使用场景与常见的数据结构



### String

```
1、String  
常用命令：  
除了get、set、incr、decr mget等操作外，Redis还提供了下面一些操作：  
获取字符串长度  
往字符串append内容  
设置和获取字符串的某一段内容  
设置及获取字符串的某一位（bit）  
批量设置一系列字符串的内容  
  
应用场景：  
String是最常用的一种数据类型，普通的key/value存储都可以归为此类，value其实不仅是String，  
也可以是数字：比如想知道什么时候封锁一个IP地址(访问超过几次)。INCRBY命令让这些变得很容易，通过原子递增保持计数。  
  
实现方式：  
m,decr等操作时会转成数值型进行计算，此时redisObject的encoding字段为int。  
--------------------- 
作者：tigerhu256 
来源：CSDN 
原文：https://blog.csdn.net/tigerhu256/article/details/78892476 
版权声明：本文为博主原创文章，转载请附上博文链接！
```

### Hash

```
常用命令：  
hget,hset,hgetall 等。  
应用场景：  
我们简单举个实例来描述下Hash的应用场景，比如我们要存储一个用户信息对象数据，包含以下信息：  
           用户ID，为查找的key，  
           存储的value用户对象包含姓名name，年龄age，生日birthday 等信息，  
   如果用普通的key/value结构来存储，主要有以下2种存储方式：  
       第一种方式将用户ID作为查找key,把其他信息封装成一个对象以序列化的方式存储，  
           如：set u001 "李三,18,20010101"  
           这种方式的缺点是，增加了序列化/反序列化的开销，并且在需要修改其中一项信息时，需要把整个对象取回，并且修改操作需要对并发进行保护，引入CAS等复杂问题。  
       第二种方法是这个用户信息对象有多少成员就存成多少个key-value对儿，用用户ID+对应属性的名称作为唯一标识来取得对应属性的值，  
           如：mset user:001:name "李三 "user:001:age18 user:001:birthday "20010101"  
           虽然省去了序列化开销和并发问题，但是用户ID为重复存储，如果存在大量这样的数据，内存浪费还是非常可观的。  
    那么Redis提供的Hash很好的解决了这个问题，Redis的Hash实际是内部存储的Value为一个HashMap，  
    并提供了直接存取这个Map成员的接口，  
        如：hmset user:001 name "李三" age 18 birthday "20010101"     
            也就是说，Key仍然是用户ID,value是一个Map，这个Map的key是成员的属性名，value是属性值，  
            这样对数据的修改和存取都可以直接通过其内部Map的Key(Redis里称内部Map的key为field), 也就是通过   
            key(用户ID) + field(属性标签) 操作对应属性数据了，既不需要重复存储数据，也不会带来序列化和并发修改控制的问题。很好的解决了问题。  
  
          这里同时需要注意，Redis提供了接口(hgetall)可以直接取到全部的属性数据,但是如果内部Map的成员很多，那么涉及到遍历整个内部Map的操作，由于Redis单线程模型的缘故，这个遍历操作可能会比较耗时，而另其它客户端的请求完全不响应，这点需要格外注意。  
  实现方式：  
    上面已经说到Redis Hash对应Value内部实际就是一个HashMap，实际这里会有2种不同实现，这个Hash的成员比较少时Redis为了节省内存会采用类似一维数组的方式来紧凑存储，而不会采用真正的HashMap结构，对应的value redisObject的encoding为zipmap,当成员数量增大时会自动转成真正的HashMap,此时encoding为ht。  
--------------------- 
作者：tigerhu256 
来源：CSDN 
原文：https://blog.csdn.net/tigerhu256/article/details/78892476 
版权声明：本文为博主原创文章，转载请附上博文链接！
```

