import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Radium from 'radium';
import PropTypes from 'prop-types';

const createControlsStyles = () => ({
  controlsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: 760,
  },
  button: {
    marginRight: '8px',
  },
});

class Controls extends Component {
  static propTypes = {
    generations: PropTypes.number.isRequired,
    startGame: PropTypes.func.isRequired,
    pauseGame: PropTypes.func.isRequired,
    clearGame: PropTypes.func.isRequired,
    randomGame: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      dummy: 0,
    };
  }
  render() {
    const {
      controlsWrapper,
      button,
    } = createControlsStyles();

    const {
      generations,
      startGame,
      pauseGame,
      clearGame,
      randomGame,
    } = this.props;

    return (
      <div style={controlsWrapper}>
        <div>
          <RaisedButton label="START" style={button} onClick={startGame} />
          <RaisedButton label="PAUSE" style={button} onClick={pauseGame} />
          <RaisedButton label="CLEAR" style={button} onClick={clearGame} />
          <RaisedButton label="RANDOM" style={button} onClick={randomGame} />
        </div>
        <div>
          Generations: {generations}
        </div>
      </div>
    );
  }
}

export default Radium(Controls);
