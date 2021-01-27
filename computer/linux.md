# linux

## 命令

<https://man.linuxde.net/tar>

### 查找文件 find

example可以是正则，如  
"example.txt",  
"example*"(example开头的文件名)  
文件夹: find 目录 -name example  -d  
文件:find 目录 -name example  
忽略大小写 :find 目录 -iname example

### 上下传文件

#### scp

1、从服务器上下载文件

```sh
scp root@39.107.80.119:/var/www/test.js
```

把192.168.0.101上的/var/www/test.js 的文件下载到/var/www/local_dir（本地目录）

2、上传本地文件到服务器

```sh
scp -P 1688 test.js root@139.199.35.182:/usr/share/nginx/mazhiwen/

```

把本机/var/www/目录下的test.js文件上传到192.168.0.101这台服务器上的/var/www/目录中

3、从服务器下载整个目录

```sh
scp -r root@39.107.80.119:/var/www/test  /var/www/  
```

4、上传目录到服务器

```
scp -r test  root@39.107.80.119:/var/www/   把当前目录下的test目录上传到服务器的/var/www/ 目录


# 不包括当前目录
scp -P 1688 -r dist/* root@139.199.35.182:/usr/share/nginx/mazhiwen/
# 包括当前目录
scp -P 1688 -r dist root@139.199.35.182:/usr/share/nginx/mazhiwen/
```

#### sz rz

sz  下载

从Linux下载文件到本机 , 在Linux终端输入命令回车后，选择本地存储路径即可。

命令格式：    sz filename   下载文件filename

　　　　　　sz file1 file2   下载多个文件

　　　　　　sz dir/*　　　下载dir目录下所有文件

rz   上传

从本地上传文件到Linux，在Linux终端输入命令回车后，选择本地要上传的文件即可，可一次指定多个文件

命令格式：    rz

注意：
1.如果机器上没有安装过 lrzsz 安装包，则无法使用rz和sz命令。

　可使用yum命令安装：yum install -y lrzsz

   或者下载源码进行安装。下载地址：<https://ohse.de/uwe/software/lrzsz.html>

2.上传和下载都默认使用Linux当前登录的用户，使用时要根据个人需要修改文件的权限。

### ls

ls -a 查看隐藏

~/.ssh 公钥目录

### 安装node

 yum info epel-release
 sudo yum install epel-release
 sudo yum install nodejs

### mv

mv ./build/* ../
mv ./build ../

### 文件 文件夹

touch file 新建文件

### tar
