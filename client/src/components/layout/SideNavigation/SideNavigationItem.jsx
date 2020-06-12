import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

export default props => {
  return (
    <li>
      <Link to={props.redirect} className="tab__item" data-tab={props.redirect}>
        <Icon type={props.icon} style={{ fontSize: '1.2rem' }} />
      </Link>
    </li>
  );
};
