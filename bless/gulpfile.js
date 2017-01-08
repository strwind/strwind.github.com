var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('gulp-browserify');
var less = require('gulp-less');
var gulpIf = require('gulp-if');
var del = require('del');
var cssmin = require('gulp-cssmin');
var isBuild = true;

var paths = {
  scripts: ['src/**/*.js'],
  less: ['./src/**/*.less'],
  images: 'src/**/*.jpg'
};

//切换为生产模式
gulp.task('production', function () {
    isBuild = true;
});
//切换为开发模式
gulp.task('development', function () {
    isBuild = false;
});


// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['build']);
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    
    //.pipe(gulp.dest('./build/js'))
    //.pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015', 'stage-0']
     }))
    .pipe(browserify({
      insertGlobals : true,
      debug : false
    }))
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/'));
});

gulp.task('less', function () {
    //第一层级下的less是最终结果less
    var stream = gulp.src(['./src/less/main.less']);
    stream.pipe(less())
        .on('error', function (err) {
            console.log(err.message);
        })
        .pipe(gulpIf(isBuild, cssmin()))
        .pipe(gulp.dest('./build'));

    return stream;
});

// Copy all static images
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    //.pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build'));
});

// Rerun the task when a file changes
gulp.task('watch', ['development'], function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['production', 'scripts','less', 'images']);
