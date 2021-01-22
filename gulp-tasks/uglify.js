var uglify = require('gulp-terser');
var rename = require('gulp-rename');

module.exports = (gulp, callback) => {
  const uglifyJsTask = function () {
    return gulp
      .src(['**/*.js', '!**/*.min.js'], {
        cwd: config.destination.js
      })
      .pipe(uglify())
      .on('error', function (err) {
        console.log('\x1b[31m', err.toString());
      })
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(config.destination.js));
  };

  // ---------------------------------------------------------------------------
  // Exports

  return {
    js: uglifyJsTask
  };
};
