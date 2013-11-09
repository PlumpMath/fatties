/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
require.config({
  baseURL: '../',

  paths: {
      'domReady': '../lib/requirejs-domready/domReady',
      'angular': '../lib/angular/angular'
  },

  packages: [
    {
      name: 'physicsjs',
      location: '../lib/physicsjs',
      main: 'physicsjs-0.5.1.min'
    }
  ],

  /**
   * for libs that either do not support AMD out of the box, or
   * require some fine tuning to dependency mgt'
   */
  shim: {
      'angular': {
          exports: 'angular'
      }
  },

  deps: [
      // kick start application... see bootstrap.js
      './bootstrap'
  ]
});
