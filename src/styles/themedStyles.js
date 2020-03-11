// The globally used styles for the application
const styles = (theme) => ({
  root: {
    padding: '20px',
    background: theme.palette.primary.dark,
  },
  panelWrapper: {
    height: '40vh',
  },
  controlWrapper: {
    margin: '15px',
    width: '65%',
  },
  panel: {
    padding: '20px',
    width: '100%',
    background: theme.palette.secondary.dark,
  },
  header: {
    background: theme.palette.secondary.dark,
  },
  typoStd: {
    color: 'white',
    width: '90%',
    fontSize: '14px',
  },
  typoStdBig: {
    color: 'white',
    width: '90%',
    margin: '5px',
    fontSize: '20px',
  },
  typoOv: {
    color: theme.palette.overview.main,
    marginTop: '5px',
    fontSize: '16px',
    width: 'auto',
  },
  typoOvOff: {
    color: theme.palette.primary.off,
    marginTop: '5px',
    fontSize: '16px',
    width: 'auto',
  },
  typoOvBig: {
    color: theme.palette.overview.main,
    marginTop: '5px',
    fontSize: '24px',
  },
  typoCv: {
    color: theme.palette.detail.main,
    marginTop: '5px',
    fontSize: '16px',
  },
  typoCvOff: {
    color: theme.palette.secondary.off,
    marginTop: '5px',
    fontSize: '16px',
  },
  typoCvBig: {
    color: theme.palette.detail.main,
    marginTop: '5px',
    fontSize: '24px',
  },
  typoOvHeader: {
    color: theme.palette.overview.main,
    fontSize: '20px',
  },
  typoCvHeader: {
    color: theme.palette.detail.main,
    fontSize: '20px',
  },
  button_cell: {
    'margin': '10px',
    'color': 'white',
    'borderRadius': '50%',
    'background': theme.palette.detail.main,
    '&:hover': {
      'background': theme.palette.detail.dark,
    },
  }, button_net: {
    'margin': '10px',
    'color': 'white',
    'borderRadius': '50%',
    'background': theme.palette.overview.light,
    '&:hover': {
      'background': theme.palette.overview.main,
    },
  },
  iconDefault: {
    'color': 'white',
    'background': theme.palette.overview.light,
  },
  defSlider: {
    width: '90%',
    markerLabel: {
      color: theme.palette.overview.light,
    },
    color: 'white',
    marginTop: '5px',
  },
  icon: {
    fill: 'white',
  },
  formControl: {
    marginLeft: theme.spacing(2),
    minWidth: 120,
    color: 'white',
  },
  selectEmpty: {
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
  },
  selectRoot: {
    border: 1,
    borderRadius: 3,
    color: 'white',
  },
  select: {
    'marginLeft': theme.spacing(4),
    '&:before': {
      borderColor: 'white',
    },
    '&:hover': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
    'minWidth': 120,
    'color': 'white',
    'align': 'left',
  },
  selectIcon: {
    fill: 'white',
  },
  headerIcon: {
    color: 'white',
  },
  list: {
    width: '250',
  },
});

export default styles;
