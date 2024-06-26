/// <reference types="cypress" />

describe('WebSite Test', () => {
    beforeEach( () => {
        cy.visit('/')


    })
        it('Visit the website and login with valid credentials', () => {
    

            cy.login('standard_user', 'secret_sauce');
          });
            cy.contains('Products')
        })
        it('Visit the website and login with invalid credentials', () => {
            cy.get('#user-name').should('be.visible').type('standard')
            cy.get('#password').should('be.visible').type('secret_sauce')
            cy.get('[data-test="login-button"]').should('be.visible').click()
            cy.wait(1000)
            cy.get('[data-test="login-button"]').should('be.visible')

    })
    