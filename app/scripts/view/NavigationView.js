var NavigationView = AbstractView.extend({
  el: "#navigation",

  events: {
    "click .hamburger": function(event) {
      this.$(event.currentTarget).toggleClass('is-active');
      $('html').toggleClass('offCanvas');
    }
  },

  initialize: function() {
    console.log('Navigation View Initialized');
    this.ready();
  },


  ready: function() {
    var self = this;
    NavigationView.__super__.ready.apply(this, arguments);
  }

});
