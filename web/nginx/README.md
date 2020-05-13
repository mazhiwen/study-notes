# nginx

<https://www.cnblogs.com/fengff/p/8892590.html>

<https://juejin.im/post/5e1aea9e6fb9a02fc160a2cc>

<https://juejin.im/post/5bacbd395188255c8d0fd4b2>

## mac安装

<https://www.jianshu.com/p/2892102438f5>

```sh

brew install nginx  

#nginx地址:/usr/local/etc/nginx  

#查看目前执行的服务:
brew services list  

#停止nginx服务:
brew services stop nginx  

cd /usr/local/etc/nginx
vi nginx.conf  
#翻到最下面,添加.conf,让nginx识别.conf的配置
#添加 include servers/*.conf;

cd servers/
touch www.mazhiwen.com.conf
server{
  listen 8082;
  server_name localhost;
  root /Users/reborn/programs/react-web/build;
  index index.html;
  location / {
    try_files $uri $uri/  /index.html;
  }
}
#在终端打开finder目录
open /usr/

#查看nginx配置有木有生效
nginx -t

#重启动nginx服务
brew services restart nginx

#停止nginx服务
brew services stop nginx

#域名配置
https://www.cnblogs.com/rickzhai/p/7896432.html
```

## nginx启动检查

检查
/www/server/nginx/sbin/ ./nginx -t

重启
sbin目录下
./nginx -s reload

## 正向代理与反向代理

**正向代理：**

代理用户的行为

1. 正向代理，我们的角色是 被代理者
2. 正向代理，我们不对外提供服务，反而是对外消费服务，属于消费者

**反向代理：**

代理服务器的行为

1. 反向代理，我们的角色是 局域网 web服务
2. 反向代理，我们对外提供服务，属于服务提供者
