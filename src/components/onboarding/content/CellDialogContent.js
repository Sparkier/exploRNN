import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import {DialogContent, Grid, Typography, Button} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';

import styles from '../../../styles/themedStyles';
import * as actions from '../../../actions';
import * as Cookies from '../../../helpers/Cookies';

/**
 * Onboarding is used to explain the App.
 */
class CellDialogContent extends React.Component {
  /**
   * Handles the closing of the dialogs for this element, updates the
   * global state accordingly
   *
   * @param {object} event the event triggering this function
   */
  handleNext = (event) => {
    Cookies.setIntroState('done');
    const introState = Cookies.getIntroState();
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
    return (
      <DialogContent>
        <Grid container directiton='column' spacing={2}>
          <Grid item>
            <Typography display='inline'>
              You currently see the visualization of an individual
            </Typography>
            <Typography className={this.props.classes.typoCvHighlighted}
              display='inline'>
              &nbsp;long-short term memory (LSTM) cell
            </Typography>
            <Typography display='inline'>
              . The cell is visualized on the left, while the data that is
              processed by the network in each time-step is displayed on the
              right.
            </Typography>
          </Grid>
          <Grid item>
            <Typography display='inline'>
              You can
            </Typography>
            <Typography className={this.props.classes.typoCvHighlighted}
              display='inline'>
              &nbsp;click individual compute units in this cell&nbsp;
            </Typography>
            <Typography display='inline'>
              to get insight into how they work and what they do.
            </Typography>
          </Grid>
          <Grid item>
            <Typography display='inline'>
              As in the overview, you can also
            </Typography>
            <Typography className={this.props.classes.typoCvHighlighted}
              display='inline'>
              &nbsp;click all headings in this visualization&nbsp;
            </Typography>
            <Typography display='inline'>
              for more information.
            </Typography>
          </Grid>
          <Grid item style={{width: '100%'}}>
            <Grid container justify='flex-end'>
              <Grid item>
                <Button variant="contained"
                  className={this.props.ui.detail ?
                    this.props.classes.text_button_detail :
                    this.props.classes.text_button_overview}
                  onClick={this.handleSkip}>
                  Skip Intro
                </Button>
                <Button variant="contained"
                  className={this.props.ui.detail ?
                    this.props.classes.text_button_cell :
                    this.props.classes.text_button_net}
                  onClick={this.handleNext}
                  endIcon={<CheckIcon/>}>
                  Got it!
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    );
  }
}

// Prop Types holding all the Preferences
CellDialogContent.propTypes = {
  cookiesState: PropTypes.object.isRequired,
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
    withStyles(styles)(CellDialogContent)
);
