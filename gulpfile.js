const gulp = require('gulp');
const replace = require('gulp-replace');
const path = require('path');
const footer = require('gulp-footer');

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
    .pipe(replace('data-index="assets/js/search.js"', 'data-index="/sdk/assets/js/search.js"'))
    .pipe(gulp.dest('dist/docs'));
});


gulp.task('fixpath:search', function() {
  const fix = `\ntypedoc.search.data.rows.forEach(function(row, index, array) {
      row.url = '/sdk/' + row.url;
      array[index] = row;
    });
    `;

  return gulp.src('dist/docs/assets/js/search.js')
    .pipe(footer(fix))
    .pipe(gulp.dest('dist/docs/assets/js/'));
});
