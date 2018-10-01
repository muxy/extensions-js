var gulp = require('gulp');
var replace = require('gulp-replace');

gulp.task('fixpath', function () {
  return gulp.src('dist/docs/**/*.html')
    .pipe(replace(/src="([^"]*)"/g, 'src="/sdk/$1"'))
    .pipe(replace(/href="([^"]*)"/g, 'href="/sdk/$1"'))
    .pipe(gulp.dest('dist/fixeddocs'));
});
