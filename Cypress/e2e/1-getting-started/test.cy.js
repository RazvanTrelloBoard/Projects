describe('WebSite Test', () => {
    beforeEach( () => {
        cy.visit('/')


    })
        it('Visit the website and login with valid credentials', () => {
    
    //         cy.visit('/')
            cy.get('#user-name').should('be.visible').type('standard_user')
            cy.get('#password').should('be.visible').type('secret_sauce')
            cy.get('[data-test="login-button"]').should('be.visible').click()
            cy.url().should('include','/inventory.html')
            cy.contains('Products')
        })
        it('Visit the website and login with invalid credentials', () => {
            cy.get('#user-name').should('be.visible').type('standard')
            cy.get('#password').should('be.visible').type('secret_sauce')
            cy.get('[data-test="login-button"]').should('be.visible').click()
            cy.wait(1000)
            cy.get('[data-test="login-button"]').should('be.visible')

    })
    
    })