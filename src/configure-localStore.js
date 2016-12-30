import LocalStore from './localStore';

let store = (name, existing) => {
  if ((typeof existing) == 'string') {
    return new LocalStore(name, JSON.parse(existing));
  }
  return new LocalStore(name, existing);
};

export default store;