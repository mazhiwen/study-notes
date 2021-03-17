# webpack5

[构建效率大幅提升，webpack5 在企鹅辅导的升级实践](https://mp.weixin.qq.com/s/P3foOrcu4StJDGdX9xavng)

[Webpack5 上手测评](https://juejin.cn/post/6844904169405415432)

[官方文档](https://webpack.js.org/configuration/other-options/#cache)

## 编译缓存(cache配置)

```js
module.exports = {
    cache: {
      // 将缓存类型设置为文件系统
      type: "filesystem", 
      buildDependencies: {
        /* 将你的 config 添加为 buildDependency，
           以便在改变 config 时获得缓存无效*/
        config: [__filename],
        /* 如果有其他的东西被构建依赖，
           你可以在这里添加它们*/
        /* 注意，webpack.config，
           加载器和所有从你的配置中引用的模块都会被自动添加*/
      },
      // 指定缓存的版本
      version: '1.0' 
    }
}
```

## 长效缓存(浏览器缓存)

使浏览器不必要更新的缓存 保持长效。打包后的文件无变化的保留文件hash名称，使浏览器缓存生效。

webpack4 中可以根据如下配置来解决此问题：

```
optimization.moduleIds = 'hashed'
optimization.chunkIds = 'named'
```

webpack5:

```
optimization.moduleIds = 'named'
optimization.chunkIds = 'named'
```

## Node Polyfill 脚本被移除

## 对treeshaking 进行了优化

## Module Federation

Module Federation 使得使 JavaScript 应用得以从另一个 JavaScript 应用中动态地加载代码 —— 同时共享依赖
