const prismic = require('./prismic.io');

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'homeRoute',
    'home': 'homeRoute',
    'malerei': 'exhibitionRoute',
    'malerei/:collection': 'collectionRoute',
    'malerei/:collection/:artwork': 'artworkRoute',
    'ausstellungen': 'homeRoute',
    'atelier': 'homeRoute',
    'biographie': 'homeRoute',
    'kontakt': 'contactRoute'
  },

  homeRoute: function() {
    var query = ['document.type', 'home'];
    var view = new HomeView();
    this._prepareView(query, view);
  },

  contactRoute: function() {
    var query = ['document.type', 'contact'];
    var view = new ContactView();
    this._prepareView(query, view);
  },

  exhibitionRoute: function() {
    var query = ['document.type', 'exhibition'];
    var view = new ExhibitionView();
    this._prepareView(query, view);
  },

  collectionRoute: function(collectionId) {
    var query = ['document.id', collectionId];
    var view = new CollectionView();
    this._prepareView(query, view);
  },

  artworkRoute: function(collectionId, artwork) {
    var query = ['document.id', collectionId];
    var view = new CollectionView();
    this._prepareView(query, view, artwork);
  },

  _prepareView: function(query, view, params) {
    var self = this;
    prismic.getApi().then(function(api) {
      self._loadPrismicContent(api, query)
        .then(function(document) {
          view.render(document, params);
        })
    });
  },

  _loadPrismicContent: function(prismicQuery, predicates) {
    return prismicQuery([
      prismic.Prismic.Predicates.at.apply(this, predicates)
    ]).then(function(response) {
      return response.results;
    });
  }
});

module.exports = {
  appRouter: new AppRouter()
};
