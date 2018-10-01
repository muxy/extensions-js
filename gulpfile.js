const gulp = require('gulp');
const replace = require('gulp-replace');
const path = require('path');


gulp.task('fixpath', function () {
  return gulp.src('dist/docs/**/*.html')
    .pipe(replace(/src="([^"]*)"/g, function(match, p1, offset, string) {

      if (path.isAbsolute(p1)) {
        return `src="${p1}"`
      }

      const dirname = path.dirname(this.file.path);
      const resolved = path.resolve(dirname, p1);
      const relative = path.relative(path.join(this.file.cwd, 'dist/docs'), resolved);
      const final = path.resolve('/sdk', '', relative);

      return `src="${final}"`
    }))
    .pipe(replace(/href="([^"]*)"/g, function(match, p1, offset, string) {

      if (path.isAbsolute(p1)) {
        return `href="${p1}"`
      }

      const dirname = path.dirname(this.file.path);
      const resolved = path.resolve(dirname, p1);
      const relative = path.relative(path.join(this.file.cwd, 'dist/docs'), resolved);
      const final = path.resolve('/sdk', '', relative);

      return `href="${final}"`
    }))
    .pipe(gulp.dest('dist/docs'));
});



