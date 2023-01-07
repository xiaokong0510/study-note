# 01-Redis入门及常用指令

课程链接：[黑马程序员Redis入门到实战教程](https://www.bilibili.com/video/BV1cr4y1671t)

内容包括：

1. Redis 基本特征、安装；
2. Redis 的常见数据结构
3. Redis 的常用指令

## NoSQL

- NoSQL 仅仅是一个概念，泛指**非关系型的数据库**，即`non-relational`，也有叫做"***Not Only SQL***"
- 区别于关系数据库，它们不保证关系数据的 ACID 特性
- 常见的 NoSQL 数据库有：`Redis`、`MemCache`、`MongoDB`等

NoSQL 与 SQL 的差异：

![image-20230107130356052](https://image.kongxiao.top/202301071306839.png)

## Redis 的特征

Redis 全称 `Remote Dictionary Server`，远程词典服务器，是一个基于内存的键值型 NoSQL 数据库。

特征：

- 键值（`key-value`）型，value 支持多种不同数据结构，功能丰富					
- 单线程，每个命令具备原子性
- 低延迟，速度快（**基于内存**、IO 多路复用、良好的编码）
- 支持数据持久化
- 支持主从集群、分片集群
- 支持多语言客户端

## Redis 的安装

docker 下安装 Redis 步骤：

```shell
# 拉取redis镜像
docker pull redis:6.2.6

# 创建conf文件夹，data文件夹用于挂载
mkdir -p /usr/local/redis/conf
mkdir -p /usr/local/redis/data
chmod -R 777 /usr/local/redis

## 下载redis配置文件
## 配置文件获取地址https://redis.io/docs/manual/config/
cd /usr/local/redis/conf
wget https://raw.githubusercontent.com/redis/redis/6.2/redis.conf
```

修改`redis.conf`文件中的一些配置

```sh
# 允许访问的地址，默认是127.0.0.1，会导致只能在本地访问。修改为0.0.0.0则可以在任意IP访问
# bind 0.0.0.0
# 保护模式，设置为yes，并且没有bind指令，没有设置密码，则只允许在本机的回环连接，其他机器无法连接
protected-mode no
# 可选，访问密码
requirepass 123456
```

创建容器并运行：

```sh
# 创建容器，设置端口映射，文件挂载
docker run --restart=always --name redis \
-p 6379:6379 \
-v /usr/local/redis/data:/data \
-v /usr/local/redis/conf:/usr/local/etc/redis \
-d redis:6.2.6 \
redis-server /usr/local/etc/redis/redis.conf  \
--appendonly yes

# 进入容器
docker exec -it 容器ID  redis-cli
```

Redis 其他常用配置：

```sh
# 监听的端口
port 6379
# 工作目录，默认是当前目录，也就是运行redis-server时的命令，日志、持久化等文件会保存在这个目录
dir .
# 数据库数量，设置为1，代表只使用1个库，默认有16个库，编号0~15
databases 1
# 设置redis能够使用的最大内存
maxmemory 512mb
# 日志文件，默认为空，不记录日志，可以指定日志文件名
logfile "redis.log"
```

## Redis 常见数据结构

Redis 是一个 key-value 的数据库，key 一般是 String 类型，value 的类型多种多样：

- String：字符串
- List：有序、可重复集合
- Hash：无序字典
- Set：无序、不可重复集合
- Sorted Set：有序、不可重复集合

![image-20220524205926164](https://image.kongxiao.top/202301052244162.png)

## Redis 常用指令

官网：[https://redis.io/](https://redis.io/) ，[http://www.redis.cn/](http://www.redis.cn/)

Redis 命令参考： [http://www.redis.cn/commands.html](http://www.redis.cn/commands.html) ，[http://doc.redisfans.com/](http://doc.redisfans.com/) 

### Key（键）

> key 的格式一般为 [项目名]:[业务名]:[类型]:[id]

**查找/扫描：**

- `KEYS pattern`  ：查找所有符合给定模式 pattern 的 key ：
  - KEYS * ：匹配数据库中所有 key 
  - KEYS h?llo ：匹配 hello ， hallo 和 hxllo 等
  - KEYS h*llo ：匹配 hllo 和 heeeeello 等
  - KEYS h[ae]llo ：匹配 hello 和 hallo ，但不匹配 hillo 

**检查/ 删除 /移动 key：**

- `EXISTS key`  ：若 key 存在返回 1 ，否则返回 0 ；
- `DEL key [key ...]` ：删除一个或多个 key，返回被删除 key 的数量，忽略不存在的 key ；
- `MOVE key db` ：移动到给定的数据库 db 当中，成功返回 1 ，失败则返回 0 ；
- `TYPE key`  ： 返回 key 所储存的值的类型
- `RENAME key newkey` ：改名，当  key 不存在时，返回一个错误；当 newkey 已经存在时，将覆盖旧值

**生存时间：**

- `TTL key`  ：  TTL, time to live，以 s 为单位
- `PTTL key` ：以 ms 为单位
  - 当 key 不存在时，返回 -2 ；
  - 当 key 存在但没有设置剩余生存时间时，返回 -1 ；
  - 否则，返回 key 的剩余生存时间
- `EXPIRE key seconds`  ： 设置生存时间，单位为 s，设置成功返回 1，
- `PEXPIRE key milliseconds`  ： 设置生存时间，单位为 ms
- `EXPIREAT key timestamp`  ： 设置生存时间，参数为 UNIX 时间戳
- `PEXPIREAT key milliseconds-timestamp`  ： 设置生存时间，以毫秒为单位的 UNIX 时间戳
- `PERSIST key timestamp`  ： 将给定 key 的生存时间设置为永久；成功则返回 1 ；如果 key 不存在或 key 没有设置生存时间，返回 0 

### String 

> String 类型，也就是字符串类型，是 Redis 中最简单的存储类型。

**基本操作：**

- `SET key value [EX seconds] [PX milliseconds] [NX|XX]`  ： 设置 key-value 类型的值，key 已经存在则覆写旧值并清除原有 TTL 。支持以下参数：
  - EX second ：设置键的过期时间为 second 秒。 `SET key value EX second` 效果等同于 `SETEX key second value` 
  - PX millisecond ：设置键的过期时间为 millisecond 毫秒。 SET key value PX millisecond 效果等同于 `PSETEX key millisecond value` 
  - NX ：只在键不存在时，才对键进行设置操作。 `SET key value NX` 效果等同于 `SETNX key value `
  - XX ：只在键已经存在时，才对键进行设置操作。
- `GET key`  ： 根据 key 获得对应的 value，如果 key 不存在那么返回特殊值 nil 
- `STRLEN key`  ： 返回 key 所储存的字符串值的长度 
- `SETEX key seconds value`  ： 设置 vaule 的同时指定 TTL，单位为 s
- `SETNX key value`  ：即 **SET if Not eXists**。  key 不存在时才设置，返回 1 ；key 已存在则返回 0

**批量设置：**

- `MSET key value [key value ...]`  ： 批量设置多个 key-value 对；是一个原子性操作
- `MGET key [key ...]`  ：返回所有(一个或多个)给定 key 的值

**计数器：**

- `INCR key` ： value 自增 1；如果 key 不存在，则先初始化为 0 ，然后再执行 INCR 操作
- `INCRBY key increment `  ：指定自增量为 increment
- `DECR  key` ： value 自减 1；如果 key 不存在，则先初始化为 0  ，然后再执行 DECR 操作
- `DECRBY key decrement ` ：指定自减量为 decrement 

### Hash

> Hash 类型，也叫散列，其 value 是一个无序字典，类似于Java 中的`HashMap`结构。

Hash 结构可以将对象中的每个字段独立存储，可以针对单个字段做 CRUD

<img src="https://image.kongxiao.top/202301052254423.png"/>

常用指令：

- `HSET key filed value [filed value ...]`：设置 key 中的域 field 的值设为 value
- `HGET key filed`：返回指定 key 中给定域 field 的值
- `HMGET key field [field ...]`：返回哈希表 key 中，一个或多个给定域的值
- `HLEN key`：返回指定 key 中域的数量
- `HGETALL key`：返回指定 key 所有的域和值
- `HEXISTS key filed`：查看指定 key、指定域 field 是否存在
- `HDEL key filed[field ...]`：删除指定 key 中，一个或多个给定的 field 
- `HKEYS key`：返回指定 key 中，所有的 field
- `HVALS key`：返回指定 key，所有的 field 的 value
- `HSETNX key field value`：当且仅当域 field 不存在时，将指定 key 中的域 field 的值设置为 value 
- `HINCRBY key field increment`：为指定 key 中的域 field 的值加上增量 increment 

### List

> Redis 中的 List 类型与 Java 中的 LinkedList 类似，可以看做是一个双向链表结构。既可以支持正向检索和也可以支持反向检索。

特征也与`LinkedList`类似：

- 有序
- 元素可以重复
- 插入和删除快
- 查询速度一般

常用来存储一个有序数据，例如：朋友圈点赞列表，评论列表等。常用指令：

- `RPUSH key value [value ...]` ：右边插入；返回执行 RPUSH 操作后，表的长度
- `LPOP key` ：移除并返回列表 key 最左边的元素
- `LPUSH key value [value ...]` ：左边插入；返回执行 LRPUSH 操作后，表的长度
- `RPOP key` ：移除并返回列表 key 最右边的元素
- `BLPOP key timeout`：阻塞版的 `LPOP `，在没有元素时等待指定时间
- `BRPOP key timeout`：阻塞版的 `BRPOP `，在没有元素时等待指定时间


![redis-list](https://image.kongxiao.top/20210922175322.png)

- `LLEN key`：返回列表 key 的长度，如果 key 不存在则返回 0，如果 key 不是列表类型，返回一个错误
- `LRANGE key start stop` ：返回列表 key 中指定区间内的元素，-1 表示倒数第一
- `LINDEX key index` ：返回列表 key 中，下标为 index 的元素
- `LINSERT key BEFORE|AFTER pivot value` ：将值 value 插入到列表 key 中，位于值 pivot 之前或之后。
  - 当 pivot 不存在于列表 key 时，不执行任何操作；
  - 当 key 不存在时， key 被视为空列表，不执行任何操作；
  - 如果 key 不是列表类型，返回一个错误；
  - 如果命令执行成功，返回插入操作完成之后，列表的长度；
  - 如果没有找到 pivot ，返回 -1 ；
  - 如果 key 不存在或为空列表，返回 0
- `LREM key count value`：移除列表中与参数 value 相等的元素。返回被移除元素的数量：
  - count > 0 : 从表头开始向表尾搜索，移除与 value 相等的元素，数量为 count ；
  - count < 0 : 从表尾开始向表头搜索，移除与 value 相等的元素，数量为 count 的绝对值；
  - count = 0 : 移除表中所有与 value 相等的值

### Set

> Redis 的 Set 结构与 Java 中的 HashSet 类似，可以看做是一个 value 为 null 的 HashMap，具备与 HashSet 类似的特征

- 无序
- 元素不可重复
- 查找快
- 支持交集、并集、差集等功能

**常用命令：**

- `SADD key member [member ...]` ：添加元素
- `SMEMBERS key`：查看所有元素
- `SISMEMBER key member`：判断 member 元素是否是集合 key 的成员
- `SCARD key`：查看元素个数
- `SREM key member [member ...]`：移除集合 key 中一个或多个 member ，不存在的 member 会被忽略
- `SPOP key`：移除并返回集合中的一个随机元素
- `SMOVE source destination member`：将 member 元素从 source 集合移动到 destination 集合

**数学集合类：**

- `SDIFF key [key ...]`：返回所有给定集合之间的差集
- `SINNER key [key ...]`：返回所有给定集合之间的交集
- `SUNION key [key ...]`：返回所有给定集合之间的并集
- `SDIFFSTORE destination  key [key ...]`：返回所有给定集合之间的差集，将结果保存到 destination 
- `SINNERSTORE destination key [key ...]`：返回所有给定集合之间的交集，将结果保存到 destination 
- `SUNIONSTORE destination key [key ...]`：返回所有给定集合之间的并集，将结果保存到 destination 

交集、差集、并集图示：

![image-20220525112632214](https://image.kongxiao.top/202301052259705.png)

### ZSet（Sorted Set）

> Redis 的 SortedSet 是一个可排序的 set 集合，SortedSet 中的每一个元素都带有一个 score 属性，可以基于score 属性对元素排序，底层的实现是一个跳表（SkipList）加 hash表。

在 Set 基础上，加上一个 scroe 值，SortedSet 具备下列特性：

- 可排序
- 元素不重复
- 查询速度快

因为 SortedSe的可排序特性，经常被用来实现排行榜这样的功能。

常见命令：

- `ZADD key score member [[score member] [score member] ...]`：添加元素，指定 score 值
- `ZRANGE key start stop [WITHSCORES]`：返回指定区间内的成员，按 score 值递增排序
- `ZREVRANGE key start stop [WITHSCORES]`：同上，逆序
- `ZRANGEBYSCORE key min max [WITHSCORES] `：返回指定 score 区间内的成员，按 score 值递增排序
- `ZREVRANGEBYSCORE key min max [WITHSCORES]`：同上，逆序
- `ZSCORE key member`：返回有序集 key 中，成员 member 的 score 值
- `ZRANK key member`：返回有序集 key 中成员 member 的排名
- `ZCARD key`：查看元素个数
- `ZCOUNT key min max`：返回 score 在 min 和 max 之间的成员数量
- `ZREM key member [member ...]`：移除有序集 key 中的一个或多个成员