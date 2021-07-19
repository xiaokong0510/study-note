# 使用Typora+PicGo+七牛云搭建图床

初学Java时，接触了Typora这个MarkDown文本编辑神器，使用起来非常方便。

但是对于图片的处理稍显不足，之前一直是保存在本地，使用本地连接引用图片。上传md文档时还得同时上传图片源文件，不是很方便。

网上发现Typora 新版支持图床，研究了一下，可以更方便插入图片了。记录一下过程



## 1 创建七牛云的账号并创建新的空间

官网：https://www.qiniu.com/

1. 创建七牛云账号，控制台--对象存储，立即添加，新建存储空间

![image-20210203104101614](http://image.kongxiao.top/image-20210203104101614.png)





![image-20210719111531800](http://image.kongxiao.top/image-20210719111531800.png)

![image-20210203104330378](http://image.kongxiao.top/image-20210203104330378.png)

![image-20210203104605197](http://image.kongxiao.top/image-20210203104605197.png)

2. 绑定自己已经备案过的域名。可以使用二级域名

   ![image-20210719111445945](http://image.kongxiao.top/image-20210719111445945.png)

![image-20210203105148979](http://image.kongxiao.top/image-20210203105148979.png)



3. 复制这个CNAME码，去域名网站设置解析

![image-20210203105346598](http://image.kongxiao.top/image-20210203105346598.png)



## 2 域名解析

我的域名是在阿里云买的，

因此登录阿里云控制台，域名，解析，添加记录

主机记录就是上面自己设置的二级域名

记录值就是上面复制的 CNAME码

![image-20210719113255381](http://image.kongxiao.top/20210719113256.png)

## 3 下载并安装 PicGo

官网：https://github.com/Molunerfinn/PicGo

![image-20210203111740848](http://image.kongxiao.top/image-20210203111740848.png)



进入图床设置，设置七牛图床相关参数。

![image-20210203111857239](http://image.kongxiao.top/image-20210203111857239.png)

- **AccessKey 和 SercetKey** ：可以在七牛云密钥管理中查到

![image-20210203112110367](http://image.kongxiao.top/image-20210203112110367.png)



![image-20210719113411464](http://image.kongxiao.top/20210719113412.png)



- **存储空间名称**：即自己创建的空间名称
- **访问网址**：自己设置的二级域名，记得加http

- **存储区域**：可以对照下表查看

![image-20210203113321040](http://image.kongxiao.top/image-20210203113321040.png)

将默认的图床设置成七牛就完事了。

我还设置了上传文件时以时间戳重命名，防止出现重名覆盖。

![image-20210719113100935](http://image.kongxiao.top/20210719113101.png)

## 4 Typora的设置

文件--偏好设置。

选择PicGo的路径，以及插入图片时的操作即可。可以点击验证是否配置正确。

![](http://image.kongxiao.top/20210719112830.png)

可以根据个人喜好设置，我设置的是插入图片时无操作，插入图片后由我手动选择是否上传。

以后就可以愉快的插入图片啦！

![image-20210719112951069](http://image.kongxiao.top/20210719112952.png)