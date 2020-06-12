import React from 'react';
import renderer from 'react-test-renderer';

import UploadFileButton from './UploadFileButton';

describe('Uplodad File Button', () => {
  it('The Snapshot', () => {
    const tree = renderer.create(<UploadFileButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
