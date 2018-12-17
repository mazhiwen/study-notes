

## 命令

### 查找文件 find

example可以是正则，如  
"example.txt",  
"example*"(example开头的文件名)  
文件夹: find 目录 -name example  -d  
文件:find 目录 -name example  
忽略大小写 :find 目录 -iname example



### 上下传文件

1、从服务器上下载文件

scp root@39.107.80.119:/var/www/test.js 

把192.168.0.101上的/var/www/test.js 的文件下载到/var/www/local_dir（本地目录）



2、上传本地文件到服务器

scp -P 1688 ./www.mazhiwen.com.conf root@voidm.com:/www/server/nginx/conf/servers 

把本机/var/www/目录下的test.js文件上传到192.168.0.101这台服务器上的/var/www/目录中

 

3、从服务器下载整个目录

scp -r root@39.107.80.119:/var/www/test  /var/www/  

4、上传目录到服务器
scp -r test  root@39.107.80.119:/var/www/   把当前目录下的test目录上传到服务器的/var/www/ 目录



### ls

ls -a 查看隐藏

~/.ssh 公钥目录 


###安装node

 yum info epel-release
 sudo yum install epel-release
 sudo yum install nodejs



### mv 
mv ./build/* ../
mv ./build ../