const prismic = require('./prismic.io');

var loadContent = function(prismicQuery) {
  return prismicQuery([
    prismic.Prismic.Predicates.at('document.type', 'exhibition')
  ]).then(function(response) {
    return response.results;
  });
};

prismic.getApi()
  .then(function(api) {
    loadContent(api)
      .then(function(document) {
        $.each(document, function(index, value) {
          var collection = value;
          var collectioData = {
            title: collection.getText('exhibition.collection-title'),
            description: collection.getText('exhibition.collection-description'),
            image: collection.getImage('exhibition.collection-image').url,
            thumbnail: collection.getImageView('exhibition.collection-image', 'collection-thumb').url
          };

          var source   = $("#collection").html();
          var template = Handlebars.compile(source);
          $('.collection').append(template(collectioData));

          console.log(collectioData);

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

      })
  });
