import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';

import File from './File';

const stories = storiesOf('Buttons', module);

stories.addDecorator(withKnobs);

stories.add('File Button', () => {
  const type = select(
    'Types',
    { PSD: 'psd', DOCX: 'docx', JPEG: 'jpg' },
    'psd'
  );

  const fileName = text('File Name', 'filename');

  return (
    <div style={{ width: '260px' }}>
      <File type={type} fileName={fileName} />
    </div>
  );
});
