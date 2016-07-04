var imgSprite = true;
var nodejsPath = require('path');
var gulp = require('gulp');
var thumbnail = require('gulp-jingoal-thumbnail');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var sprite = require('jingoal-sprite');
var Q = require('q');
if(typeof gulp.env.key == "undefined"){
	console.log("没有制定calendar项目目录，默认是gulp的父目录");
	var cwd = process.cwd();
	var appPath = cwd+"/..";
}else{
	var appPath = gulp.env.key;
}
//appPath 必须是绝对路径
gulp.task('sasstask', function () {
    gulp.src(appPath + '/static/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            require('postcss-jingoal')
        ]))
        .pipe(gulp.dest(appPath + '/dest/css'));
});
/*缩略图*/
gulp.task('thumbnailtask', function () {
    return gulp.src(appPath + '/dest/imgs/2x/*.png')
        .pipe(thumbnail("../1x"));
});
/*图片位置map*/
gulp.task('fileMap',["thumbnailtask"], function () {
    return gulp.src(appPath + '/dest/imgs/2x/*.png').pipe(sprite.fileMap());
});

/*生成sprite*/
gulp.task('spritetask', ["sasstask","fileMap"], function () {
    sprite.createSprite(function () {
        gulp.src(appPath + '/dest/css/*.css')
            .pipe(postcss([
                require('postcss-jingoal-sprite')
            ]))
            .pipe(gulp.dest(appPath + '/dest/css'));
    });
});
gulp.task('watch', function () {
    gulp.watch(appPath + '/static/css/**/*.scss', ['sasstask']);
    gulp.watch(appPath + '/dest/imgs/2x/*.png', ['thumbnailtask']);
});
gulp.task('default', ['watch']);
gulp.task('erbei', ['thumbnailtask']);
gulp.task('sass', ['sasstask']);
gulp.task('sprite', ['spritetask']);

