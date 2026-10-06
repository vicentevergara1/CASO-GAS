module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['vite', 'jasmine'],
    plugins: [
      require('karma-vite'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage')
    ],
    files: [
      {
        pattern: 'src/tests/**/*.spec.jsx',
        type: 'module',
        watched: false,
        served: false
      }
    ],
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
    client: {
      clearContext: false
    }
  });
};

