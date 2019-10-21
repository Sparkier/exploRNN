import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import * as actions from '../../actions';

// Controls at top of the Application
class Controls extends React.Component {

  resetButtonPressed = () => {
    this.props.actions.resetNetwork(this.props.training);
  }

  toggleTraining = () => {
    console.log('Training should start now')
    this.props.actions.toggleTraining(this.props.training);
    this.props.actions.updateUI({...this.props.ui, detail: false});
  }


  render() {
    
    return(
        <AppBar >
          <Toolbar>
            <Typography variant="h6" color="inherit">
              leaRNN
            </Typography>
            <div className='wrapper'>
              <div className='menu'>
              </div>
            </div>
          </Toolbar>
        </AppBar>
    );
  }
}

// Controls state of the Application
Controls.propTypes = {
  training: PropTypes.object.isRequired,
  network: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

// Mapping the Controls state to the Props of this Class
function mapStateToProps(state, ownProps) {
  return {
    training: state.training,
    network: state.network,
    ui: state.ui
  };
}

// Map the Actions called when Controls are used to the Props of this Class  
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
