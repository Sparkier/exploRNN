import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Paper, Typography, Link} from '@material-ui/core';
import {Dialog, DialogTitle, DialogContent} from '@material-ui/core';
import * as actions from '../../../actions';
import styles from '../../../styles/themedStyles';
import globalConstants from '../../constants/global';

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
   *
   * @param {*} id
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
   *
   * @param {*} id
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
   *
   * @param {*} id
   */
  handleClose() {
    const dialogs = [false, false, false];
    this.props.actions.updateAppState({
      ...this.props.appState,
      inputDialog: dialogs,
    });
  }

  /**
   * @param {number} id
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
   * Readt render function controlling the look of the
   * AppBar of the Application
   *
   * @return {object} the react components rendered look
   */
  render() {
    const global = globalConstants[this.props.appState.language];
    return (
      <Grid id="inppan" container item xs={4} justify='center'>
        <Paper className={this.props.ui.detail ?
          this.props.classes.panelCv : this.props.classes.panelOv} >
          <Grid container style={{height: '100%'}}xs={12}>
            {
              global.strings.trainSteps.map((step) => (
                <Grid item xs={12} key={step.id} style={{margin: '10px'}}>
                  <Grid item>
                    <Typography align='left'>
                      <Link className = {this.getClass(step.id)}
                        href="#" onClick={(event) => this.onClick(step.id)}
                      >
                        {step.title}
                      </Link>
                      {this.props.ui.detail ?
                        <Link className={this.props.classes.typoCv}
                          href={'#'} onClick={(event) => this.onJump(step.id)}
                          style={{marginLeft: '12px'}}>
                            [JUMP]
                        </Link> :
                        null
                      }
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1"
                      className={this.props.classes.typoStd}
                      align='left'
                    >
                      {step.description}
                    </Typography>
                  </Grid>
                  <Dialog onClose={() => this.handleClose()}
                    open={this.props.appState.inputDialog[step.id]}>
                    <DialogTitle>
                      {step.title}
                    </DialogTitle>
                    <DialogContent dividers>
                      <Typography gutterBottom>
                        {step.longDescription}
                      </Typography>
                    </DialogContent>
                  </Dialog>
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
  appState: PropTypes.object.isRequired,
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
    withStyles(styles)(InputPanel)
);
