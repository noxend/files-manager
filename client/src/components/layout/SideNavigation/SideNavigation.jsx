import React, { Component } from 'react';

import './SideNavigation.css';

export default class SideNavigation extends Component {
  state = {
    startPosition: null,
    height: null,
    init: false
  };

  componentDidMount = () => {
    const { currentPage } = this.props;
    document.querySelectorAll('.tab__item').forEach(el => {
      if (el.dataset.tab === currentPage) {
        this.setState({
          startPosition: el.offsetTop,
          height: el.offsetHeight
        });
      }
    });
  };

  render = () => {
    return (
      <div className="tabs">
        <ul>{this.props.children}</ul>
        <div
          className="indicator"
          style={{
            height: `${this.state.height}px`,
            transform: `translate(0, ${this.state.startPosition}px)`,
            transition: this.state.init
              ? 'cubic-bezier(0.645, 0.045, 0.355, 1) 0.3s'
              : null
          }}
        />
      </div>
    );
  };
}
