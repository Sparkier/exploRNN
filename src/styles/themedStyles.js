const styles = (theme) => ({
  root: {
    padding: '20px',
    background: theme.palette.secondary.dark,
  },
  typoOv: {
    color: theme.palette.overview.light,
  },
  typoCv: {
    color: theme.palette.detail.main,
  },
  button_cell: {
    'paddingLeft': '12px',
    'paddingRight': '12px',
    'color': 'white',
    'borderRadius': '50%',
    'background': theme.palette.detail.main,
    '&:hover': {
      background: theme.palette.detail.dark,
    },
  }, button_net: {
    'paddingLeft': '12px',
    'paddingRight': '12px',
    'color': 'white',
    'borderRadius': '50%',
    'background': theme.palette.overview.light,
    '&:hover': {
      background: theme.palette.overview.main,
    },
  },
  icon: {
    fill: 'white',
  },
});

export default styles;
