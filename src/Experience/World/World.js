import Environment from './Environment';
import Sky from './Sky/Sky';
import Fireworks from './Fireworks/Fireworks';

export default class World {
  experience;
  scene;
  environment;
  resources;
  sky;
  fireworks;

  constructor(experience) {
    this.experience = experience;
    this.scene = this.experience.scene;

    // Objects

    // Setup Resources:
    this.resources = this.experience.resources;

    // Wait for resources to finish, for the end of the loading process:
    this.resources.on('ready', () => {
      // Setup Objects
      this.sky = new Sky(this.experience);
      this.fireworks = new Fireworks(this.experience);

      // Setup Environment
      this.environment = new Environment(this.experience);

    });
  }


}
