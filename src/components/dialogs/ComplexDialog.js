import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Dialog, DialogTitle, DialogContent, Grid} from '@material-ui/core';

import DescriptionElement from './elements/DescriptionElement';

/**
 * ComplexDialog is used to explain components of the App.
 */
class ComplexDialog extends React.Component {
  /**
   * Renders the Onboarding Screen inside the App.
   *
   * @return {object} AlertSnack component to be rendered
   */
  render() {
    return (
      <Dialog onClose={this.props.closeFunction} open={this.props.open}>
        <DialogTitle>
          {this.props.title}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container directiton='column' spacing={2}>
            {
              this.props.description.map((descriptionElement, index) => (
                <DescriptionElement key={index}
                  descriptionElement={descriptionElement} />
              ))
            }
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}

// Prop Types holding all the Preferences
ComplexDialog.propTypes = {
  ui: PropTypes.object.isRequired,
  closeFunction: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.array.isRequired,
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

export default connect(mapStateToProps)(ComplexDialog);
