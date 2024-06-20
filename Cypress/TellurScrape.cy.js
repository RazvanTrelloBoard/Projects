describe('WebSite Test', () => {
  beforeEach( () => {
      cy.visit('http://tellur.com/')
      cy.get('#Username').should('be.visible').type('Test')
      cy.get('#Password').should('be.visible').type('qw#9*n?6')
      cy.get('#btn-login').should('be.visible').click()
      cy.contains('Products')

})

    it('creating data object', () => {
      const { GoogleSpreadsheet } = require('google-spreadsheet');

      cy.get('[id^="div_cell_"]').then(async ($divs) => {
        const data = $divs.toArray().map(($div) => {
          const ref = $div.querySelector('.divTableCellRef').textContent.trim();
          const name = $div.querySelector('.cellitemname').textContent.trim();
          const priceText = $div.querySelector('.divTableCellAction.prodcoldate + .divTableCellAction').textContent.trim();
          const price = parseFloat(priceText.replace('RON', '').trim());
          const link = $div.querySelector('.cellitemname a').getAttribute('href');
          const img = $div.querySelector('.itemnameimgcart').getAttribute('src');
          return { Reference: ref, Name: name, Price: price, Link: link, Image: img };
        });
      
        const promises = data.map(async (product) => {
          const link = product.Link;
          const fullUrl = 'http://tellur.com/Main/' + link;
          cy.wait(2000);
          let response;
          try {
            response = await cy.request(fullUrl);
          } catch (error) {
            console.error(`Error fetching ${fullUrl}:`, error);
            return { ...product, Title: '' };
          }
          const html = response.body;
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const title = doc.getElementById('spnItem').textContent.trim();
          return { ...product, Title: title };
        });
        
        const results = await Promise.all(promises);
        console.log(results);
        const products = await Promise.all(promises);
      
    const doc = new GoogleSpreadsheet('1tWuOU8PiTAwmNiERdZg');
    await doc.useServiceAccountAuth({
      client_email: 'iam.gserviceaccount.com',
      private_key: '',
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.clear();
    await sheet.setHeaderRow(['Reference', 'Name', 'Price', 'Link', 'Image', 'Title']);
    await sheet.addRows(products);
  });

})
})