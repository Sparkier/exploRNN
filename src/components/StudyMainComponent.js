import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import * as browserStore from 'store';
import {withStyles} from '@material-ui/core/styles';

import * as actions from '../actions';
import styles from '../styles/themedStyles';
import Main from './MainComponent';


/**
 * Main component of the Application that displays all content dependant on the
 * Controls State.
 */
class StudyMain extends React.Component {
  /**
   * Once the component mounts, start the timer.
   */
  componentDidMount() {
    let time = browserStore.get('startTime');
    if (time === undefined) {
      const duration = 1000 * 60 * 60 * 4; // 4 hours
      const expiration = new Date().getTime() + duration;
      time = new Date().getTime();
      browserStore.set('startTime', time, expiration);
    }
    this.props.actions.updateCountdown(
        this.props.counter.countDownInitial -
        Math.floor((new Date().getTime() - time) / 1000));
  }

  /**
   *
   * @param {*} prevProps
   */
  componentDidUpdate(prevProps) {
    if (this.props.counter.countDown !== prevProps.counter.countDown) {
      if (this.props.counter.countDown > 0) {
        setTimeout(() => {
          const time = browserStore.get('startTime');
          if (time !== undefined) {
            this.props.actions.updateCountdown(
                this.props.counter.countDownInitial -
                Math.floor((new Date().getTime() - time) / 1000));
          }
        }, 1000);
      }
    }
  }

  /**
   * Render the PDF Content and call other Elements.
   *
   * @return {object} - the main component to be rendered.
   */
  render() {
    let content;
    if (this.props.counter.countDown > 0) {
      content = <Main></Main>;
    } else {
      content = <p>The study is over. Please go back to the survey tab.</p>;
    }
    return (
      <div className='full'>
        {content}
      </div>
    );
  }
}

StudyMain.propTypes = {
  counter: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};


/**
 * Map the states from redux to this property.
 *
 * @param {object} state - the global redux state.
 * @param {object} ownProps - the properties of this component.
 * @return {object} - the new props of this component.
 */
function mapStateToProps(state, ownProps) {
  return {
    counter: state.counter,
  };
}

/**
 * Maps the actions to this property.
 *
 * @param {function} dispatch - the function that is used to call an action.
 * @return {object} - the actions that can be used in this component.
 */
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(StudyMain)
);
