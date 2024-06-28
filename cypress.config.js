const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
    "chromeWebSecurity": false,
    baseUrl: 'https://www.saucedemo.com', // Ensure this is the correct base URL
    env: {
      username: 'standard_user',
      password: 'secret_sauce',
      baduser: 'standard'
    },
    defaultCommandTimeout: 10000, // Increase command timeout to 10 seconds
    pageLoadTimeout: 60000 // Increase page load timeout to 60 seconds
  }
});
