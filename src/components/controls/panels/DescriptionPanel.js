import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography, IconButton, Link} from '@material-ui/core';
import Jump from '@material-ui/icons/FastForward';

import * as actions from '../../../actions';
import styles from '../../../styles/themedStyles';
import globalConstants from '../../constants/global';
import DescriptionElement from '../comps/DescriptionElement';
import ComplexDialog from '../../dialogs/ComplexDialog';

/**
 * Descriptions at bottom of the Application, only visible in the cell view
 */
class DescriptionPanel extends React.Component {
  /**
   * Is called when the user interacts with one of the process step titles,
   * opens the corresponding dialog
   *
   * @param {number} id the id of the training step
   */
  onClick(id) {
    const dialogs = this.props.appState.inputDialog;
    dialogs[id] = !dialogs[id];
    this.props.actions.updateAppState({
      ...this.props.appState,
      inputDialog: dialogs,
    });
  }

  /**
   * Is called when the user clicks on the button beside the title of a training
   * step, updates the currently running training process
   *
   * @param {number} id the id of the training step
   */
  onJump(id) {
    const trigger = [false, false, false];
    trigger[id] = true;
    this.props.actions.updateUI({
      ...this.props.ui,
      trigger: trigger,
    });
  }

  /**
   * Handles the closing of the dialogs for this element, updates the
   * global state accordingly
   */
  handleClose = () => {
    const dialogs = [false, false, false];
    this.props.actions.updateAppState({
      ...this.props.appState,
      inputDialog: dialogs,
    });
  }

  /**
   * Maps the calling components id with the current appState to a style class
   *
   * @param {number} id the id of the components training step
   * @return {object} the style for the given id
   */
  getClass(id) {
    if (!this.props.ui.detail) {
      if (!this.props.ui.ready &&
          this.props.ui.trainingStep === (id + 1) ) {
        return this.props.classes.typoOv;
      } else {
        return this.props.classes.typoOvOff;
      }
    } else {
      if (this.props.ui.state[id]) {
        return this.props.classes.typoCv;
      } else {
        return this.props.classes.typoCvOff;
      }
    }
  }

  /**
   * React render function controlling the look of the
   * description panel of the Application
   *
   * @return {object} the react components rendered form
   */
  render() {
    const global = globalConstants[this.props.appState.language];
    return (
      <Grid item xs id='inppan'
        className={this.props.classes.smallPanelWrapper}>
        <Grid container style={{height: '100%'}} direcion='column'
          justifyContent='space-between' alignItems="center">
          {
            global.strings.trainSteps.map((step) => (
              <Grid item key={step.id} className={this.props.classes.fullWidth}>
                <Grid item>
                  <Typography align='left'>
                    <Link className = {this.getClass(step.id)}
                      href="#" onClick={(event) => this.onClick(step.id)}>
                      {step.title}
                    </Link>
                    <IconButton
                      size="small"
                      variant="outlined"
                      disabled ={this.props.ui.state[step.id]}
                      style={{marginLeft: '12px'}}
                      className={this.props.classes.button_cell}
                      onClick={(event) => this.onJump(step.id)}>
                      <Jump fontSize='small' style={{color: 'white'}}/>
                    </IconButton>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1"
                    className={this.props.classes.typoStd}
                    align='left'>
                    {step.description}
                  </Typography>
                </Grid>
                { step.id === 0 ?
                  <Grid item container spacing={3}
                    style={{marginTop: '-5px'}}>
                    {global.strings.lstmSteps.map((elementStep) => (
                      <DescriptionElement key={elementStep.id}
                        step={elementStep}/>
                    ))}
                  </Grid> : null
                }
                <ComplexDialog closeFunction={this.handleClose}
                  open={this.props.appState.inputDialog[step.id]}
                  title={step.title} description={step.longDescription}/>
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    );
  }
}

// Controls state of the Application
DescriptionPanel.propTypes = {
  training: PropTypes.object.isRequired,
  network: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
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
    withStyles(styles)(DescriptionPanel)
);
