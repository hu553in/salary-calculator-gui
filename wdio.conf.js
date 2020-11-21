exports.config = {
  runner: 'local',
  specs: [
    './test/specs/**/*.js'
  ],
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': {
        args: [
          "--no-sandbox",
          "--headless",
        ]
      }
    }
  ],
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [
    'chromedriver'
  ],
  framework: 'mocha',
  reporters: [
    'spec'
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  }
}
