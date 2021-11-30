---
title: .NET Core导出PDF和Excel
date: 2021-11-30 16:00:00
categories: DotNET
tags: ['技术'] 
description: 一些公共方法
photos: https://cdn.jsdelivr.net/gh/2016838087/SakuraHexoFile@master/themes/images/background/34.jpg
---
### 关于生成PDF和Excel文件的最简单方法
<!-- more -->
### 导出Excel需要导入EPPlus包
### 导入命名空间
```csharp
using OfficeOpenXml;
```
### 示例代码如下
```csharp
/// <summary>
/// 导出Excel
/// </summary>
/// <param name="DataList">数据集</param>
/// <param name="FileName">文件名（可空）</param>
/// <returns></returns>
public string GetExcel(List<DataEntity> DataList, string FileName)
{
    string WebRootFolder = Directory.GetCurrentDirectory() + @"/TaskExcel/";
    if (!Directory.Exists(WebRootFolder))
    {
        Directory.CreateDirectory(WebRootFolder);
    }
    if (string.IsNullOrWhiteSpace(FileName))
    {
        FileName = Guid.NewGuid().ToString();
    }
    FileInfo file = new FileInfo(Path.Combine(WebRootFolder, FileName + ".xlsx"));
    //指定EPPlus使用非商业证书
    ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
    using (ExcelPackage package = new ExcelPackage(file))
    {
        // 添加worksheet
        ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("DeliveryReceipt");
        //添加头
        //worksheet.Cells.Style.ShrinkToFit = true;//单元格自动适应大小
        worksheet.Cells[1, 1].Value = "姓名";
        worksheet.Cells[1, 2].Value = "年龄";
        worksheet.Cells[1, 3].Value = "余额";
        worksheet.Column(1).Width = 25;
        worksheet.Column(2).Width = 25;
        worksheet.Column(3).Width = 10;
        worksheet.Column(3).Style.Numberformat.Format = "￥#,##0.00";//金额格式
        
        int rowCount = 1;//行
        int cellCount = 0;//列
        for (int i = 0; i < DataList.Count; i++)
        {
            rowCount++;
            worksheet.Cells[rowCount, ++cellCount].Value = DataList[i].UserName;
            worksheet.Cells[rowCount, ++cellCount].Value = DataList[i].Age;
            worksheet.Cells[rowCount, ++cellCount].Value = DataList[i].Money;
            cellCount = 0;//重置
        }
        package.Save();
    }
    return "/TaskExcel/" + FileName + ".xlsx";
}
```
### .NET Core导出PDF需要导入iTextSharp.LGPLv2.Core
### 导入命名空间
```csharp
using iTextSharp.text;
using iTextSharp.text.pdf;
```
### 示例代码如下
```csharp
public string GetPDF(List<DataEntity> DataList,string FileName)
{
    //生成pdf
    Document document = new Document();
    //根目录下添加文件夹存放PDF
    string fileFolder = Directory.GetCurrentDirectory() + @"/TaskPDF/";
    if (!Directory.Exists(fileFolder))
    {
        Directory.CreateDirectory(fileFolder);
    }
    if (string.IsNullOrWhiteSpace(FileName))
    {
        FileName = Guid.NewGuid().ToString();
    }
    string filepath = fileFolder + FileName + ".pdf";
    var fileStream = File.Create(filepath);
    PdfWriter pw = PdfWriter.GetInstance(document, fileStream);
    document.Open();
    for (int i = 0; i < DataList.Count; i++)
    {
        document.NewPage();
        //指定字体文件，IDENTITY_H：支持中文
        string fontpath = @"C:\Windows\Fonts\SIMHEI.TTF";
        BaseFont customfont = BaseFont.CreateFont(fontpath, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
        //设置字体颜色样式
        var baseFont = new Font(customfont)
        {
            Color = new BaseColor(0, 0, 0),//设置字体颜色
            Size = 8  //字体大小
        };

        #region 头部

        //定义字体样式
        var headerStyle = new Font(customfont)
        {
            Color = new BaseColor(0, 0, 0),
            Size = 18,
        };

        var head = new Paragraph("配送任务单", headerStyle)
        {
            IndentationLeft = 200f
        };

        var headerStyle2 = new Font(customfont)
        {
            Color = new BaseColor(0, 0, 0),
            Size = 10,
        };
        var para = new Paragraph(string.Format("用户姓名：{0}            昵称：{1}", DataList[i].UserName, DataList[i].NickName), headerStyle2)
        {
            IndentationLeft = -30f
        };

        var placeholder = new Paragraph("   ", headerStyle2);//上方文字与表格相隔间距

        PdfPTable tableRow_2 = new PdfPTable(8)
        {
            TotalWidth = 580f,
            LockedWidth = true
        };
        tableRow_2.DefaultCell.Border = Rectangle.NO_BORDER;
        tableRow_2.WidthPercentage = 100;
        tableRow_2.DefaultCell.MinimumHeight = 80f;
        float[] headWidths_2 = new float[] { 50f, 120f, 60f, 150f, 220f, 140f, 50f, 70f };//搭配TotalWidth和LockedWidth使用

        tableRow_2.SetWidths(headWidths_2);

        var Row_2_Cell_1 = new PdfPCell(new Paragraph("序号", baseFont))
        {
            HorizontalAlignment = Element.ALIGN_CENTER,//文字居中
            BackgroundColor = BaseColor.LightGray
        };
        tableRow_2.AddCell(Row_2_Cell_1);

        var Row_2_Cell_2 = new PdfPCell(new Paragraph("第一列", baseFont))
        {
            HorizontalAlignment = Element.ALIGN_CENTER,
            BackgroundColor = BaseColor.LightGray
        };
        tableRow_2.AddCell(Row_2_Cell_2);

        var Row_2_Cell_3 = new PdfPCell(new Paragraph("第二列", baseFont))
        {
            HorizontalAlignment = Element.ALIGN_CENTER,
            BackgroundColor = BaseColor.LightGray
        };
        tableRow_2.AddCell(Row_2_Cell_3);

        var Row_2_Cell_4 = new PdfPCell(new Paragraph("第三列", baseFont))
        {
            HorizontalAlignment = Element.ALIGN_CENTER,
            BackgroundColor = BaseColor.LightGray
        };
        tableRow_2.AddCell(Row_2_Cell_4);

        var Row_2_Cell_5 = new PdfPCell(new Paragraph("第四列", baseFont))
        {
            HorizontalAlignment = Element.ALIGN_CENTER,
            BackgroundColor = BaseColor.LightGray
        };
        tableRow_2.AddCell(Row_2_Cell_5);

        var Row_2_Cell_6 = new PdfPCell(new Paragraph("第五列", baseFont))
        {
            HorizontalAlignment = Element.ALIGN_CENTER,
            BackgroundColor = BaseColor.LightGray
        };
        tableRow_2.AddCell(Row_2_Cell_6);

        var Row_2_Cell_7 = new PdfPCell(new Paragraph("第六列", baseFont))
        {
            HorizontalAlignment = Element.ALIGN_CENTER,
            BackgroundColor = BaseColor.LightGray
        };
        tableRow_2.AddCell(Row_2_Cell_7);

        var Row_2_Cell_8 = new PdfPCell(new Paragraph("第七列", baseFont))
        {
            HorizontalAlignment = Element.ALIGN_CENTER,
            BackgroundColor = BaseColor.LightGray
        };
        tableRow_2.AddCell(Row_2_Cell_8);

        document.Add(head);
        document.Add(placeholder);
        document.Add(para);
        document.Add(placeholder);
        document.Add(tableRow_2);
        #endregion

        #region 填充List数据
        Type t = new TaskList().GetType();//获得该类的Type

        for (int j = 0; j < DataList[i].TaskList.Count; j++)
        {
            PdfPTable tableRow_3 = new PdfPTable(8)
            {
                TotalWidth = 580f,
                LockedWidth = true
            };
            tableRow_3.DefaultCell.Border = Rectangle.NO_BORDER;
            tableRow_3.WidthPercentage = 100;
            tableRow_3.DefaultCell.MinimumHeight = 80f;
            float[] headWidths_3 = new float[] { 50f, 120f, 60f, 150f, 220f, 140f, 50f, 70f };
            tableRow_3.SetWidths(headWidths_3);
            foreach (PropertyInfo pi in t.GetProperties())//遍历属性值
            {
                var value = pi.GetValue(DataList[i].TaskList[j]).ToString();
                var txt = new Paragraph(value, baseFont);
                var cell = new PdfPCell(txt);
                tableRow_3.AddCell(cell);
            }
            document.Add(tableRow_3);
        }
    }
    #endregion

    //页脚
    PDFFooter footer = new PDFFooter();
    footer.OnEndPage(pw, document);
    document.Close();
    fileStream.Dispose();
    fileStream.Close();
    return "/TaskPDF/" + FileName + ".pdf";
}
public class PDFFooter : PdfPageEventHelper
{
    public override void OnOpenDocument(PdfWriter writer, Document document)
    {
        base.OnOpenDocument(writer, document);
        PdfPTable tabFot = new PdfPTable(new float[] { 1F })
        {
            SpacingAfter = 10F
        };
        PdfPCell cell;
        cell = new PdfPCell(new Phrase("Header"));
        tabFot.AddCell(cell);
        tabFot.WriteSelectedRows(0, -1, 150, document.Top, writer.DirectContent);
    }
    public override void OnStartPage(PdfWriter writer, Document document)
    {
        base.OnStartPage(writer, document);
    }
    public override void OnEndPage(PdfWriter writer, Document document)
    {
        base.OnEndPage(writer, document);
        var footFont = FontFactory.GetFont("Lato", 12 * 0.667f, new BaseColor(60, 60, 60));//*
    }
    public override void OnCloseDocument(PdfWriter writer, Document document)
    {
        base.OnCloseDocument(writer, document);
    }
}
```
### 散会!!!

{% fb_img dalao.gif 我怎么这么垃圾，我要有技术会是这鬼样？ %}