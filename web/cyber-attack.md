## XSS (Cross Site Scripting)

1. 通过向某网站写入js脚本来实现攻击

```javascript
https://www.sogou.com/web?query=xss"a/><script>alert('XSS')</script>
```

2. 把注入代码写到网站数据库中  
输入脚本到内容数据库，读取时执行脚本

## CSRF （Cross-site request forgery）

1. 其他站点执行本站点get请求  
get: <http://www.blog.com/message?content=留言内容>
2. xss获取cookie 伪造请求

## DDoS
