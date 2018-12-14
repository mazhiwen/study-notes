https://www.cnblogs.com/fengff/p/8892590.html





## mac安装
https://www.jianshu.com/p/2892102438f5
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