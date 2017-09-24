import React, { Component } from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

const createGridItemStyles = props => ({
  gridItem: {
    height: '15px',
    width: '15px',
    border: '1px solid rgba(0, 0, 0, 0.3)',
    margin: '1px',
    cursor: 'pointer',
    outline: 'none',
    backgroundColor: props.active ? 'red' : '',
    ':hover': {
      backgroundColor: 'red',
    },
  },
});

class GridItem extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  handleChange = () => {
    this.setState({
      active: !this.state.active,
    });
  }

  render() {
    const {
      gridItem,
    } = createGridItemStyles(this.state);

    return (
      <div style={gridItem} onClick={this.handleChange} role="button" tabIndex="0" />
    );
  }
}

export default Radium(GridItem);
