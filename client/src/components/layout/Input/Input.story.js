import React from 'react';
import { Icon } from 'antd';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';

import Input from './Input';

const stories = storiesOf('Input', module);

stories.addDecorator(withKnobs);

stories.add('Input', () => {
  const isFieldTouched = boolean('Is field touched', false);
  const isError = boolean('Is error', false);
  const value = text('Value', 'mail@gmail.com');
  const error = text('Error', 'Error place');

  return (
    <div style={{ width: '260px' }}>
      <Input
        touched={{ email: isFieldTouched }}
        values={{ email: value }}
        errors={{ email: error && isError ? error : null }}
        fieldName="email"
        placeholder="E-Mail"
      >
        <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
      </Input>
    </div>
  );
});
