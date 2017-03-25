var EventView = AbstractView.extend({

  viewTemplate: 'event',

  setup: function(document) {
    var event = document[0];

    var galleryData = [];
    var gallery = event.getGroup('events.event-images').toArray();

    gallery.forEach(function(item) {
      galleryData.push({
        image: item.getImage('image').url
      });
    });

    return {
      id: event.id,
      title: event.getText('events.event-title'),
      year: event.getText('events.event-year'),
      description: event.getText('events.event-description'),
      flyer: event.getImage('events.event-flyer').url,
      images: galleryData
    };
  }

});
