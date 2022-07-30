---
title: Linux使用Jenkins+Docker自动化部署DotNET6
date: 2022-07-29 18:30:00
categories: Other
tags: ['技术'] 
description: 阿里云CentOS持续集成部署DotNET6
photos: https://cdn.lovetianci.cn/themes/images/background/14.jpg
---
### CI/CD首次在Linux上使用
<!-- more -->
## [安装Jenkins](https://www.jenkins.io/doc/book/installing/linux/ "官方文档")
```shell
sudo wget -O /etc/yum.repos.d/jenkins.repo \
    https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
sudo yum upgrade
# Add required dependencies for the jenkins package
sudo yum install java-11-openjdk
sudo yum install jenkins
# 如果出现no packages
# 再输入第一句代码
```
{% fb_img Java_11_OpenJDK_Install.png 安装Java环境 %}
{% fb_img Jenkins_Install.png 安装Jenkins %}
### 启动Jenkins
```shell
service jenkins start
```
### 查看状态
```shell
service jenkins status
```
### 运行正常
{% fb_img Jenkins_Run_Success.png Jenkins运行成功 %}

### 如果遇到这种情况
{% fb_img Jenkins_Status.jpg 查看状态 %}
### 这个报错信息百度很久也没解决
### 后面查看内存使用率才发现原来GitLab吃的内存太多
### 查看内存使用率
```shell
free -h
```
{% fb_img Free_Mem.jpg 查看状态 %}
### 开启GitLab只剩下247M内存，关闭之后剩2.7G
### 然后重启Jenkins就可以正常打开了
### 输入以下命令即可将密码打印在控制台
```shell
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```
{% fb_img Run.jpg 启动Jenkins %}

## [安装DotNET6 SDK](https://docs.microsoft.com/zh-cn/dotnet/core/install/linux-centos "官方文档")
### 安装 .NET 之前，请运行以下命令，将 Microsoft 包签名密钥添加到受信任密钥列表，并添加 Microsoft 包存储库。 打开终端并运行以下命令：
```shell
sudo rpm -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm
```
### .NET SDK 使你可以通过 .NET 开发应用。 如果安装 .NET SDK，则无需安装相应的运行时。 若要安装 .NET SDK，请运行以下命令：
```shell
sudo yum install dotnet-sdk-6.0
```
{% fb_img DotNET6SDK_Install.png 安装DotNET6 %}

### 安装docker（设置阿里yum源）
```shell
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```
### 可以查看所有仓库中所有docker版本，并选择特定版本安装
```shell
yum list docker-ce --showduplicates | sort -r
```
### 由于repo中默认只开启stable仓库，故这里安装的是最新稳定版
```shell
sudo yum install docker-ce
```
{% fb_img Docker_Install.png 安装docker %}
### 启动docker
```shell
sudo systemctl start docker
sudo systemctl status docker
```
{% fb_img Docker_Run_Success.png 启动docker %}
### 安装Git
```shell
yum install -y git
```
{% fb_img Git_Install.png 安装Git %}

### Jenkins配置shell自动化部署
### 创建Jobs配置Git选择构建中的执行Shell
### Jenkins下的项目目录/var/lib/jenkins/jobs
### 可以进入对应项目中的workspace进行编译，编译通过基本就没啥问题了
### Jenkins中运行的shell命令
```shell
#!/bin/bash
pwd
dotnet restore
dotnet build
dotnet publish
#输出一提示的话
echo "Successfully^_^ ......................................................................................"
#输出当前地址，可以在日志中看到当前路径，检查一些路径问题
pwd
# 删除所有容器
docker rm -vf $(docker ps -aq)
# 删除所有镜像
docker rmi -f $(docker images -aq)
#构建镜像命令
docker build -t dotnet6api .
#运行镜像
#--naem dotnet6api是容器名称
#dotnet6api是绑定的镜像名称
#5000是对外暴露的端口
#80是docker内部绑定的端口
docker run -d -p 5000:80 --restart=always --name dotnet6api dotnet6api
```
### 首次Jenkins构建会报错，报错信息dial unix /var/run/docker.sock: connect: permission denied
```shell
# 添加当前用户到docker用户组  ${USER}指用户名
sudo gpasswd -a ${USER} docker
# 查看用户组下用户，检查添加是否成功
cat /etc/group | grep docker
# 重启docker服务
sudo service docker restart
# 切换当前会话到新组【group】或重启会话
newgrp - docker
# 更改文件权限
sudo chmod 666 /var/run/docker.sock
```
### 再次构建项目
{% fb_img DotNET6API_Run_Success.png 构建成功 %}
### 输入IP加端口号项目运行正常
### 踩到一个小坑，因为日志用的是Log4net，而日志文件名叫Log4net.Config中间有大写
### 最后编译报错找不到log4net.config，后面把文件名改为小写即可通过了
### DockerFile是通过VS自动生成的没有任何修改，将其移动到解决方案sln同级目录即可

## docker基本命令
### 查看所有镜像
```shell
docker image ls
```
### 查看所有容器
```shell
docker ps -a
```
### 停止指定容器
```shell
docker stop 容器名
```
### 删除指定容器
```shell
docker rm 容器名
```
### 删除所有容器
```shell
docker rm -vf $(docker ps -aq)
```
### 删除指定镜像
```shell
docker rmi 镜像名
```
### 删除所有镜像
```shell
docker rmi -f $(docker images -aq)
```
### 停止Docker服务并查看运行状态
```shell
service docker stop
service docker status
```