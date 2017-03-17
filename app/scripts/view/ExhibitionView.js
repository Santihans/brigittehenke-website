var ExhibitionView = AbstractView.extend({

  viewTemplate: 'exhibition',

  setup: function(document) {
    var exhibitionData = [];

    $.each(document, function(index, value) {
      var collection = value;

      var yearsString = '';
      var yearStart = collection.getText('exhibition.collection-year-start');
      var yearEnd = collection.getText('exhibition.collection-year-end');

      if (yearStart && yearEnd) {
        if (yearEnd === yearStart) {
          yearsString = yearEnd;
        } else {
          yearsString = yearStart + ' - ' + yearEnd;
        }
      }

      exhibitionData.push({
        title: collection.getText('exhibition.collection-title'),
        id: collection.id,
        description: collection.getText('exhibition.collection-description'),
        years: yearsString,
        thumbnail: collection.getImageView('exhibition.collection-image', 'collection-thumb') ? collection.getImageView('exhibition.collection-image', 'collection-thumb').url : 'images/placeholder.jpg',
        artworkCount: collection.getGroup('exhibition.artwork').value.length
      });
    });
    return {data: exhibitionData}
  }
});
