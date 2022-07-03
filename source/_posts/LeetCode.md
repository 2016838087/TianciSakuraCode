---
title: LeetCode算法题
date: 2022-05-18 13:35:00
categories: Other
tags: ['技术'] 
description: LeetCode简单算法题的具体代码实现
photos: https://cdn.lovetianci.cn/themes/images/background/38.jpg
top: true
---
### 刷过LeetCode才发现自己的基础是这么的烂
<!-- more -->
### 两数之和
```csharp
/// <summary>
/// 两数之和
/// </summary>
/// <param name="nums"></param>
/// <param name="target"></param>
/// <returns></returns>
public static int[] TwoSum(int[] nums, int target)
{
    for (int i = 0; i < nums.Length; i++)
    {
        for (int j = 0; j < nums.Length; j++)
        {
            if (i != j)
            {
                if (nums[i] + nums[j] == target)
                {
                    return new int[] { i, j };
                }
            }
        }
    }
    return null;
}
```
### 两数相加（抄来的并且已经提交）
```csharp
public class ListNode
{
    public int val;
    public ListNode next;
    public ListNode(int val = 0, ListNode next = null)
    {
        this.val = val;
        this.next = next;
    }
}

/// <summary>
/// 两数相加（抄来的并且已经提交）
/// </summary>
/// <param name="l1"></param>
/// <param name="l2"></param>
/// <returns></returns>
public static ListNode AddTwoNumbers(ListNode l1, ListNode l2)
{
    ListNode dummyHead = new ListNode(-1);
    ListNode pre = dummyHead;
    int t = 0;
    while (l1 != null || l2 != null || t != 0)
    {
        if (l1 != null)
        {
            t += l1.val;
            l1 = l1.next;
        }
        if (l2 != null)
        {
            t += l2.val;
            l2 = l2.next;
        }
        pre.next = new ListNode(t % 10);
        pre = pre.next;
        t /= 10;
    }

    return dummyHead.next;
}
```
### 回文数
```csharp
/// <summary>
/// 回文数
/// </summary>
/// <param name="x"></param>
/// <returns></returns>
public static bool IsPalindrome(int x)
{
    if (x < 0)
    {
        return false;
    }
    string num = x.ToString();
    List<string> list = new List<string>();
    for (int i = 0; i < num.Length; i++)
    {
        list.Add(num[i].ToString());
    }
    var arr = list.ToArray();
    Array.Reverse(arr);
    string num2 = string.Empty;
    for (int i = 0; i < arr.Length; i++)
    {
        num2 += arr[i].ToString();
    }
    return x == Convert.ToInt32(num2);
    //别人的方法
    //if (x < 0)
    //    return false;
    //int rem = 0, y = 0;
    //int quo = x;
    //while (quo != 0)
    //{
    //    rem = quo % 10;
    //    y = y * 10 + rem;
    //    quo = quo / 10;
    //}
    //return y == x;
}
```
### 有效的括号
```csharp
/// <summary>
/// 有效的括号
/// </summary>
/// <param name="s"></param>
/// <returns></returns>
public static bool IsValid(string s)
{
    while (s.Contains("()") || s.Contains("{}") || s.Contains("[]"))
    {
        s = s.Replace("()", "").Replace("{}", "").Replace("[]", "");
    }

    return s.Length == 0;
}
```
### 各位相加
```csharp
/// <summary>
/// 各位相加
/// </summary>
/// <param name="num"></param>
/// <returns></returns>
public static int AddDigits(int num)
{
    string number = num.ToString();
    int x = 0;
    while (Convert.ToInt32(number) >= 10)
    {
       for (int i = 0; i < number.Length; i++)
       {
           x += Convert.ToInt32(number[i].ToString());
       }
       if (x >= 10)
       {
           number = x.ToString();
           x = 0;
           continue;
       }
       return x;
    }
    return num;
    //别人的方法（属实是佩服这种思路和逻辑）
    //return (num - 1) % 9 + 1;
}
```
### 寻找两个正序数组的中位数
```csharp
/// <summary>
/// 寻找两个正序数组的中位数
/// </summary>
/// <param name="nums1"></param>
/// <param name="nums2"></param>
/// <returns></returns>
public static double FindMedianSortedArrays(int[] nums1, int[] nums2)
{
    List<int> list = new List<int>();
    list.AddRange(nums1);
    list.AddRange(nums2);
    list.Sort();
    int count = 0;
    if (list.Count % 2 == 0)
    {
        count = list.Count / 2;
        double num = list[count - 1] + list[count];
        return Convert.ToDouble(num / 2);
    }
    list.Add(list[list.Count - 1]);
    list.Sort();
    count = list.Count / 2;
    return list[count - 1];
}
```
### 快乐数
```csharp
/// <summary>
/// 快乐数
/// </summary>
/// <param name="n"></param>
/// <returns></returns>
public static bool IsHappy(int n)
{
    if (n == 1)
    {
        return true;
    }
    List<int> list = new List<int>();//存一个数
    while (n > 1)
    {
        int num2 = 0;
        string num = n.ToString();
        for (int i = 0; i < num.Length; i++)
        {
            num2 += Convert.ToInt32(num[i].ToString()) * Convert.ToInt32(num[i].ToString());
        }
        list.Add(num2);
        if (list.Where(s => s.Equals(num2)).ToList().Count > 1)
        {
            //如果多次循环则返回false
            return false;
        }
        if (num2 == 1)
        {
            return true;
        }
        n = num2;
    }
    return false;
}
```
### 加一
```csharp
/// <summary>
/// 加一
/// </summary>
/// <param name="digits"></param>
/// <returns></returns>
public static int[] PlusOne(int[] digits)
{
    List<int> list = new List<int>();
    list.AddRange(digits);
    for (int i = digits.Length - 1; i >= 0; i--)
    {
        if (digits[i] != 9)
        {
            //第一次循环最后一位数不为9直接+1返回结果
            digits[i]++;
            return digits;
        }
        //否则当前下标数进位满10为0
        digits[i] = 0;
    }
    //循环走完说明全是9，长度+1
    int[] arr = new int[digits.Length + 1];
    arr[0] = 1;
    return arr;
}
```
### 移动零
```csharp
/// <summary>
/// 移动零
/// </summary>
/// <param name="nums"></param>
public static void MoveZeroes(int[] nums)
{
    int length = nums.Length;
    int i, j = 0;
    for (i = 0; i < length; i++)
    {
        if (nums[i] != 0)
        {
            nums[j] = nums[i];
            j++;
        }
    }
    while (j < length)
    {
        nums[j++] = 0;
    }
}
```
### 将找到的值乘以2
```csharp
/// <summary>
/// 将找到的值乘以2
/// </summary>
/// <param name="nums"></param>
/// <param name="original"></param>
/// <returns></returns>
public static int FindFinalValue(int[] nums, int original)
{
    for (int i = 0; i < nums.Length; i++)
    {
        if (nums[i] == original)
        {
            return FindFinalValue(nums, original *= 2);
        }
    }
    return original;
}
```
### 排列硬币
```csharp
/// <summary>
/// 排列硬币
/// </summary>
/// <param name="n"></param>
/// <returns></returns>
public static int ArrangeCoins(int n)
{
    if (n == 1)
    {
        return 1;
    }
    int count = 0;
    int m = n;
    for (int i = 1; i < m; i++)
    {
        if (n - i >= 0)
        {
            n -= i;
            count++;
            continue;
        }
        return count;
    }
    return count;
}
```
### 两整数相加（这题有点侮辱智商）
```csharp
/// <summary>
/// 两整数相加
/// </summary>
/// <param name="num1"></param>
/// <param name="num2"></param>
/// <returns></returns>
public static int Sum(int num1, int num2)
{
    return num1 + num2;
}
```
### 只出现一次的数字（抄来的未提交）
```csharp
/// <summary>
/// 只出现一次的数字（抄来的未提交）
/// </summary>
/// <param name="nums"></param>
/// <returns></returns>
public static int SingleNumber(int[] nums)
{
   return nums.Aggregate((a, b) => a ^ b);
}
```
### 只出现一次的数字（暴力写法照样能写出来）
```csharp
/// <summary>
/// 只出现一次的数字
/// </summary>
/// <param name="nums"></param>
/// <returns></returns>
public static int SingleNumber(int[] nums)
{
    List<int> list = new List<int>();
    list.AddRange(nums);
    for (int i = 0; i < list.Count; i++)
    {
        if (list.Where(s => s == list[i]).ToList().Count == 1)
        {
            return list[i];
        }
    }
    return 0;
}
```
###  2的幂
```csharp
/// <summary>
///  2的幂
/// </summary>
/// <param name="n"></param>
/// <returns></returns>
public static bool IsPowerOfTwo(int n)
{
    if (n == 1)
    {
        return true;
    }
    if (n % 2 != 0 || n <= 0)
    {
        return false;
    }
    return IsPowerOfTwo(n / 2);
}
```