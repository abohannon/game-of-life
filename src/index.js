import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

      generations: 0,

    };
  }

  updateGenerations = () => {
    this.setState({
      generations: this.state.generations += 1,
    });
  }

  render() {
    const {
      appWrapper,
    } = createAppStyles();

    return (
      <MuiThemeProvider>
        <div style={appWrapper}>
          <h1>The Game Of Life</h1>
          <Grid updateGenerations={this.updateGenerations} />
          <Controls generations={this.state.generations} />
        </div>
      </MuiThemeProvider>
    );
  }
}

const rootEl = document.querySelector('#root');

ReactDOM.render(<App />, rootEl);
