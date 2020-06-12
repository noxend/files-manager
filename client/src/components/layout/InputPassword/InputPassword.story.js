import React from 'react';
import { Icon } from 'antd';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import InputPassword from './InputPassword';

const stories = storiesOf('Input', module);

stories.addDecorator(withKnobs);

stories.add('Input password', () => {
  const isFieldTouched = boolean('Is field touched', false);
  const isError = boolean('Is error', false);
  const value = text('Value', 'c2sxbsou');
  const error = text('Error', 'Error place');

  return (
    <div style={{ width: '260px' }}>
      <InputPassword
        touched={{ password: isFieldTouched }}
        values={{ password: value }}
        errors={{ password: error && isError ? error : null }}
        fieldName="password"
        placeholder="Password"
      >
        <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
      </InputPassword>
    </div>
  );
});
