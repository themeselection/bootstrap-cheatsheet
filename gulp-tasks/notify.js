var notifier = require('node-notifier');

module.exports = (gulp, callback) => {
  const notifyHtmlTask = function (done) {
    return notifier.notify({ title: 'HTML Build Successfully', message: 'Done' }, done);
  };
  const notifyCssTask = function (done) {
    return notifier.notify({ title: 'CSS Build Successfully', message: 'Done' }, done);
  };
  const notifyJsTask = function (done) {
    return notifier.notify({ title: 'JS Build Successfully', message: 'Done' }, done);
  };

  // ---------------------------------------------------------------------------
  // Exports

  return {
    html: notifyHtmlTask,
    css: notifyCssTask,
    js: notifyJsTask
  };
};
