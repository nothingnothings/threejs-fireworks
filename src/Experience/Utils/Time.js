import EventEmitter from "./EventEmitter";

import * as THREE from 'three';

export default class Time extends EventEmitter {

    start;
    current;
    elapsed;
    delta;
    uTime;

  constructor() {
    super(); // needed to avoid error
    
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;
    this.uTime = new THREE.Uniform(0),

    window.requestAnimationFrame(
      () => {
        this.tick();
      }
    )
  }


  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.uTime.value = this.elapsed;

    this.trigger('tick');

    window.requestAnimationFrame(
      () => {
        this.tick();
      }
    )
}

}