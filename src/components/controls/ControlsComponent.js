import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import * as actions from '../../actions';

/**
 * Controls at top of the Application
 */ 
class Controls extends React.Component {
  drawer = false;
  
  toggleDrawer = (open) => (event) => {
    this.drawer = open;
  };

  /**
   * Readt render function controlling the look of the 
   * AppBar of the Application
   * @return {object} the react components rendered look
   */
  render() {
    return (
      <AppBar >
        <Toolbar>
          <Typography variant="h6" color="inherit">
              leaRNN
          </Typography>
          <div className='wrapper'>
            <div className='menu' align="right">
              <Fab 
                color="primary" 
                aria-label="add" 
                onClick={this.toggleDrawer(true)}>
                <AddIcon />
              </Fab>
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
  ui: PropTypes.object.isRequired,
};

/**
 * Mapping the Controls state to the Props of this Class
 * @param {object} state ...
 * @return {object} ... 
 */
function mapStateToProps(state) {
  return {
    training: state.training,
    network: state.network,
    ui: state.ui,
  };
}

/**
 * Map the Actions called when Controls are used to the Props of this Class
 *
 * @param {object} dispatch ...
 * @return {object} ...
 */
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);