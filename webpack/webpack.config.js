const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: {
    app: './src/index.js',
    // print: './src/print.js'
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
    new webpack.HotModuleReplacementPlugin()//热更新相关
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    //服务器访问地址
    publicPath: '/'
  },
  //mode 会执行uglyfyjs
  mode: "production"
};