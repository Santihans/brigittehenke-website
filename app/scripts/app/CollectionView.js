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

      var gallery = document.getGroup('exhibition.artwork').toArray();
      gallery.forEach(function(artwork) {
        galleryData.push({
          uri: encodeURI(artwork.getText('artwork-caption')),
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
        id: document.id,
        data: galleryData
      };

      self.$el.html(template(templateVariables));
    }, 'html').then(function() {
      self.ready();
    });
  },

  events: {
    "click .showImage": function(event) {
      var image = $(event.currentTarget).attr('data-image-url');
    },

    "click .showLegend": function(event) {
      this.$(event.currentTarget).toggleClass('legend-visible')
    }
  },

  ready: function() {
    var self = this;

    this.$('#galleryModal').on('shown.bs.modal', function(e) {
      self.$('#galleryCarousel').slick({
        prevArrow: '<a href="javascript:;" class="slick-prev">&lt;</a>',
        nextArrow: '<a href="javascript:;" class="slick-next">&gt;</a>'
      });

      self.positionGalleryCard();
    });
  },


  positionGalleryCard: function() {
    this.$('.item').each(function() {
      var $image = $(this).find('.galleryImage');
      $(this).find('.galleryCard').css({
        'padding-left': $image[0].offsetLeft,
        'padding-right': $image[0].offsetLeft,
        'top': -$image[0].offsetTop,
        'opacity': 1
      });
    });
  }

});
