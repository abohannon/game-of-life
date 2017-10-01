import React, { Component } from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

const createGridStyles = () => ({
  gridWrapper: {
    display: 'flex',
    alignContent: 'flex-start',
    flexFlow: 'row wrap',
    alignSelf: 'center',
    width: '760px',
    margin: '24px',
  },
  gridItem: {
    height: '15px',
    width: '15px',
    border: '1px solid rgba(0, 0, 0, 0.3)',
    margin: '1px',
    cursor: 'pointer',
    outline: 'none',
  },
});

class Grid extends Component {
  static propTypes = {
    gridSize: PropTypes.number.isRequired,
    updateGenerations: PropTypes.func.isRequired,
    start: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      aliveCells: [],
    };
  }

  componentWillReceiveProps = () => {

  }

  trackCells = (cell, state) => {
    console.log(state);
    const aliveCells = [...this.state.aliveCells];
    if (state) {
      aliveCells.push(cell);
    }
    if (!state) {
      const deadCell = aliveCells.indexOf(cell);
      aliveCells.splice(deadCell, 1);
    }
    this.setState({
      aliveCells,
    });
  };

  render() {
    const {
      gridWrapper,
      gridItem,
    } = createGridStyles();

    const {
      gridSize,
      // updateGenerations,
      // start,
    } = this.props;

    const grid = [];

    for (let i = 1; i <= gridSize; i += 1) {
      grid.push(
        <div style={gridItem} onClick={this.handleChange} role="button" tabIndex="0" />,
      );
    }

    return (
      <div style={gridWrapper}>
        {grid}
      </div>
    );
  }
}

export default Radium(Grid);
