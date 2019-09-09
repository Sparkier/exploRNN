import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as d3 from "d3";

import * as actions from '../../actions';

class MainChart extends React.Component {

     updateValues = true;

    chartWidth = 600
    chartHeight = 400

    mem = [];
    sin = [];
    err = [];

    timeSteps = 20;
    memorySize = 200;

    componentDidMount() {
        this.createChart();
    }

    
    createChart = () => {
                
      // 2. Use the margin convention practice 
      var margin = {top: 50, right: 50, bottom: 50, left: 50}
      , width = this.chartWidth - margin.left - margin.right // Use the window's width 
      , height = this.chartHeight - margin.top - margin.bottom; // Use the window's height

      var xmin = -(this.memorySize * 0.1) + ((this.props.network.iteration + this.timeSteps) * 0.1)
      var xmax = ((this.props.network.iteration + this.timeSteps)* 0.1)

      // 5. X scale will use the index of our data
      var xScale = d3.scaleLinear()
      .domain([xmin, xmax]) // input
      .range([0, width]); // output

      // 6. Y scale will use the randomly generate number 
      var yScale = d3.scaleLinear()
      .domain([-1.5,1.5]) // input 
      .range([height, 0]); // output 

      // 1. Add the SVG to the page and employ #2
      this.svg = d3.select(".test").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // 3. Call the x axis in a group tag
      this.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height/2 + ")")
      .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

      // 4. Call the y axis in a group tag
      this.svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate("+(width) + ", 0)")
      .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft
  }

      
  updateMemory = () => {
    if(this.props.network.iteration === 1) {
      this.mem = [];
      this.err = [];
      this.sin = [];
    }
    this.xVal = (this.props.network.iteration + this.timeSteps) * 0.1;
    this.mem.push(
      {
        "x": this.xVal,
        "y": this.props.network.prediction[0] ? this.props.network.prediction[0] : 0
      }
    );
    this.sin.push(
      {
        "x": this.xVal,
        "y": Math.sin(this.xVal)
      });
    this.err.push( 
      {
        "x": this.xVal,
        "y": this.props.network.prediction[0] ? (this.props.network.prediction[0] - Math.sin(this.xVal)) : 0
      }
    );
    if(this.mem.length > this.memorySize) {
      this.mem = this.mem.splice(1);
    }
    if(this.sin.length > this.memorySize) {
      this.sin = this.sin.splice(1);
    }
    if(this.err.length > this.memorySize) {
      this.err = this.err.splice(1);
    }
  }

  updateChart() {
      
    // 2. Use the margin convention practice 
    var margin = {top: 50, right: 50, bottom: 50, left: 50}
    , width = this.chartWidth - margin.left - margin.right // Use the window's width 
    , height = this.chartHeight - margin.top - margin.bottom; // Use the window's height

    var xmin = -(this.memorySize * 0.1) + ((this.props.network.iteration + this.timeSteps) * 0.1)
    var xmax = ((this.props.network.iteration + this.timeSteps)* 0.1)

    // 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
    .domain([xmin, xmax]) // input
    .range([0, width]); // output

    // 6. Y scale will use the randomly generate number 
    var yScale = d3.scaleLinear()
    .domain([-1.5,1.5]) // input 
    .range([height, 0]); // output 

    // 7. d3's line generator
    var line_mem = d3.line()
    .x(function(d, i) { return xScale(d.x); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

    // 7. d3's line generator
    var line_err = d3.line()
    .x(function(d, i) { return xScale(d.x); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

      // 7. d3's line generator
    var line_sin = d3.line()
    .x(function(d, i) { return xScale(d.x); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

    this.svg.selectAll("*").remove();

    // 3. Call the x axis in a group tag
    this.svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height/2 + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    this.svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate("+(width) + ", 0)")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the data, and call the line generator 
    this.svg.append("path")
    .datum(this.mem) // 10. Binds data to the line 
    .attr("class", "line") // Assign a class for styling 
    .attr("d", line_mem)
    .attr("fill", "none")
    .attr("stroke-width", "1")
    .attr("stroke", "blue"); // 11. Calls the line generator 

    
    // 9. Append the path, bind the data, and call the line generator 
    this.svg.append("path")
    .datum(this.sin) // 10. Binds data to the line 
    .attr("class", "line") // Assign a class for styling 
    .attr("d", line_sin)
    .attr("fill", "none")
    .attr("stroke-width", "1")
    .attr("stroke", "grey"); // 11. Calls the line generator 

    
    // 9. Append the path, bind the data, and call the line generator 
    this.svg.append("path")
    .datum(this.err) // 10. Binds data to the line 
    .attr("class", "line") // Assign a class for styling 
    .attr("d", line_err)
    .attr("fill", "none")
    .attr("stroke-width", "1")
    .attr("stroke", "red"); // 11. Calls the line generator 
  }

  shouldComponentUpdate(nextProps) {
      if(this.props.network.prediction !== nextProps.network.prediction){
        this.updateMemory();
        this.updateChart();
      }
      return true
  }

  componentWillUnmount() {
  }
  
  render() {
    return(
        <div id = "chart" className="test"/>
    );
  }
}

MainChart.propTypes = {
  network: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    network: state.network
  };
}

// Mapping the Actions called for SVG manipulation to the Props of this Class
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainChart);