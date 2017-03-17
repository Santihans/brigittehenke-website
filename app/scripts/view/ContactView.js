var ContactView = AbstractView.extend({

  viewTemplate: 'contact',

  setup: function(document) {
    var data = document[0];

    return {
      address: data.getStructuredText('contact.contact-address').asHtml(),
      email: data.getText('contact.contact-email'),
      image: data.getImageView('contact.contact-portrait', 'thumb').url
    };
  }
});
