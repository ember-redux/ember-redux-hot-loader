# ember-redux-hot-loader

[![Travis][ci-img]][ci-url] [![NPM][npm-img]][npm-url] ![Ember][ember-img]

Plugin for ember-cli-hot-loader that hot reloads your reducers

## Installation

```
ember install ember-cli-hot-loader
ember install ember-redux-hot-loader
```

Install the [redux dev tools extension]

## Configuration

Alter the supported types configuration of ember-cli-hot-loader to include reducers

```javascript
//my-app/config/environment.js
if (environment === 'development') {
  ENV['ember-cli-hot-loader'] = {
    supportedTypes: ['components', 'reducers']
  }
}
```

## Example application

An example application that hot reloads styles/components/reducers

https://github.com/toranb/ember-hot-reload-demo


[ci-img]: https://img.shields.io/travis/ember-redux/ember-redux-hot-loader.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ember-redux/ember-redux-hot-loader
[ember-img]: https://img.shields.io/badge/ember-3.0+-green.svg "Ember 3.0+"
[npm-img]: https://img.shields.io/npm/v/ember-redux-hot-loader.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-redux-hot-loader
[redux dev tools extension]: https://github.com/zalmoxisus/redux-devtools-extension
