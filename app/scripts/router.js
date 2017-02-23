const prismic = require('./prismic.io');

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'homeRoute',
    'home': 'homeRoute',
    'malerei': 'exhibitionRoute',
    'malerei/:collection': 'collectionRoute',
    'malerei/:collection/:artwork': 'artworkRoute',
    'ausstellungen': 'eventsRoute',
    'atelier': 'atelierRoute',
    'biographie': 'biographyRoute',
    'kontakt': 'contactRoute'
  },

  homeRoute: function() {
    var query = ['document.type', 'home'];
    var view = new HomeView();
    this._prepareView(view, query);
  },

  exhibitionRoute: function() {
    var query = ['document.type', 'exhibition'];
    var view = new ExhibitionView();
    this._prepareView(view, query);
  },

  collectionRoute: function(collectionId) {
    var query = ['document.id', collectionId];
    var view = new CollectionView();
    this._prepareView(view, query);
  },

  artworkRoute: function(collectionId, artwork) {
    var query = ['document.id', collectionId];
    var view = new CollectionView();
    this._prepareView(view, query , artwork);
  },

  eventsRoute: function() {
    var view = new EventsView();
    this._prepareView(view);
  },

  atelierRoute: function() {
    var view = new AtelierView();
    this._prepareView(view);
  },

  biographyRoute: function() {
    var view = new BiographyView();
    this._prepareView(view);
  },

  contactRoute: function() {
    var query = ['document.type', 'contact'];
    var view = new ContactView();
    this._prepareView(view, query);
  },

  /**
   * @param {AbstractView} view
   * @param {Array|null} [query]
   * @param {Object|String} [params]
   * @private
   */
  _prepareView: function(view, query, params) {
    var self = this;
    if (undefined !== query) {
      prismic.getApi().then(function(api) {
        self._loadPrismicContent(api, query)
          .then(function(document) {
            view.render(document, params);
          })
      });
    } else {
      view.render();
    }
  },

  /**
   * @param prismicQuery
   * @param {Array} predicates
   * @returns {*|Promise.<TResult>}
   * @private
   */
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
