var sass = require('gulp-sass')(require('sass'));
var merge = require('merge-stream');

module.exports = (gulp, callback) => {

  const scssPagesTask = function () {
    return gulp
      .src(config.source.sass + '/**/*.scss')
      .pipe(
        sass({
          includePaths: ['node_modules']
        })
      )
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(config.destination.css + '/'));
  };

  const scssWatchTask = function () {
    return gulp.watch(
      [config.source.sass + '/**/*.scss'],
      gulp.parallel(scssPagesTask)
    );
  };

  // ---------------------------------------------------------------------------
  // Exports

  return {
    pages: scssPagesTask,
    watch: scssWatchTask
  };
};