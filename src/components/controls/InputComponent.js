import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import { Typography } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core';

import * as actions from '../../actions';
import { lightBlue } from '@material-ui/core/colors';

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
                
                <Grid container spacing={5} direction="column" style={this.simplePaddingStyle}>
                    <Grid item xs={7} container justify="flex-start">
                        <Grid item xs={2}>
                            <StyledSelect value={this.props.network.type} label="Type" onChange={ this.handleTypeSelection }>
                                <MenuItem value="LSTM">LSTM</MenuItem>
                                <MenuItem value="GRU">GRU</MenuItem>
                            </StyledSelect>
                        </Grid>
                        <Grid item xs={2}>
                            <StyledSelect value={this.props.network.layers} label="Block Layers" onChange={ this.handleLayerCountSelection }>
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
                            <StyledSelect value={this.props.network.activation} label="Activation" onChange={ this.handleActivationSelection }>
                                <MenuItem value="tanh">tanh</MenuItem>
                            </StyledSelect>
                        </Grid>
                        <Grid item xs={2}>
                            <StyledSelect value={this.props.training.dataType} label="Data Type" onChange={ this.handleDataSelection }>
                                <MenuItem value="sin">sin(x)</MenuItem>
                                <MenuItem value="cir">Circle</MenuItem>
                            </StyledSelect>
                        </Grid>
                        <Grid item xs={2}>
                            <StyledSelect value={this.props.training.dataVariant} label="Input Variation" onChange={ this.handleDataVariantSelection }>
                                <MenuItem value="basic">None</MenuItem>
                                <MenuItem value="linear">Linear</MenuItem>
                                <MenuItem value="random">Random</MenuItem>
                            </StyledSelect>
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={12} container justify="center">
                        <Grid item xs={6}>
                            <Typography variant="body1" style={{...this.sliderPaddingStyle, color: lightBlue[400],}}>
                                Learning Rate: {this.props.network.learningRate}
                            </Typography>
                            <Slider
                                style={{...this.sliderPaddingStyle, color: 'white'}}
                                marks
                                defaultValue={this.props.network.learningRate}
                                valueLabelDisplay="off"
                                step={0.01}
                                min={0.01}
                                max={0.5} onChange={this.handleSliderChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" style={{...this.sliderPaddingStyle, color: lightBlue[400],}}>
                                Speed
                            </Typography>
                            <Slider
                                style={{...this.sliderPaddingStyle, color: 'white'}}
                                marks
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
    select: {
        '&:before': {
            borderColor: grey[400],
        },
        '&:after': {
            borderColor: lightBlue[400],
        },
        width: "150px",
        color:'white'
    },
    icon: {
        fill: 'white',
    },
  };
  
  function StyledSelectRaw(props) {
    const { classes, color, label, ...other } = props;
    return (
        <div style={{display: 'inline-block', marginRight: '12px'}}>
        <Typography style= {
            {
                color: lightBlue[400],
            }
        }>{ label }</Typography>
        <Select variant="outlined" className={classes.select} inputProps={{
            classes: {
                icon: classes.icon,
            },
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
    training: PropTypes.object.isRequired
  };
  
  // Mapping the Controls state to the Props of this Class
  function mapStateToProps(state, ownProps) {
    return {
        network: state.network,
        training: state.training
    };
  }
  
  // Map the Actions called when Controls are used to the Props of this Class  
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Input);
  