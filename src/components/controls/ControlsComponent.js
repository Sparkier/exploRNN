import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GetApp from '@material-ui/icons/GetApp';

import ToggleButton from './ToggleButton';
import * as actions from '../../actions';

// Controls at top of the Application
class Controls extends React.Component {

  resetButtonPressed = () => {
    this.props.actions.resetNetwork();
  }

  toggleTraining = () => {
    this.props.actions.toggleTraining();
  }

  render() {
    return(
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            RNNVis
          </Typography>
          <div className='wrapper'>
            <div className='menu'>
              <ToggleButton name="Training" state={this.props.training} action={this.toggleTraining}/>
            </div>
            <div>
              <IconButton color='inherit' aria-label='Download' onClick={this.resetButtonPressed}>
                <GetApp/>
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

// Controls state of the Application
Controls.propTypes = {
  training: PropTypes.bool,
  iteration: PropTypes.number
};

// Mapping the Controls state to the Props of this Class
function mapStateToProps(state, ownProps) {
  return {
    training: state.training,
    iteration: state.iteration
  };
}

// Map the Actions called when Controls are used to the Props of this Class  
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
