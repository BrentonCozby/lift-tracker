import React from 'react'
import renderer from 'react-test-renderer'
import NoMatch from '../../../src/js/components/NoMatch/no-match-component.jsx'

function setup() {
    const props = {

    }

    const componentJSON = renderer.create(<NoMatch {...props} />).toJSON()

    return {
        props,
        componentJSON
    }
}

describe('NoMatch', () => {
    it('renders self and subcomponents', () => {
        const { componentJSON } = setup()

        expect(componentJSON).toMatchSnapshot()
    })
})