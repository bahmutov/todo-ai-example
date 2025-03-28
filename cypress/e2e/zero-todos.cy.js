/// <reference types="cypress" />

describe('Todo app', () => {
  it('should show no todos (UI control)', () => {
    cy.visit('/')
    cy.get('.loaded')
    // if there are any todos, delete them one by one
    cy.get('.todo-list li')
      .should(Cypress._.noop)
      .then(($todos) => {
        if ($todos.length > 0) {
          cy.wrap($todos, { log: false }).each(($todo, key) => {
            cy.log(`Deleting todo ${key + 1} of ${$todos.length}`)
            cy.get($todo).find('.destroy').invoke('show').click()
          })
        }
      })
    cy.get('.no-todos').should('be.visible')
  })
})
