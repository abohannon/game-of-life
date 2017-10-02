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
    grid: PropTypes.array.isRequired,
    gridSize: PropTypes.number.isRequired,
    selectCell: PropTypes.func.isRequired,
  };

  render() {
    const {
      gridWrapper,
    } = createGridStyles();

    const {
      gridSize,
      selectCell,
    } = this.props;

    const grid = [];

    let cellClass = '';
    for (let i = 0; i < gridSize; i += 1) {
      cellClass = this.props.grid[i] ? 'cell alive' : 'cell';
      grid.push(
        <GridItem
          cellClass={cellClass}
          key={i}
          index={i}
          trackCells={this.trackCells}
          selectCell={selectCell}
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
