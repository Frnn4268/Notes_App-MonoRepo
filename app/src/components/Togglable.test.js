import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import Togglable from './Togglable'

describe('<Togglable />', () => {
    const buttonLabel = 'show'
    const cancelButton = 'Cancel'
    let view

    beforeEach(() => {
        view = render(
            <Togglable buttonLabel={buttonLabel}>
                <div>testDivContent</div>
            </Togglable>
        )
    })

    test('renders its children', () => {
        const element = view.getByText('testDivContent')
    })

    test('renders its children but they aren´t visible', () => {
        const element = view.getByText('testDivContent')
        expect(element.parentNode).toHaveStyle('display: none')
    })

    test('after clicking its children must be shown', () => {
        const button = view.getByText(buttonLabel)
        fireEvent.click(button)

        const element = view.getByText('testDivContent')
        expect(element.parentNode).not.toHaveStyle('display: none')
    })

    test('toggle content can be closed', () => {
        const buttonCancel = view.getByText(cancelButton)
        fireEvent.click(buttonCancel)

        const element = view.getByText('testDivContent')
        expect(element.parentNode).toHaveStyle('display: none')
    })
})