const styles = (theme) => ({
  root: {
    padding: '20px',
    background: theme.palette.primary.dark,
  },
  panelOv: {
    padding: '20px',
    background: theme.palette.primary.dark,
  },
  panelCv: {
    padding: '20px',
    background: theme.palette.secondary.dark,
  },
  headerCv: {
    background: theme.palette.secondary.dark,
  },
  headerOv: {
    background: theme.palette.primary.dark,
  },
  typoOv: {
    color: theme.palette.overview.light,
  },
  typoOvOff: {
    color: theme.palette.secondary.main,
  },
  typoCv: {
    color: theme.palette.detail.main,
  },
  typoCvOff: {
    color: theme.palette.primary.main,
  },
  button_cell: {
    'paddingLeft': '12px',
    'paddingRight': '12px',
    'color': 'white',
    'borderRadius': '50%',
    'background': theme.palette.detail.main,
    '&:hover': {
      'background': theme.palette.detail.dark,
    },
  }, button_net: {
    'paddingLeft': '12px',
    'paddingRight': '12px',
    'color': 'white',
    'borderRadius': '50%',
    'background': theme.palette.overview.light,
    '&:hover': {
      'background': theme.palette.overview.main,
    },
  },
  icon: {
    fill: 'white',
  },
});

export default styles;
