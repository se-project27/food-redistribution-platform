describe('Page Navigation', () => {

    it('should navigate to the About page', () => {
        cy.visit('/');
        cy.contains('About').click();
        cy.url().should('include', '/about');
        cy.get('h1, h2').should('be.visible');
    });

    it('should navigate to the How It Works page', () => {
        cy.visit('/');
        cy.contains('How It Works').click();
        cy.url().should('include', '/how-it-works');
        cy.get('h1, h2').should('be.visible');
    });

    it('should navigate to the Impact page', () => {
        cy.visit('/');
        cy.contains('Impact').click();
        cy.url().should('include', '/impact');
        cy.get('h1, h2').should('be.visible');
    });

    it('should navigate to the Blog page', () => {
        cy.visit('/');
        cy.contains('Blog').click();
        cy.url().should('include', '/blog');
        cy.get('h1, h2').should('be.visible');
    });

    it('should navigate to the Contact page', () => {
        cy.visit('/');
        cy.contains('Contact').click();
        cy.url().should('include', '/contact');
        cy.get('h1, h2').should('be.visible');
    });

    it('should navigate to the Restaurants solution page', () => {
        cy.visit('/solutions/restaurants');
        cy.url().should('include', '/solutions/restaurants');
        cy.get('h1, h2').should('be.visible');
    });

    it('should redirect unknown routes to landing page', () => {
        cy.visit('/some-random-page');
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
});
