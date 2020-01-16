import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {Dialog, DialogTitle, DialogContent} from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import HelpOutlined from '@material-ui/icons/HelpOutline';
import Contact from '@material-ui/icons/MailOutline';
import Close from '@material-ui/icons/ArrowForwardIos';
import Menu from '@material-ui/icons/Menu';
import Info from '@material-ui/icons/InfoOutlined';
import * as actions from '../../actions';
import styles from '../../styles/themedStyles';
import globalConstants from '../constants/global';
import StyledSelect from './comps/StyledSelect';

/**
 * Controls at top of the Application
 */
class Controls extends React.Component {
  /**
   *
   */
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * dadawd
   *
   @param {obect} event
   */
  handleKeyDown = (event) => {
    if (!this.props) {
      return;
    }
    if (!this.props.ui.detail && event.key === ' ') {
      this.props.actions.toggleTraining(this.props.training);
    } else if (this.props.ui.detail && event.key === ' ') {
      this.props.actions.updateUI({
        ...this.props.ui,
        anim: !this.props.ui.anim,
      });
    } else if (event.key === 'Enter') {
      if (this.props.ui.detail) {
        this.props.actions.updateUI({...this.props.ui, animStep: true});
      } else if (!this.props.training.running) {
        this.props.actions.updateTraining({...this.props.training, step: true});
      }
    } else if (event.key === 'Backspace' && !this.props.ui.detail) {
      this.props.actions.updateTraining({...this.props.training, reset: true});
    } else if (event.key === '1' && !this.props.ui.detail &&
          !this.props.training.running) {
      this.props.actions.updateTraining({...this.props.training,
        dataType: 'sin'});
    } else if (event.key === '2' && !this.props.ui.detail &&
          !this.props.training.running) {
      this.props.actions.updateTraining({...this.props.training,
        dataType: 'saw'});
    } else if (event.key === '3' && !this.props.ui.detail &&
          !this.props.training.running) {
      this.props.actions.updateTraining({...this.props.training,
        dataType: 'sqr'});
    } else if (event.key === '4' && !this.props.ui.detail &&
          !this.props.training.running) {
      this.props.actions.updateTraining({...this.props.training,
        dataType: 'sinc'});
    } else if (event.key === '+' && !this.props.ui.detail &&
    !this.props.training.running && this.props.network.layers <= 6) {
      this.props.actions.updateNetwork({...this.props.network,
        layers: this.props.network.layers + 1});
    } else if (event.key === '-' && !this.props.ui.detail &&
    !this.props.training.running && this.props.network.layers > 1) {
      this.props.actions.updateNetwork({...this.props.network,
        layers: this.props.network.layers - 1});
    } else if (event.key === 'Tab') {
      this.props.actions.updateUI({...this.props.ui,
        detail: !this.props.ui.detail});
      event.preventDefault();
    }
  }

  /**
   * Handles the opening and closing of the side drawer
   *
   * @param {boolean} open true, if the drawer should now be opened
   * @memberof Controls
   * @return {undefined}
   */
  toggleDrawer = (open) =>{
    if (open !== this.props.ui.help) {
      this.props.actions.updateUI({...this.props.ui, help: open});
    }
  };

  /**
   * Handles the opening and closing of the side drawer
   *
   * @param {object} event desc
   * @return {undefined}
   */
  typeSelect = (event) => {
    this.props.actions.updateNetwork({...this.props.network,
      type: event.target.value});
  };

  /**
   * Handles the opening and closing of the side drawer
   *
   * @param {object} event desc
   * @return {undefined}
   */
  languageSelect = (event) => {
    this.props.actions.updateAppState({...this.props.appState,
      language: event.target.value});
  };

  /**
   * @param {object} event
   */
  helperMenu = (event) => {
    this.toggleDrawer(!this.props.ui.help);
  };

  /**
   * @param {object} event
   */
  closeDrawer = () => {
    this.toggleDrawer(false);
  };

  /**
   *
   */
  onClickAbout() {
    let dialog = this.props.appState.aboutDialog;
    dialog = !dialog;
    this.props.actions.updateAppState({
      ...this.props.appState,
      aboutDialog: dialog,
    });
  }

  /**
   *
   */
  onClickFAQ() {
    let dialog = this.props.appState.faqDialog;
    dialog = !dialog;
    this.props.actions.updateAppState({
      ...this.props.appState,
      faqDialog: dialog,
    });
  }

