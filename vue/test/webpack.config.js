const path=require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports={
    entry:{
        index:'./src/index.js',
        vendor:[
            'jquery',
            'vue',
            'swal',
            'bootstrap'
        ]
    },
    output:{
        filename:'[name].js',
        //filename:'[name].[contenthash].js',
        path:path.resolve(__dirname,'dist')
    },
    //devtool: 'inline-source-map',    
    devServer:{
        contentBase:'./dist'     
    },
    resolve:{
        alias:{      
            'vue$': 'vue/dist/vue.esm.js',
            jquery:'jquery/dist/jquery.min.js',
            swal:'sweetalert2/dist/sweetalert2.min.js',
            bootstrap:'bootstrap/dist/js/bootstrap.min.js'
        }
    },
    externals:{
        //bootstrap:'bootstrap'
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: './src/index.ejs' // Load a custom template (ejs by default see the FAQ for details)
            //,minify:{}            
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({name:'vendor'}),
        new webpack.optimize.CommonsChunkPlugin({name:'runtime'}),
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery",
            swal:"swal"
        })
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.LoaderOptionsPlugin(),
        //new webpack.optimize.UglifyJsPlugin({
            //sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
        //})  
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                loader: 'babel-loader',
                // 排除模块安装目录的文件 
                exclude: /node_modules/            
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    }

}
if (process.env.NODE_ENV === 'production') {
    //module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    //module.exports.output.filename='app.[chunkhash].js'    
    module.exports.output.filename='[name].[chunkhash].js';
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      })
      ,
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      })
      //,
      //new webpack.LoaderOptionsPlugin({
      //  minimize: true
      //})
    ])
}