var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('css', ['clean'], function () {
    return gulp.src(['less/main.less'])
        .pipe(less())
        .pipe(gulp.dest('css'));
});

gulp.task("watch", ["default"], function () {
    isBuild = false;
    gulp.watch(['less/*.less'], ["css"]);
});
gulp.task('clean', function (cb) {
     cb && cb();
});
gulp.task('default', ['css']);
