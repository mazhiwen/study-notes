# 路由

## hash模式

### 基本概念

标志是带有#,通过监听url的**location.hash**变化来进行路由跳转

hash的优势就是兼容性更好,在老版IE中都有运行

```js
// 将hash后的字符串存在执行对象中
refresh (){
  this.currentUrl = location.hash.slice(1) || '/';
  this.routes[this.currentUrl]();
}
//监听hash
window.addEventListener('load', this.refresh, false);
window.addEventListener('hashchange', this.refresh, false);
```

### 后退功能

```js
// 记录出现过的hash
this.history = [];
//重写location
location.hash = `#${this.history[this.currentIndex]}`;
// 后退功能
backOff() {
  // 后退操作设置为true
  this.isBack = true;
  this.currentIndex <= 0
    ? (this.currentIndex = 0)
    : (this.currentIndex = this.currentIndex - 1);
  location.hash = `#${this.history[this.currentIndex]}`;
  this.routes[this.history[this.currentIndex]]();
}
```

## history模式
