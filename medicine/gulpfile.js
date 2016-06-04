var gulp = require('gulp'),
    watch = require('gulp-watch');

gulp.task('stream', function () {
    return gulp.src('css/**/*.css')
        .pipe(watch('css/**/*.css'))
        .pipe(gulp.dest('build'));
});

gulp.task('callback', function (cb) {
    watch('css/**/*.css', function () {
        gulp.src('css/**/*.css')
            .pipe(watch('css/**/*.css'))
            .on('end', cb);
    });
});