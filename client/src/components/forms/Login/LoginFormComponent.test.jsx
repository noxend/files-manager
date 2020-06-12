import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginFormComponent from './';

configure({ adapter: new Adapter() });

const props = {
  values: {
    email: 'noxend@gmail.com',
    password: '12345678'
  },
  touched: {},
  errors: {},
  handleChange: jest.fn(),
  handleBlur: jest.fn(),
  handleSubmit: jest.fn(),
  isSubmitting: false
};

describe('<LoginFormComponent />', () => {
  test('Submit login form (should return the token)', () => {
    const wrapper = shallow(<LoginFormComponent {...props} />);

    expect(wrapper.find('Title').prop('level')).toBe(3);
    expect(wrapper.find('Title').prop('children')).toBe('Log in');
    expect(wrapper.find('.forms-container__message').prop('children')).toBe(
      'Fill in the fields what to sign in to your account'
    );

    expect(
      wrapper
        .find('[placeholder="E-Mail"]')
        .dive()
        .find('[id="email"]')
        .prop('value')
    ).toBe('noxend@gmail.com');

    expect(
      wrapper
        .find('[placeholder="Password"]')
        .dive()
        .find('[id="password"]')
        .prop('value')
    ).toBe('12345678');
  });
});
