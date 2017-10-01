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
    backgroundColor: props.alive ? '#EF5350' : '',
    ':hover': {
      backgroundColor: '#EF5350',
    },
  },
});

class GridItem extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    trackCells: PropTypes.func.isRequired,
    updateGenerations: PropTypes.func.isRequired,
    aliveCells: PropTypes.array.isRequired,
    start: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      alive: false,
      cell: '',
      neighbors: 0,
      neighborLocations: [],
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.detectNeighbors(nextProps.aliveCells, nextProps.index);
    this.toggleAlive();
  }

  toggleAlive = () => {
    if (this.props.start) {
      if (this.state.alive === true) {
        if (this.state.neighbors < 2 || this.state.neighbors > 3) {
          this.setState({
            alive: false,
          });
        }
        if (this.state.neighbors > 2 && this.state.neighbors <= 3) {
          this.setState({
            alive: true,
          });
        }
      }
      if (this.state.alive === false) {
        if (this.state.neighbors === 3) {
          this.setState({
            alive: true,
          });
        }
      }
    }
  }


  detectNeighbors = (aliveCells, cell) => {
    const neighbors = [
      cell + 1,
      cell - 1,
      cell - 40,
      cell + 40,
      (cell - 40) + 1,
      (cell - 40) - 1,
      (cell + 40) + 1,
      (cell + 40) - 1,
    ];

    const currentNeighbors = aliveCells.filter(aliveCell => neighbors.includes(aliveCell));

    this.setState({
      neighbors: currentNeighbors.length,
      neighborLocations: currentNeighbors,
    });
  }

  handleChange = () => {
    this.setState({
      alive: !this.state.alive,
      cell: this.props.index,
    }, () => {
      this.props.trackCells(this.props.index, this.state.alive);
      this.props.updateGenerations();
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
