---
title: .NET6 部署IIS
date: 2022-07-08 17:00:00
categories: DotNET
tags: ['技术'] 
description: .NET6部署Windows服务器
photos: https://cdn.lovetianci.cn/themes/images/background/16.jpg
---
## .NET6部署IIS必要操作
<!-- more -->
### VS2022发布项目到文件夹，然后拷贝到服务器

### 安装DotNET6运行时环境
[点击下载：dotnet-hosting-6.0.6-win.exe](https://download.visualstudio.microsoft.com/download/pr/0d000d1b-89a4-4593-9708-eb5177777c64/cfb3d74447ac78defb1b66fd9b3f38e0/dotnet-hosting-6.0.6-win.exe "下载地址")

### 配置Program中的Swagger
### 将开发模式开启改为默认开启
````csharp
// 开发模式开启Swagger
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}
app.UseSwagger();
app.UseSwaggerUI();
````

### 即可访问接口和Swagger