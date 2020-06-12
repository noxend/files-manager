import React from 'react';
import renderer from 'react-test-renderer';

import CustomIcon from './CustomIcon';

describe('Custom Icon', () => {
  it('The Snapshot', () => {
    const tree = renderer.create(<CustomIcon type="docx" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
