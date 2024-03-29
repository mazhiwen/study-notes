# docker

[Docker 是怎么实现的？前端怎么用 Docker 做部署？](https://juejin.cn/post/7137621606469222414)

```
Dockerfile: 类似于“package.json”
      |
      V
镜像：Image: 类似于“Win7纯净版.rar”
      |
      V
容器：Container: 一个完整操作系统
```

## 镜像

镜像是通过一个 Dockerfile 打包来的，Dockerfile它非常像我们前端的package.json文件

## 容器

## 打包镜像

```
目录结构:
hello-docker 
  |____index.html
  |____Dockerfile
```

```sh
cd hello-docker/ # 进入刚刚的目录
docker image build ./ -t hello-docker:1.0.0 # 打包镜像
```

## 创建容器

```sh
# 创建容器
docker container create -p 2333:80 hello-docker:1.0.0
# 启动容器
docker container start xxx # xxx 为上一条命令运行得到的结果
```

```sh
# 进入容器
docker container exec -it xxx /bin/bash # xxx 为容器ID
```

## k8s

容器编排系统

k8s 由众多组件组成，组件间通过 API 互相通信，归纳起来主要分为三个部分：controller  manager,nodes,pods
