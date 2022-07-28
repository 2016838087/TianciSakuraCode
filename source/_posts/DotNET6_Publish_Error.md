---
title: DotNET6发布Publish失败
date: 2022-07-19 17:30:00
categories: DotNET
tags: ['技术'] 
description: DotNET6发布相关
photos: https://cdn.lovetianci.cn/themes/images/background/12.jpg
---
<!-- more -->
### 错误信息
```Powershell
C:\Program Files\dotnet\sdk\6.0.100\Sdks\Microsoft.NET.Sdk\targets\Microsoft.NET.ConflictResolution.targets(112,5): error NETSDK1152: 找到了多个具有相同相对路径的发布输出文件: 
```
### 官方文档解决属性[ErrorOnDuplicatePublishOutputFiles](https://docs.microsoft.com/zh-cn/dotnet/core/project-sdk/msbuild-props#erroronduplicatepublishoutputfiles "ErrorOnDuplicatePublishOutputFiles")
### ErrorOnDuplicatePublishOutputFiles 属性与当 MSBuild 在发布输出中检测到重复文件时 SDK 是否生成错误 NETSDK1148 有关，但无法确定要删除的文件。 如果不希望生成错误，请将 ErrorOnDuplicatePublishOutputFiles 属性设置为 false
### 解决方法：在指定项目的csproj文件内加上如下代码
```XML
<PropertyGroup>
    <ErrorOnDuplicatePublishOutputFiles>false</ErrorOnDuplicatePublishOutputFiles>
</PropertyGroup>
```

### 发布命令，但是会替换所有文件
```Powershell
dotnet publish -c Release -o "D:\publish" 
```

### 如果在项目发布的时候不想替换配置文件例如appsettings.json
```XML
<ItemGroup>
    <Content Update="appsettings.json" CopyToPublishDirectory="Never" Condition="'$(Configuration)' == 'Release'"/>
</ItemGroup>
```
### 这句代码的意思是发布Release环境不复制配置文件
### CopyToPublishDirectory属性值
- Never  从不复制
- Always 总是复制
- PreserveNewest 复制最新的

### 扩展知识：如果项目包含第三方Nuget包可以查看[DotNET_Nuget](https://docs.microsoft.com/zh-cn/dotnet/core/tools/dotnet-nuget-add-source "DotNET_Nuget")
- 将 myNuget 添加为源：
```Powershell
dotnet nuget add source 源链接 -n myNuget
```
- 将 c:\packages 添加为本地源：
```Powershell
dotnet nuget add source c:\packages
```
- 添加需要身份验证的源：
```Powershell
dotnet nuget add source 源链接 -n 自定义源名称 -u 账号 -p 密码 --store-password-in-clear-text
```