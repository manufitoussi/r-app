import PrototypedBase from 'r-app-ui/prototyped/base';

const definePrototypedClass = prototypeSetup => {
  class Prototyped extends PrototypedBase {}

  Prototyped.setupPrototype(prototypeSetup);
  return Prototyped;
};

export default definePrototypedClass