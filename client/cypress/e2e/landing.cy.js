describe('Landing Page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should load the landing page with GiveBite branding', () => {
        // Check the brand name is visible
        cy.contains('Give').should('be.visible');
        cy.contains('Bite').should('be.visible');
    });

    it('should render the Navbar with navigation links', () => {
        cy.contains('Home').should('be.visible');
        cy.contains('About').should('be.visible');
        cy.contains('How It Works').should('be.visible');
        cy.contains('Impact').should('be.visible');
        cy.contains('Blog').should('be.visible');
        cy.contains('Contact').should('be.visible');
    });

    it('should display the Solutions dropdown in navbar', () => {
        cy.contains('Solutions').should('be.visible');
    });

    it('should show Get Started and Log in buttons', () => {
        cy.contains('Get Started').should('be.visible');
        cy.contains('Log in').should('be.visible');
    });

    it('should have the chatbot button present', () => {
        // The chatbot toggle button should be on the page
        cy.get('button').filter(':contains("💬"), :contains("✕")').should('exist');
    });

    it('should display the hero section content', () => {
        // Hero section should have some call-to-action text
        cy.get('h1, h2').first().should('be.visible');
    });
});
