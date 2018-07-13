const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'marjovenprogram'
    }),
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
  output: {
    
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
};