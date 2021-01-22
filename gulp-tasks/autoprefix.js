var autoprefixer = require('gulp-autoprefixer');

module.exports = function (gulp, callback) {

  const autoPrefixCssTask = function () {
    return gulp
      .src(['**/*.css', '!**/*.min.css'], { cwd: config.destination.css })
      .pipe(
        autoprefixer({
          browsers: config.autoprefixerBrowsers,
          cascade: false
        })
      )
      .pipe(gulp.dest(config.destination.css));
  };

  return {
    css: autoPrefixCssTask
  };
};
