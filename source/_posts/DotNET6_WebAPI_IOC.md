---
title: DotNET6 自动注入到IOC容器
date: 2022-07-05 16:00:00
categories: DotNET #分类
tags: ['技术'] #标签
description: 接口和实现自动注入到IOC容器
photos: https://cdn.lovetianci.cn/themes/images/background/17.jpg
---
### 在开发过程中手动注入接口和实现很麻烦而且代码很冗余
<!-- more -->
### 所以需要整一个自动注入的方法解放双手

### 需要定义一个注入类型的枚举
````csharp
/// <summary>
/// 注入类型
/// </summary>
public enum InjectType
{
    //作用域
    Scope,

    //单例
    Single,

    //瞬时
    Transient
}
````
### 定义一个Attribute
````csharp
[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
public class AutoInjectAttribute : Attribute
{
    public AutoInjectAttribute(Type interfaceType, InjectType injectType)
    {
        Type = interfaceType;
        InjectType = injectType;
    }

    public Type Type { get; set; }

    /// <summary>
    /// 注入类型
    /// </summary>
    public InjectType InjectType { get; set; }
}
````
### 自动依赖注入的方法
````csharp
/// <summary>
/// 自动依赖注入
/// </summary>
public static class AutoInject
{
    /// <summary>
    /// 自动注入所有的程序集有InjectAttribute标签
    /// </summary>
    /// <param name="serviceCollection"></param>
    /// <returns></returns>
    public static IServiceCollection AddAutoDi(this IServiceCollection serviceCollection)
    {
        var path = AppDomain.CurrentDomain.BaseDirectory;
        var assemblies = Directory.GetFiles(path, "*.dll").Select(Assembly.LoadFrom).ToList();
        foreach (var assembly in assemblies)
        {
            var types = assembly.GetTypes().Where(a => a.GetCustomAttribute<AutoInjectAttribute>() != null)
                .ToList();
            if (types.Count <= 0) continue;
            foreach (var type in types)
            {
                var attr = type.GetCustomAttribute<AutoInjectAttribute>();
                if (attr?.Type == null) continue;
                switch (attr.InjectType)
                {
                    case InjectType.Scope:
                        serviceCollection.AddScoped(attr.Type, type);
                        break;
                    case InjectType.Single:
                        serviceCollection.AddSingleton(attr.Type, type);
                        break;
                    case InjectType.Transient:
                        serviceCollection.AddTransient(attr.Type, type);
                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }
        }

        return serviceCollection;
    }
}
````
### 实现层和接口层
````csharp
/// <summary>
/// 实现层调用特性
/// </summary>
[AutoInject(typeof(IHomeDataService), InjectType.Scope)]
public class HomeDataService: IHomeDataService
{
    public string GetUser()
    {
        return "张三";
    }
}

/// <summary>
/// 接口层不需要做任何处理
/// </summary>
public interface IHomeDataService
{
    string GetUser();
}
````
### Program注册到服务
````csharp
var builder = WebApplication.CreateBuilder(args);
// 自动注入
builder.Services.AddAutoDi();
````
### 即可完成自动注入

### 第二种方法扩展性更高，先定义三个接口对应三个生命周期
````csharp
/// <summary>
/// 单例
/// </summary>
public interface ISingleton
{
}
````

````csharp
/// <summary>
/// 瞬时
/// </summary>
public interface ITransient
{
}
````

````csharp
/// <summary>
/// 作用域
/// </summary>
public interface IScoped
{
}
````
### 自动注入的方法
````csharp
/// <summary>
/// 自动注入
/// </summary>
public static class AutoDI
{
    /// <summary>
    /// 注入数据
    /// </summary>
    /// <param name="services"></param>
    public static IServiceCollection AddDataService(this IServiceCollection services)
    {
        var singletonType = typeof(ISingleton); // 单例
        var transientType = typeof(ITransient); // 瞬时
        var scopedType = typeof(IScoped); // 作用域
        // 获取实现了三个生命周期接口的程序集
        var allTypes = AppDomain.CurrentDomain.GetAssemblies()
            .SelectMany(a => a.GetTypes().Where(t => 
            t.GetInterfaces().Contains(transientType) || 
            t.GetInterfaces().Contains(singletonType)|| 
            t.GetInterfaces().Contains(scopedType)));
        // class的程序集
        var implementTypes = allTypes.Where(x => x.IsClass).ToArray();
        // 接口的程序集
        var interfaceTypes = allTypes.Where(x => x.IsInterface).ToArray();
        foreach (var implementType in implementTypes)
        {
            var interfaceType = interfaceTypes.FirstOrDefault(x => x.IsAssignableFrom(implementType));
            // class有接口，用接口注入
            if (interfaceType != null)
            {
                // 判断用什么方式注入
                if (interfaceType.GetInterfaces().Contains(singletonType))
                {
                    // 单例
                    services.AddSingleton(interfaceType, implementType);
                }
                else if (interfaceType.GetInterfaces().Contains(transientType))
                {
                    // 瞬时
                    services.AddTransient(interfaceType, implementType);
                }
                else if(interfaceType.GetInterfaces().Contains(scopedType))
                {
                    // 作用域
                    services.AddScoped(interfaceType, implementType);
                }
            }
            else // class没有接口，直接注入class
            {
                // 判断用什么方式注入
                if (implementType.GetInterfaces().Contains(singletonType))
                {
                    // 单例
                    services.AddSingleton(implementType);
                }
                else if(implementType.GetInterfaces().Contains(transientType))
                {
                    // 瞬时
                    services.AddTransient(implementType);
                }
                else if (implementType.GetInterfaces().Contains(scopedType))
                {
                    // 作用域
                    services.AddScoped(implementType);
                }
            }
        }
        return services;
    }
}
````
### Program注册服务
````csharp
// 自动注入
AutoDI.AddDataService(builder.Services);
````
### 使用方法：在需要使用的接口继承对应生命周期的接口即可

````csharp
/// <summary>
/// 实现层不做处理
/// </summary>
public class HomeDataService: IHomeDataService
{
    public string GetUser()
    {
        return "张三";
    }
}
 
/// <summary>
/// 接口层继承生命周期接口
/// </summary>
public interface IHomeDataService: ISingleton
{
    string GetUser();
}
````