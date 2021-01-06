import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import {Box, Typography, Grid, Button, Paper} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {withStyles} from '@material-ui/core/styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import styles from '../../styles/themedStyles';
import * as actions from '../../actions';
import DescriptionElement from './elements/DescriptionElement';
import * as Cookies from '../../helpers/Cookies';
import createMuiTheme from '../../theme/globalTheme';
import {getCurrentOnboardingElementProps,
  getNextIntroState} from '../../helpers/OnboardingState';

/**
 * Onboarding is used to explain the App.
 *
 * @param {String} introState the current intro state
 * @return {String} the intro state after the current one
 */
class OnboardingDialog extends React.Component {
  /**
   * Handles the closing of the dialogs for this element, updates the
   * global state accordingly
   *
   * @param {object} event the event triggering this function
   */
  handleNext = (event) => {
    const introState = Cookies.getIntroState();
    getNextIntroState(introState, this.props.cookiesState,
        this.props.actions, this.props);
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
    this.props.actions.reinitNetwork();
  }

  /**
   * Renders the Onboarding Screen inside the App.
   *
   * @return {object} AlertSnack component to be rendered
   */
  render() {
    const onProps = getCurrentOnboardingElementProps(this.props.ui,
        this.props.cookiesState, this.props.appState,
        this.props.network);
    if (onProps.open) {
      return (
        <Grid container alignItems='center'
          style={onProps.state.style}>
          {
            onProps.state.arrow === 'left' ?
              <Grid item>
                <ArrowBackIcon
                  style={{color: this.props.ui.detail ?
                  createMuiTheme.palette.detail.main :
                  createMuiTheme.palette.overview.main}}
                  fontSize="large" >
                </ArrowBackIcon>
              </Grid> : null
          }
          <Grid container item direction='column' alignItems='center'
            style={{width: '500px'}}>
            {
            onProps.state.arrow === 'up' ?
              <Grid item>
                <ArrowUpwardIcon
                  style={{color: this.props.ui.detail ?
                  createMuiTheme.palette.detail.main :
                  createMuiTheme.palette.overview.main}}
                  fontSize="large" >
                </ArrowUpwardIcon>
              </Grid> : null
            }
            <Grid item>
              <Paper style={{background: this.props.ui.detail ?
                createMuiTheme.palette.secondary.superLight :
                createMuiTheme.palette.secondary.superLight}}>
                <Box p={2} style={{width: '500px'}}>
                  <Grid container directiton='column' spacing={2}>
                    <Grid item>
                      <Typography variant="h5">
                        {onProps.state.title}
                      </Typography>
                    </Grid>
                    {
                      onProps.state.description.map((descriptionElement,
                          index) => (
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
                            {onProps.state.buttonTitles.skip}
                          </Button>
                          <Button variant="contained"
                            className={this.props.ui.detail ?
                    this.props.classes.text_button_cell :
                    this.props.classes.text_button_net}
                            onClick={this.handleNext}
                            endIcon={<NavigateNextIcon/>}>
                            {onProps.state.buttonTitles.next}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
            {
            onProps.state.arrow === 'down' ?
              <Grid item>
                <ArrowDownwardIcon
                  style={{color: this.props.ui.detail ?
                  createMuiTheme.palette.detail.main :
                  createMuiTheme.palette.overview.main}}
                  fontSize="large" >
                </ArrowDownwardIcon>
              </Grid> : null
            }
          </Grid>
          {
            onProps.state.arrow === 'right' ?
              <Grid item>
                <ArrowForwardIcon
                  style={{color: this.props.ui.detail ?
                  createMuiTheme.palette.detail.main :
                  createMuiTheme.palette.overview.main}}
                  fontSize="large" >
                </ArrowForwardIcon>
              </Grid> : null
          }
        </Grid>
      );
    } else {
      return null;
    }
  }
}

// Prop Types holding all the Preferences
OnboardingDialog.propTypes = {
  cookiesState: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  training: PropTypes.object.isRequired,
  network: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  pretrained: PropTypes.object.isRequired,
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
    training: state.training,
    network: state.network,
    ui: state.ui,
    pretrained: state.pretrained,
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
