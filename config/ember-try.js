'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = function() {
  return Promise.all([
    getChannelURL('release'),
    getChannelURL('beta'),
    getChannelURL('canary')
  ]).then(() => {
    return {
      useYarn: true,
      scenarios: [
        {
          name: 'ember-3.1',
          npm: {
            devDependencies: {
              'ember-source': '~3.1.1'
            }
          }
        },
        {
          name: 'ember-default',
          npm: {
            devDependencies: {}
          }
        }
      ]
    };
  });
};
