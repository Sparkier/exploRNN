import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Node, Context} from 'react-mathjax2';

/**
 * ComplexDialog is used to explain components of the App.
 */
class DescriptionItem extends React.Component {
  /**
   * Renders the Onboarding Screen inside the App.
   *
   * @return {object} AlertSnack component to be rendered
   */
  render() {
    return (
      <Context input='tex'>
        <span>
          {
            this.props.formulas.map((formula) => (
              <Node key={formula}>
                {formula}
              </Node>
            ))
          }
        </span>
      </Context>
    );
  }
}

// Prop Types holding all the Preferences
DescriptionItem.propTypes = {
  ui: PropTypes.object.isRequired,
  formulas: PropTypes.array.isRequired,
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

export default connect(mapStateToProps)(DescriptionItem);
