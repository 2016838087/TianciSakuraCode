---
title: C#常见算法题
date: 2020-03-03 10:20:30
categories: DotNET #分类
tags: ['面试题'] #标签
description: 面试常见的简单算法题
photos: https://cdn.jsdelivr.net/gh/2016838087/SakuraHexoFile@master/themes/images/bg.jpg #背景图
---

## 记录一下遇到过的面试题
<!-- more -->
{% fb_img low.png 我怎么这么垃圾，我要有技术会是这鬼样？ %}

## 打印出2000-2500之间所有的闰年年份
#### 1.年份必须为4的倍数
```csharp
for (int a = 2000; a <= 2500; a++)
{
    if (a % 4 == 0)
    {
        Console.WriteLine(a);
    }
}
```
## 打印出1+2!+3!+...+20!的和，就是1-20的阶乘之和

### 第一种方法
```csharp
static void Main(string[] args)
{
    int sum = 0;
    for (int i = 1; i <= 20; i++)
    {
        sum += jieCheng(i);
    }
    Console.WriteLine(sum);
    Console.ReadKey();
}
static int jieCheng(int n)
{
    if (n == 1)
    {
        return 1;
    }
    else
    {
        return n * jieCheng(n - 1);
    }
}
```
### 第二种方法
```csharp
int sum = 0;
int n = 20;
for (int i = 1; i <= n; i++)
{
    int temp = 1;
    for (int j = 1; j <= i; j++)
    {
        temp *= j;
    }
    sum += temp;
}
Console.WriteLine(sum);
Console.ReadKey();
```

## 写出一个方法，参数是三个整数（x,y,z），按从小到大排序

### 第一种使用数组自带的排序
```csharp
static void PaiXu(int x, int y, int z)
{
    int[] num = new int[3];
    num[0] = x;
    num[1] = y;
    num[2] = z;
    Array.Sort(num);
    Console.WriteLine("从小到大结果依次为：");
    for (int i = 0; i < num.Length; i++)
    {
        Console.WriteLine(num[i]);
    }
}
```

### 如果题目要求从用户输入的三个整数来进行排序的话，可以这样写
```csharp
int[] num = new int[3];
Console.WriteLine("请输入三个整数");
for (int i = 0; i < num.Length; i++)
{
    Console.WriteLine("请输入第{0}个数字", i + 1);
    num[i] = Convert.ToInt32(Console.ReadLine());
}
//从小到大排序
Array.Sort(num);
Console.WriteLine("数字从小到大依次为：");
for (int i = 0; i < num.Length; i++)
{
    Console.WriteLine(num[i]);
}
Console.ReadKey();
```

## 1，1，2，3，5，8，...获取第30个数值

### 没有规定的话这个方便理解
```csharp
int[] list = new int[30];
list[0] = 1;
list[1] = 1;
for (int i = 2; i < 30; i++)
{
    list[i] = list[i - 1] + list[i - 2];
    Console.WriteLine(list[i]);
}
Console.ReadKey();
```

### 必须使用递归的话可以这样写
```csharp
static void Main(string[] args)
{
    for (int i = 0; i < 30; i++)
    {
        Console.WriteLine(GetNum(i));
    }
    Console.ReadKey();
}
static int GetNum(int n)
{
    if (n == 0 || n == 1)
    {
        return 1;
    }
    else
    {
        return GetNum(n - 1) + GetNum(n - 2);
    }
}
```

## 最经典的冒泡排序
```csharp
int tem = 0;
int[] list = { 1, 23, 12, 421, 31, 213, 42 };
for (int i = 0; i < list.Length - 1; i++)
{
    for (int j = 0; j < list.Length - 1 - i; j++)
    {
        if (list[j] > list[j + 1])
        {
            tem = list[j];
            list[j] = list[j + 1];
            list[j + 1] = tem;
        }
    }
}
Console.ReadKey();
```
## 产生一个int数组，长度为100，并向其中随即插入1-100，且不能重复
```csharp
List<int> lst = new List<int>();
Random r = new Random();
while (true)
{
    int temp = r.Next(1, 101);
    if (lst.Count == 100)
    {
        break;
    }
    if (!lst.Contains(temp))
    {
        lst.Add(temp);
    }
}
for (int i = 0; i < lst.Count; i++)
{
    Console.WriteLine(lst[i]);
}
Console.ReadKey();
```
## 打印九九乘法表
```csharp
int i, j;
for (i = 1; i <= 9; i++)
{
    for (j = 1; j <= i; j++)
    {
        Console.Write("{0}*{1}={2,2} ", j, i, j * i);
    }
    Console.WriteLine();
}
Console.ReadKey();
```

## 无师自通的水仙花数，两种方式都可以取个十百位
```csharp
for (int i = 100; i < 1000; i++)
{
    //int n1 = i / 100 % 10;//百位
    //int n2 = i / 10 % 10; //十位
    //int n3 = i % 10;//个位
    string num = i.ToString();
    int n1 = int.Parse(num[0].ToString());//百位
    int n2 = int.Parse(num[1].ToString());//十位
    int n3 = int.Parse(num[2].ToString());//个位
    if (n1 * n1 * n1 + n2 * n2 * n2 + n3 * n3 * n3 == i)
    {
        Console.WriteLine(i);
    }
}
```
### 行了行了就这样吧！！！