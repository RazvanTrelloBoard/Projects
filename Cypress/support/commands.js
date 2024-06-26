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
Cypress.Commands.add('login', (username, password) => {
  cy.get('#user-name').should('be.visible').type(username);
  cy.get('#password').should('be.visible').type(password);
    cy.get('[data-test="login-button"]').should('be.visible').click();
    cy.url().should('include', '/inventory.html');
  });

  Cypress.Commands.add('badlogin', (baduser, password) => {
    cy.get('#user-name').should('be.visible').type(baduser);
    cy.get('#password').should('be.visible').type(password);
    cy.get('[data-test="login-button"]').should('be.visible').click();
    cy.wait(1000)
    cy.get('[data-test="login-button"]').should('be.visible')
    
  });

  Cypress.Commands.add('searchproduct', () => {
    cy.contains('Products')
  })

  Cypress.Commands.add('addtocart', () => {
    cy.get('.inventory_item').first()
    cy.get('.btn_inventory').contains('Add to cart').click();

  })

  Cypress.Commands.add('checkcart', () => {
    cy.get('.shopping_cart_badge').should('contain', '1').click();
    cy.get('.cart_list').should('have.length.at.least', 1);
    cy.get('.cart_quantity').should('have.text', '1');
  });