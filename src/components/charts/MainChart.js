import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as d3 from "d3";

import * as actions from '../../actions';

class P5Wrapper extends React.Component {

     updateValues = true;

    componentDidMount() {
        this.createChart();
    }

    createChart = () => {
                
        // 2. Use the margin convention practice 
        var margin = {top: 50, right: 50, bottom: 50, left: 50}
        , width = 500 - margin.left - margin.right // Use the window's width 
        , height = 500 - margin.top - margin.bottom; // Use the window's height

        // The number of datapoints
        var n = 21;

        // 5. X scale will use the index of our data
        var xScale = d3.scaleLinear()
        .domain([0, n-1]) // input
        .range([0, width]); // output

        // 6. Y scale will use the randomly generate number 
        var yScale = d3.scaleLinear()
        .domain([0, 1]) // input 
        .range([height, 0]); // output 

        // 7. d3's line generator
        var line = d3.line()
        .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
        .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX) // apply smoothing to the line

        // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
        var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })

        // 1. Add the SVG to the page and employ #2
        var svg = d3.select(".test").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        console.log(svg)

        // 3. Call the x axis in a group tag
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

        // 4. Call the y axis in a group tag
        svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

        // 9. Append the path, bind the data, and call the line generator 
        svg.append("path")
        .datum(dataset) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line); // 11. Calls the line generator 

    }

    shouldComponentUpdate(nextProps) {
        if(this.props.prediction !== nextProps.prediction)
            // do something
            ;
        return false
    }

    componentWillUnmount() {
    }
  
  render() {
    return(
        <div id = "chart" className="test"/>
    );
  }
}

P5Wrapper.propTypes = {
  prediction: PropTypes.array.isRequired,
  iteration: PropTypes.number.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    prediction: state.prediction,
    iteration: state.iteration
  };
}

// Mapping the Actions called for SVG manipulation to the Props of this Class
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(P5Wrapper);