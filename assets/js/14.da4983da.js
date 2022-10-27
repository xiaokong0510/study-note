(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{294:function(t,_,v){"use strict";v.r(_);var a=v(7),s=Object(a.a)({},(function(){var t=this,_=t._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h1",{attrs:{id:"_03-事务隔离"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_03-事务隔离"}},[t._v("#")]),t._v(" 03-事务隔离")]),t._v(" "),_("p",[t._v("课程链接："),_("a",{attrs:{href:"https://time.geekbang.org/column/article/68963",target:"_blank",rel:"noopener noreferrer"}},[t._v("MySQL 实战 45 讲 03 | 事务隔离：为什么你改了我还看不见？"),_("OutboundLink")],1)]),t._v(" "),_("p",[t._v("内容包括：")]),t._v(" "),_("ul",[_("li",[t._v("事务 ACID 特性\n"),_("ul",[_("li",[t._v("原子性 Atomicity")]),t._v(" "),_("li",[t._v("一致性 Consistency")]),t._v(" "),_("li",[t._v("隔离性 Isolation")]),t._v(" "),_("li",[t._v("持久性 Durability")])])]),t._v(" "),_("li",[t._v("并发事务带来的问题\n"),_("ul",[_("li",[t._v("脏读 dirty read")]),t._v(" "),_("li",[t._v("不可重复读 non-repeatable read")]),t._v(" "),_("li",[t._v("幻读 phantom read")])])]),t._v(" "),_("li",[t._v("隔离级别\n"),_("ul",[_("li",[t._v("读未提交 read uncommitted")]),t._v(" "),_("li",[t._v("读提交 read committed")]),t._v(" "),_("li",[t._v("可重复读 repeatable read")]),t._v(" "),_("li",[t._v("串行化 serializable")])])])]),t._v(" "),_("h2",{attrs:{id:"acid-特性"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#acid-特性"}},[t._v("#")]),t._v(" ACID 特性")]),t._v(" "),_("p",[t._v("事务 (Transaction)，可看作是对数据库操作的基本执行单元，可能包含一个或者多个 SQL 语句。事务就是要保证一组数据库操作，要么全部成功，要么全部失败。")]),t._v(" "),_("p",[t._v("MyISAM 引擎不支持事务，InnoDB 引擎支持事务。")]),t._v(" "),_("p",[t._v("事务的执行主要包括两个操作，提交和回滚：")]),t._v(" "),_("ul",[_("li",[t._v("提交：commit，将事务执行结果写入数据库")]),t._v(" "),_("li",[t._v("回滚：rollback，回滚所有已经执行的语句，返回修改之前的数据")])]),t._v(" "),_("p",[t._v("事务的 ACID 特性：")]),t._v(" "),_("ol",[_("li",[_("strong",[t._v("原子性")]),t._v("（"),_("code",[t._v("Atomicity")]),t._v("） ： 事务是最小的执行单位，不允许分割。事务的原子性确保动作要么全部完成，要么完全不起作用；主要基于 undo log 日志实现；")]),t._v(" "),_("li",[_("strong",[t._v("一致性")]),t._v("（"),_("code",[t._v("Consistency")]),t._v("）：在事务开始之前和事务结束以后，数据库的完整性没有被破坏，保证事务提交后不会因为宕机等原因导致数据丢失；是事务追求的最终目标，通过原子性、隔离性、持久性来保证一致性；")]),t._v(" "),_("li",[_("strong",[t._v("隔离性")]),t._v("（"),_("code",[t._v("Isolation")]),t._v("）： 并发访问数据库时，一个用户的事务不被其他事务所干扰，各并发事务之间数据库是独立的；InnoDB 引擎通过锁机制、MVCC  等手段来保证事务的隔离性；")]),t._v(" "),_("li",[_("strong",[t._v("持久性")]),t._v("（"),_("code",[t._v("Durability")]),t._v("）： 一个事务被提交之后，它对数据库中数据的改变是持久的，即使数据库发生故障也不应该对其有任何影响；基于 redo log 日志实现")])]),t._v(" "),_("h2",{attrs:{id:"并发事务带来的问题"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#并发事务带来的问题"}},[t._v("#")]),t._v(" 并发事务带来的问题")]),t._v(" "),_("ul",[_("li",[_("strong",[t._v("脏读")]),t._v("（"),_("code",[t._v("dirty read")]),t._v("）：当前事务中读到其他事务未提交的数据，也就是脏数据；")]),t._v(" "),_("li",[_("strong",[t._v("不可重复读")]),t._v("（"),_("code",[t._v("non-repeatable read")]),t._v("）：A 事务多次读取同一个数据，而 B 事务中修改该数据导致 A 事务两次读取的数据可能不太一样；脏读与不可重复读的区别在于："),_("strong",[t._v("前者读到的是其他事务未提交的数据，后者读到的是其他事务已提交的数据。")])]),t._v(" "),_("li",[_("strong",[t._v("幻读")]),t._v("（"),_("code",[t._v("phantom read")]),t._v("）： 幻读与不可重复读类似。它发生在一个事务（T1）读取了几行数据，接着另一个并发事务（T2）插入了一些数据时。在随后的查询中，第一个事务（T1）就会发现多了一些原本不存在的记录，就好像发生了幻觉一样，所以称为幻读。不可重复读与幻读的区别为："),_("strong",[t._v("前者是数据变了，后者是数据的行数变了。")])])]),t._v(" "),_("h2",{attrs:{id:"事务的隔离级别"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#事务的隔离级别"}},[t._v("#")]),t._v(" 事务的隔离级别")]),t._v(" "),_("p",[t._v("隔离得越严实，效率就会越低。因此很多时候，都要在二者之间寻找一个平衡点。")]),t._v(" "),_("p",[t._v("SQL 标准的事务隔离级别包括：")]),t._v(" "),_("ul",[_("li",[_("strong",[t._v("READ-UNCOMMITTED (读未提交)：")]),t._v(" 最低的隔离级别，一个事务还没提交时，它做的变更就能被别的事务看到。可能会导致脏读、幻读或不可重复读。")]),t._v(" "),_("li",[_("strong",[t._v("READ-COMMITTED (读取已提交)：")]),t._v(" 一个事务提交之后，它做的变更才会被其他事务看到。可以阻止脏读，但是幻读或不可重复读仍有可能发生。")]),t._v(" "),_("li",[_("strong",[t._v("REPEATABLE-READ (可重复读)：")]),t._v(" 对同一字段的多次读取结果都是一致的，除非数据是被本身事务自己所修改。可以阻止脏读和不可重复读，但幻读仍有可能发生。")]),t._v(" "),_("li",[_("strong",[t._v("SERIALIZABLE(串行化)：")]),t._v(" 最高的隔离级别，完全服从 ACID 的隔离级别。所有的事务依次逐个执行，这样事务之间就完全不可能产生干扰，也就是说，该级别可以防止脏读、不可重复读以及幻读。")])]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("隔离级别")]),t._v(" "),_("th",[t._v("脏读")]),t._v(" "),_("th",[t._v("不可重复读")]),t._v(" "),_("th",[t._v("幻读")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("READ-UNCOMMITTED")]),t._v(" "),_("td",[t._v("可能发生")]),t._v(" "),_("td",[t._v("可能发生")]),t._v(" "),_("td",[t._v("可能发生")])]),t._v(" "),_("tr",[_("td",[t._v("READ-COMMITTED")]),t._v(" "),_("td",[t._v("不可能发生")]),t._v(" "),_("td",[t._v("可能发生")]),t._v(" "),_("td",[t._v("可能发生")])]),t._v(" "),_("tr",[_("td",[t._v("REPEATABLE-READ")]),t._v(" "),_("td",[t._v("不可能发生")]),t._v(" "),_("td",[t._v("不可能发生")]),t._v(" "),_("td",[t._v("可能发生")])]),t._v(" "),_("tr",[_("td",[t._v("SERIALIZABLE")]),t._v(" "),_("td",[t._v("不可能发生")]),t._v(" "),_("td",[t._v("不可能发生")]),t._v(" "),_("td",[t._v("不可能发生")])])])]),t._v(" "),_("p",[t._v("MySQL InnoDB 存储引擎的默认支持的隔离级别是 REPEATABLE-READ，同时使用到了 "),_("code",[t._v("MVCC")]),t._v(" 和 "),_("code",[t._v("Next-Key Locks")]),t._v(" 机制解决了幻读，详见 "),_("RouterLink",{attrs:{to:"/pages/Database/MySQL/06-MVCC.html"}},[t._v("06-MVCC")])],1),t._v(" "),_("p",[t._v("示例：")]),t._v(" "),_("div",{staticClass:"language-sql line-numbers-mode"},[_("pre",{pre:!0,attrs:{class:"language-sql"}},[_("code",[_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("create")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("table")]),t._v(" T"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("c "),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("engine")]),_("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("InnoDB")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("insert")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("into")]),t._v(" T"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("c"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("values")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),_("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),_("div",{staticClass:"line-numbers-wrapper"},[_("span",{staticClass:"line-number"},[t._v("1")]),_("br"),_("span",{staticClass:"line-number"},[t._v("2")]),_("br")])]),_("p",[_("img",{attrs:{src:"http://image.kongxiao.top/20221012213645.png",alt:"image-20221012213637030"}})]),t._v(" "),_("ul",[_("li",[_("p",[t._v("“读未提交”：则 V1 = 2；这时候事务 B 虽然还没有提交，但结果已经被 A 看到了。因此V2、V3 也都是 2；")])]),t._v(" "),_("li",[_("p",[t._v("“读提交”：则 V1 = 1，V2 = 2。事务 B 的更新在提交后才能被 A 看到。所以， V3 的值也是 2。")])]),t._v(" "),_("li",[_("p",[t._v("“可重复读”：则 V1、V2 是 1，V3 是 2。之所以 V2 还是 1，遵循的是：事务在执行期间看到的数据前后必须是一致的。")])]),t._v(" "),_("li",[_("p",[t._v("“串行化”：则在事务 B 执行“将 1 改成 2”的时候，会被锁住。直到事务 A 提交后，事务 B 才可以继续执行。所以从 A 的角度看， V1、V2 值是 1，V3 的值是 2。")])])]),t._v(" "),_("p",[t._v("在实现上，数据库里面会创建一个视图，访问的时候以视图的逻辑结果为准。")]),t._v(" "),_("ul",[_("li",[t._v("RC 级别下，视图会在每一个语句前创建一个，所以在RC级别下，一个事务是可以看到另外一个事务已经提交的内容，因为它在每一次查询之前都会重新给予最新的数据创建一个新的视图")]),t._v(" "),_("li",[t._v("RR 级别下，视图是在事务启动时就创建好了，这个视图会一直使用，直到该事务结束。")]),t._v(" "),_("li",[t._v("RU：没有视图的概念，直接返回最小行数据。")]),t._v(" "),_("li",[t._v("Serial：直接用加锁的方式来避免并行访问。")])]),t._v(" "),_("p",[t._v("查看当前的隔离级别：")]),t._v(" "),_("div",{staticClass:"language-sql line-numbers-mode"},[_("pre",{pre:!0,attrs:{class:"language-sql"}},[_("code",[_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("show")]),t._v(" variables "),_("span",{pre:!0,attrs:{class:"token operator"}},[t._v("like")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token string"}},[t._v("'transaction_isolation'")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),_("div",{staticClass:"line-numbers-wrapper"},[_("span",{staticClass:"line-number"},[t._v("1")]),_("br")])]),_("h2",{attrs:{id:"事务隔离的实现"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#事务隔离的实现"}},[t._v("#")]),t._v(" 事务隔离的实现")]),t._v(" "),_("p",[t._v("在 MySQL 中，实际上每条记录在更新的时候都会同时记录一条回滚操作。记录上的最新值，通过回滚操作，都可以得到前一个状态的值。")]),t._v(" "),_("p",[t._v("假设一个值从 1 被按顺序改成了 2、3、4，在回滚日志里面就会有类似下面的记录：")]),t._v(" "),_("p",[_("img",{attrs:{src:"http://image.kongxiao.top/20221014225822.png",alt:"image-20221014225821042"}})]),t._v(" "),_("p",[t._v("当前值是 4，但是在查询这条记录的时候，不同时刻启动的事务会有不同的 read-view。")]),t._v(" "),_("p",[t._v("在视图 A、B、C 里面，这一个记录的值分别是 1、2、4，同一条记录在系统中可以存在多个版本，就是数据库的"),_("strong",[t._v("多版本并发控制（MVCC）")]),t._v("。")]),t._v(" "),_("ul",[_("li",[t._v("对于 read-view A，要得到 1，就必须将当前值依次执行图中所有的回滚操作得到")]),t._v(" "),_("li",[t._v("即使现在有另外一个事务正在将 4 改成 5，这个事务跟 read-view A、B、C 对应的事务是不会冲突的")]),t._v(" "),_("li",[t._v("当没有事务再需要用到这些回滚日志时，"),_("strong",[t._v("即当系统里没有比这个回滚日志更早的 read-view")]),t._v(" 时，回滚日志会被删除")])]),t._v(" "),_("blockquote",[_("p",[_("strong",[t._v("为什么建议尽量不要使用长事务?")])]),t._v(" "),_("p",[t._v("长事务意味着系统里面会存在很老的事务视图。由于这些事务随时可能访问数据库里面的任何数据，所以这个事务提交之前，数据库里面它可能用到的回滚记录都必须保留，这就会导致大量占用存储空间。")])]),t._v(" "),_("h2",{attrs:{id:"事务的启动方式"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#事务的启动方式"}},[t._v("#")]),t._v(" 事务的启动方式")]),t._v(" "),_("p",[t._v("MySQL 的事务启动方式有以下几种：")]),t._v(" "),_("ol",[_("li",[t._v("显式启动事务语句， "),_("code",[t._v("begin")]),t._v(" 或 "),_("code",[t._v("start transaction")]),t._v("。配套的提交语句是 "),_("code",[t._v("commit")]),t._v("，回滚语句是 "),_("code",[t._v("rollback")]),t._v("。")]),t._v(" "),_("li",[_("code",[t._v("set autocommit=0")]),t._v("，这个命令会将这个线程的自动提交关掉。意味着如果只执行一个 select 语句，这个事务就启动了，而且并不会自动提交。这个事务持续存在直到主动执行 commit 或 rollback 语句，或者断开连接。")])]),t._v(" "),_("p",[t._v("在 autocommit 为 1 的情况下，用 begin 显式启动的事务，如果执行 commit 则提交事务。如果执行 commit work and chain，则是提交事务并自动启动下一个事务")]),t._v(" "),_("p",[t._v("可以在 information_schema 库的 innodb_trx 这个表中查询长事务，下面这个语句用于查找持续时间超过 60s 的事务：")]),t._v(" "),_("div",{staticClass:"language-sql line-numbers-mode"},[_("pre",{pre:!0,attrs:{class:"language-sql"}},[_("code",[_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("select")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" information_schema"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("innodb_trx "),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("where")]),t._v(" TIME_TO_SEC"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("timediff"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),_("span",{pre:!0,attrs:{class:"token function"}},[t._v("now")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("trx_started"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),_("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),_("span",{pre:!0,attrs:{class:"token number"}},[t._v("60")]),t._v("\n")])]),t._v(" "),_("div",{staticClass:"line-numbers-wrapper"},[_("span",{staticClass:"line-number"},[t._v("1")]),_("br")])]),_("hr"),t._v(" "),_("p",[t._v("思考题：系统里面应该避免长事务，有什么方案来避免出现或者处理这种情况？")]),t._v(" "),_("p",[t._v("首先，从应用开发端来看：")]),t._v(" "),_("ol",[_("li",[t._v("确认是否使用了 set autocommit=0。这个确认工作可以在测试环境中开展，把 MySQL 的 general_log 开起来，然后随便跑一个业务逻辑，通过 general_log 的日志来确认。一般框架如果会设置这个值，也就会提供参数来控制行为，目标就是把它改成 1。")]),t._v(" "),_("li",[t._v("确认是否有不必要的只读事务。有些框架会习惯不管什么语句先用 begin/commit 框起来。有些是业务并没有这个需要，但是也把好几个 select 语句放到了事务中。这种只读事务可以去掉。")]),t._v(" "),_("li",[t._v("业务连接数据库的时候，根据业务本身的预估，通过 SET MAX_EXECUTION_TIME 命令，来控制每个语句执行的最长时间，避免单个语句意外执行太长时间。")])]),t._v(" "),_("p",[t._v("其次，从数据库端来看：")]),t._v(" "),_("ol",[_("li",[t._v("监控 information_schema.Innodb_trx 表，设置长事务阈值，超过就报警 / 或者 kill；")]),t._v(" "),_("li",[t._v("Percona 的 pt-kill 这个工具不错，推荐使用；")]),t._v(" "),_("li",[t._v("在业务功能测试阶段要求输出所有的 general_log，分析日志行为提前发现问题；")]),t._v(" "),_("li",[t._v("如果使用的是 MySQL 5.6 或者更新版本，把 innodb_undo_tablespaces 设置成 2（或更大的值）。如果真的出现大事务导致回滚段过大，这样设置后清理起来更方便")])])])}),[],!1,null,null,null);_.default=s.exports}}]);