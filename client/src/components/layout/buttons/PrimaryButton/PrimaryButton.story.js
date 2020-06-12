import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import PrimaryButton from './PrimaryButton';

const stories = storiesOf('Buttons', module);

stories.addDecorator(withKnobs);

stories.add('Primary Button', () => {
  const name = text('Button Name', 'Some name');

  const loading = boolean('Loading', false);
  const disabled = boolean('Disabled', false);

  return (
    <PrimaryButton loading={loading} disabled={disabled}>
      {name}
    </PrimaryButton>
  );
});
