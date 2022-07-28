---
title: Linux安装GitLab
date: 2022-07-28 18:30:00
categories: Other
tags: ['技术'] 
description: 阿里云CentOS安装GitLab
photos: https://cdn.lovetianci.cn/themes/images/background/13.jpg
---
<!-- more -->
### 首先准备一台Linux服务器，我这使用的是阿里云ECS的CentOS 7.8 64位（2核(vCPU) 4 GiB）
### 安装依赖包
```shell
sudo yum install -y curl policycoreutils-python openssh-server
```
{% fb_img 安装依赖包.jpg 安装依赖包 %}

### 执行以下命令，使用官方脚本添加Yum源
```shell
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | bash
```
{% fb_img 使用官方脚本添加Yum源.jpg 使用官方脚本添加Yum源 %}

### 安装GitLab（这边是CE版本也就是社区版，EE是企业版）
```shell
yum -y install gitlab-ce
```
{% fb_img 安装GitLab.jpg 安装GitLab %}

### 初始化GitLab配置
```shell
gitlab-ctl reconfigure
```
{% fb_img 初始化配置.jpg 初始化配置 %}

### 找到GitLab文件夹下的gitlab.rb
```shell
vi gitlab.rb
```
{% fb_img 修改配置文件.jpg 修改配置文件 %}
### 然后输入i进入insert模式，找到external_url将地址改为自己的服务器内网地址加端口号
### 再输入:wq!保存并退出
### 再初始化一次配置文件
```shell
gitlab-ctl reconfigure
```
### 阿里云服务器需要配置安全组的规则来释放端口（这一步就跳过了）
### 启动服务
```shell
gitlab-ctl start
```
{% fb_img 运行GitLab.jpg 运行GitLab %}
### 打开对应IP地址即可查看
{% fb_img 运行成功.jpg 运行成功 %}
### 管理员账号默认root密码在initial_root_password文件中