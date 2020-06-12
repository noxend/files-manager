import { configure } from '@storybook/react';
import 'antd/dist/antd.css';
const req = require.context('../src/components', true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
