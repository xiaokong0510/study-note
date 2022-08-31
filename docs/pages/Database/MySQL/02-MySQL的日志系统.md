# 02-MySQL 的日志系统

MySQL 实战 45 讲02 | 日志系统：一条SQL更新语句是如何执行的？

总结 MySQL 的日志系统，并扩展了部分知识点，包含以下内容：

- MySQL 的日志系统
  - redo log（重做日志）
  - undo log（回滚日志）
  - binlog（归档日志）
- update 语句执行流程
- 两阶段提交

参考文档：[MySQL 事务日志](https://www.cxyxiaowu.com/10740.html)

## redo log

redo log 是 InnoDB 引擎层的日志，记录什么时间对某一页进行了怎么样的修改，是**物理日志**。

> 举个例子：酒店掌柜记账，有一个粉板专门记录赊账记录，还有一个专门记录赊账的账本。记账方式：
>
> - 直接把账本翻出来，把这次赊的账加上去或者扣除掉；**随机 IO**
> - 先在粉板上记下这次的账，等打烊以后再把账本翻出来核算。**顺序 IO ，提交来批量更新**

同样，在 MySQL 中，如果每一次的更新操作都需要写进磁盘，然后磁盘也要找到对应的那条记录，然后再更新，整个过程 IO 成本、查找成本都很高。为了解决这个问题，MySQL 的设计者就用了类似酒店掌柜粉板的思路来提升更新效率。

### WAL

**预写式技术（Write Ahead logging，WAL）**：先写日志，再写磁盘。

当有一条记录需要更新的时候，先将更新记录写入 redo log 日志，并更新内存，这个时候更新就算完成了；然后会在系统空闲的时候或者是按照设定的更新策略再将这个操作记录更新到磁盘之中。

这样可以大大减少 IO 操作的频率，提升数据刷新的效率。

### 脏数据刷盘

几个概念：

- 脏数据：内存中未刷到磁盘的数据
- 脏页：内存数据页跟磁盘数据页内容不一致
- 干净页：内存数据写入磁盘后，内存和磁盘上的数据页内容一致
- 刷脏页（**flush**）：MySQL 从内存更新到磁盘的过程

redo log 是固定大小的，为了能够持续不断的对更新记录进行写入，在 redo log 日志中设置了两个标志位置：

- checkpoint：记录擦除的位置，是往后推移并且循环的，擦除记录前要把记录更新到数据文件
-  write_pos：当前记录的位置，一边写一边后移，如下图中写到第 3 号文件末尾后就回到 0 号文件开头

当 write_pos 追上 checkpoint 时，表示 redo log 日志已经写满，这时不能继续执行新的数据库更新语句，需要停下来先删除一些记录，执行 checkpoint 规则腾出可写空间。

> **checkpoint 规则**：checkpoint  触发后，将 buffer 中脏数据页和脏日志页都刷到磁盘。

<img src="http://image.kongxiao.top/20220829222312.png" alt="image-20220829222303385" style="zoom:50%;" />

如果 MySQL 宕机，重启时可以读取 redo log中的数据，对数据库进行恢复，从而保证了事务的持久性，使得数据库获得 **crash-safe** 能力。

### 脏日志刷盘

redo log 日志在记录时，为了保证日志文件的持久化，也需要经历将日志记录从内存写入到磁盘的过程，即存在易失性内存中的缓存日志 redo log buff ，到保存在磁盘上的 redo log 日志文件 redo log file。

为了确保每次记录都能够写入到磁盘中的日志中，每次将 redo log buffer  中的日志写入 redo log file的过程中都会调用一次操作系统的 fsync 操作。在写入的过程中，需要经过操作系统内核空间的 os buffer。

>**fsync函数**：包含在UNIX系统头文件#include <unistd.h>中，用于同步内存中所有已修改的文件数据到储存设备。

InnoDB 提供了 `innodb_flush_log_at_trx_commit` 参数，有以下三种将 redo log buffer 写入 redo log file 的时机：

- 0：每秒把 log buffer 写入 os buffer 并调用 fsync() 写入到 redo log file；当系统崩溃，会丢失 1 秒钟的数据；
- 1：事务每次提交都会将 redo log buffer 中的日志写入 os buffer 并调用 fsync() 刷到 redo log file 中；为系统默认
- 2：每次提交都仅写入到 os buffer ，然后是每秒调用 fsync() 将 os buffer 中的日志写入到 redo log file

## binlog

binlog 是 Server 层自己的日志，记录的是 SQL 语句的原始逻辑，是**逻辑日志**。


为什么要有两份日志？

因为最开始 MySQL 里并没有 InnoDB 引擎。MySQL 自带的引擎是 MyISAM，但是 MyISAM 没有 crash-safe 的能力，binlog 日志只能用于归档。而 InnoDB 是另一个公司以插件形式引入 MySQL 的，既然只依靠 binlog 是没有 crash-safe 能力的，所以 InnoDB 使用另外一套日志系统——也就是 redo log 来实现 crash-safe 能力。

对比：

1. redo log 是 InnoDB 引擎特有的；binlog 是 MySQL 的 Server 层实现的，所有引擎都可以使用。
2. redo log 是物理日志，记录的是“在某个数据页上做了什么修改”；binlog 是逻辑日志，记录的是这个语句的原始逻辑，比如“给 ID=2 这一行的 c 字段加 1 ”。
3. redo log 是**循环写**的，空间固定会用完；binlog 是可以**追加写入**的，写到一定大小后会切换到下一个，并不会覆盖以前的日志。

### 三种日志格式

- STATMENT：基于 SQL 语句的复制( statement-based replication, SBR )，每一条会修改数据的 SQL 语句会记录到 binlog 中 
- ROW：基于行的复制( row-based replication, RBR )，不记录每条 SQL 语句的上下文信息，仅需记录哪条数据被修改了
- MIXED：基于 STATMENT 和 ROW 两种模式的混合复制( mixed-based replication, MBR )

### 刷盘时机

通过 `sync_binlog` 参数控制 biglog 的刷盘时机：

- 0：不去强制要求，由系统自行判断何时写入磁盘
- 1：每次 commit 的时候都要将 binlog 写入磁盘
- N：每 N 个事务，才会将 binlog 写入磁盘

## update 语句执行流程

以下面这条 SQL 语句为例，分析在 InnoDB 引擎下的执行流程：

```sql
mysql> update T set c=c+1 where ID=2;
```

执行流程：

1. 执行器先找到 ID=2 这一行，如果 ID=2 这一行所在的数据页本来就在内存中（磁盘预读），就直接返回给执行器；否则，需要先从磁盘读入内存，然后再返回；
2. 执行器拿到引擎给的行数据，把这个值加上 1，比如原来是 N，现在就是 N+1，得到新的一行数据，再调用引擎接口写入这行新数据；
3. 引擎将这行新数据更新到内存中，同时将这个更新操作记录到 redo log 里面，此时 redo log 处于 prepare 状态。然后告知执行器执行完成了，随时可以提交事务；
4. 执行器生成这个操作的 binlog，并把 binlog 写入磁盘；
5. 执行器调用引擎的提交事务接口，引擎把刚刚写入的 redo log 改成提交（commit）状态，更新完成。

<img src="http://image.kongxiao.top/20220829222640.png" alt="image-20220829222638903" style="zoom:80%;" />

## 两阶段提交

将 redo log 的写入拆成了两个步骤：prepare 和 commit，这就是 "两阶段提交"。

两阶段提交为了让两份日志之间的逻辑一致。如果不使用两阶段提交，那么数据库的状态就有可能和用它的日志恢复出来的库的状态不一致。

数据库 crash-重启后，会对记录对 redo log 进行 check：

1. 如果 redo log 已经 commit，则视为有效；
2. 如果 redo log prepare 但未 commit，则 check 对应的 bin log 记录是否记录成功。
   - bin log 记录成功则将该 prepare 状态的 redo log 视为有效
   - bin log 记录不成功则将该 prepare 状态的 redo log 视为无效

反证法证明两阶段提交的必要性：

**先写 redo log 后写 binlog：**

假设在 redo log 写完，binlog 还没有写完的时候，MySQL 进程异常重启。redo log 写完之后，系统即使崩溃，仍然能够把数据恢复回来，所以恢复后这一行 c 的值是 1。但是由于 binlog 没写完就 crash 了，这时候 binlog 里面就没有记录这个语句。因此，之后备份日志的时候，存起来的 binlog 里面就没有这条语句，如果需要用这个 binlog 来恢复临时库的话，这个临时库就会少了这一次更新，恢复出来的这一行 c 的值就是 0，与原库的值不同。

**先写 binlog 后写 redo log：**

如果在 binlog 写完之后 crash，由于 redo log 还没写，崩溃恢复以后这个事务无效，所以这一行 c 的值是 0。但是 binlog 里面已经记录了“把 c 从 0 改成 1”这个日志。所以，在之后用 binlog 来恢复的时候就多了一个事务出来，恢复出来的这一行 c 的值就是 1，与原库的值不同。

## undo log

回滚日志 undo log 同样也是 InnoDB 引擎提供的日志，作用就是对数据进行回滚，是**逻辑日志**。

当事务对数据库进行修改，InnoDB 引擎不仅会记录 redo log，还会生成对应的 undo log 日志；如果事务执行失败或调用了 rollback，导致事务需要回滚，就可以利用 undo log 中的信息将数据回滚到修改之前的样子。

当发生回滚时，InnoDB 引擎会根据 undo log 日志中的记录做与之前相反的工作。比如对于每个 insert 操作，回滚时会执行数据 delete 操作；对于每个数据 delete 操作，回滚时会执行数据 insert 操作；对于每个数据 update 操作，回滚时会执行一个相反的数据 update 操作，把数据改回去。

undo log 有两个作用，一是提供回滚，二是实现MVCC。后续会深入研究。

----

思考题：定期全量备份的周期“取决于系统重要性，有的是一天一备，有的是一周一备”。那么在什么场景下，一天一备会比一周一备更有优势呢？或者说，它影响了这个数据库系统的哪个指标?

答案：在一天一备的模式里，最坏情况下需要应用一天的 binlog。一周一备最坏情况就要应用一周的 binlog 了。系统的对应指标就是 RTO（恢复目标时间）。当然这个是有成本的，因为更频繁全量备份需要消耗更多存储空间，所以这个 RTO 是成本换来的，需要根据业务重要性来评估。

