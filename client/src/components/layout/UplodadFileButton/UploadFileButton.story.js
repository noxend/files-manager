import React from 'react';
import { storiesOf } from '@storybook/react';

import UploadFileButton from './UploadFileButton';

const stories = storiesOf('Buttons', module);

stories.add('Upload File Button', () => {
  return (
    <div style={{ width: '260px' }}>
      <UploadFileButton />
    </div>
  );
});
