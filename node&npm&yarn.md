## **yarn**  

yarn add 可升级包


yarn add -D  添加dev包


yarn cache clean


yarn remove






## **node**

###  *\#!/usr/bin/env node*
主要是帮助脚本找到node的脚本解释器。



### *stream*

流处理



### *env*
echo $NODE_ENV  
export NODE_ENV=integration



### *node版本*
npm install -g n
n stable
n v0.10.26


### *process*  

#### process.argv
属性返回一个数组，其中包含启动Node.js进程时传递的命令行参数。  
第一个元素是process.execPath， 如果需要访问argv[0]的原始值，可以使用process.argv0  
第二个元素将是要执行的JavaScript文件的路径， 其余元素将是任何其他命令行参数。




## **npm**

### npm install 

npm install -g mocha


### npm link

- npm link的作用:  
 相当于是将我们的工程进行了全局安装，但是不同的是我们可以在命令行进行使用package.json文件中bin字段下的命令。如上面的test工程通过 npm link，这一步可以将本地目录安装到模块全局目录{prefix}/node_modules下，并且会在{prefix}文件夹下生成test文件和test.cmd文件。另外最关键的时候会建立链接，当本地目录如test文件夹变动，全局模块目录下的test文件夹也会相应改变，在其他目录下调用test命令同样可以找到命令。  
- 卸载：  
npm uninstall -g test
