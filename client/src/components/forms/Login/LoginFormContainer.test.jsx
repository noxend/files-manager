import LoginFormContainer from './LoginFormContainer';
import axios from 'axios';

describe('<LoginFormContainer />', () => {
  test('Test validation method', () => {
    const validateMock = jest.spyOn(
      new LoginFormContainer.WrappedComponent(),
      'validate'
    );
    validateMock({ email: 'noxend@gmail.com', password: '128500' });
    expect(validateMock).toHaveBeenCalledWith({
      email: 'noxend@gmail.com',
      password: '128500'
    });
    expect(validateMock).toHaveReturned();
    expect(validateMock).toBeCalledTimes(1);
    validateMock.mockRestore();
  });

  test('Test onSubmit method', () => {
    const loginUserMock = jest.fn();
    const setSubmittingMock = jest.fn();

    const onSubmitMock = jest.spyOn(
      new LoginFormContainer.WrappedComponent({
        loginUser: loginUserMock
      }),
      'onSubmit'
    );

    jest.spyOn(axios, 'post').mockResolvedValue({ data: { token: 'token' } });

    onSubmitMock(
      { email: 'noxend@gmail.com', password: '128500' },
      { setSubmitting: setSubmittingMock }
    );

    expect(onSubmitMock).toHaveBeenCalledWith(
      {
        email: 'noxend@gmail.com',
        password: '128500'
      },
      { setSubmitting: setSubmittingMock }
    );
    expect(onSubmitMock).toBeCalledTimes(1);
  });
});
