const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'https://www.saucedemo.com', // Ensure this is the correct base URL
    env: {
      username: 'standard_user',
      password: 'secret_sauce',
      baduser: 'standard'
  },
}
});
