var CollectionView = Backbone.View.extend({
  el: "#content",

  /** @type {Object} */
  _slick: null,

  /** @type {Number} */
  _index: null,

  initialize: function() {
    console.log('Collection View Initialized');
  },
  /**
   * @param {Object} document
   */
  render: function(document) {
    var self = this;
    var documentContent = document[0];
    $.get('templates/collection.html', function(data) {
      var template = Handlebars.compile(data);
      var galleryData = [];

      var gallery = documentContent.getGroup('exhibition.artwork').toArray();
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
        title: documentContent.getText('exhibition.collection-title'),
        id: documentContent.id,
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

    this.$('#galleryModal').on('show.bs.modal', function(e) {
      self.setupSlick();
    });

    this.$('#galleryModal').on('shown.bs.modal', function(e) {
      self.updateSlick();

      self.$('#galleryCarousel').addClass('carousel-visible');
      self.$('.galleryImage').on('loaded', function() {
        self.positionGalleryCard($(this).closest('.item'));
      });
    });

    this.$('#galleryModal').on('hide.bs.modal', function(e) {
      self.$('#galleryCarousel').removeClass('carousel-visible');
      self.getSlick().slick('unslick');
    });

  },

  setupSlick: function() {
    var self = this;
    this._slick = this.$('#galleryCarousel').slick({
      prevArrow: '<a href="javascript:;" class="slick-prev">&lt;</a>',
      nextArrow: '<a href="javascript:;" class="slick-next">&gt;</a>',
      lazyLoad: 'ondemand',
      initialSlide: this._index
    });


    this._slick.on('lazyLoaded', function(event, slick, image, imageSource) {
      image.trigger('loaded');
    });

    this._slick.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      self._index = currentSlide;
      self.$('.item').removeClass('card-visible');
    });

    this._slick.on('afterChange', function(event, slick, currentSlide, nextSlide) {
      self._index = currentSlide;
      _.defer(function() {
        self.positionGalleryCard(self.$('[data-slick-index="' + currentSlide + '"]'));
      })
    });
  },

  /**
   * @returns {Slick|null}
   */
  getSlick: function() {
    return this._slick;
  },

  updateSlick: function() {
    this._slick.slick('slickGoTo', this._index, true);
    this._slick.slick('setPosition');
  },

  /**
   * @param {jQuery} $item
   */
  positionGalleryCard: function($item) {
    if ($item.find('.galleryImage')[0].hasAttribute('src')) {
      var image = $item.find('.galleryImage')[0];
      $item.find('.galleryCard').css({
        'padding-left': image.offsetLeft,
        'padding-right': image.offsetLeft,
        'top': -image.offsetTop
      });
      $item.addClass('card-visible');
    }
  }
});
