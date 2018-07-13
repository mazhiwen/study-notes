学习webpack,基于webpack官网教程




### package.json


如果所有代码都不包含副作用，我们就可以简单地将该属性标记为 false，来告知 webpack，它可以安全地删除未用到的 export 导出。
"sideEffects": false
如果你的代码确实有一些副作用，那么可以改为提供一个数组：

{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js"
  ]
}

https://webpack.docschina.org/guides/tree-shaking/