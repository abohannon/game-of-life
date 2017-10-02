import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import './index.css';

import Grid from './components/grid';
import Controls from './components/controls';

const createAppStyles = () => ({
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  appBar: {
    fontFamily: '"Work Sans", sans-serif',
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.gridSize = 800;
    this.intervalID = '';

    this.state = {
      generations: 0,
      aliveCells: [],
      grid: Array(this.gridSize).fill(false),
    };
  }

  componentDidMount = () => {
    this.randomCells();
    this.startGame();
  }

  selectCell = (index) => {
    const gridCopy = [...this.state.grid];
    gridCopy[index] = !gridCopy[index];
    this.setState({
      grid: gridCopy,
    });
  }

  randomCells = () => {
    const gridCopy = [...this.state.grid];
    for (let i = 0; i < 200; i++) {
      const rand = Math.floor(Math.random() * 800);
      gridCopy[rand] = true;
    }
    this.setState({
      grid: gridCopy,
    });
  }

  startGame = () => {
    clearInterval(this.intervalID);
    this.intervalID = setInterval(this.analyzeNeighbors, 100);
  }

  pauseGame = () => {
    this.setState({
      start: false,
    });
    clearInterval(this.intervalID);
  }

  clearGame = () => {
    const gridCopy = [...this.state.grid];
    for (let i = 0; i < gridCopy.length; i++) {
      if (gridCopy[i]) {
        gridCopy[i] = false;
      }
    }
    this.setState({
      grid: gridCopy,
      generations: 0,
    });
    clearInterval(this.intervalID);
  }

  analyzeNeighbors = () => {
    const grid = this.state.grid;
    const gridCopy = [...this.state.grid];
    for (let i = 0; i < gridCopy.length; i++) {
      let count = 0;
      if (grid[i + 1]) count++;
      if (grid[i - 1]) count++;
      if (grid[i - 40]) count++;
      if (grid[i - 39]) count++;
      if (grid[i - 41]) count++;
      if (grid[i + 40]) count++;
      if (grid[i + 39]) count++;
      if (grid[i + 41]) count++;

      if (grid[i] && (count < 2 || count > 3)) gridCopy[i] = false;
      if (!grid[i] && count === 3) gridCopy[i] = true;
    }
    this.setState({
      grid: gridCopy,
      generations: this.state.generations + 1,
    });
  }

  render() {
    const {
      appWrapper,
      appBar,
    } = createAppStyles();

    return (
      <MuiThemeProvider>
        <div style={appWrapper}>
          <AppBar
            title="Conway's Game of Life"
            showMenuIconButton={false}
            style={appBar}
          />
          <Grid
            grid={this.state.grid}
            selectCell={this.selectCell}
            gridSize={this.gridSize}
          />
          <Controls
            generations={this.state.generations}
            startGame={this.startGame}
            pauseGame={this.pauseGame}
            clearGame={this.clearGame}
            randomGame={this.randomCells}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const rootEl = document.querySelector('#root');

ReactDOM.render(<App />, rootEl);
