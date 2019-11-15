/* eslint-disable no-restricted-globals */
import {Model} from '../../tensorflow/Model';

export default () => {
  var model;
  self.importScripts('./test.js');
  self.addEventListener('message', (e) => {
    if (!e) return;
    switch (e.data.cmd) {
      case 'init':
        self.initialize();
        break;
      default:
        break;
    }
    postMessage('users');
  });

  self.initialize = () => {
    model = new Model();
  };
};
