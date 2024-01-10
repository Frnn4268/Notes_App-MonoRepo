// This file tests the Note App.
describe('Note App', () => {
    // Before each test, reset the database and create a new user.
    beforeEach(() => {
        cy.visit('http://localhost:3000')

        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        
        const user = {
            name: 'Fernando',
            username: 'Frnn',
            password: '12345'
        }

        cy.request('POST', 'http://localhost:3001/api/users', user)
    }) 

    // Test that the frontpage can be opened.
    it('frontpage can be opened', () => { 
        cy.contains('Notes')
    })

    // Test that the login form can be opened.
    it('login form can be opened', () => {
        cy.contains('Show login').click()
    })

    // Test that a user can write in the inputs and login.
    it('user can write in the inputs and login', () => {
        cy.contains('Show login').click()
        cy.get('[placeholder="Username"]').type('Frnn')
        cy.get('[placeholder="Password"]').type('12345')
        cy.get('#form-login-button').click()
        cy.contains('New note')
    })

    /*
    it('login fails with wrong credentials', () => {
        cy.contains('Show login').click()
        cy.get('[placeholder="Username"]').type('wrong-username')
        cy.get('[placeholder="Password"]').type('wrong-password')
        cy.get('#form-login-button').click()
        cy.contains('New note')

        cy.get('error')
            .should('contain', 'Wrong credentials')
            .should('have.css', 'rgb(255, 0, 0)', 'border-style', 'solid')
    })
    */

    // Test the functionality of the Note App when a user is logged in.
    describe('when user logged in', () => {
        // Before each test, log in the user.
        beforeEach(() => {
            cy.login({username: 'Frnn', password: '12345'}) // Login command with Cypress
        })

        // Test that a new note can be created.
        it('a new note can be created', () => {
            const noteContent = 'a note created by cypress'
            cy.contains('New note').click()
            cy.get('input').type(noteContent)
            cy.contains('save').click()
            cy.contains(noteContent)
        })

        describe('and note exists', () => {
            beforeEach(() => {
                cy.createNote({
                    content: 'A note created from Cypress No.1', 
                    important: false
                })

                cy.createNote({
                    content: 'A note created from Cypress No.2', 
                    important: false
                })

                cy.createNote({
                    content: 'A note created from Cypress No.3', 
                    important: false
                })
            })

            it('it can be made important', () => {
                cy.contains('A note created from Cypress No.1').as('theNote')
                
                cy.get('@theNote')
                .contains('make important')
                .click()

                cy.get("@theNote")
                .contains('make not important')
            })
        })
    })
})