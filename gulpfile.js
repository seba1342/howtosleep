// Load plugins
const browsersync = require("browser-sync").create();
const gulp = require("gulp");
const sass = require('gulp-sass');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function(cb) {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))

  // jQuery Easing
  gulp.src([
      'node_modules/jquery.easing/*.js'
    ])
    .pipe(gulp.dest('vendor/jquery-easing'))

  cb();

});

// error handler
function handleError (error) {
  console.log(error.toString()) //this will show details on the error
  this.emit('end')
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    }
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Watch files
function watchFiles() {
  gulp.watch('scss/*.scss', gulp.parallel('sass'));
  gulp.watch("./css/*.css", browserSyncReload);
  gulp.watch("./**/*.html", browserSyncReload);
  gulp.watch("js/*.js", browserSyncReload);
}

gulp.task("default", gulp.parallel('vendor'));

// dev task
gulp.task("dev", gulp.parallel(watchFiles, browserSync));

// sass task
gulp.task('sass', function(){
  return gulp.src('scss/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .on('error', handleError)
    .pipe(gulp.dest('css'))
})
// watch sass
gulp.task('watch', function(){
  gulp.watch('scss/*.scss', gulp.parallel('sass'));
})
