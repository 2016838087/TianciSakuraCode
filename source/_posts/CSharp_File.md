---
title: C#获取指定文件夹所有文件
date: 2020-12-30 17:00:00
categories: DotNET #分类
tags: ['技术'] #标签
description: C#文件操作
photos: https://gcore.jsdelivr.net/gh/2016838087/SakuraHexoFile@master/themes/images/background/40.jpg
---
### 2020快过完了，赶紧水一篇博客
<!-- more -->
````csharp
//获取桌面路径
string desktop = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
string path = string.Format(@"{0}\{1}", desktop, "加密前");
DirectoryInfo folder = new DirectoryInfo(path);
//从路径下循环获取文件
foreach(FileInfo file in folder.GetFiles())
{
  //打印文件路径到控制台
  Console.WriteLine(file.FullName);
}
Console.ReadKey();
````
### 控制台打印信息
{% fb_img console.png 控制台打印信息 %}
### 很明显，这个打印的顺序就不对
### 可以稍加修改一下，写入到txt
````csharp
string desktop = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
string path = string.Format(@"{0}\{1}", desktop, "加密前");
DirectoryInfo folder = new DirectoryInfo(path);
StreamWriter txt;
if (File.Exists(desktop + "\\" + "路径.txt"))
{
  //把原来的删掉重新创建一个
  File.Delete(desktop + "\\" + "路径.txt");
  txt = File.CreateText(desktop + "\\" + "路径.txt");
}
else
{
  //创建->路径.txt
  txt = File.CreateText(desktop + "\\" + "路径.txt");
}
List<string> fileNameList = new List<string>();
foreach (FileInfo file in folder.GetFiles())
{
  //写入到list里面存储
  fileNameList.Add(file.FullName);
}
//创建一个数组
string[] list=new string[fileNameList.Count];
//把list值加到数组
for(int i = 0; i < fileNameList.Count; i++)
{
  list[i] = fileNameList[i];
}
//调用排序方法
Array.Sort(list, new FileNameSort());
foreach(var fileUrl in list)
{
  //写入txt
  txt.WriteLine(fileUrl);
  Console.WriteLine(fileUrl);
}
//释放资源
txt.Close();
txt.Dispose();
Console.ReadKey();
````
### 这里说一下为啥要创建list和数组
### 因为看上图顺序是乱的，所以就排序了一下

{% fb_img console2.png 控制台打印信息 %}
### 这一次就没问题了
{% fb_img txt.png 文本写入 %}
### 包括文本写入也正常

### 排序的方法
````csharp
public class FileNameSort : IComparer
{
  //调用windos 的 DLL
  [System.Runtime.InteropServices.DllImport("Shlwapi.dll", CharSet = CharSet.Unicode)]
  private static extern int StrCmpLogicalW(string param1, string param2);

  //前后文件名进行比较。
  public int Compare(object name1, object name2)
  {
    if (null == name1 && null == name2)
    {
      return 0;
    }
    if (null == name1)
    {
      return -1;
    }
    if (null == name2)
    {
      return 1;
    }
    return StrCmpLogicalW(name1.ToString(), name2.ToString());
  }
}
````