//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),
	minifycss = require('gulp-minify-css'),
    sass=require('gulp-sass'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin');

 

var fileName='mail_verify';

gulp.task('sass', function () {
  return gulp.src('testsass.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./'));
});

gulp.task('testsass', function () {
  return gulp.src('circle.scss').pipe(sass.sync().on('error', sass.logError)).pipe(gulp.dest('./dist'));
});

gulp.task('minifycss',function(){
	return gulp.src(fileName+'/**/*.css',{base:fileName}).pipe(minifycss()).pipe(gulp.dest(fileName+'/dist'));
});



gulp.task('htmlmin',function(){
	var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src(fileName+'/**/*.html',{base:fileName}).pipe(htmlmin(options)).pipe(gulp.dest(fileName+'/dist'));
});


 
gulp.task('default',['minifycss', 'htmlmin']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
 
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径