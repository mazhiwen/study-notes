# display

<https://zhanfang.github.io/2016/07/22/display%E5%B1%9E%E6%80%A7%E8%AF%A6%E8%A7%A3/>

```css
/* CSS 1 */
display: none;
display: inline;
display: block;
display: list-item;
/* CSS 2.1 */
display: inline-block;
display: table;
display: inline-table;
display: table-cell;
display: table-column;
display: table-column-group;
display: table-footer-group;
display: table-header-group;
display: table-row;
display: table-row-group;
display: table-caption;
/* CSS 2.1 */
/* CSS 3 */
display: inline-list-item;
display: flex;
display: box;
display: inline-flex;
display: grid;
display: inline-grid;
display: ruby;
display: ruby-base;
display: ruby-text;
display: ruby-base-container;
display: ruby-text-container;
/* CSS 3 */
/* Experimental values */
display: contents;
display: run-in;
/* Experimental values */
/* Global values */
display: inherit;
display: initial;
display: unset;
```

## none

既不会占据空间，也无法显示，相当于该元素不存在

## block

设置元素为块状元素，如果不指定宽高，默认会继承父元素的宽度，并且独占一行，即使宽度有剩余也会独占一行，高度一般以子元素撑开的高度为准，当然也可以自己设置宽度和高度。

## inline-block

具有block的宽高特性

又具有inline的同行元素特性
