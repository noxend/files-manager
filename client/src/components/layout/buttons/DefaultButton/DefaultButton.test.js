import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DefaultButton from './DefaultButton';

configure({ adapter: new Adapter() });

describe('Default Button', () => {
  it('Snapshot', () => {
    const tree = renderer.create(<DefaultButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Props should to match the component', () => {
    const wrapper = shallow(<DefaultButton>Title</DefaultButton>);
    expect(wrapper.find('Button').prop('type')).toBe('default');
    expect(wrapper.find('Button').prop('children')).toBe('Title');
  });
});
