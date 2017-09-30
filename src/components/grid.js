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
    console.log('grid - state from gridItem:', state);
    if (state) {
      const aliveCells = [...this.state.aliveCells, cell];
      this.setState({
        aliveCells,
      });
    } // TODO: Still working on removing dead cells from aliveCells array.
    if (!state) {
      const updatedCells = [...this.state.aliveCells];
      const deadCell = updatedCells.indexOf(cell);
      console.log('deadCell', deadCell);
      updatedCells.slice(deadCell, 1);

      this.setState({
        aliveCells: updatedCells,
      });
    }
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
