import React from 'react';
import renderer from 'react-test-renderer';

import Spinner from './Spinner';

describe('Spinner', () => {
  it('The Snapshot', () => {
    const tree = renderer.create(<Spinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
