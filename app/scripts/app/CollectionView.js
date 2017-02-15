var CollectionView = Backbone.View.extend({
  el: "#content",
  initialize: function() {
    console.log('Collection View Initialized');
  },
  render: function(document) {
    var self = this;
    $.get('templates/collection.html', function(data) {
      var template = Handlebars.compile(data);
      var collectionData = [];

      $.each(document, function(index, value) {
        var collection = value;
        collectionData.push({
          title: collection.getText('exhibition.collection-title'),
          slug: collection.slug,
          description: collection.getText('exhibition.collection-description'),
          image: collection.getImage('exhibition.collection-image').url,
          thumbnail: collection.getImageView('exhibition.collection-image', 'collection-thumb').url
        });
      });
      self.$el.html(template({data: collectionData}));
    }, 'html');
  }

});
