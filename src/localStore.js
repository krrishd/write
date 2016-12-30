export default class LocalStore {
  constructor(storeName, existingStore) {
    this.storeName = storeName;
    if (existingStore) {
      localStorage[storeName] = existingStore;
    } else {
      localStorage[storeName] = JSON.stringify([]);
    }
  }

  getAll() {
    return JSON.parse(
      localStorage[this.storeName]
    );
  }

  setAll(mutatedStore) {
    localStorage[this.storeName] = JSON.stringify(mutatedStore);
  }

  addItem(item) {
    let storeObject = this.getAll();
    storeObject.push(item);
    this.setAll(storeObject);
  }

  removeItem(item) {
    let storeObject = this.getAll();
    let index;
    if (typeof item === 'object') {
      index = indexOfWithObject(storeObject, item);
    } else {
      index = storeObject.indexOf(item);
    }
    storeObject.splice(
      index,
      1
    );
    this.setAll(storeObject);
  }

  getItemByIndex(index) {
    let storeObject = this.getAll();
    return storeObject[index];
  }

  setItemByIndex(index, mutatedItem) {
    let storeObject = this.getAll();
    let mutatedStoreObject = storeObject;
    mutatedStoreObject[index] = mutatedItem;
    this.setAll(mutatedStoreObject);
  }

  getItemsByProperty(propertyKey, matchingValue) {
    let storeObject = this.getAll();
    let results = storeObject.filter(item => {
      return item[propertyKey] === matchingValue;
    });
    return results;
  }

  setItemByProperty(propertyKey, matchingValue, modifiedItem) {
    let storeObject = this.getAll();
    let indexOfitemToModify = storeObject.findIndex(item => {
      return item[propertyKey] == matchingValue;
    });
    storeObject[indexOfitemToModify] = modifiedItem;
    this.setAll(storeObject);
  }

  delete() {
    localStorage.removeItem(this.storeName);
  }

  reset() {
    localStorage[this.storeName] = JSON.stringify([]);
  }
}

// http://stackoverflow.com/questions/12604062/javascript-array-indexof-doesnt-search-objects
function indexOfWithObject(arr, value) {
  var a;
  for (var i=0, iLen=arr.length; i<iLen; i++) {
    a = arr[i];
    if (a === value) return i;
    if (typeof a == 'object') {
      if (compareObj(arr[i], value)) {
        return i;
      }
    } else {
      // deal with other types
    }
  }
  return -1;
  // Extremely simple function, expects the values of all 
  // enumerable properties of both objects to be primitives.
  function compareObj(o1, o2, cease) {
    var p;
    if (typeof o1 == 'object' && typeof o2 == 'object') {
      for (p in o1) {
        if (o1[p] != o2[p]) return false; 
      }
      if (cease !== true) {
        compareObj(o2, o1, true);
      }
      return true;
    }
  }
}