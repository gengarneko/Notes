## Jedis 入门

前面我们使用了命令的方式来存入和获取方式，实际开发中我们肯定不会这么干的。

实际开发当中，我们通过程序对 redis 进行操作。



### Jedis 介绍

---

主流的开发语言就支持 redis 客户端的操作，通过它的官网获得相应客户端 Jedis （Java 客户端开发包）

新建 java 项目，建立工程，引入开发包，赋值到 lib，添加到构建路径，编写代码进行测试。

新建一个 java 类：

```java
public class JedisDemo {
    
	public void demo1() {
    	// 1.设置 IP 地址和端口
		Jedis jedis = new Jedis("192.168.32.130", 6379);
		// 2.保存数据
		jedis.set("name", "demo1");
		// 3.获取数据
		String value = jedis.get(“name”);
		Systerm.out.println(value);
		// 4.释放资源
		jedis.close();
	}
}
```

这时候报错，因为 6379 端口没有打开，我们进入 Linux 进行操作：

```
vim /etc/sysconfig/iptables
```

![1541472429412](E:\笔记\Redis 的入门与应用\5-1 04-Jedis 的入门.assets\1541472429412.png)

修改之后重启防火墙：

```
service iptables restart
```

这时候我们再来运行我们的程序，运行成功。



连接池方式：

```java
public void demo2() {
    // 获取连接池对象
    JedisPoolConfig config = new JedisPoolConfig();
    // 设置最大连接数
    config.setMaxTotal(30);
    // 设置最大空闲连接数
    config.setMaxIdle(10);
    
    // 获得连接池
    JedisPool jedisPool = new JedisPool(config, "192.168.30.132", 6379);
    
    // 获得核心对象
    Jedis jedis = null;
    try{
        // 通过连接池获得连接
        jedis = jedisPool.getResource();
        // 设置数据
        jedis.set("name", "Lucy");
        // 获得数据
        String value = jedis.get("name");
		Systerm.out.println(value);
    }catch(Exception e){
        e.printStackTrace();
    }finally{
       	// 释放资源
        if(jedis!=null){
            jedis.close();
        }
        if(jedisPool!=null){
            jedisPool.close();
        }
    }
}
```

