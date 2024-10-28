# Fetch


1、fetch返回的是promise对象，比XMLHttpRequest的实现更简洁，fetch 使用起来更简洁 ，完成工作所需的实际代码量也更少

2、fetch 可自定义是否携带Cookie

3、fetch在ServiceWorker中使用，至于ServiceWorker能有什么优势，会在未来写ServiceWorker的时候回写到

```js
fetch(url,{
    header
    body
    ...

}).then(res=>{

    //res 二进制流

})
```