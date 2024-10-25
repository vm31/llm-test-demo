

describe('Login Tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  });

  it('should log in with valid credentials', () => {
    cy.get('#username').type('valid-username')
    cy.get('#password').type('valid-password')
    cy.get('#login-button').click()
    cy.get('.user-name').contains('Valid Username')
  })

  it('should show an error for invalid credentials', () => {
    cy.get('#username').type('invalid-username')
    cy.get('#password').type('invalid-password')
    cy.get('#login-button').click()
    cy.get('.error-message').contains('Invalid Credentials')
  })
})

describe('Registration Tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/register')
  });

  it('should register a new user with valid credentials', () => {
    cy.get('#username').type('new-username')
    cy.get('#password').type('new-password')
    cy.get('#confirm-password').type('new-password')
    cy.get('#submit-button').click()
    cy.url().should('contain', '/profile')
  })

  it('should show an error for invalid registration data', () => {
    cy.get('#username').type('')
    cy.get('#password').type('weak-password')
    cy.get('#confirm-password').type('invalid-password')
    cy.get('#submit-button').click()
    cy.get('.error-message').contains('Username is required, Password should be at least 8 characters.')
  })
})

describe('Logout Tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  });

  it('should log out the current user', () => {
    cy.get('.user-name').then((username) => {
      if (username.text() === 'Valid Username') {
        cy.get('#logout-button').click()
        cy.url().should('contain', '/')
      }
    })
  })

  it('should show a success message after successful logout', () => {
    cy.get('.success-message').contains('You have been successfully logged out')
  })
})

describe('Profile Tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
    cy.get('#logout-button').click()
    cy.url().should('contain', '/profile')
  });

  it('should view the profile details of the current user', () => {
    cy.get('.user-name').then((username) => {
      if (username.text() === 'Valid Username') {
        cy.get('.user-email').contains('valid-username@example.com')
        cy.get('.user-profile-image').should('be.visible')
      }
    })
  })

  it('should update the profile details of the current user', () => {
    cy.get('#update-profile-button').click()
    cy.get('#username-input').type('new-username')
    cy.get('#password-input').type('new-password')
    cy.get('#confirm-password-input').type('new-password')
    cy.get('.update-profile-success-message').contains('Profile Updated Successfully')
  })
})