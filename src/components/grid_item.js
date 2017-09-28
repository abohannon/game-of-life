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
    backgroundColor: props.alive ? 'red' : '',
    ':hover': {
      backgroundColor: 'red',
    },
  },
});

class GridItem extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    trackCells: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      alive: false,
      cell: '',
    };
  }

  handleUpdate = (cell, state) => {
    this.props.trackCells(cell, state);
  }

  handleChange = () => {
    this.setState({
      alive: !this.state.alive,
      cell: this.props.index,
    });
    this.handleUpdate(this.props.index, this.state.alive);
    this.props.updateGenerations();
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
