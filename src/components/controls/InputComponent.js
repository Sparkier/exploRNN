import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem'
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
        color: grey[800]
    };

    sliderPaddingStyle = {
        width:"80%",
        paddingTop: "20px"
    };
    
    render() {
        return (
            <div id = "valueDiv" className = 'wrapper' style= {{background: grey[800]}}>
                
                <Grid container spacing={0} justify= "space-between" style={this.simplePaddingStyle}>
                    <Grid item xs={6} spacing={5} container justify="flex-start">
                        <Grid item xs={2}>
                            <StyledSelect value={this.props.network.type} type='net' label="Type" properties = {this.props} onChange={ this.handleTypeSelection }>
                                <MenuItem value="LSTM">LSTM</MenuItem>
                                <MenuItem value="GRU">GRU</MenuItem>
                            </StyledSelect>
                        </Grid>
                        <Grid item xs={2}>
                            <StyledSelect value={this.props.network.layers} type='net' label="Block Layers" properties = {this.props} onChange={ this.handleLayerCountSelection }>
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                                <MenuItem value="5">5</MenuItem>
                                <MenuItem value="6">6</MenuItem>
                                <MenuItem value="7">7</MenuItem>
                            </StyledSelect>
                        </Grid>
                        <Grid item xs={2}>
                            <StyledSelect value={this.props.network.layerSize} type='net' label="Cells per Block" properties = {this.props} onChange={ this.handleSelectionChange }>
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="5">5</MenuItem>
                                <MenuItem value="10">10</MenuItem>
                            </StyledSelect>
                        </Grid>
                        <Grid item xs={2}>
                            <StyledSelect value={this.props.training.dataType} type='net' label="Data Type" properties = {this.props} onChange={ this.handleDataSelection }>
                                <MenuItem value="sin">sin(x)</MenuItem>
                                <MenuItem value="saw">Sawtooth</MenuItem>
                                <MenuItem value="sqr">Square</MenuItem>
                                <MenuItem value="sinc">sinc(x % 4)</MenuItem>
                            </StyledSelect>
                        </Grid>
                        <Grid item xs={2}>
                            <StyledSelect value={this.props.training.dataVariant} type='net' label="Input Variation" properties = {this.props} onChange={ this.handleDataVariantSelection }>
                                <MenuItem value="basic">None</MenuItem>
                                <MenuItem value="linear">Linear</MenuItem>
                                <MenuItem value="linear-noise">Noise Linear</MenuItem>
                                <MenuItem value="random">Random</MenuItem>
                                <MenuItem value="random-noise">Noise Random</MenuItem>
                            </StyledSelect>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} spacing={5} container justify="flex-start">
                        <Grid item xs={2}>
                            <StyledSelect value={this.props.network.type} type='detail' label="Type" properties = {this.props} onChange={ this.handleTypeSelection }>
                                <MenuItem value="LSTM">LSTM</MenuItem>
                                <MenuItem value="GRU">GRU</MenuItem>
                            </StyledSelect>
                        </Grid>
                    </Grid>
                    
                </Grid>
                <Grid container spacing={0} justify= "space-between" style={this.simplePaddingStyle}>

                <Grid item xs={6} container justify="flex-start">
                        <Grid item xs={6}>
                            <Typography variant="body1" style={{...this.sliderPaddingStyle, color: !this.props.ui.detail ? lightBlue[400] : grey[500],}}>
                                Learning Rate: {this.props.network.learningRate}
                            </Typography>
                            <Slider
                                style={{...this.sliderPaddingStyle, color: 'white'}}
                                marks
                                disabled= {this.props.ui.detail}
                                defaultValue={this.props.network.learningRate}
                                valueLabelDisplay="off"
                                step={0.01}
                                min={0.01}
                                max={0.5} onChange={this.handleSliderChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" style={{...this.sliderPaddingStyle,color: !this.props.ui.detail ? lightBlue[400] : grey[500],}}>
                                Speed
                            </Typography>
                            <Slider
                                style={{...this.sliderPaddingStyle, color: 'white'}}
                                marks
                                disabled= {this.props.ui.detail}
                                defaultValue={this.props.training.speed}
                                valueLabelDisplay="off"
                                step={10}
                                min={100}
                                max={1000}
                                onChange={this.handleSpeedChange}
                            />
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={6} spacing={5} container justify="flex-start">
                        <Grid item xs={6}>
                            <Typography variant="body1" style={{...this.sliderPaddingStyle,color: !this.props.ui.detail ? grey[400] : orange[500],}}>
                                Speed
                            </Typography>
                            <Slider
                                style={{...this.sliderPaddingStyle, color: 'white'}}
                                marks
                                disabled= {!this.props.ui.detail}
                                defaultValue={this.props.training.speed}
                                valueLabelDisplay="off"
                                step={10}
                                min={100}
                                max={1000}
                                onChange={this.handleSpeedChange}
                            />
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
  