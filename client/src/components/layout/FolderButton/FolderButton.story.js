import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import FolderButton from './FolderButton';

const stories = storiesOf('Buttons', module);

stories.addDecorator(withKnobs);

stories.add('Folder Button', () => {
  const title = text('Folder Name', 'documents');

  return (
    <div style={{ width: '200px' }}>
      <FolderButton title={title} />
    </div>
  );
});
