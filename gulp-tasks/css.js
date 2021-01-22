var csscomb = require('gulp-csscomb');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

module.exports = (gulp, callback) => {
  const cssCombTask = function () {
    return gulp
      .src(['**/*.css', '!**/*.min.css'], { cwd: config.destination.css })
      .pipe(csscomb())
      .pipe(gulp.dest(config.destination.css));
  };

  const cssMinTask = function () {
    return gulp
      .src(['**/*.css', '!**/*.min.css'], { cwd: config.destination.css })
      .pipe(cssmin())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(config.destination.css));
  };


  // ---------------------------------------------------------------------------
  // Exports

  return {
    css_comb: cssCombTask,
    css_min: cssMinTask
  };
};
