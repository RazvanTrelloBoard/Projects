describe('WebSite Test', () => {
  beforeEach(() => {
      cy.fixture('credential').then((cred) => {
        const username = cred.username;
        const password = cred.password;
        const WebSiteTest = cred.websitetest
  
        // Visit the main page with basic authentication
        cy.visit(WebSiteTest, {
          auth: {
            username: username,
            password: password,
          },
        });
  
        // Log in
        cy.get('input[name="login_member_name"]').type(cred.username2);
        cy.get('input[name="login_member_pwd"]').type(cred.password2);
        cy.get('input[type="submit"]').click();
        cy.wait(2000);
        cy.title().should('include', 'WebSite Test');
      });
    });

          it('should check for Home', () => {
        cy.get('.block').eq(1).invoke('show').realHover('mouse')
        cy.contains('a', 'Home').click()
        cy.contains('a', 'Home').should('exist');       
        cy.get('.block').eq(3).click();
        cy.contains('.ui-dialog-title','Settings')
        cy.get('span.home-icon.home-icon-add.padleft[onclick="addNewService()"]').click();
        cy.contains('.ui-dialog-title', "Home")
        
        const checkDropdownOrder = (dropdownSelector) => {
          cy.get(dropdownSelector).then(($dropdown) => {
            const options = $dropdown.find('option');
    

            const optionTexts = options.map((index, option) => Cypress.$(option).text()).get();
    

            optionTexts.forEach((text, index) => {
              cy.log(`Option ${index + 1}: ${text}`);
            });
    

            const failingIndex = optionTexts.findIndex(
              (currentOption, index) => index > 0 && currentOption < optionTexts[index - 1]
            );
    

            cy.log('Extracted option texts:', optionTexts);
    

            if (failingIndex !== -1) {
              cy.log(`Elements out of order: ${optionTexts[failingIndex - 1]} and ${optionTexts[failingIndex]}`);
            }
    

            expect(failingIndex, 'Dropdown options should be in alphabetical order').to.equal(-1);
          });
        };
    

        checkDropdownOrder('#home_dropdown select');
      });  

      it('should fill a home dropdown', () => {
        cy.get('.block').eq(1).invoke('show').realHover('mouse')
        cy.contains('a', 'home').click()
        cy.get('.block').eq(3).click();
        cy.contains('.ui-dialog-title','Home')
        cy.get('span.home-icon.home-icon-add.padleft[onclick="addNewService()"]').click();
            cy.get('#schedule_home_dropdown select').should('be.disabled');
            cy.get('#homes\\[\\]')
            .select(1)
            .trigger('change');
            cy.get('#schedule_home_dropdown select').should('be.visible');
          });

      it('should fill a home dropdown', () => {
        cy.get('.block').eq(1).invoke('show').realHover('mouse')
        cy.contains('a', 'Home').click()
        cy.get('.block').eq(3).click();
        cy.contains('.ui-dialog-title','Home')
        cy.get('span.home-icon.home-icon-add.padleft[onclick="addNewService()"]').click();
            cy.get('#homes\\[\\]')
            .select(1)
            .trigger('change');
            cy.get('#schedule_home_dropdown select').should('be.visible');
    });

  it('should accept numbers only', () => {
    cy.get('.block').eq(1).invoke('show').realHover('mouse')
    cy.contains('a', 'home').click()
    cy.get('.block').eq(3).click();
    cy.contains('.ui-dialog-title','Home')
    cy.get('span.home-icon.home-icon-add.padleft[onclick="addNewService()"]').click();
    cy.get('#days').type('23');
    cy.get('#days').should('have.value', '23');
    cy.get('#days').type('abc');
    cy.get('#days').should('have.value', '23');

    cy.get('#start_hour').type('23');
    cy.get('#start_hour').should('have.value', '23');
    cy.get('#start_hour').type('abc');
    cy.get('#start_hour').should('have.value', '23');

    cy.get('#start_min').type('23');
    cy.get('#start_min').should('have.value', '23');
    cy.get('#start_min').type('abc');
    cy.get('#start_min').should('have.value', '23');

    cy.get('#end_hour').type('23');
    cy.get('#end_hour').should('have.value', '23');
    cy.get('#end_hour').type('abc');
    cy.get('#end_hour').should('have.value', '23');

    cy.get('#end_min').type('23');
    cy.get('#end_min').should('have.value', '23');
    cy.get('#end_min').type('abc');
    cy.get('#end_min').should('have.value', '23');

    cy.get('input[name="home"]').type('23');
    cy.get('input[name="home"]').should('have.value', '23');
    cy.get('input[name="home"]').type('abc');
    cy.get('input[name="home"]').should('have.value', '23');


  });

     
    });
  
