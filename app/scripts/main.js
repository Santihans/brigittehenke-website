const prismic = require('./prismic.io');

var loadContent = function(prismicQuery) {
  return prismicQuery([
    prismic.Prismic.Predicates.any('document.type', [])
  ]).then(function(response) {
    return response.results;
  });
};

prismic.getApi()
  .then(function(api) {
    loadContent(api)
      .then(function(document){
        console.log(document);
      })
  });
