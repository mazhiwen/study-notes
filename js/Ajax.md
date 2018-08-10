# Ajax

https://juejin.im/post/58c883ecb123db005311861a?utm_source=gold_browser_extension


```javascript
function reqListener () {
  console.log(this.responseText);
}

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "yourFile.txt", true);
oReq.send();
```