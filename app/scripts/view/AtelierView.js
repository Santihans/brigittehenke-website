var AtelierView = AbstractView.extend({

  viewTemplate: 'atelier',

  setup: function(document) {
    var data = document[0];

    return {
      content: data.getStructuredText('atelier.atelier').asHtml()
    };
  }

});
