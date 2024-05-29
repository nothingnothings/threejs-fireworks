import { GUI } from 'lil-gui';

export default class Debug {
  constructor() {
    this.active = window.location.hash === '#debug'; // If the URL has '#debug', the debug mode is activated.

    // if (this.active) {
        this.gui = new GUI();
    // }
  }
}
