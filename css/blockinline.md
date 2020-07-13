# 行内元素和块元素

## 块级元素

独占一行

宽度自动填满为其父元素宽度

可以设置width,height属性。块级元素设置了width宽度属性后仍然是独占一行的

margin和padding正常

常见的有 ：div p ul ol li h1-h6 table tr thead th tfoot td tbody form canvas section header footer forn hr caption address article aside audio blockquote pre

## 行内元素

不独占一行,相邻的行级元素会排列到同一行里，直到一行排不下，才会换行  

其宽度随元素的内容变化而变化

行级元素设置width,height无效

行级元素的水平方向的padding-left和padding-right都会产生边距效果(撑开元素宽度)，但是竖直方向上的padding-top和padding-bottom都不会产生边距效果。margin也是同理。

常见的有 ：span img input a i button select label textarea strong b br code em
