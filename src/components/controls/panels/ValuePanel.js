import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import {Grid, Paper} from '@material-ui/core';
import {orange, grey} from '@material-ui/core/colors';
import {Typography, Link} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../../styles/themedStyles';
import globalConstants from '../../constants/global';

/**
 * Controls at bottom of the Application
 */
class ValuePanel extends React.Component {
  /**
   * The constructor function of the ValuePanel
   */
  constructor() {
    super();
    this.titleSize = 14;
    this.valueSize = 12;
  }

  test () {
    console.log(this.props.ui.error);
    if(this.props.ui.error) {
      this.props.actions.updateUI({...this.props.ui, error: false});
    } else {
      this.props.actions.updateUI({...this.props.ui, error: true});
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
      <Grid id="valpan" container item xs={4} justify='center'>
        <Paper className={this.props.classes.panelCv}>
          <Grid container item justify='center' alignItems='center'
            style={{height: '100%'}}
          >
           <Typography>
             <Link href={'#'} onClick={() => this.test()}>
                Error
             </Link>
           </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

// Controls state of the Application
ValuePanel.propTypes = {
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
    withStyles(styles)(ValuePanel)
);
