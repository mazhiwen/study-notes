const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer:{
    //开发启动服务目录
    contentBase: './dist',
    //webpack-dev-server热更新
    hot: true
  },
  plugins:[
    new webpack.NamedModulesPlugin(),//热更新相关
    new webpack.HotModuleReplacementPlugin()//热更新相关
  ]
});