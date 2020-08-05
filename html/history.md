# history

window.history : 可以在不刷新页面的前提下动态改变浏览器地址栏中的URL地址，动态修改页面上所显示资源。

History 的 go ,back, forward 方法可以实现跳转，后退，前进功能，还有 popstate 事件可以监听到记录变更。

History 的 pushState，replacestate 方法可以添加修改历史记录且不会发送新的服务器请求，因此可以利用此特性实现前端路由跳转。

## .back()

返回

这和用户点击浏览器回退按钮的效果相同。

## .forward()

向前跳转

## .go()

你可以用 go() 方法载入到会话历史中的某一特定页面，通过与当前页面相对位置来标志 (当前页面的相对位置标志为0).

```js
go(1)
go(-1)
```

## .pushState()

```js
let stateObj = {
    foo: "bar",
};

history.pushState(stateObj, "page 2", "bar.html");
```

假设在 <http://mozilla.org/foo.html> 中执行了这部分代码。这将使浏览器地址栏显示为 <http://mozilla.org/bar.html>，

但并不会导致浏览器加载 bar.html ，甚至不会检查bar.html 是否存在。

## .replacestate()

history.replaceState() 的使用与 history.pushState() 非常相似，区别在于  replaceState()  是修改了当前的历史记录项而不是新建一个。

注意这并不会阻止其在全局浏览器历史记录中创建一个新的历史记录项。

```js
history.replaceState(stateObj, "page 3", "bar2.html");
```

在 <http://mozilla.org/bar.html> 下执行这部分代码，这将会导致地址栏显示<http://mozilla.org/bar2.html>,，但是浏览器并不会去加载bar2.html 甚至都不需要检查 bar2.html 是否存在。

## .length

历史记录中页面总数

## popstate 事件

每当活动的历史记录项发生变化时， popstate 事件都会被传递给window对象。

如果当前活动的历史记录项是被 pushState 创建的，或者是由 replaceState 改变的，那么 popstate 事件的状态属性 state 会包含一个当前历史记录状态对象的拷贝。

调用history.pushState()或者history.replaceState()不会触发popstate事件.

popstate事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在JavaScript中调用history.back()、history.forward()、history.go()方法)，此外，a 标签的锚点也会触发该事件.

```js
window.addEventListener('popstate', fn);
```
