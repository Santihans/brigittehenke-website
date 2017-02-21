var ContactView = Backbone.View.extend({
  el: "#content",
  initialize: function() {
    console.log('Contact View Initialized');
  },
  render: function(document) {
    var self = this;
    $.get('templates/contact.html', function(data) {
      var template = Handlebars.compile(data);
      var templateVariables = {
        address: document[0].getStructuredText('contact.contact-address').asHtml(),
        email: document[0].getText('contact.contact-email')
      };

      self.$el.html(template({data: templateVariables}));
    }, 'html');
  }

});
