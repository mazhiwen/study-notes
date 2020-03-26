var gulp = require('gulp');
var path = require('path');
var fs = require('fs');

// Plugins
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var wrapper = require('gulp-wrapper');
var replace = require('gulp-replace');


/**
 * [projectConfig 项目设置]
 */
var projectConfig = {
    // 项目名称
    name: '一匡-H5',
    // 项目开发者
    author: 'zlf',
    // 发布路径
    releasePath: 'h5',
    // CDN路径
    cdnPath: '//app.asset3.com/equanta/',
    //测试服务器路径
    testPath: "//123.56.237.44/equanta/"
};

/**
 * [projectUtil 工具类]
 */
var projectUtil = {
    // 格式化路径
    fomartPath: function (pathStr) {
        return pathStr.replace(/\\/g, '\/');
    },
    // 获取当前目录
    getCurrentDir: function () {
        return fs.realpathSync('./');
    },
    // 获取release根目录
    getSvnRoot: function () {
        var currentDir = this.getCurrentDir();
        var svnRoot = currentDir.replace(/develop\S*/g, '');
        svnRoot = this.fomartPath(svnRoot);
        return svnRoot;
    },
    // 获取发布目录
    getReleasePath: function () {
        var svnRoot = this.getSvnRoot();
        var releasePath = projectConfig.releasePath;
        var targetPath = path.join(svnRoot, 'release', releasePath);
        return targetPath;
    },
    // 获取CDN全部路径
    getCDNpath: function () {
        var cdnPath = projectConfig.cdnPath + projectConfig.releasePath;
        return cdnPath;
    },
    //获取测试服务器全部路径
    getTestPath: function () {
        var testPath = projectConfig.testPath + projectConfig.releasePath;
        return testPath;
    },
    // 获取当前时间
    getNowDate: function () {
        var nowDate = new Date();
        now = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate() + ' ' + nowDate.getHours() + ':' + nowDate.getMinutes() + ':' + nowDate.getMinutes();
        return now;
    },
    // 删除文件夹
    deleteDir: function (path) {
        var _this = this;
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    _this.deleteDir(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
};

/**
 * 单步任务
 */

// css
gulp.task('css', function () {
    gulp.src([
        'css/**/*.css',
        '!css/**/*.min.css'
    ])
        .pipe(wrapper({
            header: '/* @update: ' + projectUtil.getNowDate() + ' */ \n'
        }))
        .pipe(gulp.dest('build/css'))
});

// uglify javascript
gulp.task('js', function () {
    gulp.src([
        'js/**/*.js',
        '!js/modules/**/*.*',
        '!js/config.js'
    ])
        .pipe(uglify({
            mangle: {
                except: ['jQuery', '$', 'require']
            },
            output: {
                ascii_only: true
            }
        }))
        //  .pipe(replace(/\.\.\//, projectUtil.getCDNpath() + '/'))
        .pipe(wrapper({
            header: '/* @update: ' + projectUtil.getNowDate() + ' */ \n'
        }))
        .pipe(gulp.dest('build/js'))

    gulp.src([
        'js/config.js'
    ])
        .pipe(replace(/true/i, "false"))
        .pipe(replace(/gulpTag/g, projectUtil.getCDNpath()))
        .pipe(uglify({
            mangle: {
                except: ['jQuery', '$', 'require']
            },
            output: {
                ascii_only: true
            }
        }))
        .pipe(wrapper({
            header: '/* @update: ' + projectUtil.getNowDate() + ' */ \n'
        }))
        .pipe(gulp.dest('build/js'))
});

gulp.task('js-m', function () {
    gulp.src([
        'js/**/*.js',
        '!js/modules/**/*.*',
        '!js/config.js'
    ])
        .pipe(wrapper({
            header: '/* @update: ' + projectUtil.getNowDate() + ' */ \n'
        }))
        .pipe(gulp.dest('build/js'))

    gulp.src([
        'js/config.js'
    ])
        .pipe(replace(/true/i, "false"))
        .pipe(replace(/gulpTag/g, projectUtil.getTestPath()))
        .pipe(wrapper({
            header: '/* @update: ' + projectUtil.getNowDate() + ' */ \n'
        }))
        .pipe(gulp.dest('build/js'))
});

// html
gulp.task('html', function () {
    gulp.src([
        'html/**/*.html',
        'html/**/*.htm'
    ])
        .pipe(replace(/href="..\/css/g, 'href="' + projectUtil.getCDNpath() + '/css'))
        .pipe(replace(/src="..\/js/g, 'src="' + projectUtil.getCDNpath() + '/js'))
        .pipe(replace(/src="..\/images/g, 'src="' + projectUtil.getCDNpath() + '/images'))
        .pipe(replace(/src="..\/css/g, 'src="' + projectUtil.getCDNpath() + '/css'))
        .pipe(replace(/url\(..\/images/g, 'url(' + projectUtil.getCDNpath() + '/images'))
        .pipe(replace(/lazyload="..\/images/g, 'lazyload="' + projectUtil.getCDNpath() + '/images'))
        .pipe(gulp.dest('build/html'))
});

// html-test
gulp.task('html-m', function () {
    gulp.src([
        'html/**/*.html',
        'html/**/*.htm'
    ])
        .pipe(replace(/href="..\/css/g, 'href="' + projectUtil.getTestPath() + '/css'))
        .pipe(replace(/src="..\/js/g, 'src="' + projectUtil.getTestPath() + '/js'))
        .pipe(replace(/src="..\/images/g, 'src="' + projectUtil.getTestPath() + '/images'))
        .pipe(replace(/src="..\/css/g, 'src="' + projectUtil.getTestPath() + '/css'))
        .pipe(replace(/url\(..\/images/g, 'url(' + projectUtil.getTestPath() + '/images'))
        .pipe(replace(/lazyload="..\/images/g, 'lazyload="' + projectUtil.getTestPath() + '/images'))
        .pipe(gulp.dest('build/html'))
});


gulp.task('moveFiles', function () {
    gulp.src([
        'css/**/*.png',
        'css/**/*.jpg',
        'css/**/*.gif'
    ])
        .pipe(gulp.dest('build/css'));
    gulp.src([
        'css/fonts/*'
    ])
        .pipe(gulp.dest('build/css/fonts'));
    gulp.src([
        'css/sprite/**/*.png',
        'css/sprite/**/*.jpg',
        'css/sprite/**/*.gif'
    ])
        .pipe(gulp.dest('build/css/sprite'));
    gulp.src([
        'images/**/*.png',
        'images/**/*.jpg',
        'images/**/*.gif'
    ])
        .pipe(gulp.dest('build/images'));

    gulp.src([
        'data/*.*'
    ])
        .pipe(gulp.dest('build/data'));
});


// 删除build 文件夹
gulp.task('deleteBuild', function () {
    projectUtil.deleteDir('build');
});

// 发布到发布目录
gulp.task('releaseBuild', function () {
    // 删除发布目录
    projectUtil.deleteDir(projectUtil.getReleasePath());
    // 复制build至 发布目录
    gulp.src([
        'build/css/**/*.*'
    ]).pipe(gulp.dest(projectUtil.getReleasePath() + '/css'));
    gulp.src([
        'build/html/**/*.*'
    ]).pipe(gulp.dest(projectUtil.getReleasePath() + '/html'));
    gulp.src([
        'build/js/**/*.*'
    ]).pipe(gulp.dest(projectUtil.getReleasePath() + '/js'));
    gulp.src([
        'build/images/**/*.*'
    ]).pipe(gulp.dest(projectUtil.getReleasePath() + '/images'));
});


// task build 打包流程
gulp.task('build', function () {
    gulp.run(['deleteBuild', 'css', 'js', 'moveFiles', 'html']);
});

// task build-m 打包流程
gulp.task('build-m', function () {
    gulp.run(['deleteBuild', 'css', 'js-m', 'moveFiles', 'html-m']);
});

// task release 发布流程
gulp.task('release', function () {
    gulp.run(['releaseBuild']);
});

// Static server
gulp.task('server', function () {
    var files = [
        '**/**/*.*'
    ];
    browserSync.init(files, {
        server: {
            baseDir: './',
            directory: true
        }
    });
});

var transport = require("gulp-seajs-transport");

gulp.task('trans', function () {
    projectUtil.deleteDir('js/dist');

    gulp.src("js/modules/**/*.js")
        .pipe(transport())
        .pipe(replace(/(123.56.237.44:8080)/, "app.asset3.com"))
        .pipe(replace(/define\(\"/g, 'define("dist/'))
        .pipe(gulp.dest("js/dist"));
})

gulp.task('trans-m', function () {
    projectUtil.deleteDir('js/dist');

    gulp.src("js/modules/**/*.js")
        .pipe(transport())
        .pipe(replace(/define\(\"/g, 'define("dist/'))
        .pipe(gulp.dest("js/dist"));
})


