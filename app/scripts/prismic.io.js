const Prismic = require('prismic.io');
const queryString = require('query-string');

var prismicApiPromise;

module.exports = {
  Prismic: Prismic,
  getApi: function() {
    if (!prismicApiPromise) {
      prismicApiPromise = Prismic.api('https://brigittehenke.cdn.prismic.io/api')
        .then(function(api) {
          var prismicRef = queryString.parse(location.search)['token'];
          return function(q, queryOptions) {
            return api.query(q, _.extend({ref: prismicRef}, queryOptions));
          };
        });
    }
    return prismicApiPromise;
  }
};
