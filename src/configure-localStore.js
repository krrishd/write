import LocalStore from './localStore';

let store = (name, existing) => {
  if (existing) {
    return new LocalStore('savedWriting', JSON.parse(existing));
  }
  return new LocalStore('savedWriting', null);
};

export default store;