import React from 'react'
import renderer from 'react-test-renderer'
import Footer from '../../../src/js/components/Footer/footer-component.jsx'

function setup() {
    const props = {
        
    }

    const wrappedApp = renderer.create(<Footer {...props} />)

    return {
        props,
        wrappedApp
    }
}

describe('Footer', () => {
    it('should render self and subcomponents', () => {
        const { wrappedApp } = setup()

        expect(wrappedApp.toJSON()).toMatchSnapshot()
    })
})