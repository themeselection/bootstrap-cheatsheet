// Require the modules.
var gulp = require('gulp');
var gutil = require('gulp-util');

// var minimist = require('minimist');
var config = require('./config.json');

// var options = minimist(process.argv.slice(2));

// global.myLayout = options.Layout;
global.config = config;
global.pugSrc = ['*.pug', '!**/template.pug'];


gutil.log(gutil.colors.green('Starting Gulp!!'));

const autoPrefixTasks = require('./gulp-tasks/autoprefix')(gulp);
const beautifyTasks = require('./gulp-tasks/beautify')(gulp);
const cleanTasks = require('./gulp-tasks/clean')(gulp);
const copyTask = require('./gulp-tasks/copy')(gulp);
const cssTasks = require('./gulp-tasks/css')(gulp);
const pugTasks = require('./gulp-tasks/pug')(gulp);
const replaceTasks = require('./gulp-tasks/replace')(gulp);
const scssTasks = require('./gulp-tasks/scss')(gulp);
const uglifyTasks = require('./gulp-tasks/uglify')(gulp);
const notifyTasks = require('./gulp-tasks/notify')(gulp);

// Clean CSS & JS
gulp.task('dist-clean', cleanTasks.css, cleanTasks.js);

// Create CSS from SCSS
gulp.task(
  'dist-css',
  gulp.series(
    cleanTasks.css,
    scssTasks.pages,
    autoPrefixTasks.css,
    cssTasks.css_comb,
    cssTasks.css_min,
    gulp.parallel(notifyTasks.css)
  )
);

// Dist JS
gulp.task('dist-js', gulp.series(cleanTasks.js, copyTask.js, uglifyTasks.js, notifyTasks.js));

// Dist HTML
gulp.task(
  'dist-html',
  gulp.series(cleanTasks.html, pugTasks.html, notifyTasks.html)
);

// Monitor Changes
gulp.task('monitor', gulp.series(gulp.parallel(pugTasks.watch, scssTasks.watch)));

// Beautify HTML
gulp.task('beautify-html', gulp.series(beautifyTasks.html));

// Replacement Tasks
gulp.task('replacement', gulp.series(replaceTasks.css, replaceTasks.js));

// Default / Basic tasks
gulp.task('dist', gulp.parallel('dist-clean', 'dist-css', 'dist-js', 'dist-html', 'beautify-html', 'replacement'));

gulp.task('default', gulp.parallel('dist-css', 'dist-js'));
