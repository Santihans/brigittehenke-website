var CollectionView = Backbone.View.extend({
  el: "#content",
  initialize: function() {
    console.log('Collection View Initialized');
  },
  render: function(document) {
    var self = this;
    var document = document[0];
    $.get('templates/collection.html', function(data) {
      var template = Handlebars.compile(data);
      var galleryData = [];
      console.log(document);

      var gallery = document.getGroup('exhibition.artwork').toArray();
      gallery.forEach(function(artwork) {
        galleryData.push({
          id: encodeURI(artwork.getText('artwork-caption')),
          image: artwork.getImage('artwork-image').url,
          thumbnail: artwork.getImageView('artwork-image', 'artwork-thumb').url,
          caption: artwork.getText('artwork-caption'),
          dimensionsX: artwork.getNumber('artwork-dimensions-x'),
          dimensionsY: artwork.getNumber('artwork-dimensions-y'),
          year: artwork.getText('artwork-year'),
          availability: artwork.getBoolean('artwork-availability')
        });
      });

      var templateVariables = {
        title: document.getText('exhibition.collection-title'),
        slug: document.slug,
        data: galleryData
      };

      self.$el.html(template(templateVariables));
    }, 'html');
  }

});
