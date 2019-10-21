import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
//import Slider from '@material-ui/core/Slider';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
//import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core';

import * as actions from '../../actions';
import { lightBlue, grey, orange} from '@material-ui/core/colors';
/**
 * The current Component holding all the input elements to change the Network for Training
 */
class Input extends React.Component {

    handleSelectionChange = (event) => {
        this.props.actions.updateNetwork({...this.props.network, layerSize: Number(event.target.value)});
    }

    handleSliderChange = (event, value) => {
        this.props.actions.updateNetwork({...this.props.network, learningRate: value});
    }

    handleLabelClick = (event) => {
        console.log('click')
    }

    handleTypeSelection = (event) => {
        console.log('click', event)
        this.props.actions.updateNetwork({...this.props.network, type: String(event.target.value)});
    }

    handleLayerCountSelection = (event) => {
        this.props.actions.updateNetwork({...this.props.network, layers: Number(event.target.value)});
    }

    handleActivationSelection = (event) => {

    }

    handleDataSelection = (event) => {
        this.props.actions.updateTraining({...this.props.training, dataType: String(event.target.value)});
    }

    handleDataVariantSelection = (event) => {
        this.props.actions.updateTraining({...this.props.training, dataVariant: String(event.target.value)});
    }

    handleSpeedChange = (event, value) => {
        this.props.actions.updateTraining({...this.props.training, speed: value});
    }
    

    simplePaddingStyle = {
        paddingTop: "20px",
        paddingLeft: "40px",
        paddingRight: "40px",
        paddingBottom: "20px",
        background: "#FFFFFF"
    };

    myPadding = {
        paddingTop: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingBottom: "20px",
        background: grey[400]
    };

    sliderPaddingStyle = {
        width:"80%",
        paddingTop: "20px"
    };
    
    render() {
        return (
            <div id = "valueDiv">
                <Grid container xs={12} spacing={3} noWrap style={this.simplePaddingStyle}>
                    <Grid container item xs={4} justify='center'>
                        <Grid item xs = {3}>
                            <Typography>Left</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={4} style={{...this.myPadding, width:"80%"}}>
                        <Grid container xs={12} justify='center'>
                            <Grid item style={this.myPadding}>
                                <Typography>One</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} justify='center'>
                            <Grid item style={this.myPadding}>
                                <Typography>Two</Typography>  
                            </Grid>                      
                        </Grid>
                        <Grid container item xs={12} justify='center'>
                            <Grid item style={this.myPadding}>
                                <Typography>Three</Typography>  
                            </Grid>                      
                        </Grid>
                        <Grid container item xs={12} justify='center'>
                            <Grid item style={this.myPadding}>
                                
                            </Grid>                      
                        </Grid>
                    </Grid>
                    <Grid container item xs={4} justify='center'>
                        <Grid item xs = {3}>
                            <Typography>Right</Typography>
                        </Grid>              
                    </Grid>
                </Grid>
            </div>
        );
    }
}
const styles = {
    root: {
      border: 1,
      borderRadius: 3,
      color: 'white',
    },
    select_net: {
        '&:before': {
            borderColor: grey[500],
        },
        '&:after': {
            borderColor: lightBlue[500],
        },
        width: "150px",
        color:'white'
    },select_detail: {
        '&:before': {
            borderColor: grey[500],
        },
        '&:after': {
            borderColor: orange[500],
        },
        width: "150px",
        color:'white'
    },
    disabled: {
        '&:before': {
            borderColor: grey[100],
        },
        '&:after': {
            borderColor: grey[100],
        },
        width: "150px",
        color:'white'
    },
    icon: {
        fill: 'white',
    },
  };
  
  function StyledSelectRaw(props) {
    const { classes, color, label, properties, type, ...other } = props;
    return (
        <div style={{display: 'inline-block', marginRight: '12px'}}>
        <Typography style= {
            {
                color: !properties.ui.detail ? (type === 'net' ? lightBlue[500] : grey[500]) : (type === 'net' ? grey[500] : orange[500]),
            }
        }>{ label }</Typography>
        <Select variant="outlined" className={
            properties.ui.detail ? 
                (type === 'net' ? classes.disabled : classes.select_detail) 
                : 
                (type === 'net' ? classes.select_net : classes.disabled) }
            inputProps={{
            classes: {
                icon: classes.icon
            },
            disabled: properties.ui.detail === (type === 'net'),
            color: 'white'
        }} {...other} />
        </div>
    );
  }
  
  StyledSelectRaw.propTypes = {
    /**
     * Override or extend the styles applied to the component.
     */
    classes: PropTypes.object.isRequired,
  };
  
  const StyledSelect = withStyles(styles)(StyledSelectRaw);

// Controls state of the Application
Input.propTypes = {
    network: PropTypes.object.isRequired,
    training: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
  };
  
  // Mapping the Controls state to the Props of this Class
  function mapStateToProps(state, ownProps) {
    return {
        network: state.network,
        training: state.training,
        ui: state.ui,
    };
  }
  
  // Map the Actions called when Controls are used to the Props of this Class  
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Input);
  