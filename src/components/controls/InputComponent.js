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

import * as actions from '../../actions';

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

    simplePaddingStyle = {
        paddingTop: "20px",
        paddingBottom: "20px",
        width: "40%"
    };
    
    render() {
       
        const background = grey[700];
        return (
          <div className='wrapper' style={{background: background, color: 'white', padding: '20px'}}>
                <StyledSelect value={this.props.network.type} label="Type" onChange={ this.handleTypeSelection }>
                    <MenuItem value="LSTM">LSTM</MenuItem>
                    <MenuItem value="GRU">GRU</MenuItem>
                </StyledSelect>
                <StyledSelect value={this.props.network.layers} label="Layers" onChange={ this.handleLayerCountSelection }>
                    <MenuItem value="1">One</MenuItem>
                    <MenuItem value="2">Two</MenuItem>
                    <MenuItem value="3">Three</MenuItem>
                </StyledSelect>
                <StyledSelect value={this.props.network.layerSize} label="Layer Width" onChange={ this.handleSelectionChange }>
                    <MenuItem value="1">One</MenuItem>
                    <MenuItem value="2">Two</MenuItem>
                    <MenuItem value="5">Five</MenuItem>
                </StyledSelect>
                <StyledSelect value={this.props.network.activation} label="Activation" onChange={ this.handleActivationSelection }>
                    <MenuItem value="tanh">tanh</MenuItem>
                </StyledSelect>
                <Typography variant="body1" style={{...this.simplePaddingStyle, color: 'lightblue'}}>
                    Learning Rate: {this.props.network.learningRate}
                </Typography>
                <Slider
                    style={{...this.simplePaddingStyle, color: 'white'}}
                    marks
                    defaultValue={this.props.network.learningRate}
                    valueLabelDisplay="off"
                    step={0.01}
                    min={0.01}
                    max={0.5} onChange={this.handleSliderChange}
                />
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
            borderColor: 'white',
        },
        '&:hover': {
            borderColor: 'lightblue',
        },
        '&:after': {
            borderColor: 'blue',
        },
        width: "200px",
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
                color: 'lightblue'
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
    network: PropTypes.object.isRequired
  };
  
  // Mapping the Controls state to the Props of this Class
  function mapStateToProps(state, ownProps) {
    return {
        network: state.network
    };
  }
  
  // Map the Actions called when Controls are used to the Props of this Class  
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Input);
  