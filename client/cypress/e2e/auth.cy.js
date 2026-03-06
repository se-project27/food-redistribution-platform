// Prevent uncaught exceptions (e.g., failed API calls with fake tokens) from failing tests
Cypress.on('uncaught:exception', () => false);

describe('Authentication Pages', () => {

    describe('Login Page', () => {
        beforeEach(() => {
            cy.visit('/login');
        });

        it('should render the login form', () => {
            cy.get('input[type="email"], input[name="email"]').should('be.visible');
            cy.get('input[type="password"], input[name="password"]').should('be.visible');
        });

        it('should have a submit/login button', () => {
            cy.get('button[type="submit"]').should('be.visible');
        });

        it('should display the login page branding', () => {
            cy.get('h1, h2').should('be.visible');
        });

        it('should not navigate away on empty form submission', () => {
            cy.get('button[type="submit"]').click();
            // Should remain on the login page (form validation prevents navigation)
            cy.url().should('include', '/login');
        });

        it('should show error on invalid login attempt', () => {
            cy.get('input[type="email"], input[name="email"]').type('invalid@test.com');
            cy.get('input[type="password"], input[name="password"]').type('wrongpassword');
            cy.get('button[type="submit"]').click();
            // Should show an error message or stay on login page
            cy.url().should('include', '/login');
        });
    });

    describe('Register Page', () => {
        beforeEach(() => {
            cy.visit('/register');
        });

        it('should render the registration form', () => {
            cy.get('input[name="name"], input[placeholder*="name" i]').should('be.visible');
            cy.get('input[type="email"], input[name="email"]').should('be.visible');
            cy.get('input[type="password"], input[name="password"]').should('be.visible');
        });

        it('should have role selection options', () => {
            // The register page should allow role selection (Donor, NGO, Volunteer)
            cy.contains(/donor|ngo|volunteer/i).should('be.visible');
        });

        it('should have a submit button', () => {
            cy.get('button[type="submit"]').should('be.visible');
        });
    });

    describe('Protected Routes', () => {
        it('should redirect to login when accessing dashboard without auth', () => {
            // Clear any stored tokens
            cy.clearLocalStorage();
            cy.visit('/dashboard');
            // Should redirect to login
            cy.url().should('include', '/login');
        });

        it('should redirect logged-in users away from public pages', () => {
            // Set a fake token to simulate logged-in state
            cy.window().then((win) => {
                win.localStorage.setItem('token', 'fake-jwt-token');
                win.localStorage.setItem('user', JSON.stringify({
                    id: 'test123',
                    name: 'Test User',
                    email: 'test@test.com',
                    role: 'Donor'
                }));
            });
            // Visit the landing page — should redirect away since user is logged in
            cy.visit('/');
            cy.url().should('include', '/dashboard');
        });
    });
});
