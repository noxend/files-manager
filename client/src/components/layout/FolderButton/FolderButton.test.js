import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FolderButton from './FolderButton';

configure({ adapter: new Adapter() });

describe('<File />', () => {
  it('Snapshot', () => {
    const tree = renderer.create(<FolderButton title="some name" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Props should to match the component', () => {
    const wrapper = shallow(<FolderButton title="some name" />);
    expect(wrapper.find('Icon').prop('type')).toBe('folder-open');
    expect(wrapper.find('Text').prop('children')).toBe('some name');
  });
});
