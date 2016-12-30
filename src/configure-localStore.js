import LocalStore from './localStore';

let store = (name, existing) => {
  return new LocalStore('savedWriting', existing);
};

export default store;