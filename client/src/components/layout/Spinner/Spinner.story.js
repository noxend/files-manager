import React from 'react';
import { storiesOf } from '@storybook/react';

import Spinner from './Spinner';

const stories = storiesOf('Others', module);

stories.add('Spinner', () => {
  return <Spinner />;
});
