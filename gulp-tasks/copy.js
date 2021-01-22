var gulpCopy = require('gulp-copy');

module.exports = (gulp, callback) => {
  const copyJsTask = function () {
    return gulp.src(config.source.js + '/**/*.js').pipe(gulp.dest(config.destination.js));
  };


  // ---------------------------------------------------------------------------
  // Exports

  return {
    js: copyJsTask
  };
};
