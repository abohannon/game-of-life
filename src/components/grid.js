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
  };

  static defaultProps = {
    gridSize: 800,
  };

  render() {
    const {
      gridWrapper,
    } = createGridStyles();

    const {
      gridSize,
    } = this.props;

    const grid = [];

    for (let i = 1; i <= gridSize; i += 1) {
      grid.push(
        <GridItem key={i} />,
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
