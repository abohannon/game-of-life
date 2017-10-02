import React, { Component } from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

const createGridItemStyles = () => ({
  gridItem: {
    height: '15px',
    width: '15px',
    border: '1px solid rgba(0, 0, 0, 0.3)',
    margin: '1px',
    cursor: 'pointer',
    outline: 'none',
  },
});

class GridItem extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    selectCell: PropTypes.func.isRequired,
    cellClass: PropTypes.string.isRequired,
  };

  selectCell = () => {
    this.props.selectCell(this.props.index);
  }

  render() {
    const {
      gridItem,
    } = createGridItemStyles(this.state);

    return (
      <div className={this.props.cellClass} style={gridItem} onClick={this.selectCell} role="button" tabIndex="0" />
    );
  }
}

export default Radium(GridItem);
