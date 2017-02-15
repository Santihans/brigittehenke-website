const prismic = require('./prismic.io');
const paperRipple = require('./paperRipple');

var loadContent = function(prismicQuery, predicates) {
  return prismicQuery([
    prismic.Prismic.Predicates.at('document.type', predicates)
  ]).then(function(response) {
    return response.results;
  });
};

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'homeRoute',
    'home': 'homeRoute',
    'malerei': 'collectionRoute',
    'malerei/:query': 'galleryRoute',
    'ausstellungen': 'homeRoute',
    'atelier': 'homeRoute',
    'biographie': 'homeRoute',
    'kontakt': 'contactRoute'
  },

  homeRoute: function() {
    prismic.getApi().then(function(api){
      loadContent(api, 'home')
        .then(function(document) {
          console.log(document[0]);
        })
    });
    var homeView = new HomeView();
    homeView.render();
  },

  contactRoute: function() {
    prismic.getApi().then(function(api){
      loadContent(api, 'contact')
        .then(function(document) {
          var contactView = new ContactView();
          contactView.render(document);
        })
    });
  },

  collectionRoute: function() {
    prismic.getApi().then(function(api){
      loadContent(api, 'exhibition')
        .then(function(document) {
          var collectionView = new CollectionView();
          collectionView.render(document);
        })
    });
  },

  galleryRoute: function(collection) {
    $("#content").html('<ul class="collection"></ul>');
    $("#content").append('<h2>' + collection + '</h2>');

    prismic.getApi()
      .then(function(api) {
        loadContent(api, 'exhibition')
          .then(function(document) {
            $.each(document, function(index, value) {
              var collection = value;
              var collectioData = {
                title: collection.getText('exhibition.collection-title'),
                slug: collection.slug,
                description: collection.getText('exhibition.collection-description'),
                image: collection.getImage('exhibition.collection-image').url,
                thumbnail: collection.getImageView('exhibition.collection-image', 'collection-thumb').url
              };

              var source = $("#collection").html();
              var template = Handlebars.compile(source);
              $('.collection').append(template(collectioData));

              // console.log(collectioData);

              var gallery = collection.getGroup('exhibition.artwork').toArray();
              gallery.forEach(function(artwork) {
                var galleryData = {
                  image: artwork.getImage('artwork-image').url,
                  thumbnail: artwork.getImageView('artwork-image', 'artwork-thumb').url,
                  caption: artwork.getText('artwork-caption'),
                  dimensionsX: artwork.getNumber('artwork-dimensions-x'),
                  dimensionsY: artwork.getNumber('artwork-dimensions-y'),
                  year: artwork.getText('artwork-year'),
                  availability: artwork.getBoolean('artwork-availability')
                };
                console.log(galleryData);
              });

            });

          }).then(function() {
          paperRipple.updatePaperRipple();
        })
      });
  }
});

var appRouter = new AppRouter();
Backbone.history.start();
