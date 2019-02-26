## Redis 的数据结构



### 五种数据类型：

- 字符串（String）
- 字符串集合（set）
- 字符串列表（list）
- 有序字符串集合（sorted set）
- 哈希（hash）

常用的是字符串和哈希。



### Key 定义的注意点

- 不要过长
- 不要过短
- 统一的命名规范



### 存储 String

---

**字符串类型是 redis 中最为基础的数据存储类型：**

- 二进制安全的，存入和获取的数据相同
- Value 最多可以容纳的数据长度是 512 M

**存储 String 常用命令：**

- 赋值
- 取值
- 删除
- 扩展命令
- 数值增减

```shell
./bin/redis-cli  // 连接客户端
set company alibaba  // 赋值
get company  // 取值
getset company jingdong // 获取值后设置为 jingdong
del company  // 删除
incr num  // 指定值递增1，若不存在则设置为0然后+1，非整型则失败返回错误
decr num  // 指定值递减1，若不存在则设置为0然后-1，非整型则失败返回错误
incrby num 5  // 将指定键值根据key多的value增加一级，+3等
decrby num 3  // 不解释
append num 5  // 拼凑字符串，key存在则在value后面追加值，若不存在，创建为新的key，返回的是字符串长度
```



### 存储 Hash

---

- String Key 和 String Value 的 map 容器
- 每一个 Hash 可以存储 4294967295 个键值对

**存储 Hash 常用命令：**

- 赋值
- 删除
- 自学命令
- 取值
- 增加数字

```
hset myhash username jack  // 单个赋值
hset myhash age 18
hmset myhash2 username rose age 21  // 多个赋值
hget myhash username  // 单个取值
hmget myhash username age  // 多个取值
hgetall myhash  // 获取所有键值对
hdel myhash2 username age  // 删除多个属性
del myhash2  // 删除整张表
hincrby myhash age 5  // 指定键值 +5
hexists myhash username  // 布尔判断
hlen myhash  // 获得键值对个数
hkeys myhash  // 获得所有键名
hvals myhash  // 获得所有值
```



### 存储 List

---

按照插入顺序排序的链表，在头部，尾部添加新的元素，插入的时候不存在就会创建新的链表，如果链表没有值了就会自动销毁。

元素插入链表中间效率会很低（废话）

- ArrayList 使用数组方式：根据索引查询速度很快，新增和删除涉及位移所以较慢。
- LinkedList 使用双向链表方式：每个元素记录前后指针，插入删除数据只是改变了指针指向，速度快。
  - 双向链表增加数据
  - 双向链表删除数据

**存储 list 常用命令：**

- 两端添加
- 查看列表
- 两端弹出
- 获取列表元素个数
- 扩展命令

```
lpush mylist a b c  // 向头部放入三个元素
rpush mylist a b c  // 向尾部放入三个元素
lrange mylist 0 5   // 查看头部开始6个元素
lrange mylist 0 -1  // 查看从头到尾所有元素
lpop mylist  // 弹出头部元素
rpop mylist  // 弹出尾部元素
llen mylist  // 查看列表元素个数
lpushx mylist x  // 仅当我们指定的链表存在的时候，向头部插入具体值，若不存在则不插入
rpushx mylist y
lrem mylist 2 3  // 从头到尾删除2个3
lrem mylist -2 1 // 从尾到头删除2个1
lrem mylist 0 2  // 删除所有2
lset mylist 3 mmm  // 修改指定元素
linsert mylist before b 11  // 在b之前插入11
rpoplpush mylist1 mylist2  // 从一个列表的尾部弹出元素插入另一个元素的头部
```

经常用于消息队列，完成多程序之间消息交互。假设某程序正在执行lpush向链表中添加新元素（生产者），另一程序执行rpop从链表中获取元素（消费者）消费者程序取出元素后立刻奔溃，那么我们认为消息丢失，可能会对业务造成影响，但是通过 `rpoplpush` 命令消费者程序从主队列取出元素插入到备份队列知道消费者程序完成，再从备份队列中将数据删除，我们就可以提供一个守护的线程，当我们发现备份队列中消息过期，可以重新放回主队列当中。

