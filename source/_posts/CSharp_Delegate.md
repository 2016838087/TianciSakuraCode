---
title: C# Delegate
date: 2020-02-10 22:00:00
categories: DotNET #分类
tags: ['技术'] #标签
description: 委托的基本使用
photos: https://cdn.lovetianci.cn/themes/images/background/8.jpg
---
### 用基本的代码了解委托Delegate、Action和Func的用法
<!-- more -->
### 直接上代码
```csharp
// 定义委托
public delegate void SayHello(string userName);

class Program
{
    // 英文方法
    private static void EnglishSay(string userName)
    {
        Console.WriteLine("Hello!" + userName);
    }

    // 中文方法
    private static void ChineseSay(string userName)
    {
        Console.WriteLine("你好!" + userName);
    }

    // 将委托当参数传入另一个方法
    private static void Say(string userName, SayHello say)
    {
        say(userName);
    }

    // 定义一个方法给Action
    private static void GetString(string name)
    {
        Console.WriteLine(name);
    }

    // 定义一个方法给Func
    public static bool IsNull(string text)
    {
        return string.IsNullOrEmpty(text) || string.IsNullOrWhiteSpace(text);
    }
    static void Main()
    {
        // Delegate用法
        Say("小明", EnglishSay);
        Say("小明", ChineseSay);

        // Action无参无返回值
        Action action = () => Console.WriteLine("Hello world!");

        // Action有参无返回值（需定义方法并调用）
        Action<string> stringAction = new Action<string>(GetString);
        stringAction("小明");

        // Action有参无返回值（匿名方法直接调用）
        Action<string> string2Action = new Action<string>(ac =>
        {
            Console.WriteLine(ac);// ac等于调用传参的李四
        });
        string2Action("小萌");

        // Func有参有返回值（需定义方法并调用）
        Func<string, bool> isNullFunc = new Func<string, bool>(IsNull);
        Console.WriteLine(isNullFunc(""));

        // Func有参有返回值（匿名方法直接调用）
        Func<string, bool> isNull2Func = new Func<string, bool>(ac =>
        {
            return string.IsNullOrEmpty(ac) || string.IsNullOrWhiteSpace(ac);// ac等于调用传参的空字符串
        });
        Console.WriteLine(isNull2Func(""));

        Console.ReadKey();
    }
}
```