import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import DefaultButton from './DefaultButton';

const stories = storiesOf('Buttons', module);

stories.addDecorator(withKnobs);

stories.add('Default Button', () => {
  const name = text('Button Name', 'Some name');

  const loading = boolean('Loading', false);
  const disabled = boolean('Disabled', false);

  return (
    <DefaultButton loading={loading} disabled={disabled}>
      {name}
    </DefaultButton>
  );
});
