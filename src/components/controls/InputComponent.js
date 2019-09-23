import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import { Typography } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/lightBlue';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

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

    simplePaddingStyle = {
        paddingTop: "20px",
        paddingBottom: "20px",
        width: "50%"
    };
    
    render() {
        const background = grey[700]; // #F44336
        const slider = blue[600]; // #F44336    
        return (
            <div style={{background: background, color: 'white'}}>
                <TextField
                    select
                    label={
                        <div onClick={this.handleLabelClick}>Type</div>
                    }
                    style={{width:200}}
                    value={this.props.network.type}
                    onChange={this.handleTypeSelection}
                    SelectProps={{
                    MenuProps: {
                        width: 200
                    },
                    }}
                    margin="normal"
                >
                    <MenuItem value={'LSTM'}>LSTM</MenuItem>
                    <MenuItem value={'GRU'}>GRU</MenuItem>
                   
                </TextField>
                <TextField
                    select
                    label={
                        <div onClick={this.handleLabelClick}>Layer-Size</div>
                    }
                    style={{width:200}}
                    value={this.props.network.layerSize}
                    onChange={this.handleSelectionChange}
                    SelectProps={{
                    MenuProps: {
                        width: 200
                    },
                    }}
                    margin="normal"
                >
                    <MenuItem value={1}>One</MenuItem>
                    <MenuItem value={2}>Two</MenuItem>
                    <MenuItem value={5}>Five</MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                   
                </TextField>
                <Typography variant="body1" style={this.simplePaddingStyle}>
                    Learning Rate:
                </Typography>
                <Slider
                    style={{...this.simplePaddingStyle, color: 'white'}}
                    defaultValue={this.props.network.learningRate}
                    color="secondary"
                    valueLabelDisplay="auto"
                    step={0.01}
                    min={0.01}
                    max={0.5} onChange={this.handleSliderChange}
                />
            </div>
        );
    }
}

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
  