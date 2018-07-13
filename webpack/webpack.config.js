const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: {
    index: './src/index.js'
    // another: './src/another-module.js'
  },
  //踪到错误和警告在源代码中的原始位置(测试用，不可用于生产)
  devtool: 'inline-source-map',
  devServer:{
    //开发启动服务目录
    contentBase: './dist',
    //webpack-dev-server热更新
    hot: true
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    //清理dist文件
    new CleanWebpackPlugin(['dist']),
    //生成新html文件
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    new webpack.NamedModulesPlugin(),//热更新相关
    new webpack.HotModuleReplacementPlugin(),//热更新相关
    //代码分离 4移除此配置
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common' // 指定公共 bundle 的名称。
    // })
    new webpack.optimize.SplitChunksPlugin({
      // ************************默认
      chunks: "all", //默认async
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: 'marjoven',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
      //***************************/
      // cacheGroups: { // 这里开始设置缓存的 chunks
      //   priority: 0, // 缓存组优先级
      //   app: { // key 为entry中定义的入口名称
      //     chunks: 'all', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
      //     name: 'dom', // 要缓存的 分隔出来的 chunk 名称
      //     minSize: 0,
      //     minChunks: 1,
      //     enforce: true,
      //     reuseExistingChunk: true 
      //   }
      // }
      
      
    })
  ],
  //代码分离
  // optimization:{
  //   splitChunks: {
  //     name: 'common'
  //   }
  // },
  output: {
    filename: '[name].bundle.js',
    // filename: '[name].[chunkhash].js',
    //非入口 chunk 的名称
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    //服务器访问地址
    publicPath: '/'
  },
  //mode 会执行uglyfyjs
  mode: "production"
};