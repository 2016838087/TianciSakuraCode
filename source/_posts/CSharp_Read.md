---
title: C#读取文本文件
date: 2020-07-19 12:30:00
categories: DotNET
tags: ['技术'] 
description: 读取txt的一些方法
photos: https://cdn.lovetianci.cn/themes/images/background/7.jpg
---
<!-- more -->
### 静态方法读取所有内容
```csharp
File.ReadAllText(@"F:\bintianci\MyCode\1.txt", System.Text.Encoding.UTF8)
```
### 静态方法读取所有行
```csharp
string[] allLines = File.ReadAllLines(@"F:\bintianci\MyCode\1.txt", System.Text.Encoding.UTF8);

//遍历输出
foreach (string line in allLines)
{
    Console.WriteLine(line);
}
```
### 一次读一行
```csharp
//文件路径
string filePath = @"F:\bintianci\MyCode\1.txt";

//文本读取器
using (TextReader reader = new StreamReader(filePath, System.Text.Encoding.UTF8))
{
    //一次读一行
    string? textLine = reader.ReadLine();

    ////遍历读取
    while (textLine != null)
    {
       //输出读取的内容
       Console.WriteLine(textLine);
       //停一下
       System.Threading.Thread.Sleep(500);
       //继续读
       textLine = reader.ReadLine();
    }
}
Console.ReadKey();
```
### 一次读一个字符
```csharp
//文件路径
string filePath = @"F:\bintianci\MyCode\1.txt";

//文本读取器
using (TextReader reader = new StreamReader(filePath, System.Text.Encoding.UTF8))
{
    //一次读一个字符
    int textChar = reader.Read();

    ////遍历读取
    while (textChar != -1)
    {
       //输出读取的内容
       Console.Write((char)textChar);
       //停一下
       System.Threading.Thread.Sleep(100);
       //继续读
       textChar = reader.Read();
    }
}
Console.ReadKey();
```
### 一次性读完
```csharp
//文件路径
string filePath = @"F:\bintianci\MyCode\1.txt";

//文本读取器
using (TextReader reader = new StreamReader(filePath, System.Text.Encoding.UTF8))
{
    //一次性读完
    string textContent = reader.ReadToEnd();

    //输出读取的内容
    Console.WriteLine(textContent);
}
Console.ReadKey();
```