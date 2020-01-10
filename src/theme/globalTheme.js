import {createMuiTheme} from '@material-ui/core/styles';
import {grey, orange, cyan, blueGrey} from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[800],
      dark: blueGrey[900],
      light: blueGrey[700],
      off: blueGrey[400],
    },
    secondary: {
      main: grey[800],
      dark: grey[900],
      light: grey[700],
      off: grey[700],
    },
    overview: {
      main: cyan[600],
      light: cyan[400],
      dark: cyan[800],
    },
    detail: {
      main: orange[600],
      light: orange[400],
      dark: orange[800],
    },
  },
  typography: {
    useNextVariants: true,
  },
});
