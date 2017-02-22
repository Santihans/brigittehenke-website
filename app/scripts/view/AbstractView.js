var AbstractView = Backbone.View.extend({
  el: "#content",

  template: 'test',

  initialize: function() {
    console.log('View Initialized');
  },

  render: function(document, params) {
    var self = this;
    var templateVariables;

    $.get('templates/' + this.template + '.html', function(data) {
      var template = Handlebars.compile(data);
      templateVariables = self.setup(document, params);
      self.$el.html(template(templateVariables));
    }, 'html')
      .then(function() {
        self.ready();
      });
  },

  /**
   * @param {Object} document
   * @param {Object|String} params
   * @returns {Object}
   */
  setup: function(document, params) {
    return {}
  },

  ready: function() {
    this.applyPaperRipple();
  },

  applyPaperRipple: function() {
    var buttons = document.querySelectorAll('.paperRipple');

    // Traversing the buttons
    [].forEach.call(buttons, function(button) {
      // New PaperRipple for the button
      var ripple = new PaperRipple();

      // Adding ripple container to the button
      button.appendChild(ripple.$);

      // Subscribing to 'mousedown' and 'mouseup' button events to activate ripple effect
      // when a user clicks on the button.
      button.addEventListener('mousedown', function(ev) {
        ripple.downAction(ev);
      });
      button.addEventListener('mouseup', function() {
        ripple.upAction();
      });
    });
  }
});
