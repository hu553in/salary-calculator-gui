exports.config = {
  runner: 'local',
  specs: ['./test/specs/**/*.spec.js'],
  maxInstances: 10,
  capabilities: [{
    maxInstances: 5,
    browserName: 'chrome',
    acceptInsecureCerts: true,
    'goog:chromeOptions': {
      args: [
        '--no-sandbox',
        '--headless'
      ]
    }
  }],
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [
    'chromedriver',
    'intercept',
    [
      'wiremock',
      {
        rootDir: './test/mocks',
        port: 9920,
        args: ['--enable-stub-cors']
      }
    ]
  ],
  framework: 'mocha',
  reporters: [
    'spec',
    [
      'allure',
      { disableWebdriverStepsReporting: true }
    ]
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    require: ['@babel/register']
  },
  afterTest: (_, __, { error }) => {
    if (error) {
      browser.takeScreenshot();
    }
  }
}
