import {createMuiTheme} from '@material-ui/core/styles';
import {grey, orange, blue, blueGrey} from '@material-ui/core/colors';

// The color palette of the application
export default createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[800],
      dark: blueGrey[900],
      light: blueGrey[700],
      off: blueGrey[400],
    },
    secondary: {
      main: grey[500],
      dark: grey[700],
      light: grey[100],
      off: grey[700],
    },
    overview: {
      main: blue[500],
      light: blue[300],
      dark: blue[700],
    },
    detail: {
      main: orange[500],
      light: orange[300],
      dark: orange[700],
    },
  },
});
