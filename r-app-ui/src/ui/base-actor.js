export default class BaseActor {

  key;

  _properties;
  get properties() {
    return this._properties;
  }

  _elementDOM;
  get elementDOM() {
    return this._elementDOM;
  }

  constructor({ setup, PropertiesClass, setProperties }) {
    console.log('BaseActor constructor');
    this.key = setup.key;
    this._properties = new PropertiesClass({ objectUi: this });
    Object.assign(this.properties, setup.properties);
    this._elementDOM = null;

    this.properties._onPropertyChanged = ({
      prototyped,
      name,
      propertyPath,
      modifier,
      oldValue,
      newValue
    }) => {
      console.log({
        prototyped,
        name,
        propertyPath,
        modifier,
        oldValue,
        newValue
      });
      setProperties(this.properties);
    };
  }

}