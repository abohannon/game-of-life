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

    this.state = {

      generations: 0,
      start: false,
      aliveCells: [],
      grid: Array(this.gridSize).fill(false),

    };
  }

  selectCell = (index) => {
    console.log('cell selected:', index);
    const gridCopy = [...this.state.grid];
    gridCopy[index] = !gridCopy[index];
    this.setState({
      grid: gridCopy,
    });
  }

  updateGenerations = () => {
    this.setState({
      generations: this.state.generations += 1,
    });
  }

  startGame = () => {
    this.setState({
      start: true,
    });
  }

  pauseGame = () => {
    this.setState({
      start: false,
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
            updateGenerations={this.updateGenerations}
            start={this.state.start}
          />
          <Controls
            generations={this.state.generations}
            startGame={this.startGame}
            pauseGame={this.pauseGame}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const rootEl = document.querySelector('#root');

ReactDOM.render(<App />, rootEl);