![1541476824220](E:\笔记\Redis 的入门与应用\6-1 05-Redis 的数据结构之字符串.assets\1541476824220.png)





### 存储 Set

---

- 和 List 类型不同的是，Set 集合中不允许出现重复的元素
- Set 可包含的最大元素数是 4294867295

**存储 set 常用命令：**

- 添加/删除元素
- 获得集合中的元素
- 集合中的差集运算
- 集合中的交集运算
- 集合中的并集运算
- 扩展命令

```shell 
sadd myset a b c  // 添加3个元素
sadd myset a  // 无效
srem myset 1 2  // 删除元素
smembers myset  // 获得元素
sismember myset a  // 集合中是否有元素
sdiff myset1 myset2  // 差集运算
sinter myset1 myset2  // 交集运算
sunion myset1 myset2  // 并集运算
scard myset  // 获得 set 元素数量
srandmember myset  // 随机获取元素
sdiffstore my1 my2 my3  // 将 2 3 的差集存储到 1 中去
sinterstore my1 my2 my3  // 将 2 3 的交集存储到 1 中去
sunion my1 my2 my3  // 将 2 3 的并集存储到 1 中去
```

**应用场景:**

- **跟踪一些唯一性数据**

访问某一博客的唯一 ip 信息，对于这种场景我们仅需要在每次访问该博客将访问 ip 存入 redis，set 数据类型会自动保证 ip 地址的唯一性。

- **用于维护数据独享之间的关联关系**（充分利用服务器端聚合操作方便高效的特性）

购买某个电子设备的客户id存入到指定set1，购买另一个电子设备的客户id存入到另一个指定set，这时候使用交集操作就可以得到购买这两种





### 存储 Sorted-Set

---

与 set 及其相似，都是字符串的集合，都不允许重复成员出现在同一 set

- Sorted-Set 和 Set 的区别
- Sorted-Set 中的成员在集合中的位置是有序的

Sorted-Set 中每一个成员都有一个分数与之关联，redis 通过分数为集合成员进行从小到大排序（成员唯一，分数可以重复），添加、删除、更新成员都是极为迅速的。事件复杂度为成员个数的对数，成员位置是有序的，所以访问中间元素也是很快速的，这一特征在其他类型数据库中是很难实现的。



**主要应用场景：**

- 游戏排名
- 微博热点话题



**常用命令：**

- 添加元素
- 获得元素
- 删除元素
- 范围查询
- 扩展命令

```
zadd mysort 70 Lucy 60 Lily 90 Jack  // 添加元素
zadd mysort 100 Lucy  // 新的分数替换旧的分数
zscore mysort Lily  // 获得指定元素的分数
zcard mysort  // 获得成员数量
zrem mysort Lily  // 删除指定元素
zrank mysort Lily  // 获得元素排名
zrange mysort 0 -1  // 范围查找所有成员
zrange mysort 0 -1 withscores  // 范围查找所有成员和对应的分数
zrevrange mysort 0 -1 withscores  // 逆序输出
zremrangebyrank mysort 0 4  // 按照范围删除成员
zremrangebyscore mysort 80 100  // 按照分数范围删除成员
zrangebyscore mysort 0 100  // 按照分数范围查找
zrangebyscore mysort 0 100 withsores limit 0 2  // 只显示两 2 个
zincrby mysort 3 Lucy  // 设置指定成员增加分数
zscore mysort Lucy  // 获取指定成员分数发现 +3
zcount mysort 80 90  // 获取分数在区间内的成员个数
```

使用场景：

- **大型在线游戏积分排行榜：**分数发生变化，执行 zadd 进行更新，用 zrange 获取积分 
- **构建索引数据**