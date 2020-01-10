import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import {Grid, Paper} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../../styles/themedStyles';

/**
 * Controls at bottom of the Application
 */
class DescriptionPanel extends React.Component {
  /**
   * The constructor function fo the DescriptionPanel class
   */
  constructor() {
    super();
    this.titles = ['Wait for next Input', 'Layer Input',
      'Gate Activation', 'Cell Update', 'Cell State', 'Output'];
    this.descriptions = ['Zelle wartet auf nächsten Input',
      'Der Output aus der Ebene vor dieser Ebene wird mit dem Output dieser ' +
        'Ebene aus dem letzten Zeitschritt vereint und weiter geleitet',
      'Im Input Gate wird berechnet welche Werte aus dem Input neu in den ' +
        'Zell Zustand mit aufgenommen werden sollen. Das forget Gate ' +
        'bestimmt während dessen welche Werte aus dem alten Zell Zustand ' +
        'nun überflüssig geworden sind',
      'Die Ergebnisse aus Input und Forget Gate werden vereint um ein Update' +
        ' für den Zell Zustand zu ermitteln',
      'Der Zell Zustand wird mit dem Update angepasst und weiter geleitet',
      'Das Output Gate bestimmt welche Informationen aus dem Zell Zustand ' +
        'an die nächste Ebene weiter gegeben werden sollen. Diese Ausgabe ' +
        'wird dann auch wieder in die aktuelle Ebene eingespeißt',
    ];
    this.titleSize = 20;
    this.descSize = 14;
  }

  /**
   * Readt render function controlling the look of the
   * AppBar of the Application
   *
   * @return {object} the react components rendered look
   */
  render() {
    return (
      <Grid id="dscpan" container item xs={4} justify='center'>
        <Paper className={this.props.classes.panelCv}>
          <Grid container item justify='center' alignItems='top'
            style={{margin: '10px'}}
          >
            <Grid item xs={12}>
              <Typography className={this.props.classes.typoCv} align='left'>
                {this.titles[this.props.ui.lstmStep]}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                className={this.props.classes.typoStd} align='left'>
                {this.props.ui.anim ? '[pause for description]' :
                    this.descriptions[this.props.ui.lstmStep]}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item justify='center' alignItems='top'
            style={{margin: '10px'}}
          >
            <Grid item xs={12}>
              <Typography className={this.props.classes.typoCv} align='left'>
                {this.titles[this.props.ui.lstmStep]}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                className={this.props.classes.typoStd} align='left'>
                {this.props.ui.anim ? '[pause for description]' :
                    this.descriptions[this.props.ui.lstmStep]}
              </Typography>
            </Grid>
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
    withStyles(styles)(DescriptionPanel)
);
