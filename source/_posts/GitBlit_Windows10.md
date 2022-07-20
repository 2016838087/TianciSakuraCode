---
title: Windows服务器搭建Git管理平台
date: 2020-10-11 21:00:00
categories: Other
tags: ['技术'] 
description: Windows服务器搭建GitBlit
photos: https://cdn.lovetianci.cn/themes/images/background/19.jpg
---

## 突然发现GitLab只能安装在Linux上，Windows上的叫GitBlit
<!-- more -->
## Windows服务器搭建GitBlit需要安装Java环境

[Java环境下载](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html#license-lightbox "Java环境下载")
[GitBlit-1.9.1.zip](https://github.com/gitblit/gitblit/releases/download/v1.9.1/gitblit-1.9.1.zip "GitBlit-1.9.1.zip")
## 下载JavaJDK并配置环境

### 此电脑->属性->高级系统设置->环境变量->系统变量->新建

```Shell
变量名：JAVA_HOME
变量值：电脑上JDK安装的绝对路径
```

```Shell
变量名：CLASSPATH
变量值：.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;
```

### 选择系统变量Path这一列点编辑
{% fb_img path.jpg 环境变量 %}

### 然后新增两行
{% fb_img path2.jpg 环境变量 %}
```Shell
%JAVA_HOME%\bin
%JAVA_HOME%\jre\bin
```

### 打开cmd输入java -version查看版本号，没有错误说明安装成功

### 打开data文件夹编辑找到defaults.properties配置文件

```Shell
# 设置版本库的位置

git.repositoriesFolder = Git仓库保存地址（默认在根目录git文件夹）

# 设置端口号

server.httpPort = 端口号

# 设置ip地址

server.httpBindInterface = 本机ipv4

server.certificateAlias = localhost
```

### 修改installService.cmd文件
```Shell
@REM arch = x86, amd64, or ia32
SET ARCH=amd64
SET CD = C:\WebFile\GitBlit --(GitBlit解压后的路径)
```

### 然后在命令窗口运行gitblit.cmd（切记cmd窗口不能关闭）

### 第二种以服务的形式启动，双击运行installService.cmd就会在服务中新增一个gitblit服务

### 启动即可

{% fb_img service.PNG 服务配置 %}

### 最后以管理员账号登陆，就可以自己添加存储库了，然后自行拉取提交推送