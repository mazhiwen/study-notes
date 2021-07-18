## 安装python

<https://www.python.org/downloads/release/python-395/>

Windows installer (64-bit)

记得把「Add Python 3.6 to Path」勾上

## 安装代码编辑软件

vscode 百度搜索下载

## 打开命令行

在vscode 打开python工程目录，我给你的文件夹

按 ctrl +  shift + ` 打开命令行

此时，命令行所在的文件目录就是打开的文件工程目录。

## 安装excel操作的依赖包

在上面命令行敲入:  pip install xlrd xlwt xlutils

## 运行程序

在上面命令行敲入:  python test.py

就会运行python工程目录下test.py 这个python脚本。

命令行出现 '木木'。表示运行成功

## 运行读取excel

在上面命令行敲入: python ./read/index.py

会运行read文件目录下，index.py脚本

这个脚本代码 就是读取read/test.xls Excel文件的内容并输出

## 运行写入excel

在上面命令行敲入: python ./write/index.py

会运行write文件目录下，index.py脚本

这个脚本代码 就是新建一个 read/test.xls excel文件

## 运行读写excel

在上面命令行敲入: python ./update/index.py

会运行update文件目录下，index.py脚本

这个脚本代码 就是读取update/test.xls Excel文件的内容

并拷贝部分内容，修改部分内容 输出到新的excel test1.xls
