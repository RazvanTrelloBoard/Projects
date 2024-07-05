const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    supportFile: 'support/e2e.js',
    specPattern: 'e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {

    },
    "chromeWebSecurity": false,
    baseUrl: 'https://www.saucedemo.com', 
    env: {
      username: 'standard_user',
      password: 'secret_sauce',
      baduser: 'standard'
    },
    defaultCommandTimeout: 10000, 
    pageLoadTimeout: 60000 
  }
});
