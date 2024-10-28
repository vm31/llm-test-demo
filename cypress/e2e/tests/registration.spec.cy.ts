describe('User Registration and Authentication Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/registration.html');
    });

    it('should register with valid email and password', () => {
        cy.get('#email').type('test@example.com');
        cy.get('#password').type('Password123!');
        cy.get('.register-button').click();
        cy.get('.alert-success').should('be.visible');
    });

    it('should not register without email', () => {
        cy.get('#email').clear().type('').type('{enter}');
        cy.get('.alert-error').should('be.visible');
    });

    it('should not register without password', () => {
        cy.get('#password').clear().type('').type('{enter}');
        cy.get('.alert-error').should('be.visible');
    });

    it('should receive confirmation email after registration', () => {
        cy.get('[email]').should('not.exist');
        cy.get('.register-button').click();
        cy.wait('@sendMail').then((mail) => {
            expect(mail.request.body.to).to.contain('test@example.com');
            expect(mail.request.body.from).to.contain('no-reply@site.com');
        });
    });

    it('should log in with valid credentials', () => {
        cy.get('[email]').type('test@example.com');
        cy.get('[password]').type('Password123!');
        cy.get('.login-button').click();
        cy.url().should('eq', '/dashboard.html');
    });

    it('should show an error for invalid login credentials', () => {
        cy.get('[email]').type('invalid@user');
        cy.get('[password]').type('invalidpass');
        cy.get('.login-button').click();
        cy.url().should('eq', '/login.html');
        cy.get('.alert-error').should('be.visible');
    });
});