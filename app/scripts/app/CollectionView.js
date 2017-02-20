var CollectionView = Backbone.View.extend({
  el: "#content",

  _slick: null,
  _index: null,

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
      this._index = $(event.currentTarget).attr('data-index');
    },

    "click .showLegend": function(event) {
      this.$(event.currentTarget).toggleClass('legend-visible')
    }
  },

  ready: function() {
    var self = this;
    var modalReady = $.Deferred();

    this._slick = this.$('#galleryCarousel').slick({
      prevArrow: '<a href="javascript:;" class="slick-prev">&lt;</a>',
      nextArrow: '<a href="javascript:;" class="slick-next">&gt;</a>',
      lazyLoad: 'ondemand',
      initialSlide: self._index
    });

    this.$('#galleryModal').on('shown.bs.modal', function(e) {
      self.updateSlick();
      modalReady.resolve();
    });

    this.$('#galleryModal').on('hide.bs.modal', function(e) {
    });

    this._slick.on('lazyLoaded', function(event, slick, image, imageSource) {
      image.trigger('loaded');
    });

    this._slick.on('afterChange', function(event, slick, currentSlide, nextSlide) {
      this._index = currentSlide;
    });

    $.when(modalReady).done(function() {
      self.$('.galleryImage').on('loaded', function() {
        self.positionGalleryCard($(this).closest('.item'));
      });
    });
  },

  updateSlick: function() {
    this._slick.slick('slickGoTo', this._index, true);
    this._slick.slick('setPosition');
  },

  positionGalleryCard: function($item) {
    $item.addClass('image-loaded');
    var image = $item.find('.galleryImage')[0];
    $item.find('.galleryCard').css({
      'padding-left': image.offsetLeft,
      'padding-right': image.offsetLeft,
      'top': -image.offsetTop
    });
  }
});
