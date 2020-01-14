import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Paper, Typography} from '@material-ui/core';
import * as actions from '../../../actions';
import styles from '../../../styles/themedStyles';
import global from '../../constants/global';

/**
 * Controls at bottom of the Application
 */
class InputPanel extends React.Component {
  /**
   * the constructor
   */
  constructor() {
    super();
    this.fontSizeTitle = 16;
    this.fontSizeText = 14;
  }

  /**
   *
   */
  componentDidMount() {
    const height = document.getElementById('inppan');
    if (this.props.ui.panelHeight < height) {
      this.props.actions.updateUI({...this.props.ui, panelHeight: height});
    }
  }

  /**
   * Readt render function controlling the look of the
   * AppBar of the Application
   *
   * @return {object} the react components rendered look
   */
  render() {
    return (
      <Grid id="inppan" container item xs={4} justify='center'>
        <Paper className={this.props.classes.panelOv} >
          <Grid container style={{height: '100%'}}xs={12}>
            {
              global.strings.trainSteps.map((step) => (
                <Grid item xs={12} key={step.id} style={{margin: '10px'}}>
                  <Typography variant="body1"
                    className = {!this.props.ui.detail &&
                    !this.props.ui.ready &&
                    this.props.ui.trainingStep === (step.id + 1) ?
                    this.props.classes.typoOv : this.props.classes.typoOvOff
                    }
                    align='left'
                  >
                    {step.title}
                  </Typography>
                  <Typography variant="body1"
                    className={this.props.classes.typoStd}
                    align='left'
                  >
                    {step.description}
                  </Typography>
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
InputPanel.propTypes = {
  training: PropTypes.object.isRequired,
  network: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
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
    withStyles(styles)(InputPanel)
);
