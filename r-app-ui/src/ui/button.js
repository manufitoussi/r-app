import PrototypedBase from '../prototyped/base';
import BaseActor from './base-actor';

class ButtonActorProperties extends PrototypedBase { }

const buttonActorPrototypedSetup = {
  content: {
    value: '',
  },

  color: {
    value: 'green',
  },
};

ButtonActorProperties.setupPrototype(buttonActorPrototypedSetup);

export { ButtonActorProperties };

export default class ButtonActor extends BaseActor {

  constructor({ setup, setProperties }) {
    super({ setup, PropertiesClass: ButtonActorProperties, setProperties });
    console.log('ButtonActor constructor');
  }
}