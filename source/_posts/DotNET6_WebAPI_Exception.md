---
title: DotNET6 WebAPI全局异常处理及拦截器
date: 2022-07-05 15:00:00
categories: DotNET #分类
tags: ['技术'] #标签
description: 接口异常处理
photos: https://cdn.lovetianci.cn/themes/images/background/17.jpg
---

## 记录一下DotNET6 WebAPI全局异常处理

<!-- more -->

### 通常接口出现一些小错误，页面会返回一堆看不懂的代码

### 这对于我们寻找错误并没有什么太大的帮助，反而看着很难受

{% fb_img errormsg.png 错误信息 %}

### 遇到这种情况我们可以写一个全局异常过滤器，接口报错直接跳到过滤器

### 首先新建一个ExceptionFilter类，继承至ExceptionFilterAttribute

### 代码如下
````csharp
/// <summary>
/// 全局异常过滤器
/// </summary>
public class ExceptionFilter : ExceptionFilterAttribute
{
    private readonly ILogger<ExceptionFilter> _logger;
    /// <summary>
    /// 构造函数注入
    /// </summary>
    /// <param name="logger"></param>
    public ExceptionFilter(ILogger<ExceptionFilter> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// 全局捕获异常方法
    /// </summary>
    /// <param name="context"></param>
    public override void OnException(ExceptionContext context)
    {
        if (!context.ExceptionHandled)
        {
            context.Result = new JsonResult(new { Code = 500, Message = context.Exception.Message, Data = "接口发生错误" });
            string ActionRoute = ((Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor)context.ActionDescriptor).DisplayName;
            _logger.LogError("请求路径：{0}，错误信息：{1}", ActionRoute, context.Exception.Message);
            context.ExceptionHandled = true;
        }
    }
}
````
### 请求拦截器
````csharp
/// <summary>
/// 请求拦截器
/// </summary>
public class GlobalActionFilter : IActionFilter
{
    private readonly ILogger<GlobalActionFilter> _logger;

    public GlobalActionFilter(ILogger<GlobalActionFilter> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// 执行方法前
    /// </summary>
    /// <param name="context"></param>
    public void OnActionExecuting(ActionExecutingContext context)
    {
        //执行方法前先执行这
        _logger.LogInformation("执行前");
    }

    /// <summary>
    /// 执行方法后
    /// </summary>
    /// <param name="context"></param>
    public void OnActionExecuted(ActionExecutedContext context)
    {
        //执行方法后执行这
        _logger.LogInformation("执行后");
    }
}
````
### 然后在Program类里面全局配置
````csharp
var builder = WebApplication.CreateBuilder(args);

// 异常处理
builder.Services.AddMvcCore(options =>
{
    // 异常过滤器
    options.Filters.Add<ExceptionFilter>();
    // Action拦截器
    options.Filters.Add<GlobalActionFilter>();
}).AddJsonOptions(options =>
{
    // 配置Json序列化大小写处理
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
    options.JsonSerializerOptions.DictionaryKeyPolicy = null;
    // 解决中文被编码
    options.JsonSerializerOptions.Encoder = JavaScriptEncoder.Create(UnicodeRanges.All);
});
````
{% fb_img backmsg.png 返回信息 %}

### 接口异常就会返回错误信息供开发人员排查，为了防止返回的Json大小写不匹配，我还加了Json大小写处理，确定Json输出和后台定义的格式以及大小写一致，和返回的中文乱码情况

{% fb_img error.png 异常分析 %}