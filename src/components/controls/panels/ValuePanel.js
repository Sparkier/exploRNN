import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import {Grid, Paper} from '@material-ui/core';
import {orange, grey} from '@material-ui/core/colors';
import {Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MyButton from './StyledButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SendIcon from '@material-ui/icons/Send';
import Box from '@material-ui/core/Box';

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
      <Grid id="valpan" container item
        xs={4}
        justify='center'>
        <Paper style={{...this.myPadding, width: '80%'}}>
          <Grid container item justify='center' alignItems='center'>
            <Grid item container style={{height: '80%', paddingTop: '10px'}}
              justify = 'space-between' alignItems='center'>
              <Grid item xs = {2}>
                <MyButton properties={this.props}
                  disabled = {true}
                  action={this.toggleTraining}
                  icon={
                    <AddIcon fontSize='small' style={{color: 'white'}} />
                  }
                />
              </Grid>
              <Grid item xs = {3}>
                <Typography
                  style={{
                    color: orange[500],
                  }} align='left'>
                  <Box fontWeight='fontWeightBold'
                    fontSize={this.titleSize} m={1}>
                    Layer Input
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs = {3}>
                <Typography
                  style={{
                    color: this.props.ui.lstmStep === 1 ?
                      orange[500] : grey[500],
                  }} align='center'>
                  <Box fontWeight='fontWeightRegular'
                    fontSize={this.valueSize} m={1}>
                    y_(j-1)(t)
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs = {3}>
                <Typography
                  style={{
                    color: this.props.ui.lstmStep < 2 ?
                      orange[500] : grey[500],
                  }} align='center'>
                  <Box fontWeight='fontWeightRegular'
                    fontSize={this.valueSize} m={1}>
                    y_j(t-1)
                  </Box>
                </Typography>
              </Grid>
            </Grid>
            <Grid item container style={{paddingTop: '10px'}}
              justify = 'space-between' alignItems='center'>
              <Grid item xs = {2}>
                <MyButton properties={this.props}
                  disabled = {true}
                  action={this.toggleTraining}
                  icon={<DeleteForeverIcon fontSize='small'
                    style={{color: 'white'}} />
                  }
                />
              </Grid>
              <Grid item xs = {3}>
                <Typography
                  style={{
                    color: orange[500],
                  }} align='left'>
                  <Box fontWeight='fontWeightBold'
                    fontSize={this.titleSize} m={1}>
                    Forget Gate
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs = {3}>
                <Typography
                  style={{
                    color: this.props.ui.lstmStep < 3 ||
                    this.props.ui.lstmStep === 5 ?
                    orange[500] : grey[500],
                  }} align='center'>
                  <Box fontWeight='fontWeightRegular'
                    fontSize={this.valueSize} m={1}>
                    c_(j)(t-1)
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs = {3}>
                <Typography
                  style={{
                    color: this.props.ui.lstmStep === 2 ?
                    orange[500] : grey[500],
                  }} align='center'>
                  <Box fontWeight='fontWeightRegular'
                    fontSize={this.valueSize} m={1}>
                    lin_j(t)
                  </Box>
                </Typography>
              </Grid>
            </Grid>
            <Grid item container style={{paddingTop: '10px'}}
              justify = 'space-between' alignItems='center'>
              <Grid item xs = {2}>
                <MyButton properties={this.props}
                  disabled = {true}
                  action={this.toggleTraining}
                  icon={<AddIcon fontSize='small' style={{color: 'white'}} />
                  }
                />
              </Grid>
              <Grid item xs = {3}>
                <Typography
                  style={{
                    color: orange[500],
                  }} align='left'>
                  <Box fontWeight='fontWeightBold'
                    fontSize={this.titleSize} m={1}>
                    Cell Update
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs = {3}>
                <Typography
                  style={{
                    color: this.props.ui.lstmStep === 3 ?
                      orange[500] : grey[500],
                  }} align='center'>
                  <Box fontWeight='fontWeightRegular'
                    fontSize={this.valueSize} m={1}>
                    in_j(t)
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs = {3}>
                <Typography
                  style={{
                    color: this.props.ui.lstmStep === 3 ?
                      orange[500] : grey[500],
                  }} align='center'>
                  <Box fontWeight='fontWeightRegular'
                    fontSize={this.valueSize} m={1}>
                    f_j(t)
                  </Box>
                </Typography>
              </Grid>
            </Grid>
            <Grid item container style={{paddingTop: '10px'}}
              justify = 'space-between' alignItems='center'>
              <Grid item xs = {2}>
                <MyButton properties={this.props}
                  disabled = {true}
                  action={this.toggleTraining}
                  icon={<SendIcon fontSize='small' style={{color: 'white'}} />
                  }
                />
              </Grid>
              <Grid item xs = {3}>
                <Typography
                  style={{
                    color: orange[500],
                  }} align='left'>
                  <Box fontWeight='fontWeightBold'
                    fontSize={this.titleSize} m={1}>
                    Output Gate
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs = {3}>
                <Typography
                  style={{
                    color: this.props.ui.lstmStep === 5 ?
                      orange[500] : grey[500],
                  }} align='center'>
                  <Box fontWeight='fontWeightRegular'
                    fontSize={this.valueSize} m={1}>
                    c_j(t)
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs = {3}>
                <Typography
                  style={{
                    color: this.props.ui.lstmStep > 1 ?
                      orange[500] : grey[500],
                  }} align='center'>
                  <Box fontWeight='fontWeightRegular'
                    fontSize={this.valueSize} m={1}>
                    in_j(t)
                  </Box>
                </Typography>
              </Grid>
            </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(ValuePanel);
