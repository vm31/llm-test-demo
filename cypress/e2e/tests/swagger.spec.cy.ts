describe('Login Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('https://swagger.io/');
    });

    it('should log in with valid credentials', () => {
        cy.get('#email').type('valid-email@example.com');
        cy.get('#password').type('valid-password');
        cy.get('#sign-in').click();
        cy.url().should('eq', 'https://swagger.io/dashboard');
        cy.get('.login-success-message').should('contain', 'Login successful!');
    });

    it('should show an error for invalid credentials', () => {
        cy.get('#email').type('invalid-email@example.com');
        cy.get('#password').type('invalid-password');
        cy.get('#sign-in').click();
        cy.get('.error-message').should('contain', 'Invalid email or password');
    });

    it('should show client-side validation error for invalid email format', () => {
        cy.get('#email').type('invalid-email');
        cy.get('#sign-in').click();
        cy.get('.validation-error').should('contain', 'Please enter a valid email address');
    });

    it('should display CAPTCHA on multiple incorrect login attempts', () => {
        cy.get('#email').type('wrong-password');
        cy.get('#password').type('wrong-password');
        cy.get('#sign-in').click();
        cy.get('.captcha').should('be.visible');
        cy.get('#email').clear();
        cy.get('#password').clear();
        cy.get('#sign-in').click();
        cy.get('.error-message').should('contain', 'Too many incorrect login attempts');
    });

    it('should send password recovery email on forgot password click', () => {
        cy.get('#forgot-password').click();
        cy.get('#email-input').type('user@example.com');
        cy.get('#submit-button').click();
        cy.url().should('include', '/recover-password');
        cy.get('.email-sent-notification').should('be.visible');
    });

    it('should create new account on successful sign up', () => {
        cy.get('#sign-up').click();
        cy.get('#name-input').type('John Doe');
        cy.get('#email-input').type('newuser@example.com');
        cy.get('#password-input').type('NewPassword123');
        cy.get('#submit-button').click();
        cy.url().should('include', '/dashboard');
    });
});