describe('User Registration Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/registration.html');
    });

    it('should register with valid email and password', () => {
        cy.get('#email').type('test@example.com');
        cy.get('#password').type('TestPassword123!');
        cy.get('.submit-button').click();
        cy.url().should('include', '/ confirmation');
    });

    it('should receive a confirmation email upon registration', () => {
        // Mock email service to send a confirmation email
        cy.intercept('POST', '/api/register', (req) => {
            req.reply({ message: 'Registration successful' });
        }).as('registerUser'); 
    

        cy.get('#email').type('test@example.com');
        cy.get('#password').type('TestPassword123!');
        cy.get('.submit-button').click();
        cy.get('@confirmationEmail').should('contain', 'Confirmation Email Sent');
    });

    it('should allow users to log in with valid credentials', () => {
        cy.get('#email').type('test@example.com');
        cy.get('#password').type('TestPassword123!');
        cy.get('.login-button').click();
        cy.url().should('include', '/dashboard');
    });

    it('should show an error for invalid login credentials', () => {
        cy.get('#email').type('invalid-email');
        cy.get('#password').type('InvalidPassword123!');
        cy.get('.login-button').click();
        cy.get('.error-message').should('contain', 'Invalid Email or Password');
    });

    it('should allow users to log out securely', () => {
        // Mock API response for successful logout
        cy.intercept('POST', '/logout', (req) => {
            req.reply({ message: 'Logged out successfully' }); // Simulate a successful response
        }).as('registerUser'); // Alias the intercept for later reference
    

        cy.get('#email').type('test@example.com');
        cy.get('#password').type('TestPassword123!');
        cy.get('.login-button').click();
        cy.get('.logout-button').click();
        cy.get('@logoutResponse').should('contain', 'Logged Out Successfully');
    });
});

describe('Product Filtering Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/products.html');
    });

    it('should filter products by category', () => {
        // Mock API response for product categories
        const categories = [
            { id: 1, name: 'Electronics' },
            { id: 2, name: 'Fashion' },
            { id: 3, name: 'Home & Kitchen' }
        ];

        cy.intercept('POST', '/products', (req) => {
            req.reply(categories);
        });

        // Filter by Electronics
        cy.get('.category-filter').contains('Electronics').click();
        cy.url().should('include', '/electronics');

        // Filter by Fashion
        cy.get('.category-filter').contains('Fashion').click();
        cy.url().should('include', '/fashion');
    });

    it('should filter products by price range', () => {
        // Mock API response for product prices
        const prices = [
            { id: 1, price: 10.99 },
            { id: 2, price: 29.99 },
            { id: 3, price: 49.99 }
        ];

        cy.intercept('GET', '/products', (req) => {
            req.reply(prices);
        });

        // Filter by $0 - $10
        cy.get('.price-filter').contains('$0 - $10').click();
        cy.url().should('include', '/price-range');

        // Filter by $30 - $50
        cy.get('.price-filter').contains('$30 - $50').click();
        cy.url().should('include', '/price-range');
    });
});

describe('Search Functionality Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/products.html');
    });

    it('should search for products by keyword', () => {
        // Mock API response for product search results
        const searchResults = [
            { id: 1, name: 'Apple Watch' },
            { id: 2, name: 'Nike Shoes' },
            { id: 3, name: 'Samsung TV' }
        ];

        cy.intercept('GET', '/search', (req) => {
            req.reply(searchResults);
        });

        // Search for Apple Watch
        cy.get('.search-input').type('Apple Watch');
        cy.get('.search-button').click();
        cy.url().should('include', '/search');
    });
});