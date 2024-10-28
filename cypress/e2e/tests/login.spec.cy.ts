describe('User Registration Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage()
        cy.visit('/registration.html')
        cy.url().should('contain', '/registration.html')
    });

    it.only('should register with valid email and password', () => {
        cy.get('#name').type('kjhkjh')
        cy.get('#email').type('test@example.com')
        cy.get('#password').type('password123')
        cy.get('#confirm-password').type('password123')
        cy.get('.submit-btn').click()
    });

    it('should receive a confirmation email upon registration', () => {
        cy.intercept('POST', '/api/register', (req) => {
            req.reply({ message: 'Registration successful' }); // send Simulate a successful response
        }).as('registerUser'); // Alias the intercept for later reference
    
        cy.get('#email').type('test@example.com')
        cy.get('#password').type('password123')
        cy.get('#register-button').click()

        cy.get('@confirmEmail').should('be.visible')
    });

    it('should not allow registration without a valid email', () => {
        cy.get('#email').clear()
        cy.get('#password').type('password123')
        cy.get('#register-button').click()

        cy.get('[data-cy="error-email"]').should('be.visible')
    });
});

describe('Login Tests', () => {
    beforeEach(() => {
      cy.clearLocalStorage()
      cy.visit('/registration.html')
      cy.url().should('contain', '/registration.html')
    });

    it('should log in with valid credentials', () => {
        cy.get('#email').type('test@example.com')
        cy.get('#password').type('password123')
        cy.get('#login-button').click()
        cy.url().should('contain', '/dashboard.html')
    });

    it('should show an error for invalid credentials', () => {
        cy.get('#email').type('invalid@email')
        cy.get('#password').type('wrongpassword')
        cy.get('#login-button').click()

        cy.get('[data-cy="error-credentials"]').should('be.visible')
    });
});

describe('Product Search Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage()
        cy.visit('/search.html')
    });

    it('should search for a product by name', () => {
        cy.get('#search-input').type('test-product')
        cy.get('#search-button').click()

        cy.get('[data-cy="product-result"]').contains('Test Product')
    });

    it('should filter products by category', () => {
        cy.get('#category-select').select('Electronics')
        cy.get('#search-button').click()
        cy.get('[data-cy="product-result"]').contains('Test Product (Electronics)')
    });
});