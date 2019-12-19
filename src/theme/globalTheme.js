import {createMuiTheme} from '@material-ui/core/styles';
import {grey, orange, cyan} from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#37474f',
      dark: '#102027',
      light: '#62727b',
      contrastText: 'white',
    },
    secondary: {
      main: grey[800],
      dark: grey[900],
      light: grey[700],
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
