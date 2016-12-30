import LocalStore from './localStore';

let store = (name, existing) => {
  return new LocalStore(name, existing);
};

export default store;