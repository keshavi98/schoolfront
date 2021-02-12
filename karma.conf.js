// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    files: [
      { pattern: './node_modules/jquery/dist/jquery.js', watched: false },
      { pattern: './node_modules/jquery-ui-dist/jquery-ui.js', watched: false },
      { pattern: './node_modules/jquery-timepicker/jquery-timepicker.js', watched: false },   
      { pattern: './src/test.ts', watched: false }
    ],
   
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'), reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    captureTimeout: 210000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 210000,
    browserNoActivityTimeout: 210000,    
  });
};
