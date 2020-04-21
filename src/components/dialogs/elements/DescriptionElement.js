import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Grid} from '@material-ui/core';

import DescriptionItem from './DescriptionItem';
import FormulaItem from './FormulaItem';

/**
 * ComplexDialog is used to explain components of the App.
 */
class DescriptionElement extends React.Component {
  /**
   * Renders the Onboarding Screen inside the App.
   *
   * @return {object} AlertSnack component to be rendered
   */
  render() {
    return (
      <Grid item style={{width: '100%'}}>
        {
          this.props.descriptionElement.map((descriptionItem, index) => (
            descriptionItem.type !== 'formulas' ?
              <DescriptionItem key={index} descriptionItem={descriptionItem}/> :
              <FormulaItem key={index} formulas={descriptionItem.formulas}/>
          ))
        }
      </Grid>
    );
  }
}

// Prop Types holding all the Preferences
DescriptionElement.propTypes = {
  ui: PropTypes.object.isRequired,
  descriptionElement: PropTypes.array.isRequired,
};

/**
 * Map the State to the Properties of this Component
 *
 * @param {object} state the state that is to be mapped to this component
 * @param {object} _ the props of this component
 * @return {object} the props that this component holds
 */
function mapStateToProps(state, _) {
  return {
    ui: state.ui,
  };
}

export default connect(mapStateToProps)(DescriptionElement);
