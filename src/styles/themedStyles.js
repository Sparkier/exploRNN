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
  oVheader: { // Header element for the AppBar
    background: theme.palette.overview.main,
  },
  cVheader: { // Header element for the AppBar
    background: theme.palette.detail.main,
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
  typoHeader: { // Header typography when in overview
    color: 'white',
    fontSize: '20px',
  },
  typoOvHighlighted: {
    'color': theme.palette.overview.main,
  },
  typoCvHighlighted: {
    'color': theme.palette.detail.main,
  },
  icon_cell: {
    'color': theme.palette.detail.main,
  },
  icon_net: {
    'color': theme.palette.overview.main,
  },
  button_cell: { // Button in the cell view
    'margin': '10px',
    'color': 'white',
    'borderRadius': '50%',
    'background': theme.palette.detail.main,
    '&:hover': {
      'background': theme.palette.detail.dark,
    },
  },
  button_net: { // Button in the overview
    'margin': '10px',
    'color': 'white',
    'borderRadius': '50%',
    'background': theme.palette.overview.main,
    '&:hover': {
      'background': theme.palette.overview.dark,
    },
  },
  button_top: { // Button in the top bar
    'color': 'white',
  },
  text_button_net: {
    'color': 'white',
    'margin': '10px',
    'background': theme.palette.overview.main,
    '&:hover': {
      'background': theme.palette.overview.dark,
    },
  },
  text_button_cell: {
    'color': 'white',
    'margin': '10px',
    'background': theme.palette.detail.main,
    '&:hover': {
      'background': theme.palette.detail.dark,
    },
  },
  text_button_net_inverted: {
    'background': 'white',
    'color': theme.palette.overview.main,
    '&:hover': {
      'background': 'lightgrey',
    },
  },
  text_button_cell_inverted: {
    'background': 'white',
    'color': theme.palette.detail.main,
    '&:hover': {
      'background': 'lightgrey',
    },
  },
  defSlider: { // Slider styling
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
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
