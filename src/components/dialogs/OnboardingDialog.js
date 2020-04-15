import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import {Dialog, DialogTitle, DialogContent, Grid,
  Button} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {withStyles} from '@material-ui/core/styles';

import styles from '../../styles/themedStyles';
import * as actions from '../../actions';
import globalConstants from '../constants/global';
import DescriptionElement from './elements/DescriptionElement';
import * as Cookies from '../../helpers/Cookies';

/**
 * Onboarding is used to explain the App.
 *
 * @param {String} introState the current intro state
 * @return {String} the intro state after the current one
 */
class OnboardingDialog extends React.Component {
  getNextIntroState = (introState) => {
    if (introState === '' || introState === undefined) {
      return 'overview';
    } else if (introState === 'overview') {
      return 'detail';
    } else if (introState === 'detail') {
      return 'done';
    } else {
      return '';
    }
  }

  /**
   * Handles the closing of the dialogs for this element, updates the
   * global state accordingly
   *
   * @param {object} event the event triggering this function
   */
  handleNext = (event) => {
    let introState = Cookies.getIntroState();
    introState = this.getNextIntroState(introState);
    Cookies.setIntroState(introState);
    this.props.actions.updateCookiesState({...this.props.cookiesState,
      intro: introState});
  }

  /**
   * Handles the deactivation of the dialogs for this element, updates the
   * global state accordingly
   *
   * @param {object} event the event triggering this function
   */
  handleSkip = (event) => {
    Cookies.setIntroState('skipped');
    const introState = Cookies.getIntroState();
    this.props.actions.updateCookiesState({...this.props.cookiesState,
      intro: introState});
  }

  /**
   * Renders the Onboarding Screen inside the App.
   *
   * @return {object} AlertSnack component to be rendered
   */
  render() {
    let dialogTitle = '';
    let open = false;
    let description = [];
    const constants = globalConstants[this.props.appState.language].strings;
    let state = constants.onboarding.welcome;
    if (this.props.cookiesState.intro === '') {
      dialogTitle = constants.onboarding.welcome.title;
      open = this.props.ui.detail ? false : true;
      description = constants.onboarding.welcome.description;
    } else if (this.props.cookiesState.intro === 'overview') {
      dialogTitle = constants.onboarding.overview.title;
      open = this.props.ui.detail ? false : true;
      description = constants.onboarding.overview.description;
      state = constants.onboarding.overview;
    } else if (this.props.cookiesState.intro === 'detail') {
      dialogTitle = constants.onboarding.detail.title;
      open = this.props.ui.detail ? true : false;
      description = constants.onboarding.detail.description;
      state = constants.onboarding.detail;
    }
    return (
      <Dialog open={open}>
        <DialogTitle>
          {dialogTitle}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container directiton='column' spacing={2}>
            {
              description.map((descriptionElement, index) => (
                <DescriptionElement key={index}
                  descriptionElement={descriptionElement} />
              ))
            }
            <Grid item style={{width: '100%'}}>
              <Grid container justify='flex-end'>
                <Grid item>
                  <Button variant="contained"
                    className={this.props.ui.detail ?
                    this.props.classes.text_button_detail :
                    this.props.classes.text_button_overview}
                    onClick={this.handleSkip}>
                    {state.buttonTitles.skip}
                  </Button>
                  <Button variant="contained"
                    className={this.props.ui.detail ?
                    this.props.classes.text_button_cell :
                    this.props.classes.text_button_net}
                    onClick={this.handleNext}
                    endIcon={<NavigateNextIcon/>}>
                    {state.buttonTitles.next}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}

// Prop Types holding all the Preferences
OnboardingDialog.propTypes = {
  cookiesState: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

/**
 * Map the State to the Properties of this Component
 *
 * @param {object} state the state that is to be mapped to this component
 * @param {object} _ the props of this component
 * @return {object} the props that this component holds
 */
function mapStateToProps(state, _) {
  return {
    cookiesState: state.cookiesState,
    appState: state.appState,
    ui: state.ui,
  };
}

/**
 * Map the actions of the State to the Props of this Class
 *
 * @param {object} dispatch the function that is used to call actions
 * @return {object} the actions that this component can call
 */
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(OnboardingDialog));
