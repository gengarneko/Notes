## Redis 数量控制器

```shell
redi-cli

exists mycounter  // 看计数器是否存在
set mycounter 99  // 初始化计数器为 99
get mycounter
incr mycounter  // 加 1 = 100
incrby mycounter 5  // 加 5 = 105
decrby mycounter 5  // 减 5 = 100

setnx mycounter  // 当 k 不存在时使用 set
expire mycounter 30  // 设置过期时间
ttl mycounter  // 查看寿命
```



##### 什么是 Redis 数量控制器？

- 是一个计数器
-  经过巧妙编程，可以达到数量控制的目的



##### 应用场景：

- 商品抢购
- 抽奖限量
- 抢红包



## 数量控制器 v1

![1542010790999](E:\笔记\Redis 计数器与数量控制\2-1 redis 数量控制器.assets\1542010790999.png)

并发场景：客户端 A、B 同时访问数量控制器

问题1：A 先执行 incrby，然后 B 执行 set ，数据不一致

问题2： 假定数量100，同时读到99，都执行 incrby，总量为 101



## 数量控制器 v2

![1542011045861](E:\笔记\Redis 计数器与数量控制\2-1 redis 数量控制器.assets\1542011045861.png)

改进1：初始化使用 setnx 取代 set

改进2：执行 incrby 后判断是否超限



## 源代码编写

```shell
vim index.php
```

```php
<?php

require_once('vendor/autoload.php');

use Predis\Client;

// 获取计数器名
function getKeyName($v)
{
    return "mycounter_" . $v;
}

function getRedisClient()
{
    return new Client([
        'host' => '127.0.0.1',
        'port' => '6379',
    ]);
}

// 记录中奖日志
function writeLog($msg, $v)
{
    $log = $msg . PHP_EOL;
    file_put_contents("log/$v.log", $log, FILE_APPEND);
}

function v1()
{
    $amountLimit = 100;
    $keyName = getKeyName('v1');
    $redis = getRedisClient();
    $incrAmount = 1;
    
    if (!$redis->exists($keyName)) {
        $redis->set($keyName, 95);
    }
    $currAmount = $redis->get($keyName);
    if ($currAmount + $incrAmount > $amountLimit) {
        writeLog("Bad luck", 'v1');
        return;
    }
    
    $redis->incrby($keyName, $incrAmount);
    writeLog("Good luck", 'v1');
}

function v2()
{
    $amountLimit = 100;
    $keyName = getKeyName('v1');
    $redis = getRedisClient();
    $incrAmount = 1;
    
    if (!$redis->exists($keyName)) {
        $redis->setnx($keyName, 95);
    }
    $currAmount = $redis->get($keyName);
    if ($redis->incrby($keyName, $incrAmount) > $amountLimit) {
        writeLog("Bad luck", 'v2');
        return;
    }
    
    writeLog("Good luck", 'v2');
}

```



## 并发测试

```shell
vim index.php
```

```

......

function v2()
{
    $amountLimit = 100;
    $keyName = getKeyName('v2');
    $redis = getRedisClient();
    $incrAmount = 1;
    
    if (!$redis->exists($keyName)) {
        $redis->setnx($keyName, 95);
    }
    $currAmount = $redis->get($keyName);
    if ($redis->incrby($keyName, $incrAmount) > $amountLimit) {
        writeLog("Bad luck", 'v2');
        return;
    }
    
    writeLog("Good luck", 'v2');
}

if ($_GET['v'] == 2) {
    v2();
} else {
    v1();
}
```

采用 `ab（apachebench）` 进行并发测试

```
ab  // 弹出帮助信息
ll log/
ab -c 100 -n 200 http://redis.limitation.test/  // 并发量100 执行200次 
less -N log/v1.log  // 期望有五个用户中奖， v1 未达到设计目标
ab -c 100 -n 200 http://redis.limitation.test/?v=2
less -N log/v2.log  // 达到设计目标
```





















