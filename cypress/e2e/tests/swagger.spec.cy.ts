describe('Login Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('https://www.example.com/login');
    });

    it('TC_001: Verify UI Elements', () => {
        cy.get('#emailInput').should('be.visible');
        cy.get('#passwordInput').should('be.visible');
        cy.get('#signInButton').should('be.visible');
        cy.get('#forgotPasswordLink').should('be.visible');
        cy.get('#signUpLink').should('be.visible');

        cy.get('#emailInput').type('test@example.com');
        cy.get('#passwordInput').type('password123');

        cy.get('#signInButton').click();

        cy.get('.error-message').should('contain', 'Invalid email or password. Please try again.');
    });

    it('TC_002: Validate Email Address', () => {
        cy.get('#emailInput').type('invalid-email');
        cy.get('#passwordInput').type('password123');

        cy.get('#signInButton').click();

        cy.get('.error-message').should('contain', 'Invalid email address. Please try again.');
    });

    it('TC_003: Validate Password', () => {
        cy.get('#emailInput').type('test@example.com');
        cy.get('#passwordInput').type('short-pasword');

        cy.get('#signInButton').click();

        cy.get('.error-message').should('contain', 'Password must be at least 8 characters long.');
    });

    it('TC_004: Verify User Authentication', () => {
        cy.get('#emailInput').type('test@example.com');
        cy.get('#passwordInput').type('password123');

        cy.get('#signInButton').click();

        cy.url().should('contain', '/dashboard');
    });

    it('TC_005: Handle Unavailable API Service', () => {
        cy.intercept('GET', 'https://api.example.com/data', { status: 503, message: 'Service Unavailable' });

        cy.get('#emailInput').type('test@example.com');
        cy.get('#passwordInput').type('password123');

        cy.get('#signInButton').click();

        cy.get('.error-message').should('contain', 'API service is unavailable.');
    });

    it('TC_006: Display Friendly Error Messages', () => {
        cy.get('#emailInput').type('invalid-email');
        cy.get('#passwordInput').type('wrong-password');

        cy.get('#signInButton').click();

        cy.get('.error-message').should('contain', 'Invalid email or password. Please try again.');
    });

    it('TC_007: Handle Empty Fields', () => {
        cy.get('#emailInput').clear();
        cy.get('#passwordInput').clear();

        cy.get('#signInButton').click();

        cy.get('.error-message').should('contain', 'All required fields are missing.');
    });

    it('TC_008: Prevent SQL Injection', () => {
        cy.intercept('POST', '/login', (req) => {
            req.reply(200, 'Success');
        });

        cy.get('#emailInput').type('malicious-sql-injection');
        cy.get('#passwordInput').type('password123');

        cy.get('#signInButton').click();

        cy.url().should('not.contain', '/dashboard');
    });

    it('TC_009: Implement CAPTCHA', () => {
        cy.intercept('POST', '/login', (req) => {
            req.reply(401, 'Unauthorized');
        });

        for (let i = 0; i < 3; i++) {
            cy.get('#emailInput').type('wrong-password');
            cy.get('#passwordInput').type('wrong-password');

            cy.get('#signInButton').click();
        }

        cy.get('.captcha').should('be.visible');
    });

    it('TC_010: Lock User Accounts', () => {
        for (let i = 0; i < 5; i++) {
            cy.get('#emailInput').type('wrong-password');
            cy.get('#passwordInput').type('wrong-password');

            cy.get('#signInButton').click();
        }

        cy.url().should('not.contain', '/dashboard');
    });
});