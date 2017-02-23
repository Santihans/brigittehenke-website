var HomeView = AbstractView.extend({

  template: 'home',

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
  }
});
