var HomeView = AbstractView.extend({

  template: 'home',

  setup: function() {
    return {test: 'yo'}
  },

  ready: function() {
    HomeView.__super__.ready.apply(this, arguments);
  }
});
