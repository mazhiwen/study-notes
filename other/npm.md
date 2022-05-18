
# npm

[介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/22)

[npm script 一见钟情](https://juejin.cn/post/6844903854253801480)

## npm init

初始化

```
npm init --force
```

## npm install

npm install -g mocha

## npm link

您不能导入全局安装的软件包。

您有2个选项，可以在本地安装:
npm install nightmare --save
或创建一个指向全局包的本地链接:

npm install -g nightmare
npm link nightmare

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

## 镜像

使用nrm:

```
nrm ls

nrm use 名称
```

<https://juejin.cn/post/6968282808335171598>

临时使用淘宝源:

`npm --registry https://registry.npm.taobao.org install sharp@latest -g`

全局配置切换到淘宝源

 `npm config set registry https://registry.npm.taobao.org`

全局配置切换到官方源
 `npm config set registry http://www.npmjs.org`

 检测是否切换到了淘宝源
npm info underscore

## 查看全局的包

npm list -g --depth 0

## npm run 运行

<https://juejin.cn/post/7078924628525056007>

bin???

## type:module
