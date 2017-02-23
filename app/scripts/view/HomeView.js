var HomeView = AbstractView.extend({

  viewTemplate: 'home',

  setup: function(document) {
    var documentData = document[0];
    return {
      description: documentData.getText('home.tagline'),
      image: documentData.getImageView('home.wallpaper', 'wallpaper-main').url,
      thumbnail: documentData.getImageView('home.wallpaper', 'wallpaper-loading').url
    };
  },

  ready: function() {
    HomeView.__super__.ready.apply(this, arguments);
    this._lazyLoadWallpaper();
  },

  _lazyLoadWallpaper: function() {
    var el = document.querySelector(".wallpaper-image[data-src]");
    el.setAttribute('src', el.getAttribute('data-src'));
    el.onload = function() {
      el.removeAttribute('data-src');
    }
  }
});
