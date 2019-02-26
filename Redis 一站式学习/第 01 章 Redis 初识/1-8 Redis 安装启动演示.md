```shell
wget http://download.redis.io/release/redis-3.0.7.tar.gz
tar -xzf redis-3.0.7.tar.gz
ln -s redis-3.0.7 redis
cd redis
make  // 编译
make install  // 安装
cd src | grep redis-  // 查看可执行文件
cd ..
redis-server

redis-cli -h 127.0.0.1 -p 6379
set hello world
get hello
ping
exit

redis-cli
del hello
get hello

redis-server --port 6380
redis-cli -p 6380
get hello 
set hello world
get hello
exit
ps -ef | grep redis-server
ps -ef | grep redis-server | grep -v grep
```

```shell
cd /opt/soft
cd redis
mkdir config
cp redis.conf config
cd config 
ll
mv redis.conf redis-6381.conf
vim redis-6381.conf
cat redis-6381.cof | grep -v "v" | grep -v "^$" > redis-6382.conf
```

```shell
daemonize yes
port 6382
dir "/opt/soft/redis/data"
logfile "6382.log"
```

```
cd .
mkdir data
redis-server config/redis-6382.conf
ps -ef | grep redis-server | grep 6382
cd data
ll
cat 6382.log

```

