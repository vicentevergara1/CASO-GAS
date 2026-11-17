module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage')
    ],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-dev-shm-usage']
      }
    },
    files: [
      { pattern: '.karma-build/components.spec.js', watched: false },
      { pattern: '.karma-build/assets/**/*', included: false, served: true, watched: false }
    ],
    proxies: {
      '/assets/': '/base/.karma-build/assets/'
    },
    preprocessors: {
      '.karma-build/components.spec.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' }
      ]
    },
    browsers: ['ChromeHeadlessNoSandbox'],
    singleRun: true,
    autoWatch: false,
    browserNoActivityTimeout: 60000,
    client: { clearContext: false }
  });
};
