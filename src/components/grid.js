import React, { Component } from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

import GridItem from './grid_item';

const createGridStyles = () => ({
  gridWrapper: {
    display: 'flex',
    alignContent: 'flex-start',
    flexFlow: 'row wrap',
    alignSelf: 'center',
    width: '760px',
    margin: '24px',
  },
});

class Grid extends Component {
  static propTypes = {
    gridSize: PropTypes.number.isRequired,
    updateGenerations: PropTypes.func.isRequired,
    start: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    gridSize: 800,
  };

  constructor(props) {
    super(props);

    this.state = {
      aliveCells: [],
    };
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
    } = createGridStyles();

    const {
      gridSize,
      updateGenerations,
      start,
    } = this.props;

    const grid = [];

    for (let i = 1; i <= gridSize; i += 1) {
      grid.push(
        <GridItem
          key={i}
          index={i}
          trackCells={this.trackCells}
          aliveCells={this.state.aliveCells}
          updateGenerations={updateGenerations}
          start={start}
        />,
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
