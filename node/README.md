# 关于node的知识

## \#!/usr/bin/env node

主要是帮助脚本找到node的脚本解释器。

## stream

流处理

## env

echo $NODE_ENV  
export NODE_ENV=integration

## node版本

npm install -g n
n stable
n v0.10.26

## process

 process.argv

属性返回一个数组，其中包含启动Node.js进程时传递的命令行参数。  
第一个元素是process.execPath， 如果需要访问argv[0]的原始值，可以使用process.argv0  
第二个元素将是要执行的JavaScript文件的路径， 其余元素将是任何其他命令行参数。

## fs

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
