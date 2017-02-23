var BiographyView = AbstractView.extend({

  viewTemplate: 'biography',

  setup: function(document) {
    var data = document[0];

    return {
      biography: data.getStructuredText('biography.biography').asHtml()
    };
  }

});
