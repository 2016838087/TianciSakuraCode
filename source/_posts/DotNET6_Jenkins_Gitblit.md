---
title: DotNET6集成Jenkins+GitBlit部署到IIS
date: 2022-07-11 15:00:00
categories: DotNET
tags: ['技术'] 
description: 半自动化部署
photos: https://cdn.lovetianci.cn/themes/images/background/4.jpg
---
### 通过Jenkins和GitBlit联合完成半自动化部署
<!-- more -->
### 服务器需要安装相应的环境
[Git环境](https://github.com/git-for-windows/git/releases/download/v2.37.0.windows.1/Git-2.37.0-64-bit.exe "Git环境")
[DotNET6运行时环境](https://download.visualstudio.microsoft.com/download/pr/0d000d1b-89a4-4593-9708-eb5177777c64/cfb3d74447ac78defb1b66fd9b3f38e0/dotnet-hosting-6.0.6-win.exe "DotNET6运行时环境")
[DotNET6编译环境SDK](https://download.visualstudio.microsoft.com/download/pr/15ab772d-ce5c-46e5-a90e-57df11adabfb/4b1b1330b6279a50c398f94cf716c71e/dotnet-sdk-6.0.301-win-x64.exe "DotNET6编译环境SDK")
[JDK11](https://repo.huaweicloud.com/java/jdk/11.0.2+9/jdk-11.0.2_windows-x64_bin.exe "JDK11")
[Jenkins安装包](https://mirrors.tuna.tsinghua.edu.cn/jenkins/windows/2.358/jenkins.msi "Jenkins安装包")
### 首先打开教程[安装GitBlit](https://lovetianci.cn/Other/GitBlit_Windows10/ "安装GitBlit")并配置Java环境
### 安装DotNET6运行时环境和SDK，并安装Git
### 通过官方[安装Jenkins](https://www.jenkins.io/doc/book/installing/windows/ "安装Jenkins")流程进行安装
### 所有环境搭建完毕访问所配置的端口进入Jenkins安装系统推荐插件，进入系统并修改管理员密码
### 新建项目，选择Freestyle project
{% fb_img CreateProject.png 创建项目 %}
### 选择源码管理Git输入Git仓库地址并设置分支
### 因为GitBlit和Jenkins都是在同一服务器所以我用私网IP
{% fb_img GitSetting.png 仓库地址及分支 %}
### 创建Credentials也就是Git用户信息不然无法拉取代码（只需要填写账号和密码）
{% fb_img UserSetting.png Git用户信息配置 %}

### 拉到倒数第二个构建，选择执行Windows cmd命令
{% fb_img cmd.png 执行脚本命令 %}
### 输入以下命令
```cmd
dotnet restore --还原
dotnet build --编译
C:\Windows\System32\inetsrv\appcmd.exe stop site "DotNET6API" --停止IIS中的指定网站
C:\Windows\System32\inetsrv\appcmd.exe stop apppool /apppool.name:"DotNET6API" --停止IIS中的指定应用程序池
dotnet publish -o "C:\WebFile\DotNET6API" --将编译文件发布到指定目录下
C:\Windows\System32\inetsrv\appcmd.exe start site "DotNET6API" --启动IIS中的指定网站
C:\Windows\System32\inetsrv\appcmd.exe start apppool /apppool.name:"DotNET6API" --启动IIS中的指定应用程序池
```
### 配置完成点击构建即可看到完成状态
{% fb_img BuildSuccess.png 构建项目 %}

### 注意事项（如果Git报错：Failed to connect to repository : Error performing command: git.exe ls-remote -h xxxxxxx HEAD）
### 说明Git.exe找不到对应地址，需要将Git绝对路径进行修改（输入服务器Git安装地址默认在C盘Program Files文件夹下）
{% fb_img GitUrl1.png Git地址配置 %}
{% fb_img GitUrl2.png Git地址配置 %}