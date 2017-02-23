var ExhibitionView = AbstractView.extend({

  template: 'exhibition',

  setup: function(document) {
    var exhibitionData = [];

    $.each(document, function(index, value) {
      var collection = value;
      exhibitionData.push({
        title: collection.getText('exhibition.collection-title'),
        id: collection.id,
        description: collection.getText('exhibition.collection-description'),
        image: collection.getImage('exhibition.collection-image').url,
        thumbnail: collection.getImageView('exhibition.collection-image', 'collection-thumb').url,
        artworkCount: collection.getGroup('exhibition.artwork').value.length
      });
    });
    return {data: exhibitionData}
  }

});
