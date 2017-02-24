var AbstractView = Backbone.View.extend({
  el: '#content',

  /** @type {String} */
  viewTemplate: 'default',

  /** @type {jQuery} */
  $body: null,

  initialize: function() {
    console.log('View Initialized');
    this.$body = $('body');
    this._updateNavigation();
    this._headerShadow();
    this.$body.addClass('page-loading');
  },

  /**
   * @param {Object} document
   * @param {Object|String} [params]
   */
  render: function(document, params) {
    var self = this;
    var templateVariables;

    $.get('templates/' + this.viewTemplate + '.html', function(data) {
      var template = Handlebars.compile(data);
      templateVariables = self.setup(document, params);
      self.$el.html(template(templateVariables));
    }, 'html')
      .then(function() {
        self.ready();
        _.delay(function(){
          self.$body.removeClass('page-loading');
        }, 100);

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
    var buttons = this.el.querySelectorAll('.paperRipple');

    // Traversing the buttons
    [].forEach.call(buttons, function(button) {

      if (this.$(button).find('.paper-ripple').length != 0) {
        return
      }

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
  },

  _updateNavigation: function() {
    this.$body.attr('data-view', this.viewTemplate);
    this.$body.find('#navigation [data-href]').removeClass('active');
    this.$body.find('#navigation [data-href*="' + this.viewTemplate + '"]').addClass('active');
  },

  _headerShadow: function() {
    var self = this;
    var $element = $(document);
    $element.on('scroll.scrollShadow', _.throttle(function() {
      var scrollTop = $element.scrollTop();
      self.$body.find('.header').toggleClass('header-shadow', scrollTop != 0);
    }, 200));
  }

});
