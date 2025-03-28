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

  it('should show no todos (network control)', () => {
    cy.intercept('GET', '/todos', [])
    cy.visit('/')
    cy.get('.loaded')
    cy.get('.no-todos').should('be.visible')
  })

  it('adds one todo and persists it (network control)', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/todos',
        times: 1,
      },
      [],
    ).as('getTodos1')
    cy.visit('/')
    cy.get('.loaded')
    cy.get('.no-todos').should('be.visible')
    cy.intercept('POST', '/todos', {}).as('postTodo')
    cy.get('.new-todo').type('Buy milk{enter}')
    cy.get('.todo-list li').should('have.length', 1)
    // if we reload the page, the todo should be there
    cy.intercept(
      {
        method: 'GET',
        url: '/todos',
        times: 1,
      },
      [
        {
          id: 1,
          title: 'Buy milk',
          completed: false,
        },
      ],
    ).as('getTodos2')
    cy.reload()
    cy.get('.todo-list li').should('have.length', 1)
  })
})
