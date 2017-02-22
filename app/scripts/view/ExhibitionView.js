var ExhibitionView = Backbone.View.extend({
  el: "#content",
  initialize: function() {
    console.log('Exhibition View Initialized');
  },
  render: function(document) {
    var self = this;
    $.get('templates/exhibition.html', function(data) {
      var template = Handlebars.compile(data);
      var exhibitionData = [];

      $.each(document, function(index, value) {
        var collection = value;
        exhibitionData.push({
          title: collection.getText('exhibition.collection-title'),
          id: collection.id,
          description: collection.getText('exhibition.collection-description'),
          image: collection.getImage('exhibition.collection-image').url,
          thumbnail: collection.getImageView('exhibition.collection-image', 'collection-thumb').url
        });
      });
      self.$el.html(template({data: exhibitionData}));
    }, 'html');
  }

});
