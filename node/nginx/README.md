# nginx

<https://www.cnblogs.com/fengff/p/8892590.html>

<https://juejin.im/post/5e1aea9e6fb9a02fc160a2cc>

<https://juejin.im/post/5bacbd395188255c8d0fd4b2>

## nginx配置

<https://www.nginx.cn/76.html>

```sh
#运行用户
user nobody;
#启动进程,通常设置成和cpu的数量相等
worker_processes  1;

#全局错误日志及PID文件
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

#工作模式及连接数上限
events {
    #epoll是多路复用IO(I/O Multiplexing)中的一种方式,
    #仅用于linux2.6以上内核,可以大大提高nginx的性能
    use   epoll;

    #单个后台worker process进程的最大并发链接数
    worker_connections  1024;

    # 并发总数是 worker_processes 和 worker_connections 的乘积
    # 即 max_clients = worker_processes * worker_connections
    # 在设置了反向代理的情况下，max_clients = worker_processes * worker_connections / 4  为什么
    # 为什么上面反向代理要除以4，应该说是一个经验值
    # 根据以上条件，正常情况下的Nginx Server可以应付的最大连接数为：4 * 8000 = 32000
    # worker_connections 值的设置跟物理内存大小有关
    # 因为并发受IO约束，max_clients的值须小于系统可以打开的最大文件数
    # 而系统可以打开的最大文件数和内存大小成正比，一般1GB内存的机器上可以打开的文件数大约是10万左右
    # 我们来看看360M内存的VPS可以打开的文件句柄数是多少：
    # $ cat /proc/sys/fs/file-max
    # 输出 34336
    # 32000 < 34336，即并发连接总数小于系统可以打开的文件句柄总数，这样就在操作系统可以承受的范围之内
    # 所以，worker_connections 的值需根据 worker_processes 进程数目和系统可以打开的最大文件总数进行适当地进行设置
    # 使得并发总数小于操作系统可以打开的最大文件数目
    # 其实质也就是根据主机的物理CPU和内存进行配置
    # 当然，理论上的并发总数可能会和实际有所偏差，因为主机还有其他的工作进程需要消耗系统资源。
    # ulimit -SHn 65535

}


http {
    #设定mime类型,类型由mime.type文件定义
    include    mime.types;
    default_type  application/octet-stream;
    #设定日志格式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  logs/access.log  main;

    #sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，
    #对于普通应用，必须设为 on,
    #如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，
    #以平衡磁盘与网络I/O处理速度，降低系统的uptime.
    sendfile     on;
    #tcp_nopush     on;

    #连接超时时间
    #keepalive_timeout  0;
    keepalive_timeout  65;
    tcp_nodelay     on;

    #开启gzip压缩
    gzip  on;
    gzip_disable "MSIE [1-6].";

    #设定请求缓冲
    client_header_buffer_size    128k;
    large_client_header_buffers  4 128k;


    #设定虚拟主机配置
    server {
        #侦听80端口
        listen    80;
        #定义使用 www.nginx.cn访问
        server_name  www.nginx.cn;

        #定义服务器的默认网站根目录位置
        root html;

        #设定本虚拟主机的访问日志
        access_log  logs/nginx.access.log  main;

        #默认请求
        location / {

            #定义首页索引文件的名称
            index index.php index.html index.htm;

        }

        # 定义错误提示页面
        error_page   500 502 503 504 /50x.html;
        location = /50x.html {
        }

        #静态文件，nginx自己处理
        location ~ ^/(images|javascript|js|css|flash|media|static)/ {

            #过期30天，静态文件不怎么更新，过期可以设大一点，
            #如果频繁更新，则可以设置得小一点。
            expires 30d;
        }

        #PHP 脚本请求全部转发到 FastCGI处理. 使用FastCGI默认配置.
        location ~ .php$ {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include fastcgi_params;
        }

        #禁止访问 .htxxx 文件
            location ~ /.ht {
            deny all;
        }

    }
}
```

## upstream

upstream块定义了一个上游服务器的集群，便于反向代理中的proxy_pass使用。

```sh
upstream backend {
 server backend1.example.com;
 server backend2.example.com;
 server backend3.example.com;
}
server {
 location / {
   proxy_pass http://backend;
 }
}
```

## proxy_pass

代理

```sh
location /proxy/api {
 proxy_pass https://proxy.com/test/v1;
}
#访问 /proxy/api/aa/bb 会变成实际访问 https://proxy.com/test/v1/aa/bb。也就是 location 匹配到 path 会被 URL 里面的地址给替换掉。

```

其他情况

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

## 前端Nginx可以做什么

1. 快速实现简单的访问限制

```sh
location / {
  deny  192.168.1.100;
  allow 192.168.1.10/200;
  allow 10.110.50.16;
  deny  all;
}
```

2. 解决跨域

```sh
#请求跨域，这里约定代理请求url path是以/apis/开头
location ^~/apis/ {
  # 这里重写了请求，将正则匹配中的第一个()中$1的path，拼接到真正的请求后面，并用break停止后续匹配
  rewrite ^/apis/(.*)$ /$1 break;
  proxy_pass https://www.kaola.com/;
}  
```

3. 适配PC与移动环境

```sh
location / {
  # 移动、pc设备适配
  if ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {
      set $mobile_request '1';
  }
  if ($mobile_request = '1') {
      rewrite ^.+ http://mysite-base-H5.com;
  }
}

```

4. 合并请求

## Gzip配置

<https://juejin.cn/post/6844903641317376013>

配置nginx: /etc/nginx/nginx.conf

```sh
##
# `gzip` Settings
#
#
gzip on;
gzip_disable "msie6";

gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip_min_length 256;
gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/vnd.ms-fontobject application/x-font-ttf font/opentype image/svg+xml image/x-icon;
```

## 缓存配置

<https://www.cnblogs.com/kevingrace/p/10459429.html>

```sh
if ($request_uri ~* "^/$|^/search/.+/|^/company/.+/") {
  add_header    Cache-Control  max-age=3600;
}

location ~ .*\.(css|js|swf|php|htm|html )$ {
      add_header Cache-Control no-store;
}


location ~ .*\.(js|css)$ {
     expires 10d;
}

# 将html结尾的请求加上no-cache
location / {
    access_log /data/nginx/log/xxx.log api;
    root /home/www/html;
    if ($request_filename ~ .*\.(htm|html)$)
     {
            add_header Cache-Control no-cache;
     }
}
```
