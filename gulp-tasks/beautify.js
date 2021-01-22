var htmlbeautify = require('gulp-html-beautify');

module.exports = (gulp, callback) => {

  const beautifyHtmlTask = function () {
    return gulp
      .src('html/**/*.html')
      .pipe(htmlbeautify({ indentSize: 2 }))
      .pipe(gulp.dest('./html/'));
  };

  // ---------------------------------------------------------------------------
  // Exports

  return {
    html: beautifyHtmlTask
  };
};
