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
  };

  static defaultProps = {
    generations: 800,
  };

  render() {
    const {
      controlsWrapper,
      button,
    } = createControlsStyles();
    return (
      <div style={controlsWrapper}>
        <div>
          <RaisedButton label="START" style={button} />
          <RaisedButton label="PAUSE" style={button} />
          <RaisedButton label="RESET" style={button} />
        </div>
        <div>
          Generations: {this.props.generations}
        </div>
      </div>
    );
  }
}

export default Radium(Controls);