  /**
   *
   */
  onClickImpressum() {
    let dialog = this.props.appState.impressumDialog;
    dialog = !dialog;
    this.props.actions.updateAppState({
      ...this.props.appState,
      impressumDialog: dialog,
    });
  }

  /**
   *
   */
  handleClose() {
    this.props.actions.updateAppState({
      ...this.props.appState,
      aboutDialog: false,
      faqDialog: false,
      impressumDialog: false,
    });
  }

  /**
   * Readt render function controlling the look of the
   * AppBar of the Application
   *
   * @return {object} the react components rendered look
   */
  render() {
    const {classes} = this.props;
    const global = globalConstants[this.props.appState.language];
    return (
      <AppBar className={this.props.ui.detail ? classes.headerCv :
        classes.headerOv}>
        <Toolbar>
          <Typography variant="h3" className = {
            this.props.ui.detail ? classes.typoCvHeader : classes.typoOvHeader
          }>
            {global.title}
          </Typography>
          <StyledSelect value={this.props.network.type}
            onChange={ this.typeSelect }
            main={true}
          >
            {
              global.types.map((x) => (
                <MenuItem key={x.name} disabled={x.disabled}
                  value={x.name}>{x.name}</MenuItem>
              ))
            }
          </StyledSelect>
          <StyledSelect value={this.props.appState.language}
            onChange={ this.languageSelect }
            main={false}
          >
            {
              global.languages.map((x) => (
                <MenuItem key={x.name} value={x.name}>{x.name}</MenuItem>
              ))
            }
          </StyledSelect>
          <IconButton disabled={false} variant="outlined"
            className={this.props.classes.headerIcon}
            onClick={this.helperMenu}>
            {<Menu/>}
          </IconButton>
          <Drawer
            anchor="right"
            open={this.props.ui.help} >
            <div
              className={classes.list}
              role="presentation"
              onClick={this.helperMenu}
              onKeyDown={this.helperMenu}
              onClose={() => this.closeDrawer()}
            >
              <List>
                <ListItem button key={'close'} onClick={()=>this.closeDrawer()}
                >
                  <ListItemIcon>{<Close/>}</ListItemIcon>
                  <ListItemText primary={global.strings.sideMenu.close.title} />
                </ListItem>
                <Divider />
                <ListItem button key={'basics'}
                  onClick={()=>this.onClickAbout()}>
                  <ListItemIcon>
                    {<Info/>}
                  </ListItemIcon>
                  <ListItemText primary={global.strings.sideMenu.about.title} />
                </ListItem>
                <ListItem button key={'faq'}
                  onClick={()=>this.onClickFAQ()}>
                  <ListItemIcon>
                    {<HelpOutlined/>}
                  </ListItemIcon>
                  <ListItemText primary={global.strings.sideMenu.faq.title} />
                </ListItem>
                <ListItem button key={'impressum'}
                  onClick={()=>this.onClickImpressum()}>
                  <ListItemIcon>{<Contact/>}</ListItemIcon>
                  <ListItemText
                    primary={global.strings.sideMenu.impressum.title} />
                </ListItem>
              </List>
              <Divider />
            </div>
          </Drawer>
          <Dialog onClose={() => this.handleClose()}
            open={this.props.appState.aboutDialog}>
            <DialogTitle>
              {global.strings.sideMenu.about.title}
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                {global.strings.sideMenu.about.description}
              </Typography>
            </DialogContent>
          </Dialog>
          <Dialog onClose={() => this.handleClose()}
            open={this.props.appState.faqDialog}>
            <DialogTitle>
              {global.strings.sideMenu.faq.title}
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                {global.strings.sideMenu.faq.description}
              </Typography>
            </DialogContent>
          </Dialog>
          <Dialog onClose={() => this.handleClose()}
            open={this.props.appState.impressumDialog}>
            <DialogTitle>
              {global.strings.sideMenu.impressum.title}
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                {global.strings.sideMenu.impressum.description}
              </Typography>
            </DialogContent>
          </Dialog>
        </Toolbar>
      </AppBar>
    );
  }
}

// Controls state of the Application
Controls.propTypes = {
  training: PropTypes.object.isRequired,
  network: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

/**
 * Mapping the Controls state to the Props of this Class
 * @param {object} state ...
 * @return {object} ...
 */
function mapStateToProps(state) {
  return {
    training: state.training,
    network: state.network,
    ui: state.ui,
    appState: state.appState,
    actions: state.actions,
  };
}

/**
 * Map the Actions called when Controls are used to the Props of this Class
 *
 * @param {object} dispatch ...
 * @return {object} ...
 */
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(Controls)
);
