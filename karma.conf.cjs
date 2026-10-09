module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage')
    ],
    files: [
      { pattern: '.karma-build/components.spec.js', watched: false }
    ],
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
    browsers: ['ChromeHeadless'],
    singleRun: true,
    autoWatch: false,
    browserNoActivityTimeout: 60000,
    client: { clearContext: false }
  });
};
