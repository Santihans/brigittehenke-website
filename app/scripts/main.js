const prismic = require('./prismic.io');
const paperRipple = require('./paperRipple');

var loadContent = function(prismicQuery, predicates) {
  return prismicQuery([
    prismic.Prismic.Predicates.at.apply(this, predicates)
  ]).then(function(response) {
    return response.results;
  });
};

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
    prismic.getApi().then(function(api){
      loadContent(api, ['document.type', 'home'])
        .then(function(document) {
          console.log(document[0]);
        })
    });
    var homeView = new HomeView();
    homeView.render();
  },

  contactRoute: function() {
    prismic.getApi().then(function(api){
      loadContent(api, ['document.type', 'contact'])
        .then(function(document) {
          var contactView = new ContactView();
          contactView.render(document);
        })
    });
  },

  exhibitionRoute: function() {
    prismic.getApi().then(function(api){
      loadContent(api, ['document.type', 'exhibition'])
        .then(function(document) {
          var collectionView = new ExhibitionView();
          collectionView.render(document);
          console.log(document);
        })
    });
  },

  collectionRoute: function(collectionId) {
    prismic.getApi().then(function(api){
      loadContent(api, ['document.id', collectionId])
        .then(function(document) {
          var collectionView = new CollectionView();
          collectionView.render(document);
        })
    });
  },

  artworkRoute: function(collectionId) {
    prismic.getApi().then(function(api){
      loadContent(api, ['document.id', collectionId])
        .then(function(document) {
          var collectionView = new CollectionView();
          collectionView.render(document);
        })
    });
  }
});

var appRouter = new AppRouter();
Backbone.history.start();
