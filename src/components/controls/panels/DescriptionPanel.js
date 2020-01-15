import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Paper, Typography} from '@material-ui/core';
import * as actions from '../../../actions';
import styles from '../../../styles/themedStyles';
import globalConstants from '../../constants/global';

/**
 * Controls at bottom of the Application
 */
class DescriptionPanel extends React.Component {
  /**
   * React render function controlling the look of the
   * AppBar of the Application
   *
   * @return {object} the react components rendered look
   */
  render() {
    const global = globalConstants[this.props.appState.language];
    return (
      <Grid id="dscpan" container item xs={4} justify='center'>
        <Paper className={this.props.classes.panelCv}>
          <Grid container xs={12} style={{height: '100%'}}>
            {
              global.strings.lstmSteps.map((step) => (
                <Grid container item alignContent='flex-start' xs={5}
                  key={step.id} style={{margin: '10px'}}
                >
                  <Grid item xs={12}>
                    <Typography variant="body1"
                      className = {step.id === this.props.ui.lstmStep ?
                      this.props.classes.typoCv : this.props.classes.typoCvOff}
                      align='left'
                    >
                      {step.id + ': ' + step.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1"
                      className={this.props.classes.typoStd}
                      align='left'
                    >
                      {step.description}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            }
          </Grid>
        </Paper>
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
};

/**
 * Mapping the Controls state to the Props of this Class
 *
 * @param {object} state ...
 * @return {object} ...
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
 * Map the Actions called when Controls are used to the Props of this Class
 *
 * @param {object} dispatch ...
 * @return {object} ...
 */
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(DescriptionPanel)
);
