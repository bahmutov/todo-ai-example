/// <reference types="cypress" />

describe('Todo app', () => {
  it('should show no todos', () => {
    cy.visit('/')
    cy.get('.loaded')
    cy.get('.no-todos').should('be.visible')
  })
})
