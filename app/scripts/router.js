const prismic = require('./prismic.io');

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'homeRoute',
    'home': 'homeRoute',
    'malerei': 'exhibitionRoute',
    'malerei/:collection': 'collectionRoute',
    'malerei/:collection/:artwork': 'artworkRoute',
    'ausstellungen': 'eventsRoute',
    'ausstellungen/:event': 'eventRoute',
    'atelier': 'atelierRoute',
    'biographie': 'biographyRoute',
    'kontakt': 'contactRoute'
  },

  homeRoute: function() {
    var view = new HomeView();
    var query = {predicates: ['document.type', 'home']};
    this._prepareView(view, query);
  },

  exhibitionRoute: function() {
    var view = new ExhibitionView();
    var query = {predicates: ['document.type', 'exhibition']};
    this._prepareView(view, query);
  },

  collectionRoute: function(collectionId) {
    var view = new CollectionView();
    var query = {predicates: ['document.id', collectionId]};
    this._prepareView(view, query);
  },

  artworkRoute: function(collectionId, artwork) {
    var view = new CollectionView();
    var query = {predicates: ['document.id', collectionId]};
    this._prepareView(view, query, artwork);
  },

  eventsRoute: function() {
    var view = new EventsView();
    var query = {predicates: ['document.type', 'events'], options: {orderings: '[my.events.event-year desc]'}};
    this._prepareView(view, query);
  },

  eventRoute: function(eventId) {
    var view = new EventView();
    var query = {predicates: ['document.id', eventId]};
    this._prepareView(view, query);
  },

  atelierRoute: function() {
    var view = new AtelierView();
    var query = {predicates: ['document.type', 'atelier']};
    this._prepareView(view, query);
  },

  biographyRoute: function() {
    var view = new BiographyView();
    var query = {predicates: ['document.type', 'biography']};
    this._prepareView(view, query);
  },

  contactRoute: function() {
    var view = new ContactView();
    var query = {predicates: ['document.type', 'contact']};
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
   * @param api
   * @param {Object} query
   * @returns {*|Promise.<TResult>}
   * @private
   */
  _loadPrismicContent: function(api, query) {
    var options = _.defaults(query.options, {});
    return api([
      prismic.Prismic.Predicates.at.apply(this, query.predicates)
    ], options).then(function(response) {
      return response.results;
    });
  }
});

module.exports = {
  appRouter: new AppRouter()
};
