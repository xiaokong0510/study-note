---
title: MySQL基础02：MySQL 的日志系统
date: 2022-07-27 22:41:46
permalink: /pages/a5e529/
categories:
  - pages
  - Databases
  - MySQL
tags:
  - 
---
# MySQL 的事务与日志系统

简单总结 MySQL 的日志系统，包含以下内容：

- MySQL 的事务
  - 原子性 Atomicity
  - 一致性 Consistency
  - 隔离性 Isolation
  - 持久性 Durability
- MySQL 的日志系统
  - redo log（重做日志）
  - undo log（回滚日志）
  - bin log（归档日志）



## 事务

事务 (Transaction)，可看作是对数据库操作的基本执行单元，可能包含一个或者多个SQL语句

事务就是要保证一组数据库操作，要么全部成功，要么全部失败

MyISAM 引擎不支持事务，InnoDB 引擎支持事务

## 事务的ACID 特性

1. **原子性**（`Atomicity`） ： 事务是最小的执行单位，不允许分割。事务的原子性确保动作要么全部完成，要么完全不起作用；实现主要基于 undo log 日志实现；
2. **一致性**（`Consistency`）：在事务开始之前和事务结束以后，数据库的完整性没有被破坏，保证事务提交后不会因为宕机等原因导致数据丢失；实现主要基于 redo log 日志；
3. **隔离性**（`Isolation`）： 并发访问数据库时，一个用户的事务不被其他事务所干扰，各并发事务之间数据库是独立的；InnoDB 引擎通过锁机制、MVCC  等手段来保证事务的隔离性；
4. **持久性**（`Durability`）： 一个事务被提交之后，它对数据库中数据的改变是持久的，即使数据库发生故障也不应该对其有任何影响。

## 并发事务带来的问题

- 脏读（dirty read）：当前事务中读到其他事务未提交的数据，也就是脏数据；
- 不可重复读（non-repeatable read）：A 事务多次读取同一个数据，而 B 事务中修改该数据导致 A 事务两次读取的数据可能不太一样；脏读与不可重复读的区别在于：**前者读到的是其他事务未提交的数据，后者读到的是其他事务已提交的数据。**
- 幻读（phantom read）： 幻读与不可重复读类似。它发生在一个事务（T1）读取了几行数据，接着另一个并发事务（T2）插入了一些数据时。在随后的查询中，第一个事务（T1）就会发现多了一些原本不存在的记录，就好像发生了幻觉一样，所以称为幻读。不可重复读与幻读的区别为：**前者是数据变了，后者是数据的行数变了。**

## 事务的隔离级别

- **READ-UNCOMMITTED (读取未提交)：** 最低的隔离级别，允许读取尚未提交的数据变更，**可能会导致脏读、幻读或不可重复读**。
- **READ-COMMITTED (读取已提交)：** 允许读取并发事务已经提交的数据，**可以阻止脏读，但是幻读或不可重复读仍有可能发生**。
- **REPEATABLE-READ (可重复读)：** 对同一字段的多次读取结果都是一致的，除非数据是被本身事务自己所修改，**可以阻止脏读和不可重复读，但幻读仍有可能发生**。
- **SERIALIZABLE(可串行化)：** 最高的隔离级别，完全服从 ACID 的隔离级别。所有的事务依次逐个执行，这样事务之间就完全不可能产生干扰，也就是说，**该级别可以防止脏读、不可重复读以及幻读**。

| 隔离级别         | 脏读       | 不可重复读 | 幻读       |
| ---------------- | ---------- | ---------- | ---------- |
| READ-UNCOMMITTED | 可能发生   | 可能发生   | 可能发生   |
| READ-COMMITTED   | 不可能发生 | 可能发生   | 可能发生   |
| REPEATABLE-READ  | 不可能发生 | 不可能发生 | 可能发生   |
| SERIALIZABLE     | 不可能发生 | 不可能发生 | 不可能发生 |

MySQL InnoDB 存储引擎的默认支持的隔离级别是 **REPEATABLE-READ（可重读）**

**使用到 Next-Key Locks 机制解决了幻读。**

## redo log

redo log 是 InnoDB 引擎层的日志，用来记录事务操作引起数据的变化，记录的是数据页的物理修改。

redo log 分为 redo log buffer 和 redo log file，buffer 到 file 是通过 os buffer 写入，写入机制分别为【延迟写】: 每秒从 redo log buffer 写入到 os buffer 和 redo log file， 【实时写，实时刷】: 即无延时实时写入，【实时写，延迟刷】: 每次写入到 os buffer 后每秒刷到 redo log file

 真正的“两阶段提交” 是指对 redo log 进行“两阶段提交”：先 prepare，再commit。 数据库 crash-重启后，会对记录对redo log 进行check： 1、如果 redo log 已经commit，则视为有效。 2、如果 redo log prepare 但未commit，则check对应的bin log记录是否记录成功。 2.1、bin log记录成功则将该prepare状态的redo log视为有效 2.2、bin log记录不成功则将该prepare状态的redo log视为无效

参考文档：https://www.cxyxiaowu.com/10740.html
