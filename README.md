# Artist Website for Brigitte Henke 

Front-end web app using gulp and prismic.io as the CMS backend.
Fork from https://github.com/Santihans/prismic-webapp-boilerplate
(Initially used https://github.com/yeoman/generator-webapp as a starting point)

## Getting Started
- Install: `npm install --global gulp-cli bower`
- Install node packages: `npm install`
- Install bower packages: `bower install`

## Prismic.io
- Signup at [Prismic.io](https://prismic.io/), create documents and publish them. 
- Adjust `/app/config.json`
- Adjust prismic query in `/app/main.js`

## Run App
- Run `gulp serve` to preview and watch for changes
- Run `bower install --save <package>` to install frontend dependencies
- Run `gulp serve:test` to run the tests in the browser
- Run `gulp` to build your webapp for production
- Run `gulp serve:dist` to preview the production build
- Run `gulp deploy --host 'host' --user 'username' --password 'password'` to deploy using ftp 

## License

[BSD license](https://opensource.org/licenses/bsd-license.php)
