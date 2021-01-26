import React from 'react';

import {withStyles} from '@material-ui/core/styles';

import styles from '../styles/themedStyles';


/**
 * Main component of the Application that displays all content dependant on the
 * Controls State.
 */
class PDF extends React.Component {
  /**
   * Render the PDF Content and call other Elements.
   *
   * @return {object} - the main component to be rendered.
   */
  render() {
    const url = 'https://docs.google.com/viewerng/viewer?url='+'https://github.com/Sparkier/exploRNN/raw/feature/pdf/learning_text.pdf'+'&embedded=true';
    return (
      <div className='full'>
        <div className='full'>
          <iframe className='pdfViewer' src={url}></iframe>
        </div>
        <div className='hideOpenButton'>
          &nbsp;
        </div>
      </div>
    );
  }
}

PDF.propTypes = { };

export default withStyles(styles)(PDF);
