var config = require('./../config');
const Prismic = require('prismic.io');
const queryString = require('query-string');

var prismicApiPromise, prismicUrl;

prismicUrl = config.prismic.repository;
if (config.prismic.cdn) {
  prismicUrl += '.cdn'
}

module.exports = {
  Prismic: Prismic,
  getApi: function() {
    if (!prismicApiPromise) {
      prismicApiPromise = Prismic.api('https://' + prismicUrl + '.prismic.io/api')
        .then(function(api) {
          var prismicRef = queryString.parse(location.search)['token'];
          return function(q) {
            return api.query(q, {ref: prismicRef});
          };
        });
    }
    return prismicApiPromise;
  }
};
