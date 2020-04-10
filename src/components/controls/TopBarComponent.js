import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Button, Typography,
  MenuItem} from '@material-ui/core/';
import Help from '@material-ui/icons/Help';

import * as actions from '../../actions';
import styles from '../../styles/themedStyles';
import globalConstants from '../constants/global';
import StyledSelect from './comps/StyledSelect';
import StyledButton from './comps/StyledButton';
import * as Cookies from '../../helpers/Cookies';

/**
 * Bar at top of the Application, 'The Toolbar'
 */
class TopBar extends React.Component {
  /**
   * When the component is mounted we need to connect the keyboard
   * input actions to this element to handle incoming key presses
   */
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Handles keyboard inputs for the application
   *
   * @param {obect} event the key input event
   */
  handleKeyDown = (event) => {
    if (!this.props) {
      return;
    }
    let callDefault = false;
    switch (event.key) {
      case ' ': // 'play/pause'
        if (!this.props.training.workerReady && !this.props.ui.netAnim) return;
        if (!this.props.ui.detail) {
          this.props.actions.toggleTraining(this.props.training);
        } else {
          this.props.actions.updateUI({
            ...this.props.ui,
            anim: !this.props.ui.anim,
          });
        }
        break;
      case 'Enter': // 'step'
        if ((this.props.ui.detail && this.props.ui.anim) ||
            (!this.props.ui.detail && this.props.training.running) ||
            !this.props.training.workerReady) return;
        if (this.props.ui.detail) {
          this.props.actions.updateUI({...this.props.ui, animStep: true});
        } else if (!this.props.training.running) {
          this.props.actions.updateTraining(
              {...this.props.training, step: true}
          );
        }
        break;
      case 'Backspace': // 'reset'
        if (this.props.ui.detail || !this.props.training.workerReady) return;
        this.props.actions.updateTraining(
            {...this.props.training, reset: true}
        );
        break;
      // input selection
      case '1':
        this.updateDataTypes('sin');
        break;
      case '2':
        this.updateDataTypes('saw');
        break;
      case '3':
        this.updateDataTypes('sqr');
        break;
      case '4':
        this.updateDataTypes('sinc');
        break;
      // network size
      case '-':
        if (!this.props.ui.detail && !this.props.training.running &&
            this.props.network.layers > 2
        ) {
          this.props.actions.updateNetwork({...this.props.network,
            layers: this.props.network.layers - 1});
        }
        break;
      case '+':
        if (!this.props.ui.detail && !this.props.training.running &&
            this.props.network.layers <= 6
        ) {
          this.props.actions.updateNetwork({...this.props.network,
            layers: this.props.network.layers + 1});
        }
        break;
      // view mode (netview <-> cell view)
      case 'Tab':
        this.props.actions.updateUI({...this.props.ui,
          detail: !this.props.ui.detail});
        break;
      default:
        callDefault = true;
    }
    if (!callDefault) {
      event.preventDefault();
    }
  }

  /**
   * Adds or removes a chosen type to the global state
   *
   * @param {string} type the data type to be added or removed
   */
  updateDataTypes = (type) => {
    if (!this.props.ui.detail && !this.props.training.running) {
      const oldTypes = this.props.training.dataTypes;
      let newTypes = [];
      if (oldTypes.includes(type) && oldTypes.length > 1) {
        for (const item of oldTypes) {
          if (item !== type) {
            newTypes.push(item);
          }
        }
      } else if (oldTypes.includes(type) && oldTypes.length === 1) {
        newTypes = oldTypes;
      } else {
        oldTypes.push(type);
        newTypes = oldTypes;
      }
      this.props.actions.updateTraining(
          {...this.props.training, dataTypes: newTypes}
      );
    }
  }

  /**
   * Handles the selection of the input type select component
   *
   * @param {object} event the event containing the information about the
   * selected type element
   */
  inputTypeSelect = (event) => {
    const newDataTypes = event.target.value === 'Text Data' ?
      ['abab'] : ['sin'];
    this.props.actions.updateTraining({...this.props.training,
      inputType: event.target.value, reset: true, dataTypes: newDataTypes});
  };

  /**
   * Resets the onboarding state to get the intro again.
   *
   * @param {object} event the event triggering this function
   */
  resetOnboarding = (event) => {
    Cookies.removeIntroState();
    this.props.actions.updateCookiesState({...this.props.cookiesState,
      intro: ''});
  }

  /**
   * React render function controlling the look of the
   * AppBar of the Application
   *
   * @return {object} the react components rendered form
   */
  render() {
    const {classes} = this.props;
    const global = globalConstants[this.props.appState.language];
    return (
      <AppBar className={ this.props.ui.detail ? classes.cVheader :
        classes.oVheader} id='barDiv'>
        <Toolbar>
          <Typography variant="h3" className = { classes.typoHeader }>
            {global.title}
          </Typography>
          <StyledSelect value={this.props.training.inputType}
            onChange={ this.inputTypeSelect }
            main={true}
          >
            {
              global.inputTypes.map((x) => (
                <MenuItem key={x.name} disabled={x.disabled}
                  value={x.name}>{x.name}</MenuItem>
              ))
            }
          </StyledSelect>
          <Button variant="contained"
            className={this.props.ui.detail ?
              this.props.classes.text_button_cell_inverted :
              this.props.classes.text_button_net_inverted}
            onClick={this.resetOnboarding}>
            Reset Intro
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

// TopBar state of the Application
TopBar.propTypes = {
  training: PropTypes.object.isRequired,
  network: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  cookiesState: PropTypes.object.isRequired,
};

/**
 * Map the states from redux to this property.
 *
 * @param {object} state - the global redux state.
 * @return {object} - the new props of this component.
 */
function mapStateToProps(state) {
  return {
    training: state.training,
    network: state.network,
    ui: state.ui,
    appState: state.appState,
    actions: state.actions,
    cookiesState: state.cookiesState,
  };
}

/**
 * Maps the actions to this property.
 *
 * @param {function} dispatch - the function that is used to call an action.
 * @return {object} - the actions that can be used in this component.
 */
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(TopBar)
);
