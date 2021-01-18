import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {MathComponent} from 'mathjax-react';

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
      <span>
        {
          this.props.formulas.map((formula) => (
            <MathComponent key={formula} tex={formula} />
          ))
        }
      </span>
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
