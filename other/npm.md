
# npm

## npm install

npm install -g mocha

## npm link

通过 npm link 将本地的项目webpack-theory 链接到全局包中，链接之后便可以直接在本地使用，供本地测试使用,具体参考 npm link

 相当于是将我们的工程进行了全局安装，但是不同的是我们可以在命令行进行使用package.json文件中bin字段下的命令。如上面的test工程通过 npm link，这一步可以将本地目录安装到模块全局目录{prefix}/node_modules下，并且会在{prefix}文件夹下生成test文件和test.cmd文件。另外最关键的时候会建立链接，当本地目录如test文件夹变动，全局模块目录下的test文件夹也会相应改变，在其他目录下调用test命令同样可以找到命令。  

## npm uninstall

- 卸载：  

npm uninstall -g test

## verbose

npm install --verbose
在安装命令添加参数--verbose看打印详细信息

## package.json

<https://docs.npmjs.com/files/package.json.html>
