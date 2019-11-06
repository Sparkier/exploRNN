import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import {Grid, Paper} from '@material-ui/core';
import {orange, grey} from '@material-ui/core/colors';
import {Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';

/**
 * Controls at bottom of the Application
 */
class DescriptionPanel extends React.Component {
  /**
   * The constructor function fo the DescriptionPanel class
   */
  constructor() {
    super();
    this.titles = ['0 - Wait for next Input', '1 - Layer Input',
      '2 - Gate Activation', '3 - Cell Update', '4 - Cell State', '5 - Output'];
    this.descriptions = ['Zelle wartet auf nächsten Input', 'Der Output aus ' +
      'der Ebene vor dieser Ebene wird mit dem Output dieser Ebene aus dem ' +
      'letzten Zeitschritt vereint und weiter geleitet', 'Im Input Gate wird' +
      ' berechnet welche Werte aus dem Input neu in den Zell Zustand mit' +
      ' aufgenommen werden sollen. Das forget Gate bestimmt während dessen ' +
      'welche Werte aus dem alten Zell Zustand nun überflüssig geworden sind',
      'Die Ergebnisse aus Input und Forget Gate werden vereint um ein Update' +
      ' für den Zell Zustand zu ermitteln', 'Der Zell Zustand wird mit dem' +
      ' Update angepasst und weiter geleitet', 'Das Output Gate bestimmt ' +
      'welche Informationen aus dem Zell Zustand an die nächste Ebene weiter '+
      'gegeben werden sollen. Diese Ausgabe wird dann auch wieder in '+
      'die aktuelle Ebene eingespeißt'];
      this.titleSize = 20;
      this.descSize = 14;
  }
  // Some styles for better looks, TODO: clean up
  simplePaddingStyle = {
    width: '90%',
    background: '#FFFFFF',
  };

  myPadding = {
    paddingTop: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '20px',
    background: grey[800],
  };

  mySecondPadding = {
    background: grey[100],
  };

  buttonPadding = {
    paddingTop: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '10px',
  }

  sliderPaddingStyle = {
    ...this.buttonPadding,
    width: '80%',
  };

  /**
   * Readt render function controlling the look of the
   * AppBar of the Application
   *
   * @return {object} the react components rendered look
   */
  render() {
    return (
      <Grid container item
        xs={4}
        justify='center'>
        <Paper style={{...this.myPadding, height: '100%', width: '80%'}}>
          <Grid container item justify='center' alignItems='top'>
            <Grid item xs={12}>
              <Typography
                style={{
                  color: orange[500],
                }} align='left'>
                <Box fontWeight='fontWeightBold'
                  fontSize={this.titleSize} m={1}>
                  {this.titles[this.props.ui.lstmStep]}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                style={{
                  color: 'white',
                  paddingLeft: '10px',
                }} align='left'>
                <Box fontWeight='fontWeightRegular'
                  fontSize={this.descSize} m={1}>
                  {this.descriptions[this.props.ui.lstmStep]}
                </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionPanel);
