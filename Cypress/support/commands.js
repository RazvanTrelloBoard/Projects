// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// Load selectors from fixtures.json
// Load selectors from fixtures.json
Cypress.Commands.add('login', (username, password) => {
  cy.fixture('selectors').then((selectors) => {
    cy.get(selectors.username).should('be.visible').type(username);
    cy.get(selectors.password).should('be.visible').type(password);
    cy.get(selectors.loginButton).should('be.visible').click();
    cy.url().should('include', '/inventory.html');
  });
});

Cypress.Commands.add('badlogin', (baduser, password) => {
  cy.fixture('selectors').then((selectors) => {
    cy.get(selectors.username).should('be.visible').type(baduser);
    cy.get(selectors.password).should('be.visible').type(password);
    cy.get(selectors.loginButton).should('be.visible').click();
    cy.wait(1000);
    cy.get(selectors.loginButton).should('be.visible');
  });
});

Cypress.Commands.add('searchproduct', () => {
  cy.fixture('selectors').then((selectors) => {
    cy.contains(selectors.productsText);
  });
});

Cypress.Commands.add('addtocart', () => {
  cy.fixture('selectors').then((selectors) => {
    cy.get(selectors.inventoryItem).first();
    cy.get(selectors.addToCartButton).contains('Add to cart').click();
  });
});

Cypress.Commands.add('checkcart', () => {
  cy.fixture('selectors').then((selectors) => {
    cy.get(selectors.shoppingCartBadge).should('contain', '1').click();
    cy.get(selectors.cartList).should('have.length.at.least', 1);
    cy.get(selectors.cartQuantity).should('have.text', '1');
  });
});
