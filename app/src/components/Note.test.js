import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react' 
import Note from './Note'

test('renders content', () => {
    const note = {
        content: 'This is a test',
        important: true
    }

    const view = render(<Note note = {note} />)

    view.getByText('This is a test')
    view.getByText('make not important')

    const li = view.container.querySelector('li')
    console.log(prettyDOM(li))
})

test('clicking the button calls event handler once', () => {
    const note = {
        content: 'This is a test',
        important: true
    }

    const mockHandler = jest.fn()

    const view = render(<Note note = {note} toggleImportance={mockHandler} />)

    const button = view.getByText('make not important')
    fireEvent.click(button)

    expect(mockHandler).toHaveBeenCalledTimes(1)
})