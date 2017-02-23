var NavigationView = AbstractView.extend({
  el: '#navigation',

  events: {
    'click .hamburger': function(event) {
      this.toggleOffCanvasNavigation();
    },
    'click .navigation-overlay': function() {
      this.toggleOffCanvasNavigation();
    }
  },

  initialize: function() {
    console.log('Navigation View Initialized');
    this.ready();
  },

  ready: function() {
    NavigationView.__super__.ready.apply(this, arguments);
    var self = this;

    Backbone.history.on('route', function(){
      self.closeOffCanvasNavigation();
    })
  },

  toggleOffCanvasNavigation: function() {
    this.$('.hamburger').toggleClass('is-active');
    this.$el.toggleClass('offCanvas');
  },

  closeOffCanvasNavigation: function() {
    this.$('.hamburger').removeClass('is-active');
    this.$el.removeClass('offCanvas');
  }
});
