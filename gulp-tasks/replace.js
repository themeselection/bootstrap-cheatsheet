var replace = require('gulp-replace');

module.exports = (gulp, callback) => {
  const replaceCssTask = function () {
    return gulp
      .src('html/**/*.html')
      .pipe(replace(/(<link\b.+href=")(?!http)(.+\assets\b.+[^min])(\.css)(".*>)/g, '$1$2.min$3$4'))
      .pipe(gulp.dest('./html/'));
  };

  const replaceJsTask = function () {
    return gulp
      .src('html/**/*.html')
      .pipe(replace(/(<script\b.+src=")(?!http)(.+\assets\b.+[^min])(\.js)(".*>)/g, '$1$2.min$3$4'))
      .pipe(gulp.dest('./html/'));
  };

  // ---------------------------------------------------------------------------
  // Exports

  return {
    css: replaceCssTask,
    js: replaceJsTask
  };
};
