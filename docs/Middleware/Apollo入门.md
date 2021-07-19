# Apollo入门

![logo-simple](C:\Users\admin\Pictures\logo-simple.png)

公司项目使用了Apollo配置中心，找了个入门视频学习一下。只是一些基本的操作，架构有待深入研究。内容包括：

1. Apollo 的工作流程
2. Apollo 的4个维度管理 Key-Value 格式的配置：
   - application (应用)
   - environment (环境)
   - cluster (集群)
   - namespace (命名空间)
3. WSL2下 docker 部署apollo
4. SpringBoot 集成Apollo的使用方法

- [git地址](https://github.com/ctripcorp/apollo)

- [中文文档](https://www.apolloconfig.com/#/zh/design/apollo-introduction)

-  [B站 黑马轻松入门Apollo分布式配置中心](https://www.bilibili.com/video/BV1eE41187sS)

- [配套讲义](http://www.pbteach.com/post/java_distribut/apollo_yq_doc/)

## 1. 配置和配置中心

配置主要有以下几个特点：

- 配置是独立于程序的只读变量：独立于程序的，对于程序是只读的
- 配置伴随应用的整个生命周期：启动、运行
- 配置可以有多种加载方式：程序内部硬编码，配置文件，环境变量，启动参数，基于数据库等
- 配置需要治理：权限控制、不同环境和集群配置管理

微服务化的过程中，当系统从一个单体应用被拆分成分布式系统上一个个服务节点后，配置文件也必须跟着分割，这样配置就分散了。**配置中心将配置从应用中剥离出来，统一管理，优雅的解决了配置的动态变更、持久化、运维成本等问题**。应用自身既不需要去添加管理配置接口，也不需要自己去实现配置的持久化，更不需要引入“定时任务”以便降低运维成本。 **即，配置中心就是一种统一管理各种应用配置的基础服务组件。**

一个合格的配置中心需要满足一下几个特点：

- 配置项容易读取和修改
- 添加新配置简单直接
- 支持对配置的修改的检视以把控风险
- 可以查看配置修改的历史记录
- 不同部署环境支持隔离

## 2. Apollo入门

### 2.1 主流配置中心

- Disconf，百度

- Spring Cloud Config，Spring Cloud 生态组件，可以和Spring Cloud体系无缝整合。

- Apollo，携程

- Nacos，阿里

### 2.2 Apollo特性

- **统一管理不同环境、不同集群的配置**
  - Apollo提供了一个统一界面集中式管理不同环境（environment）、不同集群（cluster）、不同命名空间（namespace）的配置。
  - 同一份代码部署在不同的集群，可以有不同的配置，比如zookeeper的地址等
  - 通过命名空间（namespace）可以很方便地支持多个不同应用共享同一份配置，同时还允许应用对共享的配置进行覆盖
- **配置修改实时生效（热发布）**
  - 用户在Apollo修改完配置并发布后，客户端能实时（1秒）接收到最新的配置，并通知到应用程序
- **版本发布管理**
  - 所有的配置发布都有版本概念，从而可以方便地支持配置的回滚
- **灰度发布**
  - 支持配置的灰度发布，比如点了发布后，只对部分应用实例生效，等观察一段时间没问题后再推给所有应用实例
- **权限管理、发布审核、操作审计**
  - 应用和配置的管理都有完善的权限管理机制，对配置的管理还分为了编辑和发布两个环节，从而减少人为的错误。
  - 所有的操作都有审计日志，可以方便地追踪问题
- **客户端配置信息监控**
  - 可以在界面上方便地看到配置在被哪些实例使用
- **提供Java和.Net原生客户端**
  - 提供了Java和.Net的原生客户端，方便应用集成
  - 支持Spring Placeholder, Annotation和Spring Boot的ConfigurationProperties，方便应用使用（需要Spring 3.1.1+）
  - 同时提供了Http接口，非Java和.Net应用也可以方便地使用
- **提供开放平台API**
  - Apollo自身提供了比较完善的统一配置管理界面，支持多环境、多数据中心配置管理、权限、流程治理等特性。不过Apollo出于通用性考虑，不会对配置的修改做过多限制，只要符合基本的格式就能保存，不会针对不同的配置值进行针对性的校验，如数据库用户名、密码，Redis服务地址等
  - 对于这类应用配置，Apollo支持应用方通过开放平台API在Apollo进行配置的修改和发布，并且具备完善的授权和权限控制

**Apollo的执行流程：**

![image-20200624231416294](http://image.kongxiao.top/image-20200624231416294.png)

- 用户在配置中心对配置进行修改并发布
- Apollo配置中心会向客户端推送最新的配置
- Apollo客户端会定时从Apollo配置中心拉取最新的配置、更新本地配置并通知到应用

### 2.3 快速开始

Quick Start需要有bash环境，Windows用户安装Git Bash

#### 01 环境要求

Java

- Apollo服务端：1.8+
- Apollo客户端：1.7+

MySQL：

- 版本要求：5.6.5+，Apollo的表结构对`timestamp`使用了多个default声明，所以需要5.6.5以上版本。

#### 02 下载Quick Start安装包

下载地址：https://github.com/nobodyiam/apollo-build-scripts

1. apollo-configservice
2. apollo-adminservice
3. apollo-portal

#### 03 创建数据库

Apollo服务端共需要两个数据库：`ApolloPortalDB` 和`ApolloConfigDB`，ApolloPortalDB 只需要在生产环境部署一个即可，**而ApolloConfigDB 需要在每个环境部署一套。**

**ApolloPortalDB**：

[apolloportaldb.sql](https://github.com/apolloconfig/apollo-build-scripts/blob/master/sql/apolloportaldb.sql)

导入apolloportaldb.sql成功后，可以通过执行以下sql语句来验证：

```
select `Id`, `AppId`, `Name` from ApolloPortalDB.App;
```

| Id   | AppId     | Name       |
| ---- | --------- | ---------- |
| 1    | SampleApp | Sample App |

**ApolloConfigDB**：

[apolloconfigdb.sql](https://github.com/apolloconfig/apollo-build-scripts/blob/master/sql/apolloconfigdb.sql)

导入apolloconfigdb.sql 成功后，可以通过执行以下sql语句来验证：

```
select `NamespaceId`, `Key`, `Value`, `Comment` from ApolloConfigDB.Item;
```

| NamespaceId | Key     | Value | Comment            |
| ----------- | ------- | ----- | ------------------ |
| 1           | timeout | 100   | sample timeout配置 |

#### 04 配置数据库连接信息

编辑 [demo.sh](https://github.com/nobodyiam/apollo-build-scripts/blob/master/demo.sh)，修改 ApolloPortalDB 和 ApolloConfigDB 相关的数据库连接信息。

```sh
# apollo config db info
apollo_config_db_url=jdbc:mysql://localhost:3306/ApolloConfigDB?characterEncoding=utf8
apollo_config_db_username=username
apollo_config_db_password=password

# apollo portal db info
apollo_portal_db_url=jdbc:mysql://localhost:3306/ApolloPortalDB?characterEncoding=utf8
apollo_portal_db_username=username
apollo_portal_db_password=password
```

#### 05 启动

Apollo默认会启动3个服务，分别使用8070, 8080, 8090端口，确保这3个端口当前没有被使用。执行启动命令：

```sh
./demo.sh start
```

1. apollo-configservice  8080
2. apollo-adminservice  8090
3. apollo-portal  8070

![image-20200627112616194](http://image.kongxiao.top/image-20200627112616194.png)

启动成功后，通过 http://localhost:8070 就可以访问，登录名/密码：  apollo/admin

SampleApp进入配置界面，可以看到当前有一个配置 timeout=100。

![image-20200627113400493](http://image.kongxiao.top/image-20200627113400493.png)

#### 06 运行客户端程序

启动Demo客户端：

```sh
./demo.sh client
```

输入`timeout`，就可以取到对应配置的值：

```sh
sh> timeout
> [SimpleApolloConfigDemo] Loading key : timeout with value: 100
```

![image-20200627113144308](http://image.kongxiao.top/image-20200627113144308.png)

### 2.4 Docker方式部署

我本机环境是 Win10，安装了 WSL2，Docker 可以直接跑在里面，以此为环境。

文档可参考：[WSL2官方安装教程](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10)

#### 01 数据库准备

Docker 部署mysql，可参考之前的博客 [Docker基本操作](http://www.kongxiao.top/archives/docker-baseuse)

> 需要注意的是，要使用 ifconfig 查看 WSL的 ip地址。
>
> 主机也可以用 localhost 连接上 WSL2，但是 WSL2 内部使用 localhost 连不上自己，因此后面的数据库 ip  都使用了下面的ip。(貌似重启这个ip会改变)



![image-20210716142200559](http://image.kongxiao.top/image-20210716142200559.png)



#### 02  Apollo Config Service

- **apollo-configservice 本身就是一个 eureka 服务**

- apollo-configservice 、 apollo-adminservice 都需要向 eureka 服务注册
- **配置项统一存储在 ApolloConfigDB.ServerConfig 表中，其中 eureka.service.url 表示 eureka 服务地址**

获取镜像

```shell
docker pull apolloconfig/apollo-configservice:1.7.0
```

运行镜像

```shell
docker run -p 8080:8080 \
    -e SPRING_DATASOURCE_URL="jdbc:mysql://172.26.100.204:3306/ApolloConfigDB?characterEncoding=utf8" \
    -e SPRING_DATASOURCE_USERNAME=root -e SPRING_DATASOURCE_PASSWORD=123456 \
    -d -v /tmp/logs:/opt/logs --name apollo-configservice apolloconfig/apollo-configservice:1.7.0
```

参数说明：

- SPRING_DATASOURCE_URL: 对应环境ApolloConfigDB的地址
- SPRING_DATASOURCE_USERNAME: 对应环境ApolloConfigDB的用户名
- SPRING_DATASOURCE_PASSWORD: 对应环境ApolloConfigDB的密码

#### 03 Apollo Admin Service

- **配置项统一存储在 ApolloConfigDB.ServerConfig 表中，其中 eureka.service.url 表示 eureka 服务地址**，即 apollo-configservice 的地址
- 这里需要修改为 01 步中提到的 ip地址，否则服务注册不上，是个坑

![image-20210716144817807](http://image.kongxiao.top/image-20210716144817807.png)

获取镜像

```
docker pull apolloconfig/apollo-adminservice:1.7.0
```

运行镜像

```
docker run -p 8090:8090 \
    -e SPRING_DATASOURCE_URL="jdbc:mysql://172.26.100.204:3306/ApolloConfigDB?characterEncoding=utf8" \
    -e SPRING_DATASOURCE_USERNAME=root -e SPRING_DATASOURCE_PASSWORD=123456 \
    -d -v /tmp/logs:/opt/logs --name apollo-adminservice apolloconfig/apollo-adminservice:1.7.0
```

参数说明：

- SPRING_DATASOURCE_URL: 对应环境ApolloConfigDB的地址
- SPRING_DATASOURCE_USERNAME: 对应环境ApolloConfigDB的用户名
- SPRING_DATASOURCE_PASSWORD: 对应环境ApolloConfigDB的密码

#### 04 Apollo Portal

获取镜像

```
docker pull apolloconfig/apollo-portal:1.7.0
```

运行镜像

```
docker run -p 8070:8070 \
    -e SPRING_DATASOURCE_URL="jdbc:mysql://172.26.100.204:3306/ApolloPortalDB?characterEncoding=utf8" \
    -e SPRING_DATASOURCE_USERNAME=root -e SPRING_DATASOURCE_PASSWORD=123456 \
    -e APOLLO_PORTAL_ENVS=dev \
    -e DEV_META=http://172.26.100.204:8080 \
    -d -v /tmp/logs:/opt/logs --name apollo-portal apolloconfig/apollo-portal:1.7.0
```

参数说明：

- SPRING_DATASOURCE_URL: 对应环境 ApolloPortalDB 的地址
- SPRING_DATASOURCE_USERNAME: 对应环境 ApolloPortalDB 的用户名
- SPRING_DATASOURCE_PASSWORD: 对应环境 ApolloPortalDB 的密码
- APOLLO_PORTAL_ENVS(可选): 对应 ApolloPortalDB 中的 apollo.portal.envs 配置项，如果没有在数据库中配置的话，可以通过此环境参数配置
- DEV_META/PRO_META(可选): 配置对应环境的 Meta Service 地址，以${ENV}_META命名，需要注意的是如果配置了 ApolloPortalDB 中的apollo.portal.meta.servers 配置，则以 apollo.portal.meta.servers 中的配置为准

#### 05 配置多环境

>  一套Portal可以管理多个环境，但是每个环境都需要独立部署一套Config Service、Admin Service和ApolloConfigDB

因此需要新建一张表 ApolloConfigDB_pro 保存 pro 环境的信息，并再起一套Config Service、Admin Service

ApolloConfigDB_pro 表中的  eureka.service.url  也需要做相应的修改

![image-20210716163808379](http://image.kongxiao.top/image-20210716163808379.png)

### 2.5 核心概念

- application (应用)

  就是实际使用配置的应用，**每个应用都需要有唯一的身份标识 -- AppId**，要使用相应的配置时，需要在代码中指定AppId

- environment (环境)

  配置对应的环境，比如生产环境、开发环境等。环境和代码无关，同一份代码部署在不同的环境就应该能够获取到不同环境的配置

- cluster (集群)

  一个应用下不同实例的分组，比如典型的可以按照数据中心分，把上海机房的应用实例分为一个集群，把北京机房的应用实例分为另一个集群。对不同的cluster，同一个配置可以有不一样的值，即进行值覆盖。

- namespace (命名空间)

  一个应用下不同配置的分组，可以简单地把namespace类比为文件，不同类型的配置存放在不同的文件中，如数据库配置文件等。分为public和private，public可以被其他应用关联，private只能被所属的应用获取到

## 3. Java客户端使用

### 3.1 发布配置

新建项目，指定**唯一的身份标识 -- AppId**后，可以进行配置发布。支持的单个key-value形式输入，也可以直接使用文本模式批量添加、修改。

新增或者修改配置后，都需要点击发布才能生效。

![image-20210716174942416](http://image.kongxiao.top/image-20210716174942416.png)

### 3.2 SpringBoot集成方式获取配置

架构图：

![image-20200627115949993](http://image.kongxiao.top/image-20200627115949993.png)

Apollo支持应用在不同的环境有不同的配置，所以需要在运行提供给Apollo客户端当前环境的Apollo Meta Server信息。默认情况下，meta server和config service是部署在同一个JVM进程，所以meta server的地址就是config service的地址。

#### 01 添加apollo客户端依赖

```xml
<dependency>
    <groupId>com.ctrip.framework.apollo</groupId>
    <artifactId>apollo-client</artifactId>
    <version>1.1.0</version>
</dependency>

<dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-web</artifactId>
</dependency>

```

#### 02 指定AppId

在Spring Boot application.yml 中配置

application.yml：

```yml
 #指定appid
app:
  id: test
apollo:
  bootstrap:
    enabled: true  #将Apollo配置加载提到初始化日志系统之前
    eagerLoad:
      enabled: true
    namespaces: application   #指定命名空间
  cluster: default
  cacheDir: /tmp/apollo-cache   #缓存路径
```

#### 03 Apollo Meta Server

Apollo支持应用在不同的环境有不同的配置，常用的指定方式有如下两种：

- 第一种：配置VM options：`-Denv=DEV -Dapollo_meta=http://172.26.100.204:8080`

- 第二种：在resources目录下新建apollo-env.properties文件，可配置多套环境，需要配合环境参数使用

  ```properties
  dev.meta=http://172.26.100.204:8080
  pro.meta=http://172.26.100.204:8081
  ```

#### 04 Environment

通过 VM options 的env来指定环境：`-Denv=DEV`

配合 apollo-env.properties文件可以切换不同的环境

#### 05 本地缓存路径

Apollo客户端会把从服务端获取到的配置在本地文件系统缓存一份，用于在遇到服务不可用，或网络不通的时候，依然能从本地恢复配置，不影响应用正常运行。本地配置文件会以下面的文件名格式放置于配置的本地缓存路径下：{appId}+{cluster}+{namespace}.properties

可以通过 VM options 的apollo.cacheDir指定缓存路径，

```properties
 -Dapollo.cacheDir=/opt/data/apollo-config
```

#### 06 Cluster（集群）

通过Java System Property的apollo.cluste来指定集群：`-Dapollo.cluster=DEFAULT`

#### 07 通过系统配置文件

还可以通过配置文件来指定 `env=YOUR-ENVIRONMENT`

- 对于Mac/Linux，默认文件位置为 `/opt/settings/server.properties`
- 对于Windows，默认文件位置为`C:\opt\settings\server.properties`

```properties
env=DEV
apollo.meta=http://172.26.100.204:8080
```



## 4. 灰度发布

1. 对于一些对程序有比较大影响的配置，可以先在一个或者多个实例生效，观察一段时间没问题后再全量发布配置。
2. 对于一些需要调优的配置参数，可以通过灰度发布功能来实现A/B测试。可以在不同的机器上应用不同的配置，不断调整、测评一段时间后找出较优的配置再全量发布配置。

通过创建灰度版本，可以对某些配置做灰度测试

灰度流程为:

1. 创建灰度版本
2. 配置灰度配置项
3. 配置灰度规则。如果是私有的namespace可以按照客户端的IP进行灰度，如果是公共的namespace则可以同时按AppId和客户端的IP进行灰度
4. 灰度发布
   灰度版本最终有两种结果:**全量发布和放弃灰度**
   **全量发布**:灰度的配置合到主版本并发布，所有的客户端都会使用合并后的配置
   **放弃灰度**:删除灰度版本，所有的客户端都会使用回主版本的配置
   注意事项:如果灰度版本已经有灰度发布过，那么修改灰度规则后，无需再次灰度发布就立即生效