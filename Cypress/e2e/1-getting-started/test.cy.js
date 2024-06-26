
describe('Website Test', () => {
    let username, password, baduser; 
  
    before(() => {
      cy.fixture('example').then((cred) => {
        username = cred.username;
        password = cred.password;
        baduser = cred.baduser;
      });
    });
  
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Visit the website and login with valid credentials', () => {
      cy.login(username, password);
    });
  
    it('Visit the website and login with invalid credentials', () => {
      cy.badlogin(baduser, password);
    });
  
    it('Searches for product', () => {
      cy.login(username, password);
      cy.searchproduct();
      cy.get('.inventory_item_name').contains('Backpack').should('exist');
    });
  
    it('Adds to cart product', () => {
      cy.login(username, password);
      cy.searchproduct();
      cy.addtocart();
    });
  
    it('Check the cart', () => {
      cy.login(username, password);
      cy.searchproduct();
      cy.addtocart();
      cy.checkcart();
    });
  });
  