import React from 'react';
import { Icon } from 'antd';

export default View =>
  class extends React.Component {
    state = {
      startPosition: { x: 0, y: 0 },
      mouseStartPosition: { x: 0, y: 0 }
    };

    componentWillMount = () => {
      this.dragGhost = React.createRef();
    };

    setPosition = (x, y) => {
      this.dragGhost.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    onDragEnd = e => {
      e.currentTarget.classList.toggle('--drag');
      this.setPosition(this.state.startPosition.x, this.state.startPosition.y);
      this.dragGhost.current.style.opacity = 0;
      setTimeout(() => {
        this.dragGhost.current.classList.toggle('--move');
      }, 300);
    };

    onDragStart = e => {
      const { fileId } = this.props;
      const item = e.currentTarget.cloneNode();
      const { left, top } = e.currentTarget.getBoundingClientRect();
      e.dataTransfer.setDragImage(item, 0, 0);
      e.dataTransfer.setData('fileId', fileId);
      e.currentTarget.classList.toggle('--drag');
      setTimeout(() => {
        this.dragGhost.current.classList.toggle('--move');
      }, 0);
      this.dragGhost.current.style.opacity = 1;
      this.setState({
        startPosition: {
          x: e.currentTarget.offsetLeft,
          y: e.currentTarget.offsetTop
        },
        mouseStartPosition: {
          x: left,
          y: top
        }
      });
    };

    onDrag = e => {
      const { x, y } = this.state.mouseStartPosition;
      if (
        e.clientX + this.dragGhost.current.offsetWidth + 5>=
        document.body.offsetWidth
      ) {
        this.setPosition(
          e.clientX - x - this.dragGhost.current.offsetWidth - 5,
          e.clientY - y + 5
        );
      } else {
        this.setPosition(e.clientX - x + 5, e.clientY - y + 5);
      }
    };

    render = () => {
      return (
        <div style={{ position: 'relative' }}>
          <View {...this.props} {...this} />
          <div ref={this.dragGhost} className="drag-ghost">
            <Icon
              type="file"
              style={{ fontSize: '18px', marginRight: '8px' }}
            />
            <span>{this.props.fileName}</span>
          </div>
        </div>
      );
    };
  };
