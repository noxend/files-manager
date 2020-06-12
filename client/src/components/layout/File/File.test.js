import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import File from './File';

configure({ adapter: new Adapter() });

describe('<File />', () => {
  it('Snapshot', () => {
    const tree = renderer
      .create(<File type="psd" fileName="v2.psd" fileSize={1073741824} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Props should to match the component', () => {
    const wrapper = shallow(<File type="psd" fileName="v2.psd" fileSize={1073741824} />);
    expect(wrapper.find('.file__name').text()).toBe('v2.psd');
    expect(wrapper.find('.file__icon').prop('type')).toBe('psd');
    expect(wrapper.find('.file__size').text()).toBe('1.00 GB');
  });
});
