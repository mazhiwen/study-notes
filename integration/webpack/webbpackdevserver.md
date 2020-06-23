# webpack-dev-server

<https://www.cnblogs.com/vajoy/p/7000522.html>

## proxy

如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。

<https://www.jianshu.com/p/f489e7764cb8>

```js
module.exports = {
    //...
    devServer: {
        proxy: [{
            context: ['/auth', '/api'],
            target: 'http://localhost:3000',
        }]
    }
};

//解决跨域原理
// 上面的参数列表中有一个changeOrigin参数, 是一个布尔值, 设置为true, 本地就会虚拟一个服务器接收你的请求并代你发送该请求,
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // pathRewrite: {'^/api' : ''},
        changeOrigin: true,  // target是域名的话，需要这个参数，
        secure: false,          // 设置支持https协议的代理
      }
    }
  }
};

```

### progress

将运行进度输出到控制台。webpack-dev-server --progress

## contentBase

host指向contentBase , 也即是index.html的访问地址

## publicPath

publicPath实际功能是webpack-dev-middleware实现的，如下：

```
标记从内存的哪个路径去存放和查找资源

当没有配置 devServer.publicPath 时，默认的 devServer.publicPath 并非根目录，而是 output.publicPath：

打包后的 bundle.js 会存放在虚拟内存路径 host/output.publicPath/ 下 。暂时理解为publicPath是虚拟物理路径，host是server映射。

```

## 源码

webpack-dev-server.js

```js
const webpack = require('webpack');
const argv = yargs.argv;

// ...
let convertArgvPath;
try {
  require.resolve('webpack-cli/bin/utils/convert-argv');
  convertArgvPath = 'webpack-cli/bin/utils/convert-argv';
} catch (e) {
  convertArgvPath = 'webpack-cli/bin/convert-argv';
}
const config = require(convertArgvPath)(yargs, argv, {
  outputFilename: '/bundle.js',
});


function startDevServer(config, options) {
  // ...
  let compiler;
  compiler = webpack(config);
  server = new Server(compiler, options, log);
}

// ...
processOptions(config, argv, (config, options) => {
  startDevServer(config, options);
});
// ...
```

处理配置项：processOptions

```js
function processOptions(config, argv, callback) {
  // ...
  const options = createConfig(config, argv, { port: defaultPort });
  // ...
  callback(config, options); // config是wp原始配置,options是整合wp配置后生成的devserver配置
  // ...
}


// createConfig
function createConfig(config, argv, { port }) {
  const firstWpOpt = Array.isArray(config) ? config[0] : config;
  const options = firstWpOpt.devServer || {};
  // ...
  if (!options.publicPath) {
    options.publicPath =
      (firstWpOpt.output && firstWpOpt.output.publicPath) || '';

    if (
      !isAbsoluteUrl(String(options.publicPath)) &&
      options.publicPath[0] !== '/'
    ) {
      options.publicPath = `/${options.publicPath}`;
    }
  }
  // ...
}
```

创建server: Server.js

```js
const webpackDevMiddleware = require('webpack-dev-middleware');

class Server {
  constructor(compiler, options = {}, _log) {
    this.compiler = compiler;
    this.options = options;
    // ...
    // ...
    normalizeOptions(this.compiler, this.options); // 根据options设置默认值
    // ...
    this.setupApp();
    this.setupDevMiddleware();
    routes(this.app, this.middleware, this.options); // 这一步已经可以知道静态资源文件位置的访问地址在wp.output.publicPath了
    // ...
    this.setupFeatures();
    this.setupHttps();
    this.createServer();

    // ...
  }
  setupApp() {
    // Init express server
    // eslint-disable-next-line new-cap
    this.app = new express();
  }
  //
  setupHistoryApiFallbackFeature(){
    // ...
    this.app.use(historyApiFallback(fallback));
  }

  setupDevMiddleware() {
    // middleware for serving webpack bundle
    this.middleware = webpackDevMiddleware(
      this.compiler,
      Object.assign({}, this.options, { logLevel: this.log.options.level })
    );
  }

  // setupFeatures:
  setupFeatures() {
    this.setupStaticFeature();
  }

  createServer() {
    //...
    this.listeningApp = http.createServer(this.app);
    //...
  }
  setupStaticFeature() {
    const contentBase = this.options.contentBase;
    const contentBasePublicPath = this.options.contentBasePublicPath;
    // contentBasePublicPath默认为 /

    this.app.use(
      contentBasePublicPath,
      express.static(contentBase, this.options.staticOptions)
    ); // 配置 可以通过带有 contentBasePublicPath 前缀地址来访问 contentBase 服务器资源目录。
    // 实际效果:使默认host ： localhost:8080/ 可以访问 contentBase 下编译后的静态文件资源目录地址
  }
}
```

historyApiFallback :

historyApiFallback把所有正常资源请求 都转发到 options.index,也即是静态资源index.html的真正位置

```js
// ...
rewriteTarget = options.index || '/index.html';
logger('Rewriting', req.method, req.url, 'to', rewriteTarget);
req.url = rewriteTarget;
next();
```

var fs = require('fs');
      fs.writeFile('./test.json',JSON.stringify(this.listeningApp),'utf8',function(err){
          if(err)
              console.log('写文件出错了，错误是：'+err);
          else
              console.log('ok');
      })
