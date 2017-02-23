const appRouter = require('./router');

var App = (function($, Backbone, global) {
  var init = function() {
    global.navigationView = new NavigationView();
  };

  return {
    init: init
  };
}(jQuery, Backbone, window));

$(function() {
  App.init();
});

Backbone.history.start();
