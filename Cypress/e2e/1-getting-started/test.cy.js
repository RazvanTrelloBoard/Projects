describe('Website Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visit the website and login with valid credentials', () => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');
    cy.login(username, password);
  });

  it('Visit the website and login with invalid credentials', () => {
    const baduser = Cypress.env('baduser');
    const password = Cypress.env('password');
    cy.badlogin(baduser, password);
  });

  it('Searches for product', () => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');
    cy.login(username, password);
    cy.searchproduct();
    cy.get('.inventory_item_name').contains('Backpack').should('exist');
  });

  it('Adds to cart product', () => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');
    cy.login(username, password);
    cy.searchproduct();
    cy.addtocart();
  });

  it('Check the cart', () => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');
    cy.login(username, password);
    cy.searchproduct();
    cy.addtocart();
    cy.checkcart();
  });
});
