# 关于node的知识

node

## node技术栈

- thinkjs

ThinkJS 是一款面向未来开发的 Node.js 框架，整合了大量的项目最佳实践，让企业级开发变得更简单、高效。从 3.0 开始，框架底层基于 Koa 2.x 实现，兼容 Koa 的所有功能。

- express

## \#!/usr/bin/env node

主要是帮助脚本找到node的脚本解释器。

## stream

流处理

## env

echo $NODE_ENV  
export NODE_ENV=integration

## node版本

[如何快速切换和管理node版本](https://juejin.cn/post/7132680379898527757)

可以使用nvm切换node版本

```sh
# 安装指定node版本
nvm install v14.15.0
# 运行指定node版本
nvm use v14.15.0
# 切换到最新的node版本
nvm use node
# 远程服务器上所有的可用版本
nvm ls-remote
# 给不同的版本号设置别名
nvm alias node_cms 14.15.0
# 使用该别名
nvm use node_cms
# 查看已安装node列表
nvm ls
```

```sh
# 安装n
sudo npm i -g n
#安装node指定版本
sudo n 12.13.0

# 升级npm 
npm install -g n
# 升级到稳定版
sudo n stable
# 升级到最新版
sudo n lastest
# 切换使用node版本
sudo n 12.13.0
# 删除某个node版本
sudo n rm 12.13.0
# 用指定版本执行脚本
sudo n use 12.13.0  some.js
```

## process

 process.argv

属性返回一个数组，其中包含启动Node.js进程时传递的命令行参数。  
第一个元素是process.execPath， 如果需要访问argv[0]的原始值，可以使用process.argv0  
第二个元素将是要执行的JavaScript文件的路径， 其余元素将是任何其他命令行参数。

## fs

[node文件管理模块](https://juejin.cn/post/6844903778177515534)

- fs.writeFileSync();

## node中间件

### json-templater

```js
var render = require('json-templater/string');
render('{{xfoo}} {{say.what}}', { xfoo: 'yep', say: { what: 'yep' } });
// yep yep
```

### yargs

交互式获取命令行参数

## Worker Threads

```
单线程下的 Node.js：

一个进程
一个线程
一个事件循环
一个 JS 引擎实例
一个 Node.js 实例

多线程 Workers 下 Node.js 拥有：

一个进程
多个线程
每个线程都拥有独立的事件循环
每个线程都拥有一个 JS 引擎实例
每个线程都拥有一个 Node.js 实例
```

## 本地web服务

安全http-server

## node加载es6语法

babel-node : <https://juejin.cn/post/6844903768924897288>

[在node环境中支持ES6代码](https://juejin.cn/post/6844904017764548622)

## node写CLI

[从零开发前端 CLI 脚手架](https://juejin.cn/post/7271599265969225743?searchId=20231101155303E808D3D78EF1865DB3CF)
