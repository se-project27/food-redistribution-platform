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

        it('should have a link to register page', () => {
            cy.contains(/register|sign up|create account/i).should('be.visible');
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

        it('should redirect logged-in users from login to dashboard', () => {
            // Simulate a logged-in state by setting localStorage
            cy.visit('/login');
            cy.window().then((win) => {
                win.localStorage.setItem('token', 'fake-jwt-token');
                win.localStorage.setItem('user', JSON.stringify({
                    id: 'test123',
                    name: 'Test User',
                    email: 'test@test.com',
                    role: 'Donor'
                }));
            });
            cy.visit('/login');
            // Should redirect to dashboard
            cy.url().should('include', '/dashboard');
        });
    });
});
