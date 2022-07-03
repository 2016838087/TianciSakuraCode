---
title: LeetCode算法题第二章
date: 2022-07-03 16:00:00
categories: Other
tags: ['技术'] 
description: LeetCode简单算法题的具体代码实现
photos: https://cdn.lovetianci.cn/themes/images/background/34.jpg
top: true
---
### LeetCode算法题第二章
<!-- more -->
###  3的幂
```csharp
/// <summary>
///  3的幂
/// </summary>
/// <param name="n"></param>
/// <returns></returns>
public static bool IsPowerOfThree(int n)
{
    if (n == 1)
    {
        return true;
    }
    if (n % 3 != 0 || n <= 0)
    {
        return false;
    }
    return IsPowerOfThree(n / 3);
}
```
###  4的幂
```csharp
/// <summary>
///  4的幂
/// </summary>
/// <param name="n"></param>
/// <returns></returns>
public static bool IsPowerOfFour(int n)
{
    if (n == 1)
    {
        return true;
    }
    if (n % 4 != 0 || n < 0)
    {
        return false;
    }
    return IsPowerOfFour(n / 4);
}
```
### 第三大的数
```csharp
/// <summary>
/// 第三大的数
/// </summary>
/// <param name="n"></param>
/// <returns></returns>
public static int ThirdMax(int[] nums)
{
    Array.Sort(nums);
    Array.Reverse(nums);
    nums = nums.Distinct().ToArray();
    if (nums.Length >= 3)
    {
        return nums[2];
    }
    return nums[0];
}
```
### 斐波那契数
```csharp
/// <summary>
/// 斐波那契数
/// </summary>
/// <param name="n"></param>
/// <returns></returns>
public static int Fib(int n)
{
    if(n == 0)
    {
        return 0;
    }
    if (n == 1)
    {
        return 1;
    }
    return Fib(n - 1) + Fib(n - 2);
}
```
### 三个数的最大乘积
```csharp
/// <summary>
/// 三个数的最大乘积
/// </summary>
/// <param name="nums"></param>
/// <returns></returns>
public static int MaximumProduct(int[] nums)
{
    Array.Sort(nums);
    return nums[0] * nums[1] * nums[nums.Length - 1] > nums[nums.Length - 1] * nums[nums.Length - 2] * nums[nums.Length - 3] ? nums[0] * nums[1] * nums[nums.Length - 1] : nums[nums.Length - 1] * nums[nums.Length - 2] * nums[nums.Length - 3];
}
```
###  X的平方根（emmm没想通直接用Math了）
```csharp
/// <summary>
///  X的平方根
/// </summary>
/// <param name="x"></param>
/// <returns></returns>
public static int MySqrt(int x)
{
    return (int)Math.Sqrt(x);
}
```
### 二分查找（用了最简单的方法但也通过了，但是要求是二分查找所以重写了）
```csharp
/// <summary>
/// 二分查找
/// </summary>
/// <param name="nums"></param>
/// <param name="target"></param>
/// <returns></returns>
public static int Search(int[] nums, int target)
{
    //Array.Sort(nums);
    //for (int i = 0; i < nums.Length; i++)
    //{
    //    if (nums[i] == target)
    //    {
    //        return i;
    //    }
    //}
    //return -1;
    //二分查找
    Array.Sort(nums);
    int start = 0;
    int end = nums.Length - 1;
    while (start < end)
    {
        int mid = (start + end) / 2;
        if (nums[mid] == target)
        {
            return mid;
        }
        if (nums[mid] > target)
        {
            end = mid - 1;
        }
        if (nums[mid] < target)
        {
            start = mid + 1;
        }
    }
    return -1;
}
```
### 整数反转（自己写的不符合要求）
```csharp
/// <summary>
/// 整数反转
/// </summary>
/// <param name="x"></param>
/// <returns></returns>
public static int Reverse(int x)
{
    string num = string.Empty;
    if (x < 0)
    {
        num = (x * -1).ToString();//变正数
    }
    else
    {
        num = (x * -1).ToString();
    }
    string nums = string.Empty;
    for (int i = num.Length-1; i >= 0; i--)
    {
        //最后一位是0的话就跳出
        if (num[num.Length - 1] == 0)
        {
            continue;
        }
        nums += num[i].ToString();
    }
    if (x < 0)
    {
        return Convert.ToInt32(nums) * -1;//还原符号
    }
    return Convert.ToInt32(nums);
}
```
### 整数反转（借鉴了别人Java的解题思路）
```csharp
/// <summary>
/// 整数反转
/// </summary>
/// <param name="x"></param>
/// <returns></returns>
public static int Reverse(int x)
{
    long n = 0;
    while (x != 0)
    {
        n = n * 10 + x % 10;
        x = x / 10;
    }
    return (int)n == n ? (int)n : 0;
}
```
### 检查两个字符串数组是否相等
```csharp
/// <summary>
/// 检查两个字符串数组是否相等
/// </summary>
/// <param name="word1"></param>
/// <param name="word2"></param>
/// <returns></returns>
public static bool ArrayStringsAreEqual(string[] word1, string[] word2)
{
    string txt1 = string.Empty;
    string txt2 = string.Empty;
    for (int i = 0; i < word1.Length; i++)
    {
       txt1 += word1[i].ToString();
    }
    for (int i = 0; i < word2.Length; i++)
    {
       txt2 += word2[i].ToString();
    }
    return txt1 == txt2;
    //别人的一句代码解决（性能好过一丢丢）
    //return string.Join("", word1).Equals(string.Join("", word2));
}
```
### 合并两个有序数组（性能杠杠滴就是写完就看不懂了）
```csharp
/// <summary>
/// 合并两个有序数组
/// </summary>
/// <param name="nums1"></param>
/// <param name="m"></param>
/// <param name="nums2"></param>
/// <param name="n"></param>
public static void Merge(int[] nums1, int m, int[] nums2, int n)
{
    if (m == 0)
    {
        nums1 = new int[n];
        for (int i = 0; i < nums2.Length; i++)
        {
            if (i == n)
            {
                break;
            }
            if (nums2[i] != 0)
            {
                nums1[i] = nums2[i];
            }
        }
    }
    if (n == 0)
    {
        int[] num3 = nums1;
        for (int i = 0; i < num3.Length; i++)
        {
            if (i == m)
            {
                break;
            }
            if (num3[i] != 0)
            {
                nums1[i] = num3[i];
            }
        }
    }
    else
    {
        Array.Sort(nums1);
        Array.Sort(nums2);
        Array.Reverse(nums2);
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < nums1.Length; j++)
            {
                if (nums1[j] == 0)
                {
                    nums1[j] = nums2[i];
                    break;
                }
            }
        }
        Array.Sort(nums1);
    }
}
```
### 有序数组中出现次数超过25%的元素
```csharp
/// <summary>
/// 有序数组中出现次数超过25%的元素
/// </summary>
/// <param name="arr"></param>
/// <returns></returns>
public static int FindSpecialInteger(int[] arr)
{
    int count = arr.Length / 4;
    List<int>list=arr.ToList();
    for (int i = 0; i < list.Count; i++)
    {
        if (list.Where(s => s == list[i]).ToList().Count > count)
        {
            return list[i];
        }
    }
    return 0;
}
```
### 字符串压缩
```csharp
/// <summary>
/// 字符串压缩
/// </summary>
/// <param name="S"></param>
/// <returns></returns>
public static string CompressString(string S)
{
    S += "?";
    string key = string.Empty;
    string text = string.Empty;
    int count = 0;
    for (int i = 0; i < S.Length; i++)
    {
        if (i == 0)
        {
            key = S[i].ToString();
        }
        if (key == S[i].ToString())
        {
            count++;
        }
        else
        {
            text += S[i - 1].ToString() + count.ToString();
            key = S[i].ToString();
            count = 1;
        }
    }
    return text.Length <= S.Length - 1 ? text: S.Replace("?", "") ;
}
```
###  将字符串拆分为若干长度为 k 的组（头发掉光写法）
```csharp
/// <summary>
///  将字符串拆分为若干长度为 k 的组（头发掉光写法）
/// </summary>
/// <param name="s"></param>
/// <param name="k"></param>
/// <param name="fill"></param>
/// <returns></returns>
public static string[] DivideString(string s, int k, char fill)
{
    int mold = s.Length % k;//余数
    int remainder = (s.Length - mold) / k;//获取需要几个item
    int count = 0;//item数量

    if (remainder > 0)
    {
        count += remainder;
    }
    if (mold > 0)
    {
        count++;
    }
    if (count > 0)
    {
        List<string> list = new List<string>();
        int sum = 0;
        for (int i = 0; i < count; i++)
        {
            string text = string.Empty;
            int kcount = 0;//获取数量
            for (int j = 0; j < s.Length; j++)
            {
                if (i == count - 1 && mold > 0)
                {
                    text += s[sum].ToString();
                    kcount++;
                    //最后一次遍历
                    if (sum == s.Length - 1)
                    {
                        int x = k - kcount;
                        for (int w = 0; w < x; w++)
                        {
                            text += fill.ToString();
                        }
                        list.Add(text);
                        return list.ToArray();
                    }
                    sum++;
                    continue;
                }
                text += s[sum].ToString();
                kcount++;
                sum++;
                if (kcount == k)
                {
                    list.Add(text);
                    break;
                }
            }
        }
        return list.ToArray();
    }
    return null;    
}
```
###  将字符串拆分为若干长度为 k 的组（先补齐后分割）
```csharp
/// <summary>
///  将字符串拆分为若干长度为 k 的组（先补齐后分割）
/// </summary>
/// <param name="s"></param>
/// <param name="k"></param>
/// <param name="fill"></param>
/// <returns></returns>
public static string[] DivideString(string s, int k, char fill)
{
    //不如原来的性能好
    int mold = s.Length % k;//余数
    int remainder = (s.Length - mold) / k;//获取需要几个item
    int count = 0;//item数量

    if (remainder > 0)
    {
       count += remainder;
    }
    if (mold > 0)
    {
       count++;
    }
    if (count > 0)
    {
       int kcount = count * k - s.Length;//补齐数
       for (int i = 0; i < kcount; i++)
       {
           s += fill.ToString();
       }
       List<string> list = new List<string>();
       int sum = 0;
       for (int i = 0; i < count; i++)
       {
           string text = string.Empty;
           kcount = 0;//获取数量
           for (int j = 0; j < s.Length; j++)
           {                        
               text += s[sum].ToString();
               kcount++;
               sum++;
               if (kcount == k)
               {
                   list.Add(text);
                   break;
               }
           }
       }
       return list.ToArray();
    }
    return null;
}
```