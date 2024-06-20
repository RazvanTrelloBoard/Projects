describe('WebSite Test', () => {
    before(() => {
      cy.visit('https://app.profitshare.ro/promovare/get-feeds');
      cy.fixture('credentials').then((creds) => {
        cy.get('input[name="email"]').type(creds.username);
        cy.get('input[name="password"]').type(creds.password);
        cy.get('button[type="submit"]').click();
        cy.pause();
      });
    });

    it('should generate feeds', () => {
      cy.visit('https://app.profitshare.ro/promovare/get-feeds');
      cy.get('select.ui-pg-selbox')  // Select the dropdown using its class
        .select('100')  // Select the option with the value "100"
        .should('have.value', '100');
      cy.pause();
      cy.get('#gbox_afFeedGrid a:contains("Genereaza")').each(($btn) => {
        // Click each button
        cy.wrap($btn).click();
      });
    });
  });



     


    

    // describe('Click all "Genereaza" buttons on all pages', () => {
    //   it('should click all "Genereaza" buttons', () => {
    //     const nextPageButtonSelector = '#next_pafFeedGrid';
    //     cy.visit('https://app.profitshare.ro/promovare/get-feeds');
    //     cy.get('#afFeedGrid a:contains("Genereaza")').each(($btn) => {
    //       // Click each button
    //       cy.wrap($btn).click();
    //       cy.wait(2000);
    //       cy.get(nextPageButtonSelector).as('btn').click()
    //         .then(() => {
    //           if (Cypress.$(nextPageButtonSelector).hasClass('ui-state-disabled')) {
    //             return; // exit function if we've reached the last page
    //           }
    //           cy.get('#afFeedGrid a:contains("Genereaza")').each(($btn) => {
    //             // Click each button
    //             cy.wrap($btn).click();
    //         });
    //       })
    //   });
    // });
    
  
    // const fetch = require('node-fetch');
    // const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  
    // Cypress.Commands.add('uploadDataToGithub', (link, repository, path, token) => {
    //   // Use Cypress to extract the data from the link
    //   cy.visit('https://app.profitshare.ro/promovare/get-feeds');
    //   cy.get('a[title="Exporta fisier"]').invoke('attr', 'href').then((data) => {
    //     const csvWriter = createCsvWriter({
    //       path: 'Libris.csv',
    //       header: [{ id: 'data', title: 'Data' }],
    //     });
    //     const records = [{ data }];
    //     csvWriter.writeRecords(records).then(() => {
    //       // Use the GitHub API to create or update the file in the repository
    //       const url = `https://api.github.com/repos/${repository}/contents/${path}`;
    //       const content = Buffer.from(data).toString('base64');
    //       const body = JSON.stringify({
    //         message: `Update ${path}`,
    //         content,
    //       });
    //       const headers = {
    //         Authorization: `token ${token}`,
    //         Accept: 'application/vnd.github.v3+json',
    //         'Content-Type': 'application/json',
    //       };
    //       return fetch(url, {
    //         method: 'PUT',
    //         body,
    //         headers,
    //       }).then((response) => {
    //         expect(response.status).to.equal(200);
    //       });
    //     });
    //   });
    // });
  
    // it('should extract link from div', () => {
    //     cy.visit('https://app.profitshare.ro/promovare/get-feeds');
    //     const link = cy.get('a[title="Exporta fisier"]').invoke('attr', 'href');
    //         cy.uploadDataToGithub('https://github.com/', 'Feedpy', 'Libris.csv', 'github_pat_');
    //       });
    //   });


    // it('should visit the dashboard', () => {
    //   // Assert that the login was successful
    //   cy.url().should('include', '/dashboard');
    // });
  
//     it('should generate feeds', () => {
//       cy.visit('https://app.profitshare.ro/promovare/get-feeds');
//       cy.get('#afFeedGrid a:contains("Genereaza")').each(($btn) => {
//         // Click each button
//         const link = cy.get('a[title="Exporta fisier"]').invoke('attr', 'href');
//       });

  
