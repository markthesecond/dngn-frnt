import React from 'react';
import CreationRace from '../../CreationRace';
import { CREATION_RACES } from '../../graphql/characterQueries';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';

const mock_result: any = [{
    _id: "mongoid1234",
    name: "Burt",
}]
const mocks: any = [
    {
        request: {
            query: CREATION_RACES,
            variables: {},
        },
        result: {
            data: {
                races: {
                    mock_result
                }
            }
        }
    }
]
test('CreationRace shows only primary select on render', () => {
    const component = renderer.create(
        <MockedProvider mocks={mocks} >
            <CreationRace />
        </MockedProvider>
    );
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});
