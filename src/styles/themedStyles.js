// The globally used styles for the application
const styles = (theme) => ({
  fullWidth: { // Full width for an element
    width: '100%',
  },
  panelWrapper: { // Mainly for the control area
    height: '40vh',
    background: theme.palette.secondary.light,
  },
  smallPanelWrapper: { // Panels left and right of the control area
    marginLeft: '20px',
    marginRight: '20px',
    height: '40vh',
  },
  header: { // Header element for the AppBar
    background: theme.palette.secondary.off,
  },
  typoStd: { // The standard front used e.g. in the process panel
    color: 'black',
    width: '100%',
    fontSize: '14px',
  },
  typoStdBig: { // Big text, such as the epoch number
    color: 'black',
    width: '90%',
    margin: '5px',
    fontSize: '20px',
  },
  typoOv: { // Overview typography
    color: theme.palette.overview.main,
    marginTop: '5px',
    fontSize: '16px',
    width: 'auto',
  },
  typoOvOff: { // Overview typography for deactivated components
    color: theme.palette.secondary.dark,
    marginTop: '5px',
    fontSize: '16px',
    width: 'auto',
  },
  typoOvBig: { // Overview typography for big text
    color: theme.palette.overview.main,
    marginTop: '5px',
    fontSize: '24px',
  },
  typoCv: { // Cell view typography
    color: theme.palette.detail.main,
    marginTop: '5px',
    fontSize: '16px',
  },
  typoCvOff: { // Cell view typography for deactivated components
    color: theme.palette.secondary.dark,
    marginTop: '5px',
    fontSize: '16px',
  },
  typoCvBig: { // Cell view typography for big text
    color: theme.palette.detail.main,
    marginTop: '5px',
    fontSize: '24px',
  },
  typoOvHeader: { // Header typography when in overview
    color: theme.palette.overview.main,
    fontSize: '20px',
  },
  typoCvHeader: { // Header typography when in cell view
    color: theme.palette.detail.main,
    fontSize: '20px',
  },
  button_cell: { // Button in the cell view
    'margin': '10px',
    'color': 'white',
    'borderRadius': '50%',
    'background': theme.palette.detail.main,
    '&:hover': {
      'background': theme.palette.detail.dark,
    },
  }, button_net: { // Button in the overview
    'margin': '10px',
    'color': 'white',
    'borderRadius': '50%',
    'background': theme.palette.overview.main,
    '&:hover': {
      'background': theme.palette.overview.dark,
    },
  },
  defSlider: { // Slider styling
    width: '100%',
    color: 'black',
    marginTop: '5px',
  },
  select: { // Select components in the header
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
  selectIcon: { // Icon in the select component
    fill: 'white',
  },
});

export default styles;
