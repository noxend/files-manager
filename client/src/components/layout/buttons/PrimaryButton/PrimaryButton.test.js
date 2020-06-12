import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PrimaryButton from './PrimaryButton';

configure({ adapter: new Adapter() });

describe('Default Button', () => {
  it('Snapshot', () => {
    const tree = renderer.create(<PrimaryButton>Title</PrimaryButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Props should to match the component', () => {
    const wrapper = shallow(<PrimaryButton>Title</PrimaryButton>);
    expect(wrapper.find('Button').prop('type')).toBe('primary');
    expect(wrapper.find('Button').prop('children')).toBe('Title');
  });
});
