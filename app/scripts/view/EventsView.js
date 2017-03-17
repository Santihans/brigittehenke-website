var EventsView = AbstractView.extend({

  viewTemplate: 'events',

  /** @type {Object} */
  _slick: null,

  setup: function(document) {
    var eventsData = [];

    $.each(document, function(index, value) {
      var event = value;
      eventsData.push({
        id: event.id,
        title: event.getText('events.event-title'),
        year: event.getText('events.event-year'),
        thumbnail: event.getImageView('events.event-flyer', 'thumbnail').url,
      });
    });
    return {data: eventsData}
  },

  ready: function() {
    CollectionView.__super__.ready.apply(this, arguments);
  }
});
