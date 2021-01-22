var pug = require('gulp-pug');
var watch = require('gulp-watch');

module.exports = (gulp, callback) => {

  const pugHtmlTask = function () {
    return gulp
      .src(pugSrc, { cwd: config.source.template + '/pages/' })
      .pipe(
        pug({
          pretty: true,
          data: {
            app_assets_path: config.app_assets_path
          }
        })
      )
      .pipe(gulp.dest("./"));
  };

  const pugWatchTask = function () {
    return watch(config.source.template + '/pages/*.pug')
      .pipe(
        pug({
          pretty: true,
          data: {
            app_assets_path: config.app_assets_path
          }
        })
      )
      .pipe(gulp.dest("./"));
  };

  // ---------------------------------------------------------------------------
  // Exports

  return {
    html: pugHtmlTask,
    watch: pugWatchTask
  };
};
