## Redis 安装

1. Redis 安装
2. 可执行文件说明
3. 三种启动方法
4. 简单的客户端连接



### Redis 安装

---

- wget http://download.redis.io/release/redis-3.0.7.tar.gz
- tar -xzf redis-3.0.7.tar.gz
- In -s redis-3.0.7 redis
- cd redis
- make&&make install



### Redis 可执行文件说明

---

| 文件名           | 说明               |
| ---------------- | ------------------ |
| redis-server     | Redis 服务器       |
| redis-cli        | Redis 命令行客户端 |
| redis-benchmark  | Redis 性能测试     |
| redis-check-aof  | AOF 文件修复工具   |
| redis-check-dump | RDB 文件检查工具   |
| redis-sentinel   | Sentinel 服务器    |



### 三种启动方法

---

- 最简启动
  - redis-server
- 动态参数启动
  - redis-server --port 6380
- 配置文件启动
  - redis-server configPath



### 验证

---

- `ps -ef | grep redis`
- `netstat -antpl | grep redis`
- `redis-cli -h ip -p port ping`



### 三种启动方式比较

---

- 生产环境建议选择配置启动（生产环境下会在一台机器上部署几个redis）
- 单机多实例配置文件可以用端口分开



### Redis 客户端连接

---

```
redis-cli -h 10.10.79.150 -p 6384
ping
set hello world
get hello
```



### Redis 客户端返回值

---

| 类型           | 输出             | 回复         |
| -------------- | ---------------- | ------------ |
| 状态回复       | ping             | pong         |
| 错误回复       | hget hello field | wrong        |
| 整数回复       | incr hello       | 1            |
| 字符串回复     | get hello        | world        |
| 多行字符串回复 | mget hello foo   | world lalala |





