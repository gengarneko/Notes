## PHP 操作 Redis



### PHP Redis 扩展安装

---

**安装环境要求:**

- 服务器环境：linux / CentOS release 6.8
- PHP（5.3） （phpize / php-config）
- PHP Redis 扩展 （wget  https://github.com/phpredis/phpredis/archive/develop.zip）

```
php -m  // 查看扩展
```

**具体安装步骤：**

- unzip develop.zip
  - 解压缩安装包
- phpize
  - 生成 configure 工具
- ./configure --with-php-config=/usr/bin/php-config
  - 使用工具进行编译
- Make/make install
  - 编译
- php.ini --extension=redis.so
  - 开启扩展
- 使用 `php -m` 来查看扩展



### PHP 操作 Redis

---

**说明：**

- 文档地址：https://github.com/phpredis/phpredis
- Redis 类的命名空间是根
- phpredis 的命令和参数基本和 redis.io 中的实际命令对应



**连接：**

```shell
pwd
mkdir code
cd code/
vim connect.php
```

```php
<?php

$redis = new \Redsi();  // 根目录下，进行实例化
$redis->connect('127.0.0.1', 7200);

?>
```

```
php connect.php  // 连接完成
```



### String 操作类

---

```shell
vim string.php
```

```php
<?php

$redis = new \Redis();

$redsi->connect('127.0.0.1', 7200);

// String 操作
// String 类型经常用在缓存 json 的结构上，
// 因为 json 序列化之后就是一个字符串，很容易把它存储
$redis->delete("string1");
$redis->set("string1", "value1");
$val = $redis->get("string1");
var_dump($val); // value1

$redis->set("string1", 4);
$redis->incr("string1", 2);
$val = $redis->get("string1");
var_dump($val);  // 6

```

```shell
php string.php
```



### List 操作类

---

list 我们经常用它来实现队列，队列有一个非常好的特点，先进先出。我们经常用队列来实现异步的行为，比如说下单，我们会告诉用户你已经下单成功，后台实际上在队列中插入一个待做事项，等实际的项目来获取待做事项并实际操作。

```shell
vim list.php
```

```php
<?php

$redis = new \Redis();
$redis->connect('127.0.0.1', 7200);

// list 操作
$redis->delete("list1");

$redis->lPush("list1", "A");
$redis->lPush("list1", "B");
$redis->lPush("list1", "C");

$val = $redis->rPop("list1");
var_dump($val);
```

```shell
php list.php  // A
```



### Set 操作类

---

```shell
vim set.php
```

```php
<?php

$redis = new \Redis();
$redis->connect('127.0.0.1', 7200);

// set 操作
$redis->delete("set1");

$redis->sAdd("set1", "A");
$redis->sAdd("set1", "B");
$redis->sAdd("set1", "C");
$redis->sAdd("set1", "C");

$val = $redis->sCard("set1");
var_dump($val);

$val = $redis->smember("set1");
var_dump($val);  // array

```

```shell
php set.php  
```



### Hash 操作类

---

存储的是 key-value 结构，我们经常用 hash 存储比较复杂的数据结构，比如一名司机，它有性别，姓名，年龄等属性。

```shell
vim hash.php
```

```php
<?php

$redis = new \Redis();
$redis->connect('127.0.0.1', 7200);

// set 操作
$redis->delete("driver");

$redis->hSet("driver", "name", "wang");
$redis->hSet("driver", "age", "40");
$redis->hSet("driver", "gender", "1");


$val = $redis->hGet("driver", "name");
var_dump($val);

$val = $redis->hMGet("driver", array("name", "gender", "age"));
var_dump($val);

```

```
php hash.php
```

![1541585901992](E:\笔记\Redis 的入门与 PHP\Redis 的 PHP 操作.assets\1541585901992.png)





### Sorted-Set 操作类

---

经常用于排行榜。

```shell
vim sort.php
```

```php
<?php

$redis = new \Redis();
$redis->connect('127.0.0.1', 7200);

// set 操作
$redis->delete("driver");

$redis->zAdd("zset1", 100, "wang"); // rank:2
$redis->zAdd("zset1", 90, "ming"); // rank:0
$redis->zAdd("zset1", 93, "king"); // rank:1

$val = $redis->zRange("zset1", 0, -1); // 从低到高
var_dump($val);

$val = $redis->zRevRange("zset1", 0, -1); // 从高到低
var_dump($val);

```

```
php sort.php
```

![1541605000131](G:\笔记\Redis 的入门与 PHP\Redis 的 PHP 操作.assets\1541605000131.png)





## 总结

- Redis 概念
- Redis 安装
- Redis 的五种数据类型
- PHP 的 redis 扩展安装
- PHP 操作 redis 的五种数据类型



























