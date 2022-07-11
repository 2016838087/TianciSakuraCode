---
title: DotNET6使用SqlSugar连接数据库
date: 2022-07-06 16:00:00
categories: DotNET #分类
tags: ['技术'] #标签
description: SqlSugar连接MySQL和SQL Server数据库
photos: https://cdn.lovetianci.cn/themes/images/background/18.jpg
---
### DotNET6 多数据库配置
<!-- more -->
### 首先连接SQL Server只需要安装SqlSugarCore包就可以了
### 数据库上下文类
````csharp
/// <summary>
/// 数据库上下文类
/// </summary>
public class SqlSugarContext
{
    /// <summary>
    /// 连接字符串
    /// </summary>
    public static string? ConnectionString { get; set; }

    /// <summary>
    /// 获取连接实例
    /// </summary>
    /// <returns></returns>
    public static SqlSugarClient GetInstance()
    {
        var db = new SqlSugarClient(new ConnectionConfig
        {
            ConnectionString = ConnectionString,
            DbType = DbType.SqlServer,// 切换数据库类型
            IsAutoCloseConnection = true,// 自动释放数据务，如果存在事务，在事务结束后释放
            InitKeyType = InitKeyType.Attribute// 从实体特性中读取主键自增列信息
        });
        return db;
    }
}
````
### 连接字符串配置
````json
"ConnectionStrings": {
    "MySQLConnection": "server=127.0.0.1;uid=用户名;pwd=密码;port=3306;database=数据库名称;SslMode=None",
    // 本地MySQL
    "WorkMySQLConnection": "server=127.0.0.1;uid=用户名;pwd=密码;port=3307;database=数据库名称;SslMode=None",
    // 本地SQL Server
    "WorkSQLServerConnection": "Data Source=.;Initial Catalog=数据库名称;uid=用户名;pwd=密码;Pooling=true;"
  }
````
### Program赋值连接字符串
````csharp
// 连接字符串
SqlSugarContext.ConnectionString = builder.Configuration.GetConnectionString("WorkSQLServerConnection");
````
### 这样就可以直接使用了
````csharp
using (var db = SqlSugarContext.GetInstance())
{
    var db = SqlSugarContext.GetInstance();
    //如果不存在创建数据库存在不会重复创建 
    db.DbMaintenance.CreateDatabase(); // 注意 ：Oracle和个别国产库需不支持该方法，需要手动建库 


    //创建表根据实体类CodeFirstTable1     
    db.CodeFirst.InitTables(typeof(MenuInfo));//这样一个表就能成功创建了

    return "success";
}
````
### MySQL则需要多安装一个nuget包：MySql.Data
### 修改连接字符串为MySQL连接
````csharp
SqlSugarContext.ConnectionString = builder.Configuration.GetConnectionString("MySQLConnection");
````
### 修改上下文类SqlSugarContext中的DbType为Mysql即可切换数据库