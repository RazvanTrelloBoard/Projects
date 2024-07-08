describe('Reqres API tests', () => {
    it('should get the list of users and check data for user with ID 10', () => {

      const datedeverificat = {
        id: 10,
        email: "byron.fields@reqres.in",
        first_name: "Byron",
        last_name: "Fields"
      };
  

      cy.request('GET', 'https://reqres.in/api/users?page=2').then((response) => {
   
        expect(response.status).to.eq(200);
  

        const user = response.body.data.find(user => user.id === datedeverificat.id);

        expect(user).to.exist;
        expect(user.email).to.eq(datedeverificat.email);
        expect(user.first_name).to.eq(datedeverificat.first_name);
        expect(user.last_name).to.eq(datedeverificat.last_name);
      });
    });
  });
  