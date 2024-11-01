describe('User Registration Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/registration.html');
    });
    
    it('should register with valid email and password', () => {
        cy.get('[name="email"]').type('test@example.com');
        cy.get('[name="password"]').type('TestPassword123!');
        cy.get('[data-test="register-btn"]').click();
        cy.get('[data-test="success-message]').should('contain', 'Registration successful!');
    });
    
    it('should receive a confirmation email upon registration', () => {
        cy.get('[name="email"]').type('test@example.com');
        cy.get('[name="password"]').type('TestPassword123!');
        cy.get('[data-test="register-btn"]').click();
        cy.url().should('include', '/confirmation-email');
    });
    
    it('should log in with valid credentials', () => {
        cy.get('[name="email"]').type('test@example.com');
        cy.get('[name="password"]').type('TestPassword123!');
        cy.get('[data-test="login-btn"]').click();
        cy.url().should('include', '/dashboard');
    });
    
    it('should show an error for invalid credentials', () => {
        cy.get('[name="email"]').type('invalid_email');
        cy.get('[name="password"]').type('InvalidPassword123!');
        cy.get('[data-test="login-btn"]').click();
        cy.get('[data-test="error-message"]').should('contain', 'Invalid email or password');
    });
});

describe('Admin Panel Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/admin-login.html');
    });
    
    it('should login to admin panel with valid credentials', () => {
        cy.get('[name="email"]').type('admin@example.com');
        cy.get('[name="password"]').type('AdminPassword123!');
        cy.get('[data-test="login-btn"]').click();
        cy.url().should('include', '/admin-dashboard');
    });
    
    it('should not login to admin panel with invalid credentials', () => {
        cy.get('[name="email"]').type('invalid_email');
        cy.get('[name="password"]').type('InvalidPassword123!');
        cy.get('[data-test="login-btn"]').click();
        cy.get('[data-test="error-message"]').should('contain', 'Invalid email or password');
    });
});

describe('Product Management Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/admin-dashboard');
    });
    
    it('should create a new product', () => {
        cy.get('[data-test="create-product-btn"]').click();
        cy.get('[name="product-name"]').type('New Product');
        cy.get('[name="product-price"]').type('10.99');
        cy.get('[name="product-description"]').type('This is a new product');
        cy.get('[data-test="save-btn"]').click();
        cy.url().should('include', '/admin-dashboard');
    });
    
    it('should view all products', () => {
        cy.get('[data-test="view-all-products-btn"]').click();
        cy.get('[data-test="product-list"]').should('contain', 'New Product');
    });
});

describe('Order Management Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/admin-dashboard');
    });
    
    it('should view all orders', () => {
        cy.get('[data-test="view-all-orders-btn"]').click();
        cy.get('[data-test="order-list"]').should('contain', 'New Order');
    });
    
    it('should place a new order', () => {
        cy.get('[data-test="place-order-btn"]').click();
        cy.get('[name="customer-name"]').type('John Doe');
        cy.get('[name="order-date"]').type('2023-03-01');
        cy.get('[name="total-cost"]').type('10.99');
        cy.get('[data-test="save-btn"]').click();
        cy.url().should('include', '/admin-dashboard');
    });
});

describe('Payment Gateway Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/cart.html');
    });
    
    it('should view cart contents', () => {
        cy.get('[data-test="view-cart-btn"]').click();
        cy.get('[data-test="product-list"]').should('contain', 'New Product');
    });
    
    it('should checkout with payment gateway', () => {
        cy.get('[data-test="checkout-btn"]').click();
        cy.get('[data-test="payment-gateway"]').should('contain', 'Card Payment');
        cy.get('[name="card-number"]').type('1234567890');
        cy.get('[name="exp-date"]').type('12/2025');
        cy.get('[name="cvv"]').type('123');
        cy.get('[data-test="pay-btn"]').click();
        cy.url().should('include', '/payment-succeeded');
    });
});

describe('Mobile Responsiveness Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/mobile-responsive.html');
    });
    
    it('should view on mobile device', () => {
        cy.get('[data-test="view-btn"]').click();
        cy.get('[data-test="product-list"]').should('contain', 'New Product');
    });
});

describe('Accessibility Tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/accessibility.html');
    });
    
    it('should view with screen reader', () => {
        cy.get('[data-test="view-btn"]').click();
        cy.get('[data-test="product-list"]').should('contain', 'New Product');
    });
});