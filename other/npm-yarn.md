# 关于yarn node npm 的笔记

## **yarn**  

yarn add 可升级包

yarn add -D  添加dev包

yarn cache clean

yarn remove





## **npm**

### npm install

npm install -g mocha

### npm link

- npm link的作用:  
 相当于是将我们的工程进行了全局安装，但是不同的是我们可以在命令行进行使用package.json文件中bin字段下的命令。如上面的test工程通过 npm link，这一步可以将本地目录安装到模块全局目录{prefix}/node_modules下，并且会在{prefix}文件夹下生成test文件和test.cmd文件。另外最关键的时候会建立链接，当本地目录如test文件夹变动，全局模块目录下的test文件夹也会相应改变，在其他目录下调用test命令同样可以找到命令。  
- 卸载：  
npm uninstall -g test

### verbose

npm install --verbose
在安装命令添加参数--verbose看打印详细信息

### package.json

https://docs.npmjs.com/files/package.json.html


