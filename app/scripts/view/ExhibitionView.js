var ExhibitionView = AbstractView.extend({

  viewTemplate: 'exhibition',

  setup: function(document) {
    var exhibitionData = [];

    $.each(document, function(index, value) {
      var collection = value;
      exhibitionData.push({
        title: collection.getText('exhibition.collection-title'),
        id: collection.id,
        description: collection.getText('exhibition.collection-description'),
        yearStart: collection.getText('exhibition.collection-year-start'),
        yearEnd: collection.getText('exhibition.collection-year-end'),
        thumbnail: collection.getImageView('exhibition.collection-image', 'collection-thumb') ? collection.getImageView('exhibition.collection-image', 'collection-thumb').url : 'images/placeholder.jpg',
        artworkCount: collection.getGroup('exhibition.artwork').value.length
      });
    });
    return {data: exhibitionData}
  }

});
