var BiographyView = AbstractView.extend({

  template: 'biography',

  setup: function(document) {
    var data = document[0];

    return {
      biography: data.getStructuredText('biography.biography').asHtml()
    };
  }

});
