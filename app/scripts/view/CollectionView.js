var CollectionView = AbstractView.extend({

  template: 'collection',

  /** @type {Number} */
  _requestedArtwork: null,

  /** @type {Object} */
  _slick: null,

  /** @type {Number} */
  _index: null,

  /** @type {String} */
  _baseUrl: null,

  events: {
    "click .showImage": function(event) {
      this._index = $(event.currentTarget).attr('data-index');
    },

    "click .showLegend": function(event) {
      this.$(event.currentTarget).toggleClass('legend-visible')
    }
  },

  setup: function(document, params) {
    this.requestedArtwork = parseInt(params);
    var documentContent = document[0];
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

    if (null === this._baseUrl) {
      var currentRoute = Backbone.history.getFragment();
      var n = currentRoute.indexOf(documentContent.id) + documentContent.id.length;
      this._baseUrl = currentRoute.substring(0, n != -1 ? n : currentRoute.length);
    }

    return {
      title: documentContent.getText('exhibition.collection-title'),
      id: documentContent.id,
      data: galleryData
    };
  },

  ready: function() {
    CollectionView.__super__.ready.apply(this, arguments);

    this.setupModal();
    this.$('[data-index="' + this.requestedArtwork + '"]').trigger('click');
  },

  setupModal: function() {
    var self = this;
    var $modal = this.$('#galleryModal');

    $modal.on('show.bs.modal', function(e) {
      self.setupSlick();
    });

    $modal.on('shown.bs.modal', function(e) {
      self.updateSlick();
      self.$('.galleryImage').on('loaded', function() {
        $(this).siblings('.spinner').css('visibility', 'hidden');
        self.positionGalleryCard($(this).closest('.item'));
      });
      self.applyPaperRipple();
    });

    $modal.on('hide.bs.modal', function(e) {
      self._destroySlick();
      Backbone.history.navigate(self._baseUrl);
    });
  },

  setupSlick: function() {
    var self = this;
    this._slick = this.$('#galleryCarousel').slick({
      prevArrow: '<a href="javascript:;" class="paperRipple slick-prev">&lt;</a>',
      nextArrow: '<a href="javascript:;" class="paperRipple slick-next">&gt;</a>',
      lazyLoad: 'ondemand',
      initialSlide: this._index
    }).addClass('carousel-visible');
    
    this._slick.on('lazyLoaded', function(event, slick, image, imageSource) {
      image.trigger('loaded');
    });

    this._slick.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      self._index = currentSlide;
      self.$('.item').removeClass('card-visible');
    });

    this._slick.on('afterChange', function(event, slick, currentSlide, nextSlide) {
      self._index = currentSlide;
      Backbone.history.navigate(self._baseUrl + '/' + currentSlide);
      _.defer(function() {
        self.positionGalleryCard(self.$('[data-slick-index="' + currentSlide + '"]'));
      })
    });

    this.handleWindowResize();
  },

  updateSlick: function() {
    this._slick.slick('slickGoTo', this._index, true);
    this._slick.slick('setPosition');
  },

  /**
   * @param {jQuery} $item
   */
  positionGalleryCard: function($item) {
    if ($item && $item.find('.galleryImage')[0].hasAttribute('src')) {
      var image = $item.find('.galleryImage')[0];
      $item.find('.galleryCard').css({
        'padding-left': image.offsetLeft,
        'padding-right': image.offsetLeft,
        'top': -image.offsetTop
      });
      $item.addClass('card-visible');
    }
  },

  handleWindowResize: function() {
    var self = this;
    var callback = _.debounce(function() {
      self.positionGalleryCard(self.$('[data-slick-index="' + self._index + '"]'));
    }, 200);
    $(window).on('resize', callback);
    this._slick.on('destroy', function() {
      $(window).off('resize', callback);
    });
  },

  _destroySlick: function() {
    if (this._slick) {
      this._slick.slick('unslick').removeClass('carousel-visible');
      this._slick = null;
      this._index = null;
    }
  }
});
