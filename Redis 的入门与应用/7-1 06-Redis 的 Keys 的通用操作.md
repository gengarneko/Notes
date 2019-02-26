## Keys 的通用操作



### 演示

---

```
keys *  // 查看所有 key
keys my？  // 查看所有 my 开头的 key
del my1  // 删除指定 key
exists my1  // 布尔判断是否存在
rename my1 newmy1  // 重命名
expire my1 1000  // 设置过期时间，单位是 s
ttl my1  // 查看所剩时间，没设置返回 -1
type my1  // 获取数据类型
```

