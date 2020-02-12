import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar} from '@material-ui/core/';
import {Typography, IconButton} from '@material-ui/core/';
import {MenuItem, Drawer, Divider} from '@material-ui/core/';
import {List, ListItemText, ListItem, ListItemIcon} from '@material-ui/core/';
import {Dialog, DialogTitle, DialogContent} from '@material-ui/core';
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
   * When the component is mounted we need to connect the key actions to this
   * element to handle incoming key inputs
   */
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Handles keyboard inputs for the application
   *
   * @param {obect} event the key input event
   */
  handleKeyDown = (event) => {
    if (!this.props) {
      return;
    }
    let callDefault = false;
    switch (event.key) {
      case ' ':
        if (!this.props.training.workerReady && !this.props.ui.netAnim) return;
        if (!this.props.ui.detail) {
          this.props.actions.toggleTraining(this.props.training);
        } else {
          this.props.actions.updateUI({
            ...this.props.ui,
            anim: !this.props.ui.anim,
          });
        }
        break;
      case 'Enter':
        if ((this.props.ui.detail && this.props.ui.anim) ||
            (!this.props.ui.detail && this.props.training.running) ||
            !this.props.training.workerReady) return;
        if (this.props.ui.detail) {
          this.props.actions.updateUI({...this.props.ui, animStep: true});
        } else if (!this.props.training.running) {
          this.props.actions.updateTraining(
              {...this.props.training, step: true}
          );
        }
        break;
      case 'Backspace':
        if (this.props.ui.detail || !this.props.training.workerReady) return;
        this.props.actions.updateTraining(
            {...this.props.training, reset: true}
        );
        break;
      case '1':
        this.updateDataTypes('sin');
        break;
      case '2':
        this.updateDataTypes('saw');
        break;
      case '3':
        this.updateDataTypes('sqr');
        break;
      case '4':
        this.updateDataTypes('sinc');
        break;
      case '-':
        if (!this.props.ui.detail && !this.props.training.running &&
            this.props.network.layers > 1
        ) {
          this.props.actions.updateNetwork({...this.props.network,
            layers: this.props.network.layers - 1});
        }
        break;
      case '+':
        if (!this.props.ui.detail && !this.props.training.running &&
            this.props.network.layers <= 6
        ) {
          this.props.actions.updateNetwork({...this.props.network,
            layers: this.props.network.layers + 1});
        }
        break;
      case 'Tab':
        this.props.actions.updateUI({...this.props.ui,
          detail: !this.props.ui.detail});
        break;
      default:
        callDefault = true;
    }
    if (!callDefault) {
      event.preventDefault();
    }
  }

  /**
   * Adds or removes a chosen type to the global state
   *
   * @param {string} type the data type to be added or removed
   */
  updateDataTypes = (type) => {
    if (!this.props.ui.detail && !this.props.training.running) {
      const oldTypes = this.props.training.dataTypes;
      let newTypes = [];
      if (oldTypes.includes(type) && oldTypes.length > 1) {
        for (const item of oldTypes) {
          if (item !== type) {
            newTypes.push(item);
          }
        }
      } else if (oldTypes.includes(type) && oldTypes.length === 1) {
        newTypes = oldTypes;
      } else {
        oldTypes.push(type);
        newTypes = oldTypes;
      }
      this.props.actions.updateTraining(
          {...this.props.training, dataTypes: newTypes}
      );
    }
  }

  /**
   * Handles the opening and closing of the side drawer
   *
   * @param {boolean} open true, if the drawer should now be opened
   */
  toggleDrawer = (open) => {
    if (open !== this.props.ui.help) {
      this.props.actions.updateUI({...this.props.ui, help: open});
    }
  };

  /**
   * Handles the selection of the net type select component
   *
   * @param {object} event the event containing the information about the
   * selected type element
   */
  typeSelect = (event) => {
    this.props.actions.updateNetwork({...this.props.network,
      type: event.target.value});
  };

  /**
   * Handles the selection of the language select component
   *
   * @param {object} event the event containing the information about the
   * selected language
   */
  languageSelect = (event) => {
    this.props.actions.updateAppState({...this.props.appState,
      language: event.target.value});
  };

  /**
   * Helper function for toggling the side menu
   */
  helperMenu = () => {
    this.toggleDrawer(!this.props.ui.help);
  };

  /**
   * Helper method for closing the side menu
   */
  closeDrawer = () => {
    this.toggleDrawer(false);
  };

  /**
   * Is called when the user clicks on the about element in the side menu, opens
   * a corresponding dialog
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
   * Is called when the user clicks on the faq element in the side menu, opens
   * a corresponding dialog
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
   * Is called when the user clicks on the impressum element in the side menu,
   * opens a corresponding dialog
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
   * Handles the closing of the dialogs for this element, updates the
   * global state accordingly
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
   * React render function controlling the look of the
   * AppBar of the Application
   *
   * @return {object} the react components rendered form
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
 * Map the states from redux to this property.
 *
 * @param {object} state - the global redux state.
 * @return {object} - the new props of this component.
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
 * Maps the actions to this property.
 *
 * @param {function} dispatch - the function that is used to call an action.
 * @return {object} - the actions that can be used in this component.
 */
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(Controls)
);
