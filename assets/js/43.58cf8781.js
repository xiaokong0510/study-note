(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{310:function(s,t,a){"use strict";a.r(t);var e=a(13),n=Object(e.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"由客户端重复请求引发的问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#由客户端重复请求引发的问题"}},[s._v("#")]),s._v(" 由客户端重复请求引发的问题")]),s._v(" "),t("p",[s._v("最近在做项目的过程中，遇到了一个 "),t("strong",[s._v("数据库里插入了重复数据")]),s._v(" 的问题，当时还造成了一定的困扰。")]),s._v(" "),t("p",[s._v("在请教公司大佬，同时网上搜索后，才把问题弄清，其实就是 "),t("strong",[s._v("接口幂等性")]),s._v(" 的问题，记录一下。")]),s._v(" "),t("h2",{attrs:{id:"_1-问题引入"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-问题引入"}},[s._v("#")]),s._v(" 1 问题引入")]),s._v(" "),t("p",[s._v("有这样一个场景："),t("strong",[s._v("新增用户时，往用户表里插入数据")])]),s._v(" "),t("p",[s._v("用户表类似这样：")]),s._v(" "),t("table",[t("thead",[t("tr",[t("th",[t("strong",[s._v("字段")])]),s._v(" "),t("th",[t("strong",[s._v("类型")])]),s._v(" "),t("th",[t("strong",[s._v("说明")])])])]),s._v(" "),t("tbody",[t("tr",[t("td",[s._v("id")]),s._v(" "),t("td",[s._v("int")]),s._v(" "),t("td",[s._v("自增主键")])]),s._v(" "),t("tr",[t("td",[s._v("device_info")]),s._v(" "),t("td",[s._v("varchar")]),s._v(" "),t("td",[s._v("设备信息")])]),s._v(" "),t("tr",[t("td",[s._v("name")]),s._v(" "),t("td",[s._v("varchar")]),s._v(" "),t("td",[s._v("用户名")])]),s._v(" "),t("tr",[t("td",[s._v("...")]),s._v(" "),t("td"),s._v(" "),t("td")])])]),s._v(" "),t("p",[s._v("处理流程：")]),s._v(" "),t("ol",[t("li",[t("p",[s._v("客户端调用登录接口，携带设备信息字段 deviceInfo；")])]),s._v(" "),t("li",[t("p",[s._v("后台先根据 该设备信息参数 去数据库查询用户名是否存在；")]),s._v(" "),t("p",[s._v("不存在则往用户表里新增一条记录；存在则进行后续业务操作。")])])]),s._v(" "),t("p",[s._v("代码示意：")]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("User")]),s._v(" user "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" userMapper"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("selectBykey")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("deviceInfo"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("user "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 执行插入insert")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 执行业务操作")]),s._v("\n "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("p",[s._v("接口写完了，在客户端对接的过程中，发现数据库出现了一些重复记录，除了主键 id 外，其余信息完全一样。")]),s._v(" "),t("p",[s._v("查询日志发现 "),t("strong",[s._v("insert into 语句同时执行了两次，"),t("strong",[s._v("参数是一样的")]),s._v("，但是实际上这只是一个用户。")])]),s._v(" "),t("p",[s._v("刚开始想法太简单，不知道是什么原因。请教了公司同事进行排查，才知道是并发问题导致的。")]),s._v(" "),t("p",[s._v("客户端并发调用登录接口，同时进入了 if 条件判断语句内部，所以插入操作执行了两次。自己用 Jmeter 测试一下确实如此。")]),s._v(" "),t("h2",{attrs:{id:"_2-数据库层面解决"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-数据库层面解决"}},[s._v("#")]),s._v(" 2 数据库层面解决")]),s._v(" "),t("p",[s._v("从数据库层面，为了防止数据库插入重复的数据，将 "),t("strong",[s._v("device_info")]),s._v(" 设置了唯一索引。")]),s._v(" "),t("p",[s._v("有以下几种解决方案：")]),s._v(" "),t("h3",{attrs:{id:"_1-insert-ignore-into"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-insert-ignore-into"}},[s._v("#")]),s._v(" (1) insert ignore into")]),s._v(" "),t("blockquote",[t("p",[s._v("如果insert into 两条 device_info 相同的数据，则会报错 "),t("code",[s._v("Duplicate entry")])])]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INSERT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INTO")]),s._v(" user_info "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" device_info，name "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("VALUES")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'250'")]),s._v("，"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Zhangsan'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'250'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'lisi'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----")]),s._v("\n "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("Duplicate")]),s._v(" entry "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'250'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("key")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v("device_info"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("使用 "),t("code",[s._v("insert ignore into")]),s._v("，插入数据时，会判断主键或者唯一索引是否有重复，如果有重复则不执行，也不会报错。")]),s._v(" "),t("blockquote",[t("p",[s._v("例如，向数据库插入两条相同的数据，最后数据库中只会存在一条记录。")])]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INSERT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INTO")]),s._v(" user_info "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" device_info，name "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("VALUES")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'251'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Zhangsan'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'251'")]),s._v("，"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'lisi'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" Affected "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("rows")]),s._v(": "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("h3",{attrs:{id:"_2-on-duplicate-key-update"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-on-duplicate-key-update"}},[s._v("#")]),s._v(" (2) on duplicate key update")]),s._v(" "),t("p",[s._v("插入一条记录，若该数据的主键值或者 UNIQUE KEY 已经在表中存在，"),t("strong",[s._v("则执行更新操作，即UPDATE 后面的操作；")]),s._v("  否则插入一条新的记录。")]),s._v(" "),t("blockquote",[t("p",[s._v("如下sql语句，已经存在唯一索引 user_info = 250的记录，则只会执行更新操作，不会再次插入")])]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INSERT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INTO")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("user")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" device_info"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" name "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("VALUES")]),s._v("\n\t"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'251'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'zhangsan'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" \n\t"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("DUPLICATE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("KEY")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("UPDATE")]),s._v(" name "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'wangwu'")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" Affected "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("rows")]),s._v(": "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("p",[s._v("查看表，之前的记录被更新了")]),s._v(" "),t("h3",{attrs:{id:"_3-replace-into"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-replace-into"}},[s._v("#")]),s._v(" (3) replace into")]),s._v(" "),t("p",[s._v("使用 "),t("code",[s._v("REPLACE INTO")]),s._v("，如果存在主键或者 UNIQUE KEY 相同的记录，则会 "),t("strong",[s._v("删除原数据")]),s._v(" ，然后重新插入新的数据。")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("REPLACE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INTO")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("USER")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" device_info"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" NAME "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("VALUES")]),s._v("\n\t"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'251'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'zhangsan'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" Affected "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("rows")]),s._v(": "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("p",[s._v("查看表，之前的记录删除了，同时新增一条记录。")]),s._v(" "),t("p",[s._v("在项目中暂时使用了将字段 device_info 设置为唯一索引，插入语句改为 insert ignore into 来进行处理。")]),s._v(" "),t("p",[s._v("但是如果对于上线的数据库，已经有重复的数据入库了，这个时候又没办法筛选出重复的数据，无法建立唯一索引。")]),s._v(" "),t("p",[s._v("也可以使用"),t("code",[s._v("Redis")]),s._v(" 的 "),t("code",[s._v("setnx")]),s._v(" 指令来实现，或者使用 Redisson 实现 Redis分布式锁，这里暂时不细说了。")]),s._v(" "),t("h2",{attrs:{id:"_3-什么是幂等"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-什么是幂等"}},[s._v("#")]),s._v(" 3 什么是幂等")]),s._v(" "),t("p",[s._v("针对上述问题，需要保证接口的 "),t("strong",[s._v("幂等性")]),s._v(" 。")]),s._v(" "),t("h3",{attrs:{id:"_1-定义"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-定义"}},[s._v("#")]),s._v(" (1) 定义")]),s._v(" "),t("p",[s._v("幂等性(Idempotence)。在HTTP/1.1规范中幂等性的定义是：")]),s._v(" "),t("blockquote",[t("p",[s._v('Methods can also have the property of "idempotence" in that (aside from error or expiration issues) the side-effects of N > 0 identical requests is the same as for a single request.')])]),s._v(" "),t("p",[s._v("维基百科上的定义：")]),s._v(" "),t("blockquote",[t("p",[s._v("幂等（idempotent、idempotence）是一个数学与计算机学概念，常见于抽象代数中。\n在编程中一个幂等操作的特点是其任意多次执行所产生的影响均与一次执行的影响相同。")]),s._v(" "),t("p",[s._v("用数学语言表达就是"),t("code",[s._v("f(x)=f(f(x))")]),s._v("。")]),s._v(" "),t("p",[t("strong",[s._v("幂等函数")]),s._v(" ，或 "),t("strong",[s._v("幂等方法")]),s._v(" ，是指可以使用相同参数重复执行，并能获得相同结果的函数。")])]),s._v(" "),t("p",[s._v("如果一个接口满足 "),t("strong",[s._v("以相同的请求调用这个接口一次和调用这个接口多次，对系统产生的影响是相同的")]),s._v(" ，那么就说这个接口是一个幂等接口。")]),s._v(" "),t("h3",{attrs:{id:"_2-需要幂等性的场景"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-需要幂等性的场景"}},[s._v("#")]),s._v(" (2) 需要幂等性的场景")]),s._v(" "),t("p",[s._v("在编程中主要操作就是 CURD，其中读取（Retrieve）操作和删除（Delete）操作是天然幂等的，受影响的就是创建（Create）、更新（Update）")]),s._v(" "),t("p",[s._v("对于业务中需要考虑幂等性的地方一般都是接口的重复请求，即同一个请求因为某些原因被多次提交。导致这个情况会有几种场景：")]),s._v(" "),t("ul",[t("li",[s._v("前端重复提交：提交订单，用户快速重复点击多次，造成后端生成多个内容重复的订单。")]),s._v(" "),t("li",[s._v("接口超时重试：对于给第三方调用的接口，为了防止网络抖动或其他原因造成请求丢失，这样的接口一般都会设计成超时重试多次。")]),s._v(" "),t("li",[s._v("消息重复消费：MQ 消息中间件，消息重复消费。")])]),s._v(" "),t("h3",{attrs:{id:"_3-幂等性的实现方式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-幂等性的实现方式"}},[s._v("#")]),s._v(" (3) 幂等性的实现方式")]),s._v(" "),t("p",[s._v("对于和 web 端交互的接口，在前端防止表单重复提交，可以采用点击提交按钮后置灰、隐藏、不可点击等方式，目前做的一些管理后台系统都在这么干，虽然粗糙了点。")]),s._v(" "),t("p",[s._v("还可以采用以下几种实现方式")]),s._v(" "),t("h4",{attrs:{id:"数据库唯一主键"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据库唯一主键"}},[s._v("#")]),s._v(" 数据库唯一主键")]),s._v(" "),t("p",[s._v("适用于执行插入操作时的幂等性，利用数据库中主键唯一约束的特性，能保证一张表中只能存在一条带该唯一主键的记录。也就是标题 2 中提到的几种方法")]),s._v(" "),t("h4",{attrs:{id:"乐观锁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#乐观锁"}},[s._v("#")]),s._v(" 乐观锁")]),s._v(" "),t("p",[s._v("适用于执行更新操作的接口，可以提前在对应的数据表中多添加一个字段，比如当前时间戳，充当当前数据的版本标识。")]),s._v(" "),t("p",[s._v("时间戳标识由前端到数据中查询出来，再传给执行更新操作的接口；")]),s._v(" "),t("p",[s._v("执行完更新操作后，时间戳也被更新，这样重复执行该条 SQL 语句将不生效")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("update")]),s._v(" table_xxx "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("set")]),s._v(" name"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#name#, timestamp = now() where id=#id# and timestamp=#timestamp#")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h4",{attrs:{id:"token-机制防重"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#token-机制防重"}},[s._v("#")]),s._v(" Token 机制防重")]),s._v(" "),t("p",[s._v("流程：")]),s._v(" "),t("ol",[t("li",[s._v("调用方在调用接口的时候先向后端请求一个全局 "),t("code",[s._v("ID（Token）")]),s._v("，并将 "),t("code",[s._v("Token")]),s._v(" 存入"),t("code",[s._v("Redis")]),s._v("中；")]),s._v(" "),t("li",[s._v("请求的时候携带这个全局 "),t("code",[s._v("ID")]),s._v(" 一起请求（一般放到 "),t("code",[s._v("Headers")]),s._v(" 中）；")]),s._v(" "),t("li",[s._v("后端需要对这个 "),t("code",[s._v("Token")]),s._v(" 作为 "),t("code",[s._v("Key")]),s._v("，用户信息作为 "),t("code",[s._v("Value")]),s._v(" 到 "),t("code",[s._v("Redis")]),s._v(" 中进行键值内容校验；")]),s._v(" "),t("li",[s._v("如果 "),t("code",[s._v("Key")]),s._v(" 存在且 "),t("code",[s._v("Value")]),s._v(" 匹配就执行删除命令，然后正常执行后面的业务逻辑；")]),s._v(" "),t("li",[s._v("如果不存在对应的 "),t("code",[s._v("Key")]),s._v(" 或 "),t("code",[s._v("Value")]),s._v(" 不匹配就返回重复执行的错误信息，这样来保证幂等操作。")])]),s._v(" "),t("p",[s._v("这里可以使用 自定义注解 + 拦截器实现")]),s._v(" "),t("h4",{attrs:{id:"下游传递唯一序列号"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#下游传递唯一序列号"}},[s._v("#")]),s._v(" 下游传递唯一序列号")]),s._v(" "),t("p",[s._v("流程：")]),s._v(" "),t("ol",[t("li",[s._v("下游服务生成分布式 "),t("code",[s._v("ID")]),s._v(" 作为序列号，然后执行请求调用上游接口，并附带 **唯一序列号 **与请求的 "),t("strong",[s._v("认证凭据ID")]),s._v(" ；")]),s._v(" "),t("li",[s._v("上游服务进行安全效验，检测下游传递的参数中是否存在 "),t("strong",[s._v("序列号")]),s._v(" 和 "),t("strong",[s._v("凭据ID")]),s._v(" ；")]),s._v(" "),t("li",[s._v("上游服务到 Redis 中检测是否存在对应的 "),t("strong",[s._v("序列号")]),s._v(" 与 "),t("strong",[s._v("认证ID")]),s._v(" 组成的 "),t("code",[s._v("Key")]),s._v("，如果存在就抛出重复执行的异常信息，然后响应下游对应的错误信息；")]),s._v(" "),t("li",[s._v("如果不存在就以该 "),t("strong",[s._v("序列号")]),s._v(" 和 "),t("strong",[s._v("认证ID")]),s._v(" 组合作为 "),t("code",[s._v("Key")]),s._v("，以下游关键信息作为 "),t("code",[s._v("Value")]),s._v("，进而存储到 Redis 中，一定要设置过期时间，然后正常执行接来来的业务逻辑。")])])])}),[],!1,null,null,null);t.default=n.exports}}]);