import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as actions from '../../actions';

/**
 * Controls at top of the Application
 */
class Controls extends React.Component {
  // stores the state of the drawer
  drawer = false;

  /**
   *
   */
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * dadawd
   *
   @param {obect} event
   */
  handleKeyDown = (event) => {
    console.log('KEYPRESSED', event);
    if (!this.props) {
      return;
    }
    if (!this.props.ui.detail && event.key === ' ') {
      this.props.actions.toggleTraining(this.props.training);
    } else if (this.props.ui.detail && event.key === ' ') {
      this.props.actions.updateUI({
        ...this.props.ui,
        anim: !this.props.ui.anim,
      });
    } else if (event.key === 'Enter') {
      if (this.props.ui.detail) {
        this.props.actions.updateUI({...this.props.ui, animStep: true});
      } else if (!this.props.training.running) {
        this.props.actions.updateTraining({...this.props.training, step: true});
      }
    } else if (event.key === 'Backspace' && !this.props.ui.detail) {
      this.props.actions.updateTraining({...this.props.training, reset: true});
    } else if (event.key === '1' && !this.props.ui.detail &&
          !this.props.training.running) {
      this.props.actions.updateTraining({...this.props.training,
        dataType: 'sin'});
    } else if (event.key === '2' && !this.props.ui.detail &&
          !this.props.training.running) {
      this.props.actions.updateTraining({...this.props.training,
        dataType: 'saw'});
    } else if (event.key === '3' && !this.props.ui.detail &&
          !this.props.training.running) {
      this.props.actions.updateTraining({...this.props.training,
        dataType: 'sqr'});
    } else if (event.key === '4' && !this.props.ui.detail &&
          !this.props.training.running) {
      this.props.actions.updateTraining({...this.props.training,
        dataType: 'sinc'});
    } else if (event.key === '+' && !this.props.ui.detail &&
    !this.props.training.running && this.props.network.layers <= 6) {
      this.props.actions.updateNetwork({...this.props.network,
        layers: this.props.network.layers + 1});
    } else if (event.key === '-' && !this.props.ui.detail &&
    !this.props.training.running && this.props.network.layers > 1) {
      this.props.actions.updateNetwork({...this.props.network,
        layers: this.props.network.layers - 1});
    } else if (event.key === 'Tab') {
      this.props.actions.updateUI({...this.props.ui,
        detail: !this.props.ui.detail});
      event.preventDefault();
    }
  }
  /**
   * Handles the opening and closing of the side drawer
   *
   * @param {boolean} open true, if the drawer should now be opened
   * @memberof Controls
   * @return {undefined}
   */
  toggleDrawer = (open) => (event) => {
    this.drawer = open;
  };

  /**
   * Readt render function controlling the look of the
   * AppBar of the Application
   *
   * @return {object} the react components rendered look
   */
  render() {
    return (
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit">
              leaRNN
          </Typography>
          <div className='wrapper'>
            <div className='menu' align="right">

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
  actions: PropTypes.object.isRequired,
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
    actions: state.actions,
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
