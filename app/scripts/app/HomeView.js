var HomeView = Backbone.View.extend({
  el: "#content",
  initialize: function() {
    console.log('Home View Initialized');
  },
  render: function() {
    var self = this;
    $.get('templates/home.html', function(data) {
      var template = Handlebars.compile(data);
      self.$el.html(template({test: "yo"}));
    }, 'html');
  }

});
