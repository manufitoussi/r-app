import hasOwnProperty from "../tools/object/has-own-property";
import logger from '../tools/logger';

/**
 * Prototype de base pour la gestion d'un ensemble de propriété avec des valeurs par défaut.
 * @class PrototypedBase
 * @private
 */
class PrototypedBase {

  static _prototypeSetup = null;

  _containerName = 'properties';

  // get _isProperties() {
  //   return this._containerName === 'properties';
  // }

  // get _isAdditionals() {
  //   return this._containerName === 'additionals';
  // }

  get prototypeSetup() {
    return this.constructor._prototypeSetup;
  }

  get containerName() {
    return this._containerName;
  }

  _cache;

  _onPropertyChanged = null;
  _onPropertyReset = null;

  /**
   * Réinitialise à sa valeur par défaut une propriété par son nom.
   * @method reset
   * @memberof PrototypedBase#
   * @param {string} name Nom de la propriété à réinitialiser.
   */
  reset(name) {
    if (!name) {
      Object.keys(this._cache).forEach(this.reset.bind(this));
      return;
    }

    if (!hasOwnProperty(this._cache, name)) {
      return;
    }

    var oldValue = this._cache[name];
    var newValue = this.prototypeSetup[name].value
    delete this._cache[name];

    if (this._onPropertyReset) {
      this._onPropertyReset({
        prototyped: this,
        name,
        propertyPath: `${this.containerName}.${name}`,
        modifier: this.prototypeSetup[name].modifier || 'other',
        oldValue,
        newValue
      });
    }
  }

  _getValue(name) {
    if (!this._cache) return null;
    return name in this._cache
      ? this._cache[name]
      : this.prototypeSetup[name].value;
  }

  static setupPrototype(prototypeSetup = {}) {
    this._prototypeSetup = prototypeSetup;
    Object.keys(prototypeSetup).forEach(name => {
      var {
        modifier = "other"
      } = prototypeSetup[name];

      Object.defineProperty(this.prototype, name, {

        enumerable: true,
        configurable: true,

        get() {
          return this._getValue(name);
        },

        set(newValue) {
          try {
            if (!this._cache) return;
            let oldValue = this._getValue(name);
            if (oldValue === newValue) return;
            this._cache[name] = newValue;
            if (this._onPropertyChanged) {
              this._onPropertyChanged({
                prototyped: this,
                name,
                propertyPath: `${this.containerName}.${name}`,
                modifier,
                oldValue,
                newValue
              });
            }
          } catch (error) {
            if (error && error.message && error.message.startsWith("Assertion Failed: You attempted to update")) {
              logger.warn(`Error while setting property ${name}`, 'update value in the same computation of using it');
            } else {
              throw error;
            }
          }

        }
      });
    });

    // logger.debug("setupPrototype:", this._prototypeSetup);
  }

  constructor({ objectUi, containerName = "properties" }) {
    console.log('prototyped-base constructor');
    this._cache = {};
    this.objectUi = objectUi;
    this._containerName = containerName;
  }

  _resetEvents() {
    this._onPropertyChanged = null;
    this._onPropertyReset = null;
  }

  destroy() {
    this._resetEvents();
    this._cache = null;
    this.objectUi = null;
  }
}

export default PrototypedBase;
