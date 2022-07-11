---
title: DotNET6集成Log4Net
date: 2022-07-04 15:00:00
categories: DotNET
tags: ['技术'] 
description: 集成日志组件打印日志
photos: https://cdn.lovetianci.cn/themes/images/background/29.jpg
---
### 项目中常用的日志组件为Log4Net，今天记录一下最简单集成Log4Net的方法
<!-- more -->
### 准备工作：
- 创建WebAPI项目，这边使用的.NET6
- 安装Nuget包：Microsoft.Extensions.Logging.Log4Net.AspNetCore
- 添加Log4net.Config配置文件

```xml
<?xml version="1.0" encoding="utf-8"?>
<log4net>
    <appender name="RollingAppender" type="log4net.Appender.RollingFileAppender">
        <!--指定日志文件保存的目录-->
        <file value="log\"/>
        <!--追加日志内容-->
        <appendToFile value="true"/>
        <!--可以为：Once|Size|Date|Composite-->
        <!--Compoosite为Size和Date的组合-->
        <rollingStyle value="Composite"/>
        <!--设置为true，当前最新日志文件名永远为file字节中的名字-->
        <staticLogFileName value="false"/>
        <!--当备份文件时，备份文件的名称及后缀名-->
        <datePattern value="yyyyMMdd'.log'"/>
        <!--日志最大个数-->
        <!--rollingStyle节点为Size时，只能有value个日志-->
        <!--rollingStyle节点为Composie时，每天有value个日志-->
        <maxSizeRollBackups value="20"/>
        <!--可用的单位：KB|MB|GB-->
        <maximumFileSize value="5MB"/>
        <filter type="log4net.Filter.LevelRangeFilter">
            <param name="LevelMin" value="ALL"/>
            <param name="LevelMax" value="FATAL"/>
        </filter>
        <layout type="log4net.Layout.PatternLayout">
            <conversionPattern value="%date [%thread] %-5level %logger [%property{NDC}] - %message%newline"/>
        </layout>
    </appender>
    <root>
        <priority value="ALL"/>
        <level value="ALL"/>
        <appender-ref ref="RollingAppender"/>
    </root>
</log4net>
```
### 在.NET6配置如下
```csharp
var builder = WebApplication.CreateBuilder(args);
//配置日志
builder.Services.AddLogging(log =>
{
    log.AddLog4Net();
    //默认的配置文件路径是在根目录，且文件名为Log4Net.Config
    //如果文件路径或名称有变化，需要重新设置其路径或名称
    //比如在项目根目录下创建一个名为config的文件夹，将Log4Net.Config文件移入其中，并改名为log.config
    //则需要使用下面的代码来进行配置
    //log.AddLog4Net(new Log4NetProviderOptions()
    //{
    //    Log4NetConfigFileName = "config/log.config",
    //    Watch = true
    //});
});
```
### 接下来就可以在控制器或者接口实现去使用构造函数注入了
```csharp
//控制器内使用
private ILogger<FileController> _logger;
public FileController(ILogger<FileController> logger)
{
    _logger = logger;
    _logger.LogError("This is FileController Log");
}
```
### 运行即可看到项目生成目录多了一个log文件夹以及日志文件